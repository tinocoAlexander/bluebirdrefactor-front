import React from 'react';
import { 
  Leaf, 
  Droplets, 
  Scissors, 
  TreePine,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import GalleryGrid from '../components/GalleryGrid';
import QuoteForm from '../components/QuoteForm';
import TestimonialCarousel from '../components/TestimonialCarousel';
import AppointmentForm from '../components/AppointmentForm';

const HomePage: React.FC = () => {
  const services = [
    {
      title: 'Garden Design',
      description: 'Custom garden designs tailored to your space and preferences. From concept to completion.',
      Icon: Leaf,
      price: '$299'
    },
    {
      title: 'Lawn Maintenance',
      description: 'Regular lawn care including mowing, edging, fertilizing, and seasonal treatments.',
      Icon: Scissors,
      price: '$89/month'
    },
    {
      title: 'Irrigation Systems',
      description: 'Smart irrigation solutions for efficient watering and water conservation.',
      Icon: Droplets,
      price: '$599'
    },
    {
      title: 'Decorative Plants',
      description: 'Beautiful plant installations and arrangements to enhance your outdoor space.',
      Icon: TreePine,
      price: '$149'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Bring Your Garden to Life
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Professional Landscaping & Garden Maintenance Services
          </p>
          <button
            onClick={() => scrollToSection('appointment')}
            className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center space-x-2"
          >
            <span>Book a Visit</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* About Our Services */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From garden design to ongoing maintenance, we offer comprehensive landscaping services 
              to transform and maintain your outdoor spaces.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-6">
                  Why Choose GreenTouch?
                </h3>
                <div className="space-y-4">
                  {[
                    'Over 10 years of professional experience',
                    'Licensed and fully insured',
                    'Eco-friendly practices and materials',
                    '100% satisfaction guarantee',
                    'Free consultations and estimates'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <img
                  src="https://images.pexels.com/photos/1025994/pexels-photo-1025994.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Professional gardening tools"
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our Work Gallery
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take a look at some of our recent projects and see how we've transformed 
              outdoor spaces for our satisfied clients.
            </p>
          </div>
          
          <GalleryGrid />
        </div>
      </section>

      {/* Quick Quote Form */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Get Your Free Quote
              </h2>
              <p className="text-xl text-gray-600">
                Tell us about your project and we'll provide you with a detailed, no-obligation quote.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about our services.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      {/* Schedule Appointment Form */}
      <section id="appointment" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Schedule Your Appointment
              </h2>
              <p className="text-xl text-gray-600">
                Ready to get started? Book your consultation today and let's discuss your garden dreams.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <AppointmentForm />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get In Touch
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Have questions? We're here to help you create the garden of your dreams.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📞</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <p className="text-green-100">+1 (555) 123-4567</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✉️</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <p className="text-green-100">contact@greentouch.com</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📍</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                <p className="text-green-100">123 Garden Street<br />Green City, GC 12345</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;