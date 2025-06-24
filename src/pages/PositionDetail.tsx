import React, { useEffect, useRef, useState } from 'react';
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
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
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
  return <div className="min-h-screen bg-background relative ">
      {/* Background Image - Full Screen Cover */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url(${currentPosition.imageUrl})`,
        opacity: 0.9
      }} />
        <div className="absolute inset-0 bg-noise opacity-10" />
        <div style={{
        background: 'linear-gradient(135deg, hsl(var(--background) / 0.3) 0%, hsl(12 8% 12% / 0.4) 50%, hsl(var(--background) / 0.3) 100%)'
      }} className="absolute inset-0 backdrop-blur-sm " />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <div className="pt-6 pb-4">
          <div className="w-full pt-4 px-4 mb-8 pb-8">
            {/* Navigation Bar */}
            <nav className="flex justify-between items-center mb-6">
              {/* Back Navigation Button - Enhanced WCAG AA Compliant */}
              <Button asChild variant="outline" className="bg-slate-900 text-white border-slate-700 hover:bg-black hover:border-slate-500 hover:text-white hover:shadow-lg transition-all font-semibold focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 focus:outline-none">
                <Link to="/" aria-label="Navigate back to career timeline" role="button">
                  <ArrowLeft size={16} className="mr-2" aria-hidden="true" />
                  Back to Timeline
                </Link>
              </Button>

              {/* Next Navigation Button */}
              {nextPosition && <Button asChild variant="outline" className="bg-slate-900 text-white border-slate-700 hover:bg-black hover:border-slate-500 hover:text-white hover:shadow-lg transition-all font-semibold focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 focus:outline-none">
                  <Link to={`/position/${nextPosition.id}?achievement=${nextPosition.achievements[0].id}`} aria-label={`Next: ${nextPosition.title}`} role="button">
                    <div className="text-right">
                      <p className="max-w-[660px] text-base">Next</p>
                      <p className="font-medium max-w-[660px]">{nextPosition.title}</p>
                    </div>
                    <ArrowLeft size={16} className="ml-1 rotate-180" aria-hidden="true" />
                  </Link>
                </Button>}
            </nav>

            {/* Header */}
            <header className="mb-2 backdrop-blur-xl  px-4 py-2">
              <h1 className="text-xl mb-0 md:text-3xl font-light">
                {currentPosition.title}
              </h1>
              <h2 className="text-lg text-accent mb-4 font-extralight md:text-4xl">
                {currentPosition.company}
              </h2>

              <div className="flex flex-col md:flex-row md:items-center gap-2 text-muted-foreground mb-2 text-sm">
                <div className="flex items-center">
                  <Calendar size={12} className="mr-1" aria-hidden="true" />
                  <span className="font-medium">{currentPosition.period}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={12} className="mr-1" aria-hidden="true" />
                  <span className="font-medium">{currentPosition.location}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3 p-1 rounded-full bg-black/25">
                {currentPosition.tags.map(tag => <span key={tag} className="inline-flex items-center px-1.5 py-0.5 rounded-full font-medium bg-primary/20 text-primary text-base">
                    <Tag size={8} className="mr-0.5" aria-hidden="true" />
                    {tag}
                  </span>)}
              </div>

              <p className="leading-relaxed mb-3 text-slate-50 max-w-[660px] text-base">
                {currentPosition.description}
              </p>
            </header>

            {/* Achievements Accordion */}
            <section className="px-8 py-4 ">
              <h3 className="text-lg font-semibold mb-2 text-foreground">Key Achievements</h3>
              <Accordion type="multiple" onValueChange={value => {
              // Update expanded items state
              setExpandedItems(value);
              // Update search params with the last opened achievement
              if (value.length > 0) {
                setSearchParams({
                  achievement: value[value.length - 1]
                });
              }
            }} className="space-y-4">
                {currentPosition.achievements.map(achievement => <AccordionItem key={achievement.id} value={achievement.id} className="bg-card/60 backdrop-blur-sm border-0 border-border/60 rounded-lg hover:border-primary/40 hover:bg-card/80 transition-all duration-300 data-[state=open]:border-primary/60 data-[state=open]:bg-card/90 data-[state=open]:shadow-lg data-[state=open]:shadow-primary/10">
                    <AccordionTrigger className="px-3 py-3 hover:no-underline rounded-t-lg text-sm font-semibold transition-all duration-200 text-blue-500 bg-slate-400 hover:bg-white">
                      <div className="flex-1 text-left">
                        <span className="block mb-2 text-slate-800 text-lg">{achievement.title}</span>
                        {/* Image thumbnails strip - show only when collapsed */}
                        <div className={`flex gap-1 overflow-hidden transition-all duration-300 ${expandedItems.includes(achievement.id) ? 'opacity-0 h-0 transform scale-95' : 'opacity-100 h-6 transform scale-100'}`}>
                          {achievement.images.slice(0, 4).map((image, index) => <div key={index} className="w-8 h-6 rounded overflow-hidden border border-gray-300 flex-shrink-0">
                              <img src={image.url} alt="" className="w-full h-full object-cover" />
                            </div>)}
                          {achievement.images.length > 4 && <div className="w-8 h-6 rounded bg-gray-300 border border-gray-400 flex items-center justify-center text-xs text-gray-600 flex-shrink-0">
                              +{achievement.images.length - 4}
                            </div>}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-3 pt-3">
                      <div className="space-y-3">
                        <p className="text-white leading-relaxed text-sm max-w-[660px]">
                          {achievement.description}
                        </p>
                        
                        <AchievementImages images={achievement.images} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>)}
              </Accordion>
            </section>

            {/* Position Navigation - Enhanced WCAG AA Compliant */}
            <nav aria-label="Position navigation" className="mt-6 pt-3">
              <div className="flex justify-between items-center">
                {prevPosition ? <Button asChild variant="outline" className="bg-slate-900 text-white border-slate-700 hover:bg-black hover:border-slate-500 hover:text-white hover:shadow-lg transition-all font-semibold focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 focus:outline-none">
                    <Link to={`/position/${prevPosition.id}?achievement=${prevPosition.achievements[0].id}`} aria-label={`Previous: ${prevPosition.title}`} role="button">
                      <ArrowLeft size={16} className="mr-1" aria-hidden="true" />
                      <div className="text-left">
                        <p className="text-xs max-w-[660px]">Previous</p>
                        <p className="font-medium max-w-[660px]">{prevPosition.title}</p>
                      </div>
                    </Link>
                  </Button> : <div />}

                {nextPosition ? <Button asChild variant="outline" className="bg-slate-900 text-white border-slate-700 hover:bg-black hover:border-slate-500 hover:text-white hover:shadow-lg transition-all font-semibold focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 focus:outline-none">
                    <Link to={`/position/${nextPosition.id}?achievement=${nextPosition.achievements[0].id}`} aria-label={`Next: ${nextPosition.title}`} role="button" className="glitch">
                      <div className="text-right">
                        <p className="max-w-[660px] text-base">Next</p>
                        <p className="font-medium max-w-[660px]">{nextPosition.title}</p>
                      </div>
                      <ArrowLeft size={16} className="ml-1 rotate-180" aria-hidden="true" />
                    </Link>
                  </Button> : <Button asChild variant="outline" className="bg-slate-900 text-white border-slate-700 hover:bg-black hover:border-slate-500 hover:text-white hover:shadow-lg transition-all font-semibold focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 focus:outline-none">
                    <Link to="/" aria-label="Return to timeline" role="button">
                      <div className="text-right">
                        <p className="text-xs max-w-[660px]">Complete</p>
                        <p className="font-medium max-w-[660px]">Back to Timeline</p>
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