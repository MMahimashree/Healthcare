import { ChatIntent } from '../types';

export const intents: ChatIntent[] = [
  {
    tag: "greeting",
    patterns: ["Hi", "Hello", "Hey", "Good morning", "Good evening", "Hi there"],
    responses: [
      "Hello! I'm your healthcare assistant. How are you feeling today?",
      "Hi there! I'm here to help with your health concerns. What symptoms are you experiencing?",
      "Hello! Welcome to your personal health assistant. How can I help you today?"
    ]
  },
  {
    tag: "headache",
    patterns: ["I have a headache", "My head hurts", "Headache", "Head pain", "Migraine"],
    responses: [
      "I understand you're experiencing head pain. Can you describe the type of pain? Is it throbbing, sharp, or dull?",
      "Headaches can have various causes. How long have you been experiencing this? Is it accompanied by any other symptoms?"
    ],
    follow_up: ["How long have you had this headache?", "Is the pain throbbing or constant?", "Any nausea or sensitivity to light?"]
  },
  {
    tag: "fever",
    patterns: ["I have fever", "I'm feeling hot", "High temperature", "Fever", "I'm burning up"],
    responses: [
      "Fever can indicate your body is fighting an infection. Have you taken your temperature? Any other symptoms like chills or body aches?",
      "I'm concerned about your fever. Are you experiencing any other symptoms like cough, sore throat, or body pain?"
    ],
    follow_up: ["What's your temperature?", "Any chills or sweating?", "How long have you had the fever?"]
  },
  {
    tag: "cough",
    patterns: ["I have a cough", "Coughing", "Dry cough", "Wet cough", "Persistent cough"],
    responses: [
      "Coughs can be concerning. Is it a dry cough or are you bringing up mucus? How long have you been coughing?",
      "I see you have a cough. Is it worse at night or during the day? Any chest pain or difficulty breathing?"
    ],
    follow_up: ["Is it a dry or productive cough?", "Any chest pain?", "Difficulty breathing?"]
  },
  {
    tag: "stomach_pain",
    patterns: ["Stomach pain", "Abdominal pain", "Belly ache", "My stomach hurts", "Stomach ache"],
    responses: [
      "Abdominal pain can have many causes. Where exactly is the pain located? Is it sharp, cramping, or burning?",
      "I understand you're having stomach discomfort. Is the pain constant or does it come and go? Any nausea or vomiting?"
    ],
    follow_up: ["Where is the pain located?", "Is it sharp or cramping?", "Any nausea or vomiting?"]
  },
  {
    tag: "chest_pain",
    patterns: ["Chest pain", "My chest hurts", "Heart pain", "Chest discomfort", "Pain in chest"],
    responses: [
      "Chest pain is serious and should be evaluated immediately. Is the pain sharp, crushing, or burning? Any difficulty breathing?",
      "Chest pain requires immediate attention. Are you experiencing shortness of breath, sweating, or pain radiating to your arm?"
    ],
    follow_up: ["Is the pain sharp or crushing?", "Any shortness of breath?", "Pain in arm or jaw?"]
  },
  {
    tag: "back_pain",
    patterns: ["Back pain", "My back hurts", "Lower back pain", "Upper back pain", "Spine pain"],
    responses: [
      "Back pain is very common. Is it in your upper or lower back? Did you injure it recently or lift something heavy?",
      "I understand you're experiencing back pain. Is it sharp or aching? Does it radiate down your leg?"
    ],
    follow_up: ["Upper or lower back?", "Recent injury?", "Pain radiating to legs?"]
  },
  {
    tag: "sore_throat",
    patterns: ["Sore throat", "My throat hurts", "Throat pain", "Difficulty swallowing"],
    responses: [
      "Sore throats can be quite uncomfortable. Is it painful to swallow? Any fever or swollen glands?",
      "I see you have throat discomfort. Is it scratchy, burning, or sharp pain? Any white patches?"
    ],
    follow_up: ["Painful to swallow?", "Any fever?", "Swollen glands?"]
  },
  {
    tag: "nausea",
    patterns: ["I feel nauseous", "Nausea", "Feel sick", "Want to vomit", "Stomach upset"],
    responses: [
      "Nausea can be very uncomfortable. Have you vomited? Any abdominal pain or fever?",
      "I understand you're feeling nauseous. Is it constant or comes in waves? Any recent changes in diet?"
    ],
    follow_up: ["Have you vomited?", "Any abdominal pain?", "Recent dietary changes?"]
  },
  {
    tag: "dizziness",
    patterns: ["I feel dizzy", "Dizziness", "Lightheaded", "Room spinning", "Balance problems"],
    responses: [
      "Dizziness can have various causes. Do you feel like the room is spinning or more like lightheadedness?",
      "I'm concerned about your dizziness. Any hearing changes, headache, or recent medication changes?"
    ],
    follow_up: ["Room spinning or lightheaded?", "Any hearing changes?", "Recent medications?"]
  }
];