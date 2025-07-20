import { AboutData } from '../types/about';

export const aboutData: AboutData = {
  hero: {
    name: 'Alex Johnson',
    title: 'Senior Product Designer',
    imageUrl: '/images/about/profile.jpg',
    description: 'I create user experiences that drive business results. With 10+ years in product design, I specialize in scaling design systems and leading cross-functional teams.',
    stats: [
      { label: 'Years Experience', value: '10+' },
      { label: 'Products Launched', value: '50+' },
      { label: 'Teams Led', value: '15+' },
      { label: 'Users Impacted', value: '10M+' }
    ]
  },
  biography: {
    title: 'About Me',
    content: 'I\'m a product designer who believes great design is invisible. My journey began in graphic design, but I quickly discovered my passion for solving complex user problems through thoughtful interface design. I\'ve had the privilege of working with startups and Fortune 500 companies alike, helping them create products that users love and businesses thrive on.',
    imageUrl: '/images/about/workspace.jpg',
    highlights: [
      'Led design for 3 successful product launches',
      'Managed international design teams across 4 time zones',
      'Established design systems used by 100+ engineers',
      'Mentored 25+ junior designers throughout my career'
    ]
  },
  skills: {
    title: 'Skills & Expertise',
    categories: [
      {
        name: 'Design',
        skills: [
          { name: 'User Research', level: 95 },
          { name: 'Interface Design', level: 98 },
          { name: 'Prototyping', level: 90 },
          { name: 'Design Systems', level: 85 }
        ]
      },
      {
        name: 'Technical',
        skills: [
          { name: 'Figma', level: 95 },
          { name: 'HTML/CSS', level: 80 },
          { name: 'JavaScript', level: 70 },
          { name: 'React', level: 65 }
        ]
      },
      {
        name: 'Leadership',
        skills: [
          { name: 'Team Management', level: 90 },
          { name: 'Strategy', level: 85 },
          { name: 'Mentoring', level: 92 },
          { name: 'Cross-functional Collaboration', level: 88 }
        ]
      }
    ]
  },
  interests: {
    title: 'Beyond Design',
    items: [
      {
        name: 'Photography',
        description: 'Capturing moments and exploring composition through street photography.',
        imageUrl: '/images/about/interests/photography.jpg'
      },
      {
        name: 'Cooking',
        description: 'Experimenting with flavors and techniques from different cuisines.',
        imageUrl: '/images/about/interests/cooking.jpg'
      },
      {
        name: 'Hiking',
        description: 'Finding inspiration in nature and maintaining work-life balance.',
        imageUrl: '/images/about/interests/hiking.jpg'
      }
    ]
  }
};
