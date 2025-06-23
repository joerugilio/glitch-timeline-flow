
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, MapPin, Tag, ExternalLink } from 'lucide-react';
import Navigation from '../components/Navigation';
import { portfolioData } from '../data/portfolio';

const PositionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const position = portfolioData.positions.find(p => p.id === id);
  const currentIndex = portfolioData.positions.findIndex(p => p.id === id);
  const nextPosition = currentIndex < portfolioData.positions.length - 1 
    ? portfolioData.positions[currentIndex + 1] 
    : null;
  const prevPosition = currentIndex > 0 
    ? portfolioData.positions[currentIndex - 1] 
    : null;

  if (!position) {
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${position.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-noise" />
        <div className="absolute inset-0 bg-gradient-dark" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <Link
            to="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 group"
            aria-label="Back to timeline"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Timeline
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">
                  {position.title}
                </h1>
                <h2 className="text-2xl md:text-3xl text-accent font-semibold mb-4">
                  {position.company}
                </h2>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4 text-muted-foreground mb-6">
              <div className="flex items-center">
                <Calendar size={18} className="mr-2" aria-hidden="true" />
                <span className="font-medium">{position.period}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={18} className="mr-2" aria-hidden="true" />
                <span>{position.location}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {position.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/20 text-primary border border-primary/30"
                >
                  <Tag size={12} className="mr-1" aria-hidden="true" />
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Content */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Overview</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {position.description}
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Key Achievements</h3>
                <ul className="space-y-3" role="list">
                  {position.achievements.map((achievement, index) => (
                    <li 
                      key={index}
                      className="flex items-start text-muted-foreground"
                      role="listitem"
                    >
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" aria-hidden="true" />
                      <span className="leading-relaxed">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="space-y-6">
              <div className="bg-card/40 backdrop-blur-sm border border-border rounded-lg p-6">
                <img
                  src={position.imageUrl}
                  alt={`${position.title} at ${position.company}`}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-sm text-muted-foreground text-center">
                  Project environment and workspace
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-16 pt-8 border-t border-border" aria-label="Position navigation">
            <div className="flex justify-between items-center">
              {prevPosition ? (
                <Link
                  to={`/position/${prevPosition.id}`}
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
                  to={`/position/${nextPosition.id}`}
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors group text-right"
                  aria-label={`Next: ${nextPosition.title}`}
                >
                  <div className="text-right">
                    <p className="text-sm">Next</p>
                    <p className="font-medium">{nextPosition.title}</p>
                  </div>
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
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
