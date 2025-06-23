
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
  achievements: string[];
}

export interface PortfolioData {
  positions: Position[];
}
