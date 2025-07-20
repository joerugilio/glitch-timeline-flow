
import React, { useState } from 'react';
import { Calendar, MapPin, TrendingUp, Building2, Sparkles } from 'lucide-react';
import { Position } from '../types/portfolio';
import { parsePeriod, getTimelineRange } from '../utils/dateUtils';

interface GanttChartProps {
  positions: Position[];
}

const GanttChart: React.FC<GanttChartProps> = ({
  positions
}) => {
  const [hoveredPosition, setHoveredPosition] = useState<string | null>(null);
  const [selectedAchievements, setSelectedAchievements] = useState<{
    [key: string]: boolean;
  }>({});

  const timelineRange = getTimelineRange(positions);

  // Sort positions by newest first (descending order)
  const sortedPositions = [...positions].sort((a, b) => 
    parsePeriod(b.period).startDate.getTime() - parsePeriod(a.period).startDate.getTime()
  );

  const getPositionStyle = (position: Position) => {
    const parsed = parsePeriod(position.period);
    const endOffset = (timelineRange.end.getTime() - parsed.endDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44) / timelineRange.totalMonths;
    const width = parsed.duration / timelineRange.totalMonths;
    
    return {
      left: `${endOffset * 100}%`,
      width: `${width * 100}%`
    };
  };

  const generateTimeLabels = () => {
    const labels = [];
    const start = new Date(timelineRange.start);
    const end = new Date(timelineRange.end);
    let current = new Date(end.getFullYear(), 0, 1);
    
    while (current >= start) {
      const position = 100 - (current.getTime() - start.getTime()) / (end.getTime() - start.getTime()) * 100;
      labels.push({
        year: current.getFullYear(),
        position: position
      });
      current.setFullYear(current.getFullYear() - 1);
    }
    
    return labels;
  };

  const timeLabels = generateTimeLabels();

  const toggleAchievement = (achievementId: string) => {
    setSelectedAchievements(prev => ({
      ...prev,
      [achievementId]: !prev[achievementId]
    }));
  };

  return (
    <div className="space-y-[1vh] mt-[3vh] mx-auto mb-10 max-w-[992px]">
      <div className="bg-[#1b1f1b]/30 rounded-lg p-4">
        <h3 className="text-xl text-primary mb-4 font-normal">Experience</h3>
        
        {/* Time axis */}
        <div className="relative mb-8 h-8">
          <div className="absolute inset-0 border-b border-primary/30"></div>
          {timeLabels.map(label => (
            <div
              key={label.year}
              className="absolute transform -translate-x-1/2"
              style={{ left: `${label.position}%` }}
            >
              <div className="w-0.5 h-4 bg-primary/50 mb-1"></div>
              <span className="text-xs text-muted-foreground">{label.year}</span>
            </div>
          ))}
        </div>

        {/* Position bars */}
        <div className="space-y-3">
          {sortedPositions.map(position => {
            const positionStyle = getPositionStyle(position);
            const parsed = parsePeriod(position.period);
            
            return (
              <div key={position.id} className="relative">
                {/* Position bar */}
                <div
                  className="relative h-16 bg-primary/20 rounded border border-primary/30 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                  style={positionStyle}
                  onMouseEnter={() => setHoveredPosition(position.id)}
                  onMouseLeave={() => setHoveredPosition(null)}
                >
                  {/* Position content */}
                  <div className="absolute inset-0 p-2 flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-primary truncate">
                        {position.title}
                      </h4>
                      <p className="text-xs text-accent truncate">
                        {position.company}
                      </p>
                    </div>
                    
                    {/* Exit indicator */}
                    {position.exit && (
                      <div className="flex-shrink-0 ml-2">
                        {position.exit.type === 'IPO' ? (
                          <span className="inline-flex items-center px-1 py-0.5 rounded text-xs bg-green-500/20 text-green-400 border border-green-500/30">
                            <TrendingUp size={10} className="mr-1" />
                            IPO
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-1 py-0.5 rounded text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            <Building2 size={10} className="mr-1" />
                            ACQ
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Achievement milestones */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 flex">
                    {position.achievements.map((achievement, index) => (
                      <div
                        key={achievement.id}
                        className="flex-1 cursor-pointer"
                        onClick={() => toggleAchievement(achievement.id)}
                      >
                        <div
                          className={`h-1 transition-all duration-200 ${
                            selectedAchievements[achievement.id] 
                              ? 'bg-green-500' 
                              : 'bg-green-500/40 hover:bg-green-500/60'
                          }`}
                          title={achievement.title}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover details - matching accordion layout */}
                {hoveredPosition === position.id && (
                  <div className="absolute z-10 bottom-full left-0 mb-2 p-4 bg-card/90 backdrop-blur-sm border border-border/60 rounded-lg shadow-lg min-w-96 max-w-lg">
                    <div className="space-y-3">
                      {/* Header - matching accordion style */}
                      <div className="flex flex-col md:flex-row md:justify-between">
                        <div>
                          <h2 className="text-xl md:text-2xl text-primary font-normal">
                            {position.title}
                          </h2>
                          <p className="text-lg text-accent font-normal">
                            {position.company}
                          </p>
                        </div>
                        <div className="flex flex-col mt-1 md:mt-0 text-right">
                          <div className="flex items-center justify-end text-muted-foreground text-sm mb-1">
                            <Calendar size={14} className="mr-1" />
                            <span>{position.period}</span>
                          </div>
                          <div className="flex items-center justify-end text-muted-foreground text-sm mb-1">
                            <MapPin size={14} className="mr-1" />
                            <span>{position.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Blurb - matching accordion style */}
                      <p className="text-muted-foreground leading-relaxed pl-[2vw]">
                        {position.blurb}
                      </p>

                      {/* Tags and Exit info - matching accordion layout */}
                      <div className="flex flex-wrap justify-between items-end gap-1 pl-[2vw]">
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
                )}

                {/* Achievement details */}
                {position.achievements.map(achievement => 
                  selectedAchievements[achievement.id] && (
                    <div key={achievement.id} className="mt-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <h5 className="text-sm font-medium text-green-400 mb-1">
                        <Sparkles className="inline w-3 h-3 mr-1" />
                        {achievement.title}
                      </h5>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {achievement.description}
                      </p>
                      
                      {/* Achievement images thumbnails */}
                      {achievement.images.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {achievement.images.slice(0, 3).map((image, index) => (
                            <div key={index} className="w-8 h-6 rounded overflow-hidden border border-gray-300 flex-shrink-0">
                              <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
                            </div>
                          ))}
                          {achievement.images.length > 3 && (
                            <div className="w-8 h-6 rounded bg-gray-300 border border-gray-400 flex items-center justify-center text-xs text-gray-600 flex-shrink-0">
                              +{achievement.images.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-3 border-t border-primary/20">
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-3 h-1 bg-green-500/40"></div>
              <span>Achievements (click to expand)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500/20 border border-green-500/30 rounded"></div>
              <span>IPO</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500/20 border border-blue-500/30 rounded"></div>
              <span>Acquisition</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
