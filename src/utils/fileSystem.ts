
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
