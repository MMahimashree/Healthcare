import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Users, Calendar, Activity, TrendingUp, Eye, Trash2, Edit } from 'lucide-react';
import { User, Appointment } from '../types';

export const AdminDashboard: React.FC = () => {
  const [users] = useState<User[]>([
    {
      id: '1',
      email: 'patient@demo.com',
      name: 'John Smith',
      role: 'patient',
      phone: '+1234567890',
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      email: 'doctor@demo.com',
      name: 'Dr. Sarah Johnson',
      role: 'doctor',
      phone: '+1234567891',
      specialization: 'General Medicine',
      experience: 8,
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '3',
      email: 'patient2@demo.com',
      name: 'Mary Wilson',
      role: 'patient',
      phone: '+1234567892',
      created_at: '2024-01-02T00:00:00Z'
    }
  ]);

  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      patient_id: '1',
      doctor_id: '2',
      patient_name: 'John Smith',
      doctor_name: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      time: '10:00',
      symptoms: ['headache', 'fever'],
      status: 'pending',
      created_at: '2024-01-10T00:00:00Z'
    }
  ]);

  const [selectedView, setSelectedView] = useState<'overview' | 'users' | 'appointments'>('overview');

  const totalUsers = users.length;
  const totalPatients = users.filter(u => u.role === 'patient').length;
  const totalDoctors = users.filter(u => u.role === 'doctor').length;
  const totalAppointments = appointments.length;
  const pendingAppointments = appointments.filter(a => a.status === 'pending').length;

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'patient': return 'bg-blue-100 text-blue-800';
      case 'doctor': return 'bg-green-100 text-green-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
    <Layout title="Admin Dashboard">
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-1">
          <div className="flex space-x-1">
            <button
              onClick={() => setSelectedView('overview')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                selectedView === 'overview'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedView('users')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                selectedView === 'users'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Users Management
            </button>
            <button
              onClick={() => setSelectedView('appointments')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                selectedView === 'appointments'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Appointments
            </button>
          </div>
        </div>

        {selectedView === 'overview' && (
          <>
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">System Overview</h2>
              <p className="text-purple-100">Monitor and manage the healthcare platform</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
                    <p className="text-sm text-gray-600">Total Users</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">{totalDoctors}</p>
                    <p className="text-sm text-gray-600">Active Doctors</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">{totalAppointments}</p>
                    <p className="text-sm text-gray-600">Total Appointments</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex items-center">
                  <Activity className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">{pendingAppointments}</p>
                    <p className="text-sm text-gray-600">Pending Requests</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Chart Placeholder */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                System Activity
              </h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Activity chart will be displayed here</p>
              </div>
            </div>
          </>
        )}

        {selectedView === 'users' && (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              User Management
            </h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {user.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.phone || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedView === 'appointments' && (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Appointments Management
            </h3>
            
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {appointment.patient_name} → {appointment.doctor_name}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};