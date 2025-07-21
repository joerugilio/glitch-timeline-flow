
export interface AchievementImage {
  url: string;
  alt: string;
  caption: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  images: AchievementImage[];
}

export interface Exit {
  type: 'IPO' | 'Acquisition';
  company?: string;
  details: string;
}

export interface Position {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  blurb: string;
  description: string;
  tags: string[];
  imageUrl: string;
  logoUrl?: string;
  achievements: Achievement[];
  exit?: Exit;
}

export interface PortfolioData {
  positions: Position[];
}
