import { DoctorRecommendation } from '../types';

export const doctors: DoctorRecommendation[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'General Medicine',
    experience: 8,
    rating: 4.8,
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    avatar: 'https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg?auto=compress&cs=tinysrgb&w=400',
    matchScore: 95
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Cardiology',
    experience: 12,
    rating: 4.9,
    availability: ['Tuesday', 'Thursday', 'Friday'],
    avatar: 'https://images.pexels.com/photos/6749773/pexels-photo-6749773.jpeg?auto=compress&cs=tinysrgb&w=400',
    matchScore: 88
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Neurology',
    experience: 10,
    rating: 4.7,
    availability: ['Monday', 'Wednesday', 'Thursday'],
    avatar: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=400',
    matchScore: 92
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialization: 'Orthopedics',
    experience: 15,
    rating: 4.8,
    availability: ['Monday', 'Tuesday', 'Friday'],
    avatar: 'https://images.pexels.com/photos/6749777/pexels-photo-6749777.jpeg?auto=compress&cs=tinysrgb&w=400',
    matchScore: 85
  },
  {
    id: '5',
    name: 'Dr. Lisa Thompson',
    specialization: 'Gastroenterology',
    experience: 9,
    rating: 4.6,
    availability: ['Wednesday', 'Thursday', 'Friday'],
    avatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
    matchScore: 89
  }
];