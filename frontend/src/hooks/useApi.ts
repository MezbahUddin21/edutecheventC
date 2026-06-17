import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api'
import { Event, PaginatedResponse, EventFilters, Category } from '../types'

export function useEvents(filters: EventFilters) {
  return useQuery<PaginatedResponse<Event>>({
    queryKey: ['events', filters],
    queryFn: () =>
      api.get('/events', { params: filters }).then((r) => r.data),
  })
}

export function useEvent(id: string) {
  return useQuery<Event & { isRegistered: boolean }>({
    queryKey: ['event', id],
    queryFn: () => api.get(`/events/${id}`).then((r) => r.data),
    enabled: !!id,
  })
}

export function useFeaturedEvents() {
  return useQuery<Event[]>({
    queryKey: ['events', 'featured'],
    queryFn: () => api.get('/events/featured').then((r) => r.data),
  })
}

export function useUpcomingEvents(limit = 8) {
  return useQuery<Event[]>({
    queryKey: ['events', 'upcoming', limit],
    queryFn: () => api.get('/events/upcoming', { params: { limit } }).then((r) => r.data),
  })
}

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => api.get('/categories').then((r) => r.data),
  })
}

export function useMyRegistrations() {
  return useQuery({
    queryKey: ['my-events'],
    queryFn: () => api.get('/auth/my-events').then((r) => r.data),
  })
}

export function useRegisterEvent() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (eventId: string) => api.post(`/events/${eventId}/register`),
    onSuccess: (_, eventId) => {
      qc.invalidateQueries({ queryKey: ['event', eventId] })
      qc.invalidateQueries({ queryKey: ['my-events'] })
    },
  })
}

export function useUnregisterEvent() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (eventId: string) => api.delete(`/events/${eventId}/register`),
    onSuccess: (_, eventId) => {
      qc.invalidateQueries({ queryKey: ['event', eventId] })
      qc.invalidateQueries({ queryKey: ['my-events'] })
    },
  })
}

export function useCreateEvent() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => api.post('/events', data).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['events'] })
    },
  })
}

export function useEventStats() {
  return useQuery<{ total: number; upcoming: number }>({
    queryKey: ['event-stats'],
    queryFn: () => api.get('/events/stats').then((r) => r.data),
  })
}
