import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, MapPin, Tag, TrendingUp, Building2, Sparkles } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import AchievementImages from './AchievementImages';
import GanttChart from './GanttChart';
import { Position } from '../types/portfolio';

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
  const [selectedView, setSelectedView] = useState<'tiles' | 'timeline' | 'gantt'>('tiles');

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

  // Scroll to middle position on mount
  useEffect(() => {
    const scrollToMiddle = () => {
      const splitContainer = document.querySelector('[data-split-content]');
      if (splitContainer) {
        const containerHeight = splitContainer.scrollHeight;
        const viewportHeight = window.innerHeight;
        const middlePosition = (containerHeight - viewportHeight) / 2;
        window.scrollTo({ top: middlePosition, behavior: 'smooth' });
      }
    };
    
    // Delay to ensure content is rendered
    setTimeout(scrollToMiddle, 100);
  }, []);

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
  };

  const handleAchievementChange = (positionId: string, value: string[]) => {
    const newExpandedAchievements = {
      ...expandedAchievements,
      [positionId]: value
    };
    setExpandedAchievements(newExpandedAchievements);
    updateURL(expandedPositions, newExpandedAchievements);
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
    
    // Scroll to position after view transition
    setTimeout(() => {
      const element = document.querySelector(`[data-accordion-item="${positionId}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 500);
  };

  const handleMouseEnter = (positionId: string) => {
    console.log('Hovering over position:', positionId);
    setHoveredPosition(positionId);
  };

  const handleMouseLeave = () => {
    console.log('Mouse left position');
    setHoveredPosition(null);
  };

  // Get current background image (hover takes priority over expanded)
  const getCurrentBackgroundImage = () => {
    const targetPosition = hoveredPosition || (expandedPositions.length > 0 ? expandedPositions[0] : null);
    if (targetPosition) {
      const position = positions.find(p => p.id === targetPosition);
      return position?.imageUrl;
    }
    return null;
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
        <div className="w-full px-[15px]">
          <header className="text-center mb-8 h-1/4">
            <h2 className="hero-title caption-timeline mb-4">
              <span>user-centered leadership robust-ops strategy + brand-science</span> 
            </h2>
            
            <div className="hero-subtitle caption-timeline pl-[20vw]">
              <span>UX Product & Design Principal</span> 
              <span>Multiple Exits B2C, B2B</span>
              <span>Award Winning Regulated AI ML <Sparkles className="inline w-4 h-4 ml-1" /></span>
              <span>Consumer-Grade Enterprise</span>
            </div>
          </header>

          {/* Custom Split View Container */}
          <div className="w-full" data-split-content>
            {/* Sticky Navigation */}
            <div className="sticky top-16 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 mb-8">
              <div className="max-w-[992px] mx-auto py-4">
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setSelectedView('tiles')}
                    className={`p-3 rounded-md font-medium transition-all duration-300 ${
                      selectedView === 'tiles' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    Tiles
                  </button>
                  <button
                    onClick={() => setSelectedView('timeline')}
                    className={`p-3 rounded-md font-medium transition-all duration-300 ${
                      selectedView === 'timeline' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    Timeline
                  </button>
                  <button
                    onClick={() => setSelectedView('gantt')}
                    className={`p-3 rounded-md font-medium transition-all duration-300 ${
                      selectedView === 'gantt' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    Gantt
                  </button>
                </div>
              </div>
            </div>

            {/* Content Container */}
            <div className="transition-all duration-500 ease-in-out flex justify-center">
              
              {/* Tiles View */}
              {selectedView === 'tiles' && (
                <div className="w-full max-w-[992px]">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {positions.map(position => (
                      <div
                        key={position.id}
                        onClick={() => {
                          setSelectedView('timeline');
                          setExpandedPositions([position.id]);
                          setExpandedAchievements({});
                          updateURL([position.id], {});
                        }}
                        onMouseEnter={() => handleMouseEnter(position.id)}
                        onMouseLeave={handleMouseLeave}
                        className="group relative overflow-hidden rounded-lg border border-border/50 bg-card/30 hover:bg-card/60 transition-all duration-300 cursor-pointer hover:border-primary/50 hover:scale-105 backdrop-blur-sm"
                      >
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-semibold text-primary line-clamp-2 group-hover:text-primary/90">
                              {position.title}
                            </h3>
                            {position.exit && (
                              <div className="flex-shrink-0 ml-2">
                                {position.exit.type === 'IPO' ? (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                                    <TrendingUp size={10} className="mr-1" />
                                    IPO
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                    <Building2 size={10} className="mr-1" />
                                    Exit
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          
                          <p className="text-accent font-medium mb-2">{position.company}</p>
                          
                          <div className="flex items-center text-xs text-muted-foreground mb-3 gap-3">
                            <div className="flex items-center">
                              <Calendar size={12} className="mr-1" />
                              <span>{position.period}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin size={12} className="mr-1" />
                              <span>{position.location}</span>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
                            {position.blurb}
                          </p>
                          
                          <div className="flex flex-wrap gap-1 mb-2">
                            {position.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                                {tag}
                              </span>
                            ))}
                            {position.tags.length > 3 && (
                              <span className="text-xs text-muted-foreground px-2 py-1">
                                +{position.tags.length - 3}
                              </span>
                            )}
                          </div>
                          
                          <div className="text-xs text-muted-foreground">
                            {position.achievements.length} achievement{position.achievements.length !== 1 ? 's' : ''}
                          </div>
                        </div>
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Timeline Section */}
              {selectedView === 'timeline' && (
                <div className="w-full max-w-[992px]">
                  <div className={`transition-all duration-500 ${expandedPositions.length > 0 ? 'w-full' : 'w-[70%] mx-auto'}`}>
                    <div className="space-y-[1vh] mt-[3vh] mx-auto mb-10">
                      <Accordion type="multiple" value={expandedPositions} onValueChange={handlePositionChange} className="space-y-[1vh]">
                        {positions.map(position => (
                          <AccordionItem key={position.id} value={position.id} data-accordion-item={position.id} className="border border-transparent hover:border-primary/30 data-[state=open]:border-primary/50 data-[state=open]:hover:border-primary/70 transition-all duration-300 rounded-lg bg-[#1b1f1b]/30 hover:bg-[#1b1f1b] data-[state=open]:bg-[#1b1f1b]">
                            <AccordionTrigger onMouseEnter={() => handleMouseEnter(position.id)} onMouseLeave={handleMouseLeave} className="p-3 hover:no-underline pt-[5px] pb-0 px-[15px] rounded-t-lg data-[state=open]:rounded-b-none hover:bg-primary/10 data-[state=open]:hover:bg-green-500/20">
                              <div className="flex items-center justify-between w-full">
                                <div className="flex-1 text-left backdrop-blur-md data-[state=open]:backdrop-blur-none transition-all duration-300">
                                  <div className="flex flex-col md:flex-row md:justify-between mb-0">
                                    <div>
                                      <h2 className="text-xl md:text-2xl text-primary transition-colors font-normal">
                                        {position.title}
                                      </h2>
                                      <p className="text-lg text-accent font-normal">
                                        {position.company}
                                      </p>
                                    </div>
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
                                  </div>

                                  <p className="text-muted-foreground mb-1 leading-relaxed pl-[2vw]">
                                    {position.blurb}
                                  </p>

                                  <div className="flex flex-wrap justify-between items-end gap-1 mb-3 pl-[2vw]">
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
                                  <h3 className="text-lg font-semibold mb-1 text-muted-foreground">Key Achievements</h3>
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
              )}

              {/* Gantt Chart Section */}
              {selectedView === 'gantt' && (
                <div className="w-full max-w-[992px]">
                  <GanttChart positions={positions} onPositionClick={handleGanttPositionClick} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionAccordion;