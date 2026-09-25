import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, ArrowLeft, ArrowRight, Plus, X } from 'lucide-react';
import api from '../api/client';
import { useToast } from '../context/ToastContext';
import Button from '../components/common/Button';

const PropertyFormPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    city: '',
    state: 'Andhra Pradesh',
    pincode: '',
    propertyType: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    areaSqFt: 1200,
    rentAmount: 15000,
    depositAmount: 30000,
    amenities: ['Covered Parking', 'Elevator', '24/7 Water Supply'],
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80'],
  });

  const [newAmenity, setNewAmenity] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      setFormData({ ...formData, amenities: [...formData.amenities, newAmenity.trim()] });
      setNewAmenity('');
    }
  };

  const handleRemoveAmenity = (item) => {
    setFormData({ ...formData, amenities: formData.amenities.filter((a) => a !== item) });
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setFormData({ ...formData, images: [...formData.images, newImageUrl.trim()] });
      setNewImageUrl('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post('/properties', formData);
      if (res.data.success) {
        showToast('Property registered successfully!', 'success');
        navigate(`/properties/${res.data.property._id}`);
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to create property.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        to="/properties"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" /> Cancel & Back
      </Link>

      <div className="bg-white dark:bg-slate-900/70 p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm backdrop-blur-xl">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div className="p-3 bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 rounded-2xl border border-brand-100 dark:border-brand-900/50">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">Add New Rental Property</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Configure property specifications and default inspection rooms</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Information */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Basic Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Property Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Green Valley Apartments, Unit 402"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Property Type</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="Apartment">Apartment</option>
                  <option value="House">Independent House</option>
                  <option value="Villa">Luxury Villa</option>
                  <option value="Studio">Studio Apartment</option>
                  <option value="Room">Private Room</option>
                  <option value="Commercial">Commercial Space</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Carpet Area (Sq.Ft)</label>
                <input
                  type="number"
                  name="areaSqFt"
                  value={formData.areaSqFt}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Highlights, floor level, view, and specific conditions..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Location</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Street Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="Street name, door number, landmark"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="e.g. Guntur"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  placeholder="e.g. 522002"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Layout */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Financials & Specs</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Monthly Rent (₹)</label>
                <input
                  type="number"
                  name="rentAmount"
                  required
                  value={formData.rentAmount}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Security Deposit (₹)</label>
                <input
                  type="number"
                  name="depositAmount"
                  required
                  value={formData.depositAmount}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  min="0"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  min="0"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          </div>

          {/* Amenities Management */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Verified Amenities</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.amenities.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200/60 dark:border-slate-700/60"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveAmenity(item)}
                    className="text-slate-400 hover:text-rose-500 transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 max-w-md">
              <input
                type="text"
                placeholder="Add custom amenity (e.g. EV Charger, Gym)"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 px-3.5 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <Button type="button" variant="outline" size="sm" onClick={handleAddAmenity}>
                Add
              </Button>
            </div>
          </div>

          {/* Image URLs */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Property Photos</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative rounded-xl overflow-hidden h-24 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group">
                  <img src={img} alt={`Property preview ${idx}`} className="w-full h-full object-cover" />
                  {formData.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, images: formData.images.filter((_, i) => i !== idx) })}
                      className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-2 max-w-lg">
              <input
                type="url"
                placeholder="Paste direct image URL"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 px-3.5 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <Button type="button" variant="outline" size="sm" onClick={handleAddImage}>
                Add Photo
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
            <Link to="/properties">
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </Link>
            <Button type="submit" variant="primary" loading={loading}>
              Create Property Record
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyFormPage;
