export interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'doctor' | 'admin';
  phone?: string;
  specialization?: string; // for doctors
  experience?: number; // for doctors
  avatar?: string;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface Symptom {
  id: string;
  name: string;
  category: string;
  severity: 'mild' | 'moderate' | 'severe';
}

export interface DoctorRecommendation {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  availability: string[];
  avatar?: string;
  matchScore: number;
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  patient_name: string;
  doctor_name: string;
  date: string;
  time: string;
  symptoms: string[];
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  created_at: string;
}

export interface ChatIntent {
  tag: string;
  patterns: string[];
  responses: string[];
  context_set?: string;
  follow_up?: string[];
}