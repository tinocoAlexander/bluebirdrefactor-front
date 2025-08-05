export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  price?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  approved: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  approved: boolean;
  photoUrl?: string;
  createdAt: string;
}

export interface Quote {
  id: string;
  name: string;
  email: string;
  serviceType: string;
  gardenSize: number;
  comments: string;
  status: 'pending' | 'processed';
  createdAt: string;
}

export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  serviceType: string;
  preferredDate: string;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
}

export interface DashboardStats {
  totalAppointments: number;
  pendingQuotes: number;
  approvedTestimonials: number;
  galleryItems: number;
}

export interface HeroContent {
  headline: string;
  subtitle: string;
  buttonText: string;
}