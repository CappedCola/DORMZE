import { Profile } from '@/types/profile';

export const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Sarah',
    age: 21,
    occupation: 'Student',
    bio: 'CS major with a passion for sustainable living and creating a harmonious home environment.',
    detailedBio: {
      aboutMe: "I'm a junior at Stanford studying Computer Science with a focus on AI. Outside of coding, I'm an avid rock climber and love to experiment with plant-based cooking. I practice mindfulness and enjoy creating a calm, organized living space.",
      lookingFor: "Looking for a roommate who values cleanliness and respects quiet hours during weekdays. I'm hoping to find someone who shares my interest in sustainability and wouldn't mind joining me for occasional hiking trips or cooking sessions.",
      roommatePreferences: "I prefer someone who's environmentally conscious, maintains a regular schedule, and is open to sharing occasional meals. I'm an early riser and would work best with someone who has a similar rhythm.",
    },
    university: 'Stanford University',
    major: 'Computer Science',
    year: 'Junior',
    interests: ['Cooking', 'Hiking', 'Reading', 'Rock Climbing', 'Sustainability', 'Yoga'],
    lifestyle: {
      cleanliness: 5,
      sleepSchedule: 'early_bird',
      smoking: false,
      pets: false,
      visitors: 'sometimes',
      drinking: 'sometimes',
      cooking: 'often',
      personality: 'ambivert',
    },
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        caption: 'Ready for another day of coding! ☕️',
      },
      {
        url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
        caption: 'Weekend hiking at Mount Tam',
      },
      {
        url: 'https://images.unsplash.com/photo-1506863530036-1efeddceb993',
        caption: 'My happy place - local climbing gym',
      },
      {
        url: 'https://images.unsplash.com/photo-1556911073-a517e752729c',
        caption: 'Love cooking healthy meals!',
      },
    ],
    budget: {
      min: 1200,
      max: 2000,
      preferredRange: '$1,500 - $1,800',
    },
    moveInDate: '2024-06-01',
    location: {
      preferred: 'Palo Alto, CA',
      maxDistance: 5,
    },
  },
  {
    id: '2',
    name: 'Michael',
    age: 22,
    occupation: 'Student',
    bio: 'Tech enthusiast and night owl seeking a roommate who appreciates both gaming sessions and intellectual discussions.',
    detailedBio: {
      aboutMe: "Senior at MIT studying Electrical Engineering with a focus on robotics. I'm passionate about technology, gaming, and music production. I run a small YouTube channel about tech reviews and occasionally DJ at campus events.",
      lookingFor: "Seeking a roommate who's comfortable with a flexible schedule and shares an interest in technology. Would be great to find someone who enjoys gaming sessions but also values focused study time.",
      roommatePreferences: "Looking for someone who's okay with occasional late nights (I often work on projects late) and doesn't mind a tech-filled living space. I'm very organized with shared spaces but have a creative chaos approach to my own room.",
    },
    university: 'MIT',
    major: 'Electrical Engineering',
    year: 'Senior',
    interests: ['Gaming', 'Technology', 'Music Production', 'Robotics', 'DJing', 'AI'],
    lifestyle: {
      cleanliness: 4,
      sleepSchedule: 'night_owl',
      smoking: false,
      pets: true,
      visitors: 'sometimes',
      drinking: 'sometimes',
      cooking: 'sometimes',
      personality: 'introvert',
    },
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
        caption: 'Just another day at the robotics lab',
      },
      {
        url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
        caption: 'DJing at last month\'s hackathon',
      },
      {
        url: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f',
        caption: 'My gaming setup (yes, I\'m a bit of a nerd 🎮)',
      },
      {
        url: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86',
        caption: 'Working on my latest robotics project',
      },
    ],
    budget: {
      min: 1500,
      max: 2500,
      preferredRange: '$1,800 - $2,200',
    },
    moveInDate: '2024-05-15',
    location: {
      preferred: 'Cambridge, MA',
      maxDistance: 3,
    },
  },
  {
    id: '3',
    name: 'Emma',
    age: 20,
    occupation: 'Student',
    bio: 'Art major with a love for photography and creating cozy spaces. Looking for a creative and respectful roommate.',
    detailedBio: {
      aboutMe: "Sophomore studying Fine Arts with a concentration in Digital Media. I run a small photography business on the side and love transforming living spaces into artistic havens. I'm originally from Portland and bring that creative, eco-friendly energy wherever I go.",
      lookingFor: "Hoping to find a roommate who appreciates art and creativity but also understands the importance of maintaining a clean, organized space. Would love someone who's open to occasional collaborative projects or gallery visits.",
      roommatePreferences: "Seeking someone who's comfortable with me setting up a small home studio space and doesn't mind the occasional art project. I'm very respectful of shared spaces and always clean up after creative sessions.",
    },
    university: 'Rhode Island School of Design',
    major: 'Fine Arts',
    year: 'Sophomore',
    interests: ['Photography', 'Painting', 'Interior Design', 'Vintage Shopping', 'Coffee', 'Film'],
    lifestyle: {
      cleanliness: 4,
      sleepSchedule: 'night_owl',
      smoking: false,
      pets: true,
      visitors: 'sometimes',
      drinking: 'sometimes',
      cooking: 'often',
      personality: 'extrovert',
    },
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263',
        caption: 'Just me in my element 📸',
      },
      {
        url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f',
        caption: 'My current art installation',
      },
      {
        url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38',
        caption: 'Love turning spaces into art',
      },
      {
        url: 'https://images.unsplash.com/photo-1523307730650-594bc63f9d67',
        caption: 'Coffee shop vibes - my second home',
      },
    ],
    budget: {
      min: 1000,
      max: 1800,
      preferredRange: '$1,200 - $1,500',
    },
    moveInDate: '2024-09-01',
    location: {
      preferred: 'Providence, RI',
      maxDistance: 4,
    },
  },
];