
export interface AchievementImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  images: AchievementImage[];
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
  achievements: Achievement[];
}

export interface PortfolioData {
  positions: Position[];
}
