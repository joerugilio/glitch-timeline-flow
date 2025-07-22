export interface FileItem {
  name: string;
  path: string;
  type: 'file' | 'directory';
  size?: string;
  category: 'html' | 'css' | 'js' | 'image' | 'data' | 'other';
  description?: string;
}

export const getFileStructure = (): FileItem[] => {
  return [
    {
      name: 'index.html',
      path: '/index.html',
      type: 'file',
      size: '~15KB',
      category: 'html',
      description: 'Main HTML entry point'
    },
    {
      name: 'about.html',
      path: '/about.html',
      type: 'file',
      size: '~18KB',
      category: 'html',
      description: 'About page with personal information and contact details'
    },
    {
      name: 'files.html',
      path: '/files.html',
      type: 'file',
      size: '~12KB',
      category: 'html',
      description: 'Site files browser page for downloading static assets'
    },
    {
      name: 'index.css',
      path: '/assets/index.css',
      type: 'file',
      size: '~45KB',
      category: 'css',
      description: 'Compiled CSS bundle with Tailwind'
    },
    {
      name: 'index.js',
      path: '/assets/index.js',
      type: 'file',
      size: '~380KB',
      category: 'js',
      description: 'Main JavaScript bundle with React app'
    },
    {
      name: 'site.json',
      path: '/data/site.json',
      type: 'file',
      size: '~2KB',
      category: 'data',
      description: 'Site configuration, navigation, and company data'
    },
    {
      name: 'portfolio.json',
      path: '/data/portfolio.json',
      type: 'file',
      size: '~25KB',
      category: 'data',
      description: 'Portfolio positions, achievements, and project data'
    },
    {
      name: 'about.json',
      path: '/data/about.json',
      type: 'file',
      size: '~8KB',
      category: 'data',
      description: 'Personal information, skills, education, and biography'
    },
    {
      name: 'favicon.ico',
      path: '/favicon.ico',
      type: 'file',
      size: '~4KB',
      category: 'image',
      description: 'Site favicon'
    },
    {
      name: 'placeholder.svg',
      path: '/placeholder.svg',
      type: 'file',
      size: '~1KB',
      category: 'image',
      description: 'Placeholder image'
    },
    {
      name: 'enterprise-solutions-inc.svg',
      path: '/logos/enterprise-solutions-inc.svg',
      type: 'file',
      size: '~2KB',
      category: 'image',
      description: 'Company logo - Enterprise Solutions'
    },
    {
      name: 'financeflow.svg',
      path: '/logos/financeflow.svg',
      type: 'file',
      size: '~2KB',
      category: 'image',
      description: 'Company logo - FinanceFlow'
    },
    {
      name: 'innovatelabs.svg',
      path: '/logos/innovatelabs.svg',
      type: 'file',
      size: '~2KB',
      category: 'image',
      description: 'Company logo - InnovateLabs'
    },
    {
      name: 'startupventure.svg',
      path: '/logos/startupventure.svg',
      type: 'file',
      size: '~2KB',
      category: 'image',
      description: 'Company logo - StartupVenture'
    },
    {
      name: 'techcorp-innovation.svg',
      path: '/logos/techcorp-innovation.svg',
      type: 'file',
      size: '~2KB',
      category: 'image',
      description: 'Company logo - TechCorp Innovation'
    },
    {
      name: 'robots.txt',
      path: '/robots.txt',
      type: 'file',
      size: '~100B',
      category: 'other',
      description: 'Search engine robots file'
    }
  ];
};

export const getCategoryIcon = (category: FileItem['category']) => {
  switch (category) {
    case 'html':
      return '📄';
    case 'css':
      return '🎨';
    case 'js':
      return '⚡';
    case 'image':
      return '🖼️';
    case 'data':
      return '📊';
    default:
      return '📁';
  }
};

export const getCategoryColor = (category: FileItem['category']) => {
  switch (category) {
    case 'html':
      return 'text-orange-600';
    case 'css':
      return 'text-blue-600';
    case 'js':
      return 'text-yellow-600';
    case 'image':
      return 'text-green-600';
    case 'data':
      return 'text-purple-600';
    default:
      return 'text-gray-600';
  }
};
