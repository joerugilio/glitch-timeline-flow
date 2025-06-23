
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-dark" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <div className="px-1 py-1">
          <PositionAccordion positions={portfolioData.positions} />
        </div>
      </div>
    </div>
  );
};

export default Index;
