
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import portfolioData from '../data/portfolio.json';
import { Position } from '../types/portfolio';

// Type validation function to ensure JSON data matches TypeScript types
const validatePosition = (pos: any): Position => ({
  ...pos,
  exit: pos.exit ? {
    ...pos.exit,
    type: pos.exit.type as "IPO" | "Acquisition"
  } : undefined
});

export const useAchievementNavigation = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const foundPosition = portfolioData.positions.find(p => p.id === id);
  const currentPosition = foundPosition ? validatePosition(foundPosition) : undefined;
  const currentAchievementId = searchParams.get('achievement') || currentPosition?.achievements[0]?.id;
  const currentAchievementIndex = currentPosition?.achievements.findIndex(a => a.id === currentAchievementId) ?? 0;

  const navigateToAchievement = (positionId: string, achievementId: string) => {
    navigate(`/position/${positionId}?achievement=${achievementId}`);
  };

  return {
    currentPosition,
    currentAchievement: currentPosition?.achievements[currentAchievementIndex],
    currentAchievementIndex,
    navigateToAchievement
  };
};
