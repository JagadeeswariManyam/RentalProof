import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Search, Plus, MapPin, Bed, Bath, Maximize, ArrowRight, Filter } from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import EmptyState from '../components/common/EmptyState';
import { CardSkeleton } from '../components/common/Skeleton';

const PropertiesPage = () => {
  const { isLandlord, isAdmin } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await api.get('/properties', {
        params: {
          search: search || undefined,
          status: statusFilter,
          propertyType: typeFilter,
        },
      });
      if (res.data?.success) {
        setProperties(res.data.properties || []);
      }
    } catch (error) {
      console.error('Failed to load properties:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [statusFilter, typeFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Properties Directory</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your rental units, room checklists, and occupancy records
          </p>
        </div>

        {(isLandlord || isAdmin) && (
          <Link to="/properties/new">
            <Button variant="primary" size="md" icon={Plus}>
              Add Property
            </Button>
          </Link>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-3.5 sm:p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="flex-1 min-w-[220px]">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search properties by title, city, or address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>
        </form>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs rounded-xl border border-slate-200 dark:border-slate-800 px-3 py-2.5 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-bold focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs rounded-xl border border-slate-200 dark:border-slate-800 px-3 py-2.5 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-bold focus:outline-none"
          >
            <option value="all">All Property Types</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Studio">Studio</option>
          </select>
        </div>
      </div>

      {/* Property Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : properties.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No properties found"
          description="Try adjusting your search filters or create a new property."
          actionLabel={(isLandlord || isAdmin) ? 'Create First Property' : undefined}
          onAction={() => (window.location.href = '/properties/new')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {properties.map((p) => {
            const coverImage =
              p.images && p.images.length > 0
                ? p.images[0]
                : 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80';

            return (
              <div
                key={p._id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Property Image Header */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                    <img
                      src={coverImage}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant={p.status}>{p.status}</Badge>
                    </div>
                    <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-slate-700">
                      {p.propertyType}
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="p-5">
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="text-lg font-black text-slate-900 dark:text-white">
                        ₹{p.rentAmount?.toLocaleString('en-IN')}{' '}
                        <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/month</span>
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                        Dep: ₹{p.depositAmount?.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition line-clamp-1">
                      {p.title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1 line-clamp-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {p.address}, {p.city}
                    </p>

                    {/* Specs Pills */}
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Bed className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-bold">{p.bedrooms} Beds</span>
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <Bath className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-bold">{p.bathrooms} Baths</span>
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <Maximize className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-bold">{p.areaSqFt} sq.ft</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  <Link to={`/properties/${p._id}`}>
                    <Button variant="outline" size="sm" className="w-full" icon={ArrowRight}>
                      View Property & Timeline
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PropertiesPage;
