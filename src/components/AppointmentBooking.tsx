import React, { useState } from 'react';
import { X, Calendar, Clock, User } from 'lucide-react';
import { DoctorRecommendation, Appointment } from '../types';
import { useAuth } from '../context/AuthContext';

interface AppointmentBookingProps {
  doctor: DoctorRecommendation;
  onClose: () => void;
  onBook: (appointment: Omit<Appointment, 'id' | 'created_at'>) => void;
}

export const AppointmentBooking: React.FC<AppointmentBookingProps> = ({
  doctor,
  onClose,
  onBook
}) => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [notes, setNotes] = useState('');

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const getNextWeekDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      if (doctor.availability.includes(dayName)) {
        dates.push({
          date: date.toISOString().split('T')[0],
          display: date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          })
        });
      }
    }
    return dates;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const appointment: Omit<Appointment, 'id' | 'created_at'> = {
      patient_id: user!.id,
      doctor_id: doctor.id,
      patient_name: user!.name,
      doctor_name: doctor.name,
      date: selectedDate,
      time: selectedTime,
      symptoms: symptoms.split(',').map(s => s.trim()),
      status: 'pending',
      notes
    };

    onBook(appointment);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Book Appointment</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Doctor Info */}
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <img
              src={doctor.avatar || `https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg?auto=compress&cs=tinysrgb&w=100`}
              alt={doctor.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
              <p className="text-sm text-blue-600">{doctor.specialization}</p>
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4 inline mr-2" />
              Select Date
            </label>
            <div className="grid grid-cols-2 gap-2">
              {getNextWeekDates().map(({ date, display }) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`p-3 text-sm border rounded-md transition-colors ${
                    selectedDate === date
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                  }`}
                >
                  {display}
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="h-4 w-4 inline mr-2" />
                Select Time
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 text-sm border rounded-md transition-colors ${
                      selectedTime === time
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Symptoms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Symptoms (comma separated)
            </label>
            <input
              type="text"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="headache, fever, cough"
              required
            />
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Any additional information..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!selectedDate || !selectedTime}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};