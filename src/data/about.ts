
import { AboutData } from '../types/about';

export const aboutData: AboutData = {
  personalInfo: {
    name: "Sarah Chen",
    title: "Senior Product Designer & Strategist",
    tagline: "Crafting meaningful digital experiences that bridge user needs with business goals",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    location: "San Francisco, CA",
    email: "hello@sarahchen.design",
    website: "sarahchen.design"
  },
  biography: [
    {
      id: "origin-story",
      title: "Origin Story",
      content: [
        "My journey into design began with a simple question: Why do some products feel intuitive while others leave us frustrated? This curiosity led me from studying cognitive psychology to building digital experiences that truly serve people.",
        "Over the past decade, I've had the privilege of working with startups, Fortune 500 companies, and everything in between. Each project has taught me that great design isn't just about making things look beautiful—it's about solving real problems for real people."
      ],
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80"
    },
    {
      id: "approach",
      title: "My Approach",
      content: [
        "I believe in designing with empathy, data, and a healthy dose of experimentation. Every project starts with understanding the human behind the screen—their goals, frustrations, and the context in which they'll use what we're building.",
        "My process is collaborative and iterative. I work closely with product managers, engineers, and stakeholders to ensure that design decisions are grounded in user research and business objectives."
      ]
    }
  ],
  skillCategories: [
    {
      name: "Design & Research",
      skills: [
        { name: "User Experience Design", level: 95, category: "design" },
        { name: "User Research", level: 90, category: "research" },
        { name: "Interaction Design", level: 88, category: "design" },
        { name: "Design Systems", level: 92, category: "design" },
        { name: "Prototyping", level: 85, category: "design" }
      ]
    },
    {
      name: "Tools & Technology",
      skills: [
        { name: "Figma", level: 95, category: "tools" },
        { name: "Adobe Creative Suite", level: 85, category: "tools" },
        { name: "Framer", level: 80, category: "tools" },
        { name: "HTML/CSS", level: 75, category: "development" },
        { name: "React (Basic)", level: 60, category: "development" }
      ]
    },
    {
      name: "Strategy & Leadership",
      skills: [
        { name: "Product Strategy", level: 88, category: "strategy" },
        { name: "Design Leadership", level: 85, category: "leadership" },
        { name: "Stakeholder Management", level: 90, category: "leadership" },
        { name: "Workshop Facilitation", level: 82, category: "leadership" }
      ]
    }
  ],
  values: [
    {
      title: "User-Centered",
      description: "Every design decision should be grounded in user needs and validated through research and testing.",
      icon: "Users"
    },
    {
      title: "Collaborative",
      description: "The best solutions emerge when diverse perspectives come together in a spirit of open collaboration.",
      icon: "Users2"
    },
    {
      title: "Iterative",
      description: "Great design is never finished—it evolves through continuous learning and improvement.",
      icon: "RefreshCw"
    },
    {
      title: "Accessible",
      description: "Design should be inclusive and usable by everyone, regardless of their abilities or circumstances.",
      icon: "Heart"
    }
  ],
  education: [
    {
      institution: "Stanford University",
      degree: "Master of Science",
      field: "Human-Computer Interaction",
      year: "2018",
      description: "Specialized in cognitive psychology and interaction design. Thesis on mobile interface design for elderly users."
    },
    {
      institution: "UC Berkeley",
      degree: "Bachelor of Arts",
      field: "Cognitive Science",
      year: "2016",
      description: "Concentrated in human cognition and computer science. Minor in Visual Design."
    }
  ],
  awards: [
    {
      title: "Design Excellence Award",
      organization: "UX Design Awards",
      year: "2023",
      description: "Recognition for outstanding user experience design in the FinTech category"
    },
    {
      title: "Innovation in Healthcare Design",
      organization: "Healthcare Design Conference",
      year: "2022",
      description: "Awarded for pioneering work in patient-centered digital health solutions"
    },
    {
      title: "Rising Star in Design",
      organization: "Design Leadership Summit",
      year: "2021",
      description: "Recognition for leadership and mentorship in the design community"
    }
  ],
  interests: [
    {
      title: "Photography",
      description: "Capturing moments and exploring composition teaches me to see the world with a designer's eye.",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Cooking",
      description: "Like design, cooking is about balancing ingredients, timing, and presentation to create something delightful.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Hiking",
      description: "Nature walks provide the mental space for reflection and often lead to my best creative insights.",
      image: "https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ],
  workPhilosophy: {
    title: "Design Philosophy",
    content: [
      "I believe that good design is invisible—it solves problems so elegantly that users don't have to think about it. My approach centers on three core principles:",
      "**Empathy First**: Understanding the human experience is the foundation of all great design. I spend time with users, observe their behaviors, and listen to their stories before proposing solutions.",
      "**Simplicity with Purpose**: Every element should have a reason for being there. I strive to remove friction while maintaining the functionality that users need to accomplish their goals.",
      "**Continuous Learning**: The best designers are perpetual students. I stay curious about new technologies, research methods, and design trends while always questioning assumptions."
    ]
  }
};
