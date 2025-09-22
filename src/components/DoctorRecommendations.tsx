import React from 'react';
import { Star, Calendar, User } from 'lucide-react';
import { DoctorRecommendation } from '../types';

interface DoctorRecommendationsProps {
  doctors: DoctorRecommendation[];
  onBookAppointment: (doctor: DoctorRecommendation) => void;
}

export const DoctorRecommendations: React.FC<DoctorRecommendationsProps> = ({
  doctors,
  onBookAppointment
}) => {
  if (doctors.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <User className="h-5 w-5 mr-2 text-blue-600" />
        Recommended Doctors
      </h3>
      
      <div className="space-y-4">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <img
                  src={doctor.avatar || `https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg?auto=compress&cs=tinysrgb&w=100`}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
                  <p className="text-sm text-blue-600">{doctor.specialization}</p>
                  <p className="text-sm text-gray-600">{doctor.experience} years experience</p>
                  
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(doctor.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">{doctor.rating}</span>
                    <span className={`ml-4 px-2 py-1 rounded-full text-xs font-medium ${
                      doctor.matchScore >= 90 
                        ? 'bg-green-100 text-green-800'
                        : doctor.matchScore >= 80
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {doctor.matchScore}% match
                    </span>
                  </div>

                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      Available: {doctor.availability.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => onBookAppointment(doctor)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};