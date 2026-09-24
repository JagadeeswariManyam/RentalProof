import Inspection from '../models/Inspection.js';
import { analyzeEvidencePair } from '../services/aiComparisonService.js';
import { logAudit } from '../services/auditService.js';

// @desc    Get Before vs After comparison between Move-In and Move-Out
// @route   GET /api/comparison/:moveOutInspectionId
// @access  Private
export const getComparisonData = async (req, res, next) => {
  try {
    const moveOutInspection = await Inspection.findById(req.params.moveOutInspectionId)
      .populate('property')
      .populate('tenancy')
      .populate('inspector', 'name email role')
      .populate('referenceMoveInInspection');

    if (!moveOutInspection) {
      return res.status(404).json({ success: false, message: 'Move-out inspection not found' });
    }

    if (!moveOutInspection.referenceMoveInInspection) {
      return res.status(400).json({
        success: false,
        message: 'This inspection does not have a linked Move-In baseline inspection for comparison',
      });
    }

    const moveInInspection = await Inspection.findById(moveOutInspection.referenceMoveInInspection._id).populate(
      'inspector',
      'name email role'
    );

    // Pair items together
    const comparisonPairs = moveOutInspection.items.map((moveOutItem) => {
      // Find matching move-in item by reference ID or name/category match
      let moveInItem = null;
      if (moveOutItem.referenceMoveInItemId) {
        moveInItem = moveInInspection.items.id(moveOutItem.referenceMoveInItemId);
      }
      if (!moveInItem) {
        moveInItem = moveInInspection.items.find(
          (m) => m.category === moveOutItem.category && m.item === moveOutItem.item
        );
      }

      // Determine attention level
      let attentionLevel = moveOutItem.attentionLevel;
      const isDowngraded =
        moveInItem &&
        moveInItem.condition !== moveOutItem.condition &&
        ['Fair', 'Needs Attention', 'Damaged'].includes(moveOutItem.condition);

      if (isDowngraded && attentionLevel === 'No Significant Change') {
        attentionLevel = moveOutItem.condition === 'Damaged' ? 'Needs Review' : 'Possible Change';
      }

      return {
        category: moveOutItem.category,
        item: moveOutItem.item,
        moveOutItemId: moveOutItem._id,
        moveInItemId: moveInItem?._id || null,
        moveIn: {
          condition: moveInItem?.condition || 'Unrecorded',
          notes: moveInItem?.notes || '',
          photos: moveInItem?.photos || [],
          inspectionDate: moveInInspection.inspectionDate,
        },
        moveOut: {
          condition: moveOutItem.condition,
          notes: moveOutItem.notes || '',
          photos: moveOutItem.photos || [],
          inspectionDate: moveOutInspection.inspectionDate,
        },
        attentionLevel,
        aiObservation: moveOutItem.aiObservation || null,
      };
    });

    res.status(200).json({
      success: true,
      property: moveOutInspection.property,
      tenancy: moveOutInspection.tenancy,
      moveInInspection: {
        id: moveInInspection._id,
        inspectionDate: moveInInspection.inspectionDate,
        inspector: moveInInspection.inspector,
        status: moveInInspection.status,
      },
      moveOutInspection: {
        id: moveOutInspection._id,
        inspectionDate: moveOutInspection.inspectionDate,
        inspector: moveOutInspection.inspector,
        status: moveOutInspection.status,
      },
      comparisons: comparisonPairs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Execute AI image analysis on an inspection evidence pair
// @route   POST /api/comparison/analyze
// @access  Private
export const runAiAnalysis = async (req, res, next) => {
  try {
    const { moveOutInspectionId, itemId, moveInImage, moveOutImage, category, item, moveInCondition, moveOutCondition } =
      req.body;

    const analysisResult = await analyzeEvidencePair({
      moveInImage,
      moveOutImage,
      category,
      item,
      moveInCondition,
      moveOutCondition,
    });

    // If an inspection and itemId were provided, persist the AI observation onto the document
    if (moveOutInspectionId && itemId) {
      const inspection = await Inspection.findById(moveOutInspectionId);
      if (inspection) {
        const docItem = inspection.items.id(itemId);
        if (docItem) {
          docItem.aiObservation = {
            changeDetected: analysisResult.changeDetected,
            confidence: analysisResult.confidence,
            observations: analysisResult.observations,
            requiresManualReview: true,
          };
          if (analysisResult.changeDetected && docItem.attentionLevel === 'No Significant Change') {
            docItem.attentionLevel = 'Possible Change';
          }
          await inspection.save();
        }
      }
    }

    await logAudit({
      user: req.user._id,
      action: 'AI Evidence Comparison Analyzed',
      entity: 'Evidence',
      entityId: itemId || moveOutInspectionId,
      description: `Ran algorithmic visual comparison for ${category} - ${item}. Change detected: ${analysisResult.changeDetected}`,
      metadata: { confidence: analysisResult.confidence },
      req,
    });

    res.status(200).json({
      success: true,
      analysis: analysisResult,
    });
  } catch (error) {
    next(error);
  }
};
