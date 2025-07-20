
export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  profileImage: string;
  location: string;
  email: string;
  phone?: string;
  website?: string;
}

export interface BiographySection {
  id: string;
  title: string;
  content: string[];
  image?: string;
}

export interface Skill {
  name: string;
  level: number; // 1-5 or percentage
  category: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Value {
  title: string;
  description: string;
  icon: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  year: string;
  description?: string;
}

export interface Award {
  title: string;
  organization: string;
  year: string;
  description: string;
}

export interface PersonalInterest {
  title: string;
  description: string;
  image?: string;
}

export interface AboutData {
  personalInfo: PersonalInfo;
  biography: BiographySection[];
  skillCategories: SkillCategory[];
  values: Value[];
  education: Education[];
  awards: Award[];
  interests: PersonalInterest[];
  workPhilosophy: {
    title: string;
    content: string[];
  };
}
