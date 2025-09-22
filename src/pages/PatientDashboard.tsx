import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { ChatBot } from '../components/ChatBot';
import { DoctorRecommendations } from '../components/DoctorRecommendations';
import { AppointmentBooking } from '../components/AppointmentBooking';
import { Calendar, Clock, User, MessageCircle } from 'lucide-react';
import { DoctorRecommendation, Appointment } from '../types';
import { useAuth } from '../context/AuthContext';

export const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [recommendedDoctors, setRecommendedDoctors] = useState<DoctorRecommendation[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorRecommendation | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleDoctorRecommendation = (doctors: DoctorRecommendation[]) => {
    setRecommendedDoctors(doctors);
  };

  const handleBookAppointment = (doctor: DoctorRecommendation) => {
    setSelectedDoctor(doctor);
  };

  const handleAppointmentBook = (appointmentData: Omit<Appointment, 'id' | 'created_at'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    setAppointments([...appointments, newAppointment]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout title="Patient Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Welcome Card */}
        <div className="lg:col-span-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h2>
          <p className="text-blue-100">
            Start by describing your symptoms to our AI assistant, and we'll help you find the right care.
          </p>
        </div>

        {/* AI Chatbot */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
              AI Health Assistant
            </h3>
            <p className="text-sm text-gray-600">
              Describe your symptoms and get personalized doctor recommendations
            </p>
          </div>
          <ChatBot onDoctorRecommendation={handleDoctorRecommendation} />
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
                <p className="text-sm text-gray-600">Total Appointments</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {appointments.filter(a => a.status === 'pending').length}
                </p>
                <p className="text-sm text-gray-600">Pending Appointments</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex items-center">
              <User className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{recommendedDoctors.length}</p>
                <p className="text-sm text-gray-600">Recommended Doctors</p>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Recommendations */}
        {recommendedDoctors.length > 0 && (
          <div className="lg:col-span-3">
            <DoctorRecommendations
              doctors={recommendedDoctors}
              onBookAppointment={handleBookAppointment}
            />
          </div>
        )}

        {/* Recent Appointments */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Recent Appointments
            </h3>
            
            {appointments.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No appointments yet</p>
                <p className="text-sm text-gray-400">Book your first appointment using our AI assistant</p>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{appointment.doctor_name}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Symptoms: {appointment.symptoms.join(', ')}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Appointment Booking Modal */}
      {selectedDoctor && (
        <AppointmentBooking
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onBook={handleAppointmentBook}
        />
      )}
    </Layout>
  );
};