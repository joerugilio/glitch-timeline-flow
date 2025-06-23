
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { portfolioData } from '../data/portfolio';
import { Achievement, Position } from '../types/portfolio';

export const useAchievementNavigation = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPosition = portfolioData.positions.find(p => p.id === id);
  const currentPositionIndex = portfolioData.positions.findIndex(p => p.id === id);
  const currentAchievementId = searchParams.get('achievement') || currentPosition?.achievements[0]?.id;
  const currentAchievementIndex = currentPosition?.achievements.findIndex(a => a.id === currentAchievementId) ?? 0;

  const navigateToAchievement = (positionId: string, achievementId: string) => {
    navigate(`/position/${positionId}?achievement=${achievementId}`);
    // Scroll to top immediately when navigating to a different position
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navigateNext = () => {
    if (!currentPosition) return;

    // If not at last achievement in current position, go to next achievement
    if (currentAchievementIndex < currentPosition.achievements.length - 1) {
      const nextAchievement = currentPosition.achievements[currentAchievementIndex + 1];
      setSearchParams({ achievement: nextAchievement.id });
    } else {
      // At last achievement, go to first achievement of next position
      const nextPositionIndex = currentPositionIndex + 1;
      if (nextPositionIndex < portfolioData.positions.length) {
        const nextPosition = portfolioData.positions[nextPositionIndex];
        const firstAchievement = nextPosition.achievements[0];
        navigateToAchievement(nextPosition.id, firstAchievement.id);
      }
    }
  };

  const navigatePrev = () => {
    if (!currentPosition) return;

    // If not at first achievement in current position, go to previous achievement
    if (currentAchievementIndex > 0) {
      const prevAchievement = currentPosition.achievements[currentAchievementIndex - 1];
      setSearchParams({ achievement: prevAchievement.id });
    } else {
      // At first achievement, go to last achievement of previous position
      const prevPositionIndex = currentPositionIndex - 1;
      if (prevPositionIndex >= 0) {
        const prevPosition = portfolioData.positions[prevPositionIndex];
        const lastAchievement = prevPosition.achievements[prevPosition.achievements.length - 1];
        navigateToAchievement(prevPosition.id, lastAchievement.id);
      }
    }
  };

  const hasNext = () => {
    if (!currentPosition) return false;
    return currentAchievementIndex < currentPosition.achievements.length - 1 || 
           currentPositionIndex < portfolioData.positions.length - 1;
  };

  const hasPrev = () => {
    if (!currentPosition) return false;
    return currentAchievementIndex > 0 || currentPositionIndex > 0;
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle arrow keys when not typing in an input
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          if (hasPrev()) {
            navigatePrev();
          }
          break;
        case 'ArrowRight':
          event.preventDefault();
          if (hasNext()) {
            navigateNext();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentAchievementIndex, currentPositionIndex, hasPrev(), hasNext()]);

  return {
    currentPosition,
    currentAchievement: currentPosition?.achievements[currentAchievementIndex],
    currentAchievementIndex,
    navigateNext,
    navigatePrev,
    hasNext: hasNext(),
    hasPrev: hasPrev(),
    navigateToAchievement
  };
};
