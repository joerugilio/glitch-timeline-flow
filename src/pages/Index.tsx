
import React from 'react';
import Navigation from '../components/Navigation';
import PositionAccordion from '../components/PositionAccordion';
import { portfolioData } from '../data/portfolio';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PositionAccordion positions={portfolioData.positions} />
    </div>
  );
};

export default Index;
