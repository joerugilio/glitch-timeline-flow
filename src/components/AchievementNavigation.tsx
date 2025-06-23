
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface AchievementNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  currentIndex: number;
  totalAchievements: number;
}

const AchievementNavigation: React.FC<AchievementNavigationProps> = ({
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  currentIndex,
  totalAchievements
}) => {
  return (
    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
      <Button
        variant="ghost"
        size="sm"
        onClick={onPrev}
        disabled={!hasPrev}
        className="flex items-center gap-1"
      >
        <ChevronLeft size={16} />
        Previous
      </Button>
      
      <div className="text-xs text-muted-foreground">
        {currentIndex + 1} of {totalAchievements}
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onNext}
        disabled={!hasNext}
        className="flex items-center gap-1"
      >
        Next
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};

export default AchievementNavigation;
