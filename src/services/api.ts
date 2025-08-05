import axios from 'axios';
import { Quote, Appointment, Testimonial, GalleryItem, DashboardStats, AdminUser } from '../types';

const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

// Mock data
const mockQuotes: Quote[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    serviceType: 'garden-design',
    gardenSize: 50,
    comments: 'Looking for a complete garden makeover',
    status: 'pending',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    serviceType: 'lawn-maintenance',
    gardenSize: 200,
    comments: 'Need weekly lawn maintenance service',
    status: 'processed',
    createdAt: '2024-01-14T14:20:00Z'
  }
];

const mockAppointments: Appointment[] = [
  {
    id: '1',
    name: 'Mike Davis',
    email: 'mike@example.com',
    phone: '+1234567890',
    address: '123 Garden St, Green City',
    serviceType: 'irrigation-systems',
    preferredDate: '2024-01-20',
    status: 'pending',
    createdAt: '2024-01-15T09:15:00Z'
  },
  {
    id: '2',
    name: 'Lisa Brown',
    email: 'lisa@example.com',
    phone: '+1234567891',
    address: '456 Plant Ave, Flower Town',
    serviceType: 'decorative-plants',
    preferredDate: '2024-01-22',
    status: 'confirmed',
    createdAt: '2024-01-14T16:45:00Z'
  }
];

const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Jennifer Wilson',
    text: 'GreenTouch transformed our backyard into a beautiful oasis. Professional and reliable service!',
    rating: 5,
    approved: true,
    createdAt: '2024-01-10T12:00:00Z'
  },
  {
    id: '2',
    name: 'Robert Martinez',
    text: 'Excellent garden design and maintenance. Highly recommend their services!',
    rating: 5,
    approved: true,
    createdAt: '2024-01-08T15:30:00Z'
  },
  {
    id: '3',
    name: 'Emma Thompson',
    text: 'Professional team with great attention to detail. Our lawn has never looked better.',
    rating: 4,
    approved: false,
    createdAt: '2024-01-12T11:20:00Z'
  }
];

const mockGallery: GalleryItem[] = [
  {
    id: '1',
    title: 'Modern Garden Design',
    description: 'Complete backyard transformation with contemporary landscaping',
    imageUrl: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'garden-design',
    approved: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Decorative Plant Installation',
    description: 'Beautiful flower beds and ornamental plants arrangement',
    imageUrl: 'https://images.pexels.com/photos/1025994/pexels-photo-1025994.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'decorative-plants',
    approved: true,
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    title: 'Irrigation System Setup',
    description: 'Smart irrigation system for efficient garden watering',
    imageUrl: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'irrigation-systems',
    approved: true,
    createdAt: '2024-01-03T00:00:00Z'
  },
  {
    id: '4',
    title: 'Lawn Maintenance',
    description: 'Professional lawn care and maintenance services',
    imageUrl: 'https://images.pexels.com/photos/589840/pexels-photo-589840.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'lawn-maintenance',
    approved: true,
    createdAt: '2024-01-04T00:00:00Z'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API functions
export const apiService = {
  // Quotes
  async getQuotes(): Promise<Quote[]> {
    await delay(500);
    return mockQuotes;
  },

  async createQuote(quote: Omit<Quote, 'id' | 'status' | 'createdAt'>): Promise<Quote> {
    await delay(800);
    const newQuote: Quote = {
      ...quote,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    mockQuotes.push(newQuote);
    return newQuote;
  },

  async updateQuoteStatus(id: string, status: Quote['status']): Promise<Quote> {
    await delay(300);
    const quote = mockQuotes.find(q => q.id === id);
    if (!quote) throw new Error('Quote not found');
    quote.status = status;
    return quote;
  },

  // Appointments
  async getAppointments(): Promise<Appointment[]> {
    await delay(500);
    return mockAppointments;
  },

  async createAppointment(appointment: Omit<Appointment, 'id' | 'status' | 'createdAt'>): Promise<Appointment> {
    await delay(800);
    const newAppointment: Appointment = {
      ...appointment,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    mockAppointments.push(newAppointment);
    return newAppointment;
  },

  async updateAppointmentStatus(id: string, status: Appointment['status']): Promise<Appointment> {
    await delay(300);
    const appointment = mockAppointments.find(a => a.id === id);
    if (!appointment) throw new Error('Appointment not found');
    appointment.status = status;
    return appointment;
  },

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    await delay(500);
    return mockTestimonials;
  },

  async getApprovedTestimonials(): Promise<Testimonial[]> {
    await delay(500);
    return mockTestimonials.filter(t => t.approved);
  },

  async createTestimonial(testimonial: Omit<Testimonial, 'id' | 'approved' | 'createdAt'>): Promise<Testimonial> {
    await delay(800);
    const newTestimonial: Testimonial = {
      ...testimonial,
      id: Math.random().toString(36).substr(2, 9),
      approved: false,
      createdAt: new Date().toISOString()
    };
    mockTestimonials.push(newTestimonial);
    return newTestimonial;
  },

  async updateTestimonialApproval(id: string, approved: boolean): Promise<Testimonial> {
    await delay(300);
    const testimonial = mockTestimonials.find(t => t.id === id);
    if (!testimonial) throw new Error('Testimonial not found');
    testimonial.approved = approved;
    return testimonial;
  },

  // Gallery
  async getGalleryItems(): Promise<GalleryItem[]> {
    await delay(500);
    return mockGallery;
  },

  async getApprovedGalleryItems(): Promise<GalleryItem[]> {
    await delay(500);
    return mockGallery.filter(g => g.approved);
  },

  async createGalleryItem(item: Omit<GalleryItem, 'id' | 'approved' | 'createdAt'>): Promise<GalleryItem> {
    await delay(800);
    const newItem: GalleryItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      approved: true,
      createdAt: new Date().toISOString()
    };
    mockGallery.push(newItem);
    return newItem;
  },

  async deleteGalleryItem(id: string): Promise<void> {
    await delay(300);
    const index = mockGallery.findIndex(g => g.id === id);
    if (index === -1) throw new Error('Gallery item not found');
    mockGallery.splice(index, 1);
  },

  // Dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    await delay(300);
    return {
      totalAppointments: mockAppointments.length,
      pendingQuotes: mockQuotes.filter(q => q.status === 'pending').length,
      approvedTestimonials: mockTestimonials.filter(t => t.approved).length,
      galleryItems: mockGallery.length
    };
  },

  // Auth
  async login(email: string, password: string): Promise<{ user: AdminUser; token: string }> {
    await delay(1000);
    if (email === 'admin@greentouch.com' && password === 'admin123') {
      return {
        user: { id: '1', email, name: 'Admin User' },
        token: 'mock_jwt_token_' + Math.random().toString(36).substr(2)
      };
    }
    throw new Error('Invalid credentials');
  }
};