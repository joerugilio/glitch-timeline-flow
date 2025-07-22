
import { aboutData } from '../data/about';
import { portfolioData } from '../data/portfolio';

export const exportDataToJson = () => {
  // Export about data
  const aboutJsonBlob = new Blob([JSON.stringify(aboutData, null, 2)], { 
    type: 'application/json' 
  });
  
  // Export portfolio data
  const portfolioJsonBlob = new Blob([JSON.stringify(portfolioData, null, 2)], { 
    type: 'application/json' 
  });

  return {
    'about.json': aboutJsonBlob,
    'portfolio.json': portfolioJsonBlob
  };
};

export const downloadJsonFiles = () => {
  const files = exportDataToJson();
  
  Object.entries(files).forEach(([filename, blob]) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
};

export const generateJsonUrls = () => {
  const files = exportDataToJson();
  const urls: Record<string, string> = {};
  
  Object.entries(files).forEach(([filename, blob]) => {
    urls[filename] = URL.createObjectURL(blob);
  });
  
  return urls;
};
