import React, { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Tag, ExternalLink } from 'lucide-react';
import Navigation from '../components/Navigation';
import AchievementImages from '../components/AchievementImages';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Button } from '../components/ui/button';
import { useAchievementNavigation } from '../hooks/useAchievementNavigation';
import { portfolioData } from '../data/portfolio';
const PositionDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    currentPosition,
    currentAchievement,
    currentAchievementIndex
  } = useAchievementNavigation();

  // Scroll to top when component mounts or position changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPosition?.id]);

  // Get current achievement ID
  const currentAchievementId = searchParams.get('achievement') || currentPosition?.achievements[0]?.id;

  // Set default achievement if none specified
  useEffect(() => {
    if (currentPosition && !searchParams.get('achievement')) {
      setSearchParams({
        achievement: currentPosition.achievements[0].id
      });
    }
  }, [currentPosition, searchParams, setSearchParams]);
  if (!currentPosition) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-lg font-bold mb-2">Position not found</h1>
          <Link to="/" className="text-primary hover:underline text-sm">
            Return to timeline
          </Link>
        </div>
      </div>;
  }
  const currentPositionIndex = portfolioData.positions.findIndex(p => p.id === currentPosition.id);
  const nextPosition = currentPositionIndex < portfolioData.positions.length - 1 ? portfolioData.positions[currentPositionIndex + 1] : null;
  const prevPosition = currentPositionIndex > 0 ? portfolioData.positions[currentPositionIndex - 1] : null;
  return <div className="min-h-screen bg-background relative">
      {/* Background Image - Full Screen Cover */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url(${currentPosition.imageUrl})`,
        opacity: 0.9
      }} />
        <div className="absolute inset-0 bg-noise opacity-10" />
        <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, hsl(var(--background) / 0.3) 0%, hsl(12 8% 12% / 0.4) 50%, hsl(var(--background) / 0.3) 100%)'
      }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <div className="pt-12 pb-4">
          <div className="w-full pt-4 px-4">
            {/* Navigation Bar */}
            <nav className="flex justify-between items-center mb-4">
              {/* Back Navigation Button - WCAG AA Compliant */}
              <Button asChild variant="outline" className="bg-white/95 backdrop-blur-sm border-slate-700 text-slate-900 hover:bg-slate-100 hover:border-slate-800 transition-all font-semibold focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:outline-none">
                <Link to="/" aria-label="Navigate back to career timeline" role="button">
                  <ArrowLeft size={16} className="mr-2" aria-hidden="true" />
                  Back to Timeline
                </Link>
              </Button>

              {/* Next Navigation Button */}
              {nextPosition && <Button asChild variant="outline" className="bg-white/95 backdrop-blur-sm border-slate-700 text-slate-900 hover:bg-slate-100 hover:border-slate-800 transition-all font-semibold focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:outline-none">
                  <Link to={`/position/${nextPosition.id}?achievement=${nextPosition.achievements[0].id}`} aria-label={`Next: ${nextPosition.title}`} role="button">
                    <div className="text-right">
                      <p className="text-xs">Next</p>
                      <p className="font-medium">{nextPosition.title}</p>
                    </div>
                    <ArrowLeft size={16} className="ml-1 rotate-180" aria-hidden="true" />
                  </Link>
                </Button>}
            </nav>

            {/* Header */}
            <header className="mb-4">
              <h1 className="text-xl md:text-2xl font-bold mb-0">
                {currentPosition.title}
              </h1>
              <h2 className="text-lg md:text-xl text-accent font-semibold mb-2">
                {currentPosition.company}
              </h2>

              <div className="flex flex-col md:flex-row md:items-center gap-2 text-muted-foreground mb-2 text-sm">
                <div className="flex items-center">
                  <Calendar size={12} className="mr-1" aria-hidden="true" />
                  <span className="font-medium">{currentPosition.period}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={12} className="mr-1" aria-hidden="true" />
                  <span>{currentPosition.location}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3 bg-black/65 p-1 rounded-full ">
                {currentPosition.tags.map(tag => <span key={tag} className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                    <Tag size={8} className="mr-0.5" aria-hidden="true" />
                    {tag}
                  </span>)}
              </div>

              <p className="leading-relaxed text-sm mb-3 text-slate-50">
                {currentPosition.description}
              </p>
            </header>

            {/* Achievements Accordion */}
            <section>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Key Achievements</h3>
              <Accordion type="multiple" onValueChange={value => {
              if (value.length > 0) {
                setSearchParams({
                  achievement: value[value.length - 1]
                });
              }
            }} className="space-y-1">
                {currentPosition.achievements.map(achievement => <AccordionItem key={achievement.id} value={achievement.id} className="bg-card/60 backdrop-blur-sm border-2 border-border/60 rounded-lg hover:border-primary/40 hover:bg-card/80 transition-all duration-300 data-[state=open]:border-primary/60 data-[state=open]:bg-card/90 data-[state=open]:shadow-lg data-[state=open]:shadow-primary/10">
                    <AccordionTrigger className="px-3 py-3 hover:no-underline rounded-t-lg text-sm font-semibold transition-all duration-200 bg-slate-200 hover:bg-slate-100 text-blue-500">
                      <span className="text-left text-zinc-500">{achievement.title}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-3 pt-3">
                      <div className="space-y-3">
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {achievement.description}
                        </p>
                        
                        <AchievementImages images={achievement.images} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>)}
              </Accordion>
            </section>

            {/* Position Navigation */}
            <nav aria-label="Position navigation" className="mt-6 pt-3">
              <div className="flex justify-between items-center">
                {prevPosition ? <Button asChild variant="outline" className="bg-white/95 backdrop-blur-sm border-slate-700 text-slate-900 hover:bg-slate-100 hover:border-slate-800 transition-all font-semibold focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:outline-none">
                    <Link to={`/position/${prevPosition.id}?achievement=${prevPosition.achievements[0].id}`} aria-label={`Previous: ${prevPosition.title}`} role="button">
                      <ArrowLeft size={16} className="mr-1" aria-hidden="true" />
                      <div className="text-left">
                        <p className="text-xs">Previous</p>
                        <p className="font-medium">{prevPosition.title}</p>
                      </div>
                    </Link>
                  </Button> : <div />}

                {nextPosition ? <Button asChild variant="outline" className="bg-white/95 backdrop-blur-sm border-slate-700 text-slate-900 hover:bg-slate-100 hover:border-slate-800 transition-all font-semibold focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:outline-none">
                    <Link to={`/position/${nextPosition.id}?achievement=${nextPosition.achievements[0].id}`} aria-label={`Next: ${nextPosition.title}`} role="button">
                      <div className="text-right">
                        <p className="text-xs">Next</p>
                        <p className="font-medium">{nextPosition.title}</p>
                      </div>
                      <ArrowLeft size={16} className="ml-1 rotate-180" aria-hidden="true" />
                    </Link>
                  </Button> : <Button asChild variant="outline" className="bg-white/95 backdrop-blur-sm border-slate-700 text-slate-900 hover:bg-slate-100 hover:border-slate-800 transition-all font-semibold focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:outline-none">
                    <Link to="/" aria-label="Return to timeline" role="button">
                      <div className="text-right">
                        <p className="text-xs">Complete</p>
                        <p className="font-medium">Back to Timeline</p>
                      </div>
                      <ExternalLink size={16} className="ml-1" aria-hidden="true" />
                    </Link>
                  </Button>}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>;
};
export default PositionDetail;