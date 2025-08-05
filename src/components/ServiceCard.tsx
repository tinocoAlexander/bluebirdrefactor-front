import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  price?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, Icon, price }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 group">
      <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-lg mb-4 group-hover:bg-green-200 transition-colors">
        <Icon className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {price && (
        <div className="text-green-600 font-semibold text-lg">
          Starting at {price}
        </div>
      )}
    </div>
  );
};

export default ServiceCard;