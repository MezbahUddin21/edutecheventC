import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useCategories, useCreateEvent } from '../hooks/useApi'
import { Input, Textarea, Select, Button } from '../components/ui'
import { useState } from 'react'

interface FormData {
  title: string
  description: string
  shortDescription: string
  coverImage: string
  categoryId: string
  eventType: 'in_person' | 'online' | 'hybrid'
  startDate: string
  endDate: string
  venue: string
  address: string
  city: string
  country: string
  onlineUrl: string
  price: number
  currency: string
  maxAttendees: number
  tags: string
}

export default function CreateEventPage() {
  const navigate = useNavigate()
  const { data: categories = [] } = useCategories()
  const createEvent = useCreateEvent()
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    defaultValues: { eventType: 'in_person', currency: 'USD', price: 0 },
  })

  const eventType = watch('eventType')

  const onSubmit = async (data: FormData) => {
    setError(null)
    try {
      const payload = {
        ...data,
        price: Number(data.price),
        maxAttendees: data.maxAttendees ? Number(data.maxAttendees) : undefined,
        tags: data.tags ? data.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      }
      const created = await createEvent.mutateAsync(payload)
      navigate(`/events/${created.id}`)
    } catch (e: any) {
      setError(e.response?.data?.message ?? 'Failed to create event')
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Create Event</h1>
        <p className="text-gray-400 mt-1">Publish your tech or educational event to reach learners worldwide.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">{error}</div>
        )}

        {/* Basic Info */}
        <div className="glass rounded-2xl p-6 space-y-5">
          <h2 className="font-semibold text-white text-lg">Basic Information</h2>

          <Input
            label="Event Title *"
            placeholder="e.g. Web Development Workshop 2025"
            error={errors.title?.message}
            {...register('title', { required: 'Title is required' })}
          />

          <Textarea
            label="Description *"
            placeholder="Describe your event in detail..."
            rows={5}
            error={errors.description?.message}
            {...register('description', { required: 'Description is required' })}
          />

          <Input
            label="Short Description"
            placeholder="One-line summary for cards and previews"
            {...register('shortDescription')}
          />

          <Input
            label="Cover Image URL"
            placeholder="https://..."
            type="url"
            {...register('coverImage')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Category *"
              options={[
                { value: '', label: 'Select category...' },
                ...categories.map((c) => ({ value: c.id, label: `${c.icon} ${c.name}` })),
              ]}
              error={errors.categoryId?.message}
              {...register('categoryId', { required: 'Category is required' })}
            />

            <Select
              label="Event Type *"
              options={[
                { value: 'in_person', label: '📍 In Person' },
                { value: 'online', label: '💻 Online' },
                { value: 'hybrid', label: '🔀 Hybrid' },
              ]}
              {...register('eventType')}
            />
          </div>

          <Input
            label="Tags (comma-separated)"
            placeholder="webinar, python, machine-learning, beginner-friendly"
            {...register('tags')}
          />
        </div>

        {/* Date & Time */}
        <div className="glass rounded-2xl p-6 space-y-5">
          <h2 className="font-semibold text-white text-lg">Date & Time</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Start Date & Time *"
              type="datetime-local"
              error={errors.startDate?.message}
              {...register('startDate', { required: 'Start date is required' })}
            />
            <Input
              label="End Date & Time *"
              type="datetime-local"
              error={errors.endDate?.message}
              {...register('endDate', { required: 'End date is required' })}
            />
          </div>
        </div>

        {/* Location */}
        <div className="glass rounded-2xl p-6 space-y-5">
          <h2 className="font-semibold text-white text-lg">Location</h2>

          {(eventType === 'in_person' || eventType === 'hybrid') && (
            <>
              <Input label="Venue Name" placeholder="e.g. Madison Square Garden" {...register('venue')} />
              <Input label="Address" placeholder="123 Main Street" {...register('address')} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="City" placeholder="New York" {...register('city')} />
                <Input label="Country" placeholder="United States" {...register('country')} />
              </div>
            </>
          )}

          {(eventType === 'online' || eventType === 'hybrid') && (
            <Input label="Online URL" placeholder="https://zoom.us/j/..." type="url" {...register('onlineUrl')} />
          )}
        </div>

        {/* Tickets */}
        <div className="glass rounded-2xl p-6 space-y-5">
          <h2 className="font-semibold text-white text-lg">Tickets & Capacity</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Price"
              type="number"
              min={0}
              step="0.01"
              placeholder="0"
              {...register('price')}
            />
            <Select
              label="Currency"
              options={[
                { value: 'USD', label: 'USD' },
                { value: 'EUR', label: 'EUR' },
                { value: 'GBP', label: 'GBP' },
                { value: 'BDT', label: 'BDT' },
              ]}
              {...register('currency')}
            />
            <Input
              label="Max Attendees"
              type="number"
              min={1}
              placeholder="Unlimited"
              {...register('maxAttendees')}
            />
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" loading={createEvent.isPending}>
            Publish Event
          </Button>
        </div>
      </form>
    </div>
  )
}
