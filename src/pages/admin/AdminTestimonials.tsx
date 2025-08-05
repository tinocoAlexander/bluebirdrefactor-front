import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { Testimonial } from '../../types';
import { MessageSquare, Star, Check, X } from 'lucide-react';

const AdminTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await apiService.getTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleApprovalUpdate = async (id: string, approved: boolean) => {
    try {
      await apiService.updateTestimonialApproval(id, approved);
      setTestimonials(testimonials.map(testimonial => 
        testimonial.id === id ? { ...testimonial, approved } : testimonial
      ));
    } catch (error) {
      console.error('Failed to update testimonial approval:', error);
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Testimonials</h1>
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-32"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Testimonials</h1>
        <p className="text-gray-600 mt-2">Manage customer testimonials and reviews</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{testimonials.length}</p>
              <p className="text-gray-600">Total Testimonials</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600">
                {testimonials.filter(t => t.approved).length}
              </p>
              <p className="text-gray-600">Approved</p>
            </div>
            <Check className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-yellow-600">
                {testimonials.filter(t => !t.approved).length}
              </p>
              <p className="text-gray-600">Pending Review</p>
            </div>
            <X className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Testimonials List */}
      <div className="space-y-4">
        {testimonials.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No testimonials found</p>
          </div>
        ) : (
          testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {testimonial.name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      testimonial.approved 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {testimonial.approved ? 'Approved' : 'Pending Review'}
                    </span>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    {renderStars(testimonial.rating)}
                    <span className="ml-2 text-gray-600">({testimonial.rating}/5)</span>
                  </div>
                  
                  <blockquote className="text-gray-700 italic mb-4">
                    "{testimonial.text}"
                  </blockquote>
                  
                  <p className="text-sm text-gray-500">
                    Submitted: {new Date(testimonial.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2 lg:ml-6 mt-4 lg:mt-0">
                  {!testimonial.approved ? (
                    <button
                      onClick={() => handleApprovalUpdate(testimonial.id, true)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApprovalUpdate(testimonial.id, false)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Unapprove</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminTestimonials;