import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Calendar, Clock, User, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Appointment } from '../types';
import { useAuth } from '../context/AuthContext';

export const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patient_id: '1',
      doctor_id: user?.id || '2',
      patient_name: 'John Smith',
      doctor_name: user?.name || 'Dr. Sarah Johnson',
      date: '2024-01-15',
      time: '10:00',
      symptoms: ['headache', 'fever'],
      status: 'pending',
      notes: 'Patient experiencing headache and fever for 2 days',
      created_at: '2024-01-10T00:00:00Z'
    },
    {
      id: '2',
      patient_id: '3',
      doctor_id: user?.id || '2',
      patient_name: 'Mary Johnson',
      doctor_name: user?.name || 'Dr. Sarah Johnson',
      date: '2024-01-15',
      time: '14:30',
      symptoms: ['back_pain'],
      status: 'confirmed',
      notes: 'Lower back pain after gym workout',
      created_at: '2024-01-11T00:00:00Z'
    }
  ]);

  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const handleStatusChange = (appointmentId: string, newStatus: 'confirmed' | 'cancelled') => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    ));
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

  const todayAppointments = appointments.filter(apt => {
    const today = new Date().toISOString().split('T')[0];
    return apt.date === today || apt.date === '2024-01-15'; // Demo data
  });

  const pendingAppointments = appointments.filter(apt => apt.status === 'pending');
  const confirmedAppointments = appointments.filter(apt => apt.status === 'confirmed');

  return (
    <Layout title="Doctor Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Welcome Card */}
        <div className="lg:col-span-4 bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Welcome, {user?.name}!</h2>
          <p className="text-green-100">
            {user?.specialization} • {todayAppointments.length} appointments today
          </p>
        </div>

        {/* Quick Stats */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{todayAppointments.length}</p>
              <p className="text-sm text-gray-600">Today's Appointments</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{pendingAppointments.length}</p>
              <p className="text-sm text-gray-600">Pending Requests</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{confirmedAppointments.length}</p>
              <p className="text-sm text-gray-600">Confirmed</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <User className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
              <p className="text-sm text-gray-600">Total Patients</p>
            </div>
          </div>
        </div>

        {/* Appointment Requests */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Appointment Requests
            </h3>
            
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{appointment.patient_name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Date:</span>
                          <p>{new Date(appointment.date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="font-medium">Time:</span>
                          <p>{appointment.time}</p>
                        </div>
                        <div>
                          <span className="font-medium">Symptoms:</span>
                          <p>{appointment.symptoms.join(', ')}</p>
                        </div>
                        <div>
                          <span className="font-medium">Created:</span>
                          <p>{new Date(appointment.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {appointment.notes && (
                        <div className="bg-gray-50 p-3 rounded-md mb-3">
                          <span className="font-medium text-sm">Notes:</span>
                          <p className="text-sm text-gray-700 mt-1">{appointment.notes}</p>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedAppointment(appointment)}
                          className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </button>
                        
                        {appointment.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                              className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-sm"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Accept
                            </button>
                            <button
                              onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                              className="flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Decline
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Appointment Details</h3>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">{selectedAppointment.patient_name}</h4>
                <p className="text-sm text-gray-600">Patient ID: {selectedAppointment.patient_id}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Date:</span>
                  <p className="text-gray-900">{new Date(selectedAppointment.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Time:</span>
                  <p className="text-gray-900">{selectedAppointment.time}</p>
                </div>
              </div>

              <div>
                <span className="font-medium text-gray-700">Symptoms:</span>
                <div className="mt-1">
                  {selectedAppointment.symptoms.map((symptom, index) => (
                    <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2 mb-1">
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>

              {selectedAppointment.notes && (
                <div>
                  <span className="font-medium text-gray-700">Notes:</span>
                  <p className="text-gray-900 mt-1 bg-gray-50 p-3 rounded-md">{selectedAppointment.notes}</p>
                </div>
              )}

              <div>
                <span className="font-medium text-gray-700">Status:</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAppointment.status)}`}>
                  {selectedAppointment.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};