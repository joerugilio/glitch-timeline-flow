
import React from 'react';
import Navigation from '../components/Navigation';
import PositionAccordion from '../components/PositionAccordion';
import { portfolioData } from '../data/portfolio';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="px-1 py-1 bg-gradient-dark">
        <PositionAccordion positions={portfolioData.positions} />
      </div>
    </div>
  );
};

export default Index;
