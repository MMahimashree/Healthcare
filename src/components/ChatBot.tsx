import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader } from 'lucide-react';
import { ChatMessage } from '../types';
import { intents } from '../data/intents';
import { doctors } from '../data/doctors';

interface ChatBotProps {
  onDoctorRecommendation: (recommendedDoctors: any[]) => void;
}

export const ChatBot: React.FC<ChatBotProps> = ({ onDoctorRecommendation }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: "Hello! I'm your AI health assistant. I'm here to help assess your symptoms and recommend the right doctor for you. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const findBestResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const intent of intents) {
      for (const pattern of intent.patterns) {
        if (lowerMessage.includes(pattern.toLowerCase())) {
          return intent;
        }
      }
    }
    
    return {
      tag: 'default',
      patterns: [],
      responses: [
        "I understand you're experiencing some discomfort. Can you tell me more about your symptoms?",
        "I'm here to help. Could you describe what you're feeling in more detail?",
        "To better assist you, could you provide more specific information about your symptoms?"
      ]
    };
  };

  const getDoctorRecommendations = (detectedSymptoms: string[]) => {
    const specialtyMap: Record<string, string> = {
      'headache': 'Neurology',
      'chest_pain': 'Cardiology',
      'back_pain': 'Orthopedics',
      'stomach_pain': 'Gastroenterology',
      'fever': 'General Medicine',
      'cough': 'General Medicine',
      'sore_throat': 'General Medicine',
      'nausea': 'Gastroenterology',
      'dizziness': 'Neurology'
    };

    const recommendedDoctors = doctors.filter(doctor => {
      return detectedSymptoms.some(symptom => {
        const specialty = specialtyMap[symptom];
        return !specialty || doctor.specialization === specialty || doctor.specialization === 'General Medicine';
      });
    }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);

    return recommendedDoctors.length > 0 ? recommendedDoctors : doctors.slice(0, 3);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const intent = findBestResponse(inputMessage);
      const randomResponse = intent.responses[Math.floor(Math.random() * intent.responses.length)];

      // Track symptoms
      const newSymptoms = [...symptoms];
      if (intent.tag !== 'greeting' && intent.tag !== 'default') {
        if (!newSymptoms.includes(intent.tag)) {
          newSymptoms.push(intent.tag);
          setSymptoms(newSymptoms);
        }
      }

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);

      // Show follow-up questions if available
      if (intent.follow_up) {
        setTimeout(() => {
          const followUpMessage: ChatMessage = {
            id: (Date.now() + 2).toString(),
            message: intent.follow_up!.join(' '),
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, followUpMessage]);
        }, 1000);
      }

      // Recommend doctors after multiple symptoms
      if (newSymptoms.length >= 1) {
        setTimeout(() => {
          const recommendedDoctors = getDoctorRecommendations(newSymptoms);
          
          const recommendationMessage: ChatMessage = {
            id: (Date.now() + 3).toString(),
            message: `Based on your symptoms, I recommend consulting with the following doctors. You can book an appointment with any of them:`,
            sender: 'bot',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, recommendationMessage]);
          onDoctorRecommendation(recommendedDoctors);
        }, 2000);
      }

      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 h-96 flex flex-col">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg">
        <div className="flex items-center">
          <Bot className="h-6 w-6 mr-3" />
          <div>
            <h3 className="font-semibold">AI Health Assistant</h3>
            <p className="text-sm text-blue-100">Online • Ready to help</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.sender === 'user'
                ? 'bg-blue-600 text-white ml-auto'
                : 'bg-gray-100 text-gray-800'
            }`}>
              <div className="flex items-start">
                {message.sender === 'bot' && (
                  <Bot className="h-4 w-4 mr-2 mt-1 text-blue-600" />
                )}
                {message.sender === 'user' && (
                  <User className="h-4 w-4 mr-2 mt-1 text-white" />
                )}
                <p className="text-sm">{message.message}</p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg max-w-xs">
              <div className="flex items-center">
                <Bot className="h-4 w-4 mr-2 text-blue-600" />
                <Loader className="h-4 w-4 animate-spin" />
                <span className="ml-2 text-sm">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe your symptoms..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};