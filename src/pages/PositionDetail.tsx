import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Tag, ExternalLink } from 'lucide-react';
import Navigation from '../components/Navigation';
import AchievementImages from '../components/AchievementImages';
import AchievementNavigation from '../components/AchievementNavigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { useAchievementNavigation } from '../hooks/useAchievementNavigation';
import { portfolioData } from '../data/portfolio';

const PositionDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    currentPosition,
    currentAchievement,
    currentAchievementIndex,
    navigateNext,
    navigatePrev,
    hasNext,
    hasPrev
  } = useAchievementNavigation();

  // Get current achievement ID - move this before useEffect that uses it
  const currentAchievementId = searchParams.get('achievement') || currentPosition?.achievements[0]?.id;

  // Set default achievement if none specified
  useEffect(() => {
    if (currentPosition && !searchParams.get('achievement')) {
      setSearchParams({ achievement: currentPosition.achievements[0].id });
    }
  }, [currentPosition, searchParams, setSearchParams]);

  // Auto-scroll to open accordion item when achievement changes
  useEffect(() => {
    if (currentAchievementId) {
      // Small delay to ensure accordion animation completes
      const timer = setTimeout(() => {
        const accordionItem = document.querySelector(`[data-state="open"]`);
        if (accordionItem) {
          accordionItem.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [currentAchievementId]);

  if (!currentPosition) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Position not found</h1>
          <Link to="/" className="text-primary hover:underline">
            Return to timeline
          </Link>
        </div>
      </div>
    );
  }

  const currentPositionIndex = portfolioData.positions.findIndex(p => p.id === currentPosition.id);
  const nextPosition = currentPositionIndex < portfolioData.positions.length - 1 
    ? portfolioData.positions[currentPositionIndex + 1] 
    : null;
  const prevPosition = currentPositionIndex > 0 
    ? portfolioData.positions[currentPositionIndex - 1] 
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative pt-16 pb-8">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${currentPosition.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-noise" />
        <div className="absolute inset-0 bg-gradient-dark" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <Link
            to="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6 group"
            aria-label="Back to timeline"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Timeline
          </Link>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gradient">
              {currentPosition.title}
            </h1>
            <h2 className="text-xl md:text-2xl text-accent font-semibold mb-4">
              {currentPosition.company}
            </h2>

            <div className="flex flex-col md:flex-row md:items-center gap-4 text-muted-foreground mb-4">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" aria-hidden="true" />
                <span className="font-medium">{currentPosition.period}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" aria-hidden="true" />
                <span>{currentPosition.location}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {currentPosition.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30"
                >
                  <Tag size={10} className="mr-1" aria-hidden="true" />
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              {currentPosition.description}
            </p>
          </header>

          {/* Achievements Accordion */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Key Achievements</h3>
            <Accordion 
              type="single" 
              value={currentAchievementId || undefined}
              onValueChange={(value) => {
                if (value) {
                  setSearchParams({ achievement: value });
                }
              }}
              className="space-y-2"
            >
              {currentPosition.achievements.map((achievement) => (
                <AccordionItem 
                  key={achievement.id} 
                  value={achievement.id}
                  className="bg-card/40 backdrop-blur-sm border border-border rounded-lg"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50 rounded-t-lg">
                    <span className="text-left font-medium">{achievement.title}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {achievement.description}
                      </p>
                      
                      <AchievementImages images={achievement.images} />
                      
                      <AchievementNavigation
                        onPrev={navigatePrev}
                        onNext={navigateNext}
                        hasPrev={hasPrev}
                        hasNext={hasNext}
                        currentIndex={currentAchievementIndex}
                        totalAchievements={currentPosition.achievements.length}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Position Navigation */}
          <nav className="mt-12 pt-6 border-t border-border" aria-label="Position navigation">
            <div className="flex justify-between items-center">
              {prevPosition ? (
                <Link
                  to={`/position/${prevPosition.id}?achievement=${prevPosition.achievements[0].id}`}
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors group"
                  aria-label={`Previous: ${prevPosition.title}`}
                >
                  <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                  <div className="text-left">
                    <p className="text-sm">Previous</p>
                    <p className="font-medium">{prevPosition.title}</p>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextPosition ? (
                <Link
                  to={`/position/${nextPosition.id}?achievement=${nextPosition.achievements[0].id}`}
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors group text-right"
                  aria-label={`Next: ${nextPosition.title}`}
                >
                  <div className="text-right">
                    <p className="text-sm">Next</p>
                    <p className="font-medium">{nextPosition.title}</p>
                  </div>
                  <ArrowLeft size={20} className="ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <Link
                  to="/"
                  className="flex items-center text-primary hover:text-primary/80 transition-colors group"
                  aria-label="Return to timeline"
                >
                  <div className="text-right">
                    <p className="text-sm">Complete</p>
                    <p className="font-medium">Back to Timeline</p>
                  </div>
                  <ExternalLink size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PositionDetail;
