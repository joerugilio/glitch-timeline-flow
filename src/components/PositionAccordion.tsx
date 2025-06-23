
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Calendar, Tag } from 'lucide-react';
import { Position } from '../types/portfolio';

interface PositionAccordionProps {
  positions: Position[];
}

const PositionAccordion: React.FC<PositionAccordionProps> = ({
  positions
}) => {
  const [hoveredPosition, setHoveredPosition] = useState<string | null>(null);

  const handleMouseEnter = (positionId: string) => {
    console.log('Hovering over position:', positionId);
    setHoveredPosition(positionId);
  };

  const handleMouseLeave = () => {
    console.log('Mouse left position');
    setHoveredPosition(null);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
          style={{
            backgroundImage: hoveredPosition ? `url(${positions.find(p => p.id === hoveredPosition)?.imageUrl})` : 'none',
            opacity: hoveredPosition ? 0.9 : 0
          }}
        />
        <div
          className="absolute inset-0 bg-noise transition-opacity duration-700"
          style={{
            opacity: hoveredPosition ? 0.1 : 1
          }}
        />
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: hoveredPosition 
              ? 'linear-gradient(135deg, hsl(var(--background) / 0.3) 0%, hsl(12 8% 12% / 0.4) 50%, hsl(var(--background) / 0.3) 100%)'
              : 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(12 8% 12%) 50%, hsl(var(--background)) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <h1 data-text="Career Timeline" className="text-3xl font-bold mb-4 glitch md:text-3xl">
              Career Timeline
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A journey through product design, leadership, and innovation across multiple successful ventures
            </p>
          </header>

          <div className="space-y-3" role="list" aria-label="Career positions">
            {positions.map((position, index) => (
              <Link
                key={position.id}
                to={`/position/${position.id}`}
                className="block group"
                onMouseEnter={() => handleMouseEnter(position.id)}
                onMouseLeave={handleMouseLeave}
                onFocus={() => handleMouseEnter(position.id)}
                onBlur={handleMouseLeave}
                role="listitem"
                aria-label={`View details for ${position.title} at ${position.company}`}
              >
                <div className="bg-card/40 backdrop-blur-sm border border-border rounded-lg p-4 hover-lift hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <div>
                          <h2 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                            {position.title}
                          </h2>
                          <p className="text-lg text-accent font-medium">
                            {position.company}
                          </p>
                        </div>
                        <div className="flex flex-col md:text-right mt-1 md:mt-0">
                          <div className="flex items-center text-muted-foreground text-sm mb-1">
                            <Calendar size={14} className="mr-1" aria-hidden="true" />
                            <span>{position.period}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground text-sm">
                            <MapPin size={14} className="mr-1" aria-hidden="true" />
                            <span>{position.location}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-3 leading-relaxed">
                        {position.blurb}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {position.tags.slice(0, 4).map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30"
                          >
                            <Tag size={10} className="mr-1" aria-hidden="true" />
                            {tag}
                          </span>
                        ))}
                        {position.tags.length > 4 && (
                          <span className="text-xs text-muted-foreground px-2 py-1">
                            +{position.tags.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="ml-3">
                      <ChevronRight size={24} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionAccordion;
