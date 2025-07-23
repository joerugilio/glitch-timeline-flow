
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import portfolioData from '../data/portfolio.json';

export const useAchievementNavigation = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPosition = portfolioData.positions.find(p => p.id === id);
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
