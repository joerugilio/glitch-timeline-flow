import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, MapPin, Tag, TrendingUp, Building2, Sparkles } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import AchievementImages from './AchievementImages';
import GanttChart from './GanttChart';
import CompanyLogo from './CompanyLogo';
import { Position } from '../types/portfolio';
import siteData from '../data/site.json';

interface PositionAccordionProps {
  positions: Position[];
}

const PositionAccordion: React.FC<PositionAccordionProps> = ({
  positions
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hoveredPosition, setHoveredPosition] = useState<string | null>(null);
  const [expandedPositions, setExpandedPositions] = useState<string[]>([]);
  const [expandedAchievements, setExpandedAchievements] = useState<{
    [positionId: string]: string[];
  }>({});
  const [selectedView, setSelectedView] = useState<'split' | 'timeline' | 'gantt'>('split');

  // Initialize state from URL parameters
  useEffect(() => {
    const positionParam = searchParams.get('position');
    const achievementParam = searchParams.get('achievement');
    if (positionParam) {
      const positions = positionParam.split(',');
      setExpandedPositions(positions);
    }
    if (achievementParam && positionParam) {
      const achievements = achievementParam.split(',');
      const positionIds = positionParam.split(',');
      const achievementMap: {
        [key: string]: string[];
      } = {};
      positionIds.forEach(posId => {
        achievementMap[posId] = achievements;
      });
      setExpandedAchievements(achievementMap);
    }
  }, [searchParams]);

  const updateURL = (newExpandedPositions: string[], newExpandedAchievements: {
    [key: string]: string[];
  }) => {
    const params = new URLSearchParams();
    if (newExpandedPositions.length > 0) {
      params.set('position', newExpandedPositions.join(','));
      const allAchievements = Object.values(newExpandedAchievements).flat();
      if (allAchievements.length > 0) {
        params.set('achievement', allAchievements.join(','));
      }
    }
    setSearchParams(params);
  };

  const handlePositionChange = (value: string[]) => {
    const wasInSplitView = selectedView === 'split';
    const isExpanding = value.length > expandedPositions.length;
    
    // Find newly expanded position for scroll targeting
    const newlyExpandedPosition = value.find(posId => !expandedPositions.includes(posId));
    
    setExpandedPositions(value);

    // Clean up achievements for collapsed positions
    const newExpandedAchievements = {
      ...expandedAchievements
    };
    Object.keys(newExpandedAchievements).forEach(posId => {
      if (!value.includes(posId)) {
        delete newExpandedAchievements[posId];
      }
    });
    setExpandedAchievements(newExpandedAchievements);
    updateURL(value, newExpandedAchievements);

    // If we're in split view and expanding an accordion, switch to timeline and scroll
    if (wasInSplitView && isExpanding && value.length > 0) {
      setSelectedView('timeline');
      // Scroll to sticky nav after view transition
      setTimeout(() => {
        scrollToStickyNav();
      }, 500);
    }
    // If we're already in timeline view and expanding, scroll to the expanded item
    else if (selectedView === 'timeline' && isExpanding && newlyExpandedPosition) {
      // Wait for accordion animation to complete before scrolling
      setTimeout(() => {
        scrollToPositionRespectingTabs(newlyExpandedPosition);
      }, 300);
    }
  };

  const handleAchievementChange = (positionId: string, value: string[]) => {
    const newExpandedAchievements = {
      ...expandedAchievements,
      [positionId]: value
    };
    setExpandedAchievements(newExpandedAchievements);
    updateURL(expandedPositions, newExpandedAchievements);
  };

  const scrollToPositionRespectingTabs = (positionId: string) => {
    const element = document.querySelector(`[data-accordion-item="${positionId}"]`);
    const stickyNav = document.querySelector('[data-sticky-nav]');
    
    if (element && stickyNav) {
      const stickyNavRect = stickyNav.getBoundingClientRect();
      const stickyNavHeight = stickyNavRect.height;
      const stickyNavTop = 32; // top-8 = 32px
      const bufferSpace = 24; // Additional breathing room
      
      const elementRect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Calculate target position: element top - sticky nav height - top positioning - buffer
      const targetPosition = scrollTop + elementRect.top - stickyNavHeight - stickyNavTop - bufferSpace;
      
      window.scrollTo({
        top: Math.max(0, targetPosition), // Ensure we don't scroll above page top
        behavior: 'smooth'
      });
    }
  };

  const handleGanttPositionClick = (positionId: string) => {
    // Switch to timeline view
    setSelectedView('timeline');
    
    // Open the clicked position in the accordion
    const newExpandedPositions = [positionId];
    setExpandedPositions(newExpandedPositions);
    
    // Clear achievements for clean state
    const newExpandedAchievements: { [key: string]: string[] } = {};
    setExpandedAchievements(newExpandedAchievements);
    
    // Update URL
    updateURL(newExpandedPositions, newExpandedAchievements);
    
    // Scroll to position after view transition with proper tab respect
    setTimeout(() => {
      scrollToPositionRespectingTabs(positionId);
    }, 500);
  };

  const scrollToStickyNav = () => {
    const stickyNav = document.querySelector('[data-sticky-nav]');
    if (stickyNav) {
      const rect = stickyNav.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetPosition = scrollTop + rect.top - 32; // Account for top-8 (32px) positioning
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleTabClick = (newView: 'split' | 'timeline' | 'gantt') => {
    setSelectedView(newView);
    
    // Scroll to position sticky nav at top after state change
    setTimeout(() => {
      scrollToStickyNav();
    }, 100);
  };

  const handleMouseEnter = (positionId: string) => {
    console.log('Hovering over position:', positionId);
    setHoveredPosition(positionId);
  };

  const handleMouseLeave = () => {
    console.log('Mouse left position');
    setHoveredPosition(null);
  };

  // Get current background image (hover takes priority over expanded, then default)
  const getCurrentBackgroundImage = () => {
    const targetPosition = hoveredPosition || (expandedPositions.length > 0 ? expandedPositions[0] : null);
    if (targetPosition) {
      const position = positions.find(p => p.id === targetPosition);
      return position?.imageUrl;
    }
    // Return default background image from site configuration
    return siteData.site.defaultBackgroundImage;
  };

  const currentImageUrl = getCurrentBackgroundImage();

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out" style={{
          backgroundImage: currentImageUrl ? `url(${currentImageUrl})` : 'none',
          opacity: currentImageUrl ? 0.9 : 0
        }} />
        <div className="absolute inset-0 bg-noise transition-opacity duration-700" style={{
          opacity: currentImageUrl ? 0.1 : 1
        }} />
        <div className="absolute inset-0 transition-all duration-700" style={{
          background: currentImageUrl ? 'linear-gradient(135deg, hsl(var(--background) / 0.3) 0%, hsl(12 8% 12% / 0.4) 50%, hsl(var(--background) / 0.3) 100%)' : 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(12 8% 12%) 50%, hsl(var(--background)) 100%)'
        }} />
      </div>

      <div className="relative z-10 pt-12 pb-12">
        <div className="w-full">
          <header className="text-center mb-8 h-1/4">
            <h2 className="hero-title caption-timeline mb-4">
              <span style={{color: "rgba(129, 228, 154, 0.89)"}}>
                user-centered leadership robust-ops strategy + brand-science
              </span>
            </h2>
            
            <div className="hero-subtitle caption-timeline w-full flex justify-center items-center flex-wrap gap-2 px-[clamp(5vw,10vw,20vw)]">
              <span>UX Product & Design Principal</span>
              <span>-</span>
              <span>Multiple Exits B2C, B2B</span>
              <span>-</span>
              <span><Sparkles className="inline w-4 h-4 ml-1" /> Award Winning Regulated AI ML</span> 
              <span>-</span>
              <span>Consumer-Grade Enterprise</span>
            </div>
          </header>

          {/* Custom Split View Container */}
          <div className="w-full" data-split-content>
            {/* Sticky Navigation */}
            <div className="sticky top-8 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 mb-8" data-sticky-nav>
              <div className="w-full py-1">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleTabClick('timeline')}
                    className={`p-3 rounded-md font-medium transition-all duration-300 ${
                      selectedView === 'timeline' 
                        ? 'bg-green-600 text-white shadow-lg' 
                        : 'bg-green-500 text-white hover:bg-muted hover:text-muted-foreground'
                    }`}
                  >
                    Details Timeline
                  </button>
                  <button
                    onClick={() => handleTabClick('gantt')}
                    className={`p-3 rounded-md font-medium transition-all duration-300 ${
                      selectedView === 'gantt' 
                        ? 'bg-green-600 text-white shadow-lg' 
                        : 'bg-green-500 text-white hover:bg-muted hover:text-muted-foreground'
                    }`}
                  >
                    Quick View
                  </button>
                </div>
              </div>
            </div>

            {/* Split Content Container */}
            <div className={`transition-all duration-500 ease-in-out h-auto ${
              selectedView === 'gantt' ? 'w-full' 
              : selectedView === 'timeline' ? 'w-full'
              : 'w-fit mx-auto'
            } ${
              selectedView === 'split' 
                ? 'flex gap-4 items-start' 
                : 'flex justify-center items-start'
            }`}>
              
              {/* Timeline Section */}
              <div className={`transition-all duration-500 ease-in-out ${
                selectedView === 'timeline' 
                  ? 'w-full' 
                  : selectedView === 'gantt' 
                    ? 'hidden' 
                    : 'w-[45%] transform scale-75 origin-top'
              }`}>
                <div className="w-full">
                  <div className="space-y-[1vh] mt-[3vh] mb-10">
                    <Accordion type="multiple" value={expandedPositions} onValueChange={handlePositionChange} className="space-y-[1vh]">
                      {positions.map(position => (
                        <AccordionItem key={position.id} value={position.id} data-accordion-item={position.id} className="border border-transparent hover:border-primary/30 data-[state=open]:border-primary/50 data-[state=open]:hover:border-primary/70 transition-all duration-300 rounded-lg bg-[#1b1f1b]/30 hover:bg-[#1b1f1b] data-[state=open]:bg-[#1b1f1b]">
                          <AccordionTrigger onMouseEnter={() => handleMouseEnter(position.id)} onMouseLeave={handleMouseLeave} className="p-3 hover:no-underline pt-[5px] pb-0 px-[15px] rounded-t-lg data-[state=open]:rounded-b-none hover:bg-primary/10 data-[state=open]:hover:bg-green-500/20">
                            <div className="flex items-center justify-between w-full">
                              <div className="flex flex-col sm:flex-row items-start w-full backdrop-blur-md data-[state=open]:backdrop-blur-none transition-all duration-300">
                                <CompanyLogo company={position.company} logoUrl={position.logoUrl} />
                                <div className="flex-1 ml-0 sm:ml-3 mt-3 sm:mt-0">
                                  <div className="flex flex-col md:flex-row md:justify-between mb-0">
                                    <div>
                                      <h2 className="text-xl md:text-2xl text-primary transition-colors font-normal text-left">
                                        {position.title}
                                      </h2>
                                      <p className="text-lg text-accent font-normal text-left">
                                        {position.company}
                                      </p>
                                    </div>
                                    {(selectedView !== 'split' || expandedPositions.includes(position.id)) && (
                                      <div className="flex flex-shrink flex-row mt-1 md:mt-0 justify-end text-right text-primary-foreground">
                                        <div className="flex items-center justify-end text-muted-foreground text-sm mb-1">
                                          <Calendar size={14} className="mr-1" aria-hidden="true" />
                                          <span>{position.period}</span>
                                        </div>
                                        <div className="flex items-center justify-end text-muted-foreground text-sm mb-1">
                                          <MapPin size={14} className="mr-1" aria-hidden="true" />
                                          <span className="h-auto">{position.location}</span>
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {(selectedView !== 'split' || expandedPositions.includes(position.id)) && (
                                    <p className="text-muted-foreground mb-1 leading-relaxed text-left">
                                      {position.blurb}
                                    </p>
                                  )}

                                  {(selectedView !== 'split' || expandedPositions.includes(position.id)) && (
                                    <div className="flex flex-wrap justify-between items-end gap-1 mb-3">
                                      <div className="flex flex-wrap gap-1">
                                        {position.tags.slice(0, 4).map(tag => (
                                          <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full font-medium bg-primary/20 text-sm">
                                            {tag}
                                          </span>
                                        ))}
                                        {position.tags.length > 4 && (
                                          <span className="text-xs text-muted-foreground px-2 py-1">
                                            +{position.tags.length - 4} more
                                          </span>
                                        )}
                                      </div>
                                      
                                      {position.exit && (
                                        <div className="flex items-center gap-1">
                                          {position.exit.type === 'IPO' ? (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full font-medium bg-green-500/20 text-green-400 text-sm border border-green-500/30">
                                              <TrendingUp size={12} className="mr-1" />
                                              IPO
                                            </span>
                                          ) : (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full font-medium bg-blue-500/20 text-blue-400 text-sm border border-blue-500/30">
                                              <Building2 size={12} className="mr-1" />
                                              Acquired by {position.exit.company}
                                            </span>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </AccordionTrigger>

                          <AccordionContent className="px-2 pt-2 rounded-b-lg">
                            <div className="backdrop-blur-xl px-2 py-2 rounded-sm space-y-3">
                              <header className="mb-3">
                                <p className="leading-relaxed mb-2 text-slate-50 max-w-[660px] text-lg font-normal">
                                  {position.description}
                                </p>
                              </header>

                              <section className="px-2 py-2">
                                <h3 className="text-lg font-normal mb-1 text-muted-foreground">Key Achievements</h3>
                                <Accordion type="multiple" value={expandedAchievements[position.id] || []} onValueChange={value => handleAchievementChange(position.id, value)}>
                                  {position.achievements.map(achievement => (
                                    <AccordionItem key={achievement.id} value={achievement.id} className="bg-card/60 backdrop-blur-sm border-0 border-border/60 rounded-lg hover:border-primary/40 hover:bg-card/80 transition-all duration-300 data-[state=open]:border-primary/60 data-[state=open]:bg-card/90 data-[state=open]:shadow-lg data-[state=open]:shadow-primary/10">
                                      <AccordionTrigger className="px-2 py-2 hover:no-underline rounded-t-lg text-sm font-semibold transition-all duration-200 text-green-500 bg-green-500/20 hover:bg-green-500/30">
                                        <div className="flex-1 text-left backdrop-blur-md data-[state=open]:backdrop-blur-none transition-all duration-300">
                                          <span className="block mb-1 text-lg text-white">{achievement.title}</span>
                                          <div className={`flex gap-1 overflow-hidden transition-all duration-300 ${(expandedAchievements[position.id] || []).includes(achievement.id) ? 'opacity-0 h-0 transform scale-95' : 'opacity-100 h-6 transform scale-100'}`}>
                                            {achievement.images.slice(0, 4).map((image, index) => (
                                              <div key={index} className="w-8 h-6 rounded overflow-hidden border border-gray-300 flex-shrink-0">
                                                <img src={image.url} alt="" className="w-full h-full object-cover" />
                                              </div>
                                            ))}
                                            {achievement.images.length > 4 && (
                                              <div className="w-8 h-6 rounded bg-gray-300 border border-gray-400 flex items-center justify-center text-xs text-gray-600 flex-shrink-0">
                                                +{achievement.images.length - 4}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </AccordionTrigger>
                                      <AccordionContent className="px-2 pt-2">
                                        <div className="space-y-2">
                                          <p className="text-white leading-relaxed max-w-[660px] text-base font-normal">
                                            {achievement.description}
                                          </p>
                                          
                                          <AchievementImages images={achievement.images} />
                                        </div>
                                      </AccordionContent>
                                    </AccordionItem>
                                  ))}
                                </Accordion>
                              </section>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </div>

              {/* Gantt Chart Section */}
              <div className={`transition-all duration-500 ease-in-out ${
                selectedView === 'gantt' 
                  ? 'w-full' 
                  : selectedView === 'timeline' 
                    ? 'hidden' 
                    : 'w-[55%] transform scale-75 origin-top'
              }`}>
                <GanttChart 
                  positions={positions} 
                  onPositionClick={handleGanttPositionClick}
                  onPositionHover={handleMouseEnter}
                  onPositionLeave={handleMouseLeave}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionAccordion;
