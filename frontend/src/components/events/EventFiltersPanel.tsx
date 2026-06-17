import { useQuery } from '@tanstack/react-query'
import api from '../../lib/api'
import { Category, EventFilters } from '../../types'

interface Props {
  filters: EventFilters
  onChange: (f: Partial<EventFilters>) => void
  onReset: () => void
}

export default function EventFiltersPanel({ filters, onChange, onReset }: Props) {
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => api.get('/categories').then((r) => r.data),
  })

  return (
    <div className="glass rounded-2xl p-5 space-y-6 sticky top-20">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">Filters</h3>
        <button onClick={onReset} className="text-xs text-violet-light hover:text-white transition-colors">
          Reset all
        </button>
      </div>

      {/* Category */}
      <div>
        <label className="block text-xs font-medium text-gray-400 mb-2">Category</label>
        <div className="space-y-1.5">
          <button
            onClick={() => onChange({ categoryId: undefined })}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!filters.categoryId ? 'bg-violet text-white' : 'text-gray-300 hover:bg-white/5'}`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onChange({ categoryId: cat.id })}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${filters.categoryId === cat.id ? 'bg-violet text-white' : 'text-gray-300 hover:bg-white/5'}`}
            >
              <span>{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Event Type */}
      <div>
        <label className="block text-xs font-medium text-gray-400 mb-2">Event Type</label>
        <div className="space-y-1.5">
          {[
            { value: '', label: 'All Types' },
            { value: 'in_person', label: '📍 In Person' },
            { value: 'online', label: '💻 Online' },
            { value: 'hybrid', label: '🔀 Hybrid' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ eventType: opt.value || undefined })}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${filters.eventType === opt.value || (!filters.eventType && !opt.value) ? 'bg-violet text-white' : 'text-gray-300 hover:bg-white/5'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="block text-xs font-medium text-gray-400 mb-2">Price</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice ?? ''}
            onChange={(e) => onChange({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-violet"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice ?? ''}
            onChange={(e) => onChange({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-violet"
          />
        </div>
      </div>

      {/* Date From */}
      <div>
        <label className="block text-xs font-medium text-gray-400 mb-2">Date From</label>
        <input
          type="date"
          value={filters.startFrom ?? ''}
          onChange={(e) => onChange({ startFrom: e.target.value || undefined })}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-violet"
        />
      </div>

      {/* Sort */}
      <div>
        <label className="block text-xs font-medium text-gray-400 mb-2">Sort By</label>
        <select
          value={`${filters.sortBy ?? 'startDate'}_${filters.sortOrder ?? 'ASC'}`}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split('_')
            onChange({ sortBy, sortOrder: sortOrder as 'ASC' | 'DESC' })
          }}
          className="w-full px-3 py-2 bg-navy-800 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-violet"
        >
          <option value="startDate_ASC">Date (Soonest)</option>
          <option value="startDate_DESC">Date (Latest)</option>
          <option value="price_ASC">Price (Low → High)</option>
          <option value="price_DESC">Price (High → Low)</option>
          <option value="createdAt_DESC">Newest Listed</option>
        </select>
      </div>
    </div>
  )
}
