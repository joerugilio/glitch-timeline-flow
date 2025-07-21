
import React from 'react';

interface CompanyLogoProps {
  company: string;
  logoUrl?: string;
  className?: string;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ company, logoUrl, className = "flex-shrink-0" }) => {
  // Fallback logo mapping for backward compatibility
  const getLogoPath = (companyName: string): string => {
    const logoMap: Record<string, string> = {
      'TechCorp Innovation': '/logos/techcorp-innovation.svg',
      'FinanceFlow': '/logos/financeflow.svg',
      'StartupVenture': '/logos/startupventure.svg',
      'Enterprise Solutions Inc': '/logos/enterprise-solutions-inc.svg',
      'InnovateLabs': '/logos/innovatelabs.svg'
    };
    
    return logoMap[companyName] || '/logos/techcorp-innovation.svg';
  };

  const logoPath = logoUrl || getLogoPath(company);

  return (
    <img 
      src={logoPath}
      alt={`${company} logo`}
      className={className}
      width={180}
      height={60}
    />
  );
};

export default CompanyLogo;
