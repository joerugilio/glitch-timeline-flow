
import React from 'react';
import Navigation from '../components/Navigation';
import PositionAccordion from '../components/PositionAccordion';
import portfolioData from '../data/portfolio.json';
import { PortfolioData, Position } from '../types/portfolio';

// Type validation function to ensure JSON data matches TypeScript types
const validatePortfolioData = (data: any): PortfolioData => {
  return {
    positions: data.positions.map((pos: any): Position => ({
      ...pos,
      exit: pos.exit ? {
        ...pos.exit,
        type: pos.exit.type as "IPO" | "Acquisition"
      } : undefined
    }))
  };
};

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
          <PositionAccordion positions={validatePortfolioData(portfolioData).positions} />
        </div>
      </div>
    </div>
  );
};

export default Index;
