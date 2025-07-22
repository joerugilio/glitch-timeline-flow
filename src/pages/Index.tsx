
import React from 'react';
import Navigation from '../components/Navigation';
import PositionAccordion from '../components/PositionAccordion';
import { portfolioData } from '../data/portfolio';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url(/images/about/workspace.jpg)'
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <div className="px-0 py-1">
          {portfolioData.positions.map((position) => (
            <PositionAccordion key={position.id} position={position} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
