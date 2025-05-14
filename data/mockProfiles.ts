import { Profile } from '@/types/profile';

export const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Alex',
    age: 21,
    bio: 'CS major with a passion for sustainable tech and creating a functional, organized living space.',
    detailedBio: {
      aboutMe: "I'm a sophomore at MIT studying Computer Science with a focus on AI. Outside of coding, I'm an avid rock climber and enjoy cooking healthy meals. I practice mindfulness meditation and value having a clean, organized living environment.",
      lookingFor: "Looking for a roommate who values cleanliness and respects quiet hours during weekdays. I'm hoping to find someone who shares my interest in tech or fitness and wouldn't mind joining for occasional hiking trips or gym sessions.",
      roommatePreferences: "I prefer someone who's tech-savvy, maintains a regular schedule, and is open to sharing occasional meals. I'm an early riser and would work best with someone who has a similar rhythm.",
    },
    university: 'MIT',
    major: 'Computer Science',
    year: 'Sophomore',
    interests: ['Coding', 'Hiking', 'Reading', 'Rock Climbing', 'Fitness', 'Meditation'],
    lifestyle: {
      cleanliness: 5,
      sleepSchedule: 'early_bird',
      smoking: 'None',
      pets: false,
      personality: 'ambivert',
    },
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
        id: 'alex-1'
      },
      {
        url: 'https://images.unsplash.com/photo-1488161628813-04466f872be2',
        id: 'alex-2'
      },
      {
        url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        id: 'alex-3'
      },
    ],
    budget: {
      preferredRange: '$1,500 - $1,800',
    },
    moveInDate: '2024-06-01',
    location: {
      preferred: 'Cambridge, MA',
      maxDistance: 5,
    },
  },
  {
    id: '2',
    name: 'Michael',
    age: 22,
    bio: 'Tech enthusiast and night owl seeking a roommate who appreciates both gaming sessions and intellectual discussions.',
    detailedBio: {
      aboutMe: "Sophomore at MIT studying Electrical Engineering with a focus on robotics. I'm passionate about technology, gaming, and music production. I run a small YouTube channel about tech reviews and occasionally DJ at campus events.",
      lookingFor: "Seeking a roommate who's comfortable with a flexible schedule and shares an interest in technology. Would be great to find someone who enjoys gaming sessions but also values focused study time.",
      roommatePreferences: "Looking for someone who's okay with occasional late nights (I often work on projects late) and doesn't mind a tech-filled living space. I'm very organized with shared spaces but have a creative chaos approach to my own room.",
    },
    university: 'MIT',
    major: 'Electrical Engineering',
    year: 'Sophomore',
    interests: ['Gaming', 'Technology', 'Music Production', 'Robotics', 'DJing', 'AI'],
    lifestyle: {
      cleanliness: 4,
      sleepSchedule: 'night_owl',
      smoking: 'None',
      pets: true,
      personality: 'introvert',
    },
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
        id: 'michael-1'
      },
      {
        url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
        id: 'michael-2'
      },
      {
        url: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f',
        id: 'michael-3'
      },
      {
        url: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86',
        id: 'michael-4'
      },
    ],
    budget: {
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
    name: 'Ethan',
    age: 20,
    bio: 'Architecture major with a love for photography and creating functional living spaces. Looking for a creative and respectful roommate.',
    detailedBio: {
      aboutMe: "Sophomore at MIT studying Architecture with a concentration in Design Computing. I run a small photography business on the side and love transforming living spaces into artistic yet functional environments. I'm originally from Portland and bring that creative, tech-savvy energy wherever I go.",
      lookingFor: "Hoping to find a roommate who appreciates design and creativity but also understands the importance of maintaining a clean, organized space. Would love someone who's open to occasional collaborative projects or design exhibitions.",
      roommatePreferences: "Seeking someone who's comfortable with me setting up a small home studio space and doesn't mind the occasional design project. I'm very respectful of shared spaces and always clean up after creative sessions.",
    },
    university: 'MIT',
    major: 'Architecture',
    year: 'Sophomore',
    interests: ['Photography', 'Digital Design', 'Interior Design', 'Computational Design', 'Coffee', 'Film'],
    lifestyle: {
      cleanliness: 4,
      sleepSchedule: 'night_owl',
      smoking: 'None',
      pets: true,
      personality: 'ambivert',
    },
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce',
        id: 'ethan-1'
      },
      {
        url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
        id: 'ethan-2'
      },
      {
        url: 'https://images.unsplash.com/photo-1463453091185-61582044d556',
        id: 'ethan-3'
      },
    ],
    budget: {
      preferredRange: '$1,200 - $1,500',
    },
    moveInDate: '2024-09-01',
    location: {
      preferred: 'Cambridge, MA',
      maxDistance: 4,
    },
  },
  {
    id: '4',
    name: 'Jason',
    age: 23,
    bio: 'Sloan School of Management student and fitness enthusiast looking for a roommate who values an active lifestyle and a clean living space.',
    detailedBio: {
      aboutMe: "Sophomore at MIT's Sloan School of Management specializing in entrepreneurship. I wake up at 5AM for my daily workout routine and meal prep most Sundays. When I'm not studying, I enjoy hiking, playing basketball, and attending startup events. I'm building a fitness app startup on the side.",
      lookingFor: "Seeking a roommate who appreciates a structured routine and wouldn't mind occasional networking events at our place. Ideally someone who is also into fitness or at least respects a health-conscious lifestyle.",
      roommatePreferences: "I'd like to live with someone who values cleanliness and organization. I'm an early riser, so would prefer someone who isn't throwing parties on weeknights. I'm happy to share fitness tips and cook healthy meals together!",
    },
    university: 'MIT',
    major: 'Business Administration',
    year: 'Sophomore',
    interests: ['Fitness', 'Entrepreneurship', 'Nutrition', 'Basketball', 'Networking', 'Investment'],
    lifestyle: {
      cleanliness: 5,
      sleepSchedule: 'early_bird',
      smoking: 'None',
      pets: false,
      personality: 'extrovert',
    },
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4',
        id: 'jason-1'
      },
      {
        url: 'https://images.unsplash.com/photo-1588731247530-4076fc99173e',
        id: 'jason-2'
      },
      {
        url: 'https://images.unsplash.com/photo-1594381898411-846e7d193883',
        id: 'jason-3'
      },
    ],
    budget: {
      preferredRange: '$2,200 - $2,800',
    },
    moveInDate: '2024-07-15',
    location: {
      preferred: 'Cambridge, MA',
      maxDistance: 2,
    },
  },
  {
    id: '5',
    name: 'Oliver',
    age: 19,
    bio: 'Music and Computer Science double major who loves composing, playing piano, and creating digital music experiences.',
    detailedBio: {
      aboutMe: "Sophomore at MIT studying both Music and Computer Science. I practice piano daily but always use headphones during quiet hours. I love hosting small jam sessions where I cook and sometimes perform with friends. I'm originally from London and enjoy exploring Boston's music scene.",
      lookingFor: "Looking for a roommate who appreciates music and tech but also respects practice time. Someone who enjoys occasional shared meals and wouldn't mind small gatherings once in a while.",
      roommatePreferences: "I'd like to live with someone who's fairly tidy in common areas and communicative about schedules. I'm a bit of a night owl but very considerate about noise. Would love a roommate who's open to cultural experiences together occasionally.",
    },
    university: 'MIT',
    major: 'Music & Computer Science',
    year: 'Sophomore',
    interests: ['Piano', 'Music Technology', 'Cooking', 'Jazz', 'Music Production', 'Programming', 'Foreign Languages'],
    lifestyle: {
      cleanliness: 4,
      sleepSchedule: 'night_owl',
      smoking: 'None',
      pets: false,
      personality: 'ambivert',
    },
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1552058544-f2b08422138a',
        id: 'oliver-1'
      },
      {
        url: 'https://images.unsplash.com/photo-1540569147856-6b4144afd1f3',
        id: 'oliver-2'
      },
      {
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        id: 'oliver-3'
      },
    ],
    budget: {
      preferredRange: '$1,900 - $2,400',
    },
    moveInDate: '2024-08-01',
    location: {
      preferred: 'Cambridge, MA',
      maxDistance: 3,
    },
  },
  {
    id: '6',
    name: 'Tyler',
    age: 21,
    bio: 'Environmental Engineering major passionate about sustainability, clean energy, and creating eco-friendly living spaces.',
    detailedBio: {
      aboutMe: "Sophomore at MIT studying Environmental Engineering with a focus on sustainable energy systems. I spend weekends hiking, volunteering for environmental initiatives, or tending to my collection of plants. I'm working on research about urban composting systems and renewable energy.",
      lookingFor: "Hoping to find an environmentally conscious roommate who wouldn't mind participating in our building's recycling program and maybe sharing a small herb garden on our balcony. Someone who appreciates nature and sustainability.",
      roommatePreferences: "I'm looking for someone who's open to eco-friendly living practices like composting and reducing plastic use. I'm fairly laid-back but appreciate cleanliness. I'm an early riser on weekdays but flexible on weekends.",
    },
    university: 'MIT',
    major: 'Environmental Engineering',
    year: 'Sophomore',
    interests: ['Sustainability', 'Hiking', 'Gardening', 'Cycling', 'Renewable Energy', 'Environmental Activism', 'Rock Climbing'],
    lifestyle: {
      cleanliness: 4,
      sleepSchedule: 'early_bird',
      smoking: 'None',
      pets: true,
      personality: 'ambivert',
    },
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4',
        id: 'tyler-1'
      },
      {
        url: 'https://images.unsplash.com/photo-1618453292459-48bc7653d553',
        id: 'tyler-2'
      },
      {
        url: 'https://images.unsplash.com/photo-1536792414922-14b978901fcd',
        id: 'tyler-3'
      },
    ],
    budget: {
      preferredRange: '$1,400 - $1,900',
    },
    moveInDate: '2024-06-15',
    location: {
      preferred: 'Cambridge, MA',
      maxDistance: 5,
    },
  },
  {
    id: '7',
    name: 'Amir',
    age: 24,
    bio: 'Brain and Cognitive Sciences major looking for a quiet, studious environment with a roommate who appreciates deep conversations.',
    detailedBio: {
      aboutMe: "Sophomore at MIT studying Brain and Cognitive Sciences. I'm originally from Egypt and love sharing my culture through cooking and conversations. I enjoy reading scientific journals, playing chess, and discussing philosophy. I tend to study late in the library several nights a week.",
      lookingFor: "Seeking a roommate who values academic pursuits and appreciates a quiet environment for studying. Someone who enjoys intellectual discussions and cultural exchange would be ideal. I'd love to occasionally share meals from different cultures.",
      roommatePreferences: "Looking for someone who's respectful of study time and sleep schedules. I'm very neat and organized and would appreciate the same in shared spaces. I'm quiet but not antisocial - I enjoy meaningful conversations over tea or coffee.",
    },
    university: 'MIT',
    major: 'Brain and Cognitive Sciences',
    year: 'Sophomore',
    interests: ['Research', 'Chess', 'Philosophy', 'International Cuisine', 'Reading', 'Languages', 'Coffee'],
    lifestyle: {
      cleanliness: 5,
      sleepSchedule: 'night_owl',
      smoking: 'None',
      pets: false,
      personality: 'introvert',
    },
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3',
        id: 'amir-1'
      },
      {
        url: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4',
        id: 'amir-2'
      },
      {
        url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61',
        id: 'amir-3'
      },
    ],
    budget: {
      preferredRange: '$1,600 - $2,200',
    },
    moveInDate: '2024-09-01',
    location: {
      preferred: 'Cambridge, MA',
      maxDistance: 2,
    },
  },
  {
    id: '8',
    name: 'Marcus',
    age: 22,
    bio: 'Architecture student with a passion for design, computational modeling, and creating innovative living spaces.',
    detailedBio: {
      aboutMe: "Sophomore at MIT studying Architecture with a minor in Computer Science. I spend most of my time working on designs and building computational models. I'm a minimalist at heart and enjoy photography on weekends. I've been featured in several student design publications.",
      lookingFor: "Hoping to find someone who appreciates design and wouldn't mind living in a somewhat curated space. I'm looking for a roommate who respects quiet focus time but also enjoys occasional design discussions or gallery visits.",
      roommatePreferences: "I'd prefer someone who is neat and minimalist-leaning, though I'm flexible. I work late on projects sometimes but am very respectful with noise. I'm looking for a mature, responsible roommate who values aesthetics and organization.",
    },
    university: 'MIT',
    major: 'Architecture',
    year: 'Sophomore',
    interests: ['Design', 'Photography', 'Minimalism', 'Computational Design', 'Sketching', 'Interior Design', 'Digital Fabrication'],
    lifestyle: {
      cleanliness: 5,
      sleepSchedule: 'night_owl',
      smoking: 'None',
      pets: false,
      personality: 'introvert',
    },
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        id: 'marcus-1'
      },
      {
        url: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3',
        id: 'marcus-2'
      },
      {
        url: 'https://images.unsplash.com/photo-1502980426475-b83966705988',
        id: 'marcus-3'
      },
    ],
    budget: {
      preferredRange: '$1,300 - $1,700',
    },
    moveInDate: '2024-07-01',
    location: {
      preferred: 'Cambridge, MA',
      maxDistance: 3,
    },
  },
  {
    id: '9',
    name: 'Samuel',
    age: 20,
    bio: 'Cognitive Science major who loves mindfulness, fitness, and creating a harmonious living environment.',
    detailedBio: {
      aboutMe: "Sophomore at MIT studying Cognitive Science with a focus on sports psychology and mental wellness. I practice mindfulness meditation and maintain a regular gym routine. I enjoy cooking nutritious meals and have a small collection of books on personal development. I volunteer as a peer counselor on weekends.",
      lookingFor: "Seeking a roommate who values mental well-being and a peaceful living environment. Someone who appreciates mindfulness and maybe shares an interest in fitness. A person who communicates openly about needs and boundaries.",
      roommatePreferences: "I'd like to live with someone who's considerate, communicative, and values cleanliness. I'm early to bed and early to rise, so someone with a similar schedule or who is quiet in the evenings would be ideal. I'm into healthy eating but don't expect others to follow the same diet.",
    },
    university: 'MIT',
    major: 'Cognitive Science',
    year: 'Sophomore',
    interests: ['Fitness', 'Mindfulness', 'Nutrition', 'Running', 'Psychology', 'Reading', 'Hiking'],
    lifestyle: {
      cleanliness: 5,
      sleepSchedule: 'early_bird',
      smoking: 'None',
      pets: false,
      personality: 'ambivert',
    },
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea',
        id: 'samuel-1'
      },
      {
        url: 'https://images.unsplash.com/photo-1583195764036-6dc248ac07d9',
        id: 'samuel-2'
      },
      {
        url: 'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d',
        id: 'samuel-3'
      },
    ],
    budget: {
      preferredRange: '$1,700 - $2,100',
    },
    moveInDate: '2024-08-15',
    location: {
      preferred: 'Cambridge, MA',
      maxDistance: 4,
    },
  },
  {
    id: '10',
    name: 'Dev',
    age: 25,
    bio: 'Computer Engineering student who balances coding marathons with basketball games. Looking for a tech-friendly and active roommate.',
    detailedBio: {
      aboutMe: "Sophomore at MIT studying Computer Engineering with a focus on machine learning. I'm from India originally and love cooking spicy dishes from my hometown. I balance intense coding sessions with basketball games and gym workouts. I occasionally host small gatherings to watch NBA games.",
      lookingFor: "Looking for a roommate who's comfortable with my occasional late-night coding sessions and wouldn't mind joining for pickup basketball games. Someone who appreciates tech discussions but also values staying active.",
      roommatePreferences: "I'd prefer someone who maintains a moderate level of cleanliness and doesn't mind the occasional tech gadget lying around. I'm pretty flexible with schedules but value communication about guests and noise levels. I'm happy to cook and share meals sometimes!",
    },
    university: 'MIT',
    major: 'Computer Engineering',
    year: 'Sophomore',
    interests: ['Machine Learning', 'Basketball', 'Cooking', 'Fitness', 'AI', 'Data Science', 'Sports Analytics'],
    lifestyle: {
      cleanliness: 3,
      sleepSchedule: 'night_owl',
      smoking: 'None',
      pets: false,
      personality: 'ambivert',
    },
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c',
        id: 'dev-1'
      },
      {
        url: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5',
        id: 'dev-2'
      },
      {
        url: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40',
        id: 'dev-3'
      },
    ],
    budget: {
      preferredRange: '$1,500 - $2,000',
    },
    moveInDate: '2024-06-01',
    location: {
      preferred: 'Cambridge, MA',
      maxDistance: 3,
    },
  },
];