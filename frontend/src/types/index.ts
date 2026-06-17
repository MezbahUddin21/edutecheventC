export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'organizer' | 'admin';
  avatar?: string;
  bio?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  coverImage?: string;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  eventType: 'in_person' | 'online' | 'hybrid';
  startDate: string;
  endDate: string;
  venue?: string;
  address?: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  onlineUrl?: string;
  price: number;
  currency: string;
  maxAttendees?: number;
  currentAttendees: number;
  isFeatured: boolean;
  tags?: string;
  organizer: { id: string; name: string; avatar?: string };
  category: Category;
  createdAt: string;
  isRegistered?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface EventRegistration {
  id: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'waitlisted';
  registeredAt: string;
  event: Event;
}

export interface EventFilters {
  search?: string;
  categoryId?: string;
  eventType?: string;
  city?: string;
  startFrom?: string;
  startTo?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  featured?: string;
}
