import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { Quote } from '../../types';
import { FileText, Mail, CheckCircle } from 'lucide-react';

const AdminQuotes: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const data = await apiService.getQuotes();
        setQuotes(data);
      } catch (error) {
        console.error('Failed to fetch quotes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  const handleStatusUpdate = async (id: string, status: Quote['status']) => {
    try {
      await apiService.updateQuoteStatus(id, status);
      setQuotes(quotes.map(quote => 
        quote.id === id ? { ...quote, status } : quote
      ));
    } catch (error) {
      console.error('Failed to update quote status:', error);
    }
  };

  const getServiceTypeLabel = (serviceType: string) => {
    return serviceType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Quote Requests</h1>
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
        <h1 className="text-3xl font-bold text-gray-800">Quote Requests</h1>
        <p className="text-gray-600 mt-2">Manage customer quote requests</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-yellow-600">
                {quotes.filter(q => q.status === 'pending').length}
              </p>
              <p className="text-gray-600">Pending Quotes</p>
            </div>
            <FileText className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600">
                {quotes.filter(q => q.status === 'processed').length}
              </p>
              <p className="text-gray-600">Processed</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Quotes List */}
      <div className="space-y-4">
        {quotes.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No quote requests found</p>
          </div>
        ) : (
          quotes.map((quote) => (
            <div key={quote.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {quote.name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      quote.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {quote.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{quote.email}</span>
                    </div>
                    <div className="text-gray-600">
                      <strong>Service:</strong> {getServiceTypeLabel(quote.serviceType)}
                    </div>
                    <div className="text-gray-600">
                      <strong>Garden Size:</strong> {quote.gardenSize} m²
                    </div>
                  </div>
                  
                  {quote.comments && (
                    <div className="mb-4">
                      <p className="text-gray-700">
                        <strong>Comments:</strong> {quote.comments}
                      </p>
                    </div>
                  )}
                  
                  <p className="text-sm text-gray-500">
                    Requested: {new Date(quote.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Action Buttons */}
                {quote.status === 'pending' && (
                  <div className="flex flex-col space-y-2 lg:ml-6 mt-4 lg:mt-0">
                    <button
                      onClick={() => handleStatusUpdate(quote.id, 'processed')}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Mark Processed</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminQuotes;