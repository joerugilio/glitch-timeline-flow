import { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  positions: [
    {
      id: 'principal-designer-tech',
      title: 'Principal Design Director',
      company: 'TechCorp Innovation',
      period: '2022 - Present',
      location: 'San Francisco, CA',
      blurb: 'Leading design strategy and operations for a multi-billion dollar tech platform',
      description: 'Spearheading design strategy across multiple product lines, establishing design systems, and building world-class design teams. Focus on user-centered innovation and scalable design processes.',
      tags: ['principal', 'design ops', 'design2code', 'international design team', 'full-stack ux'],
      imageUrl: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&h=800&fit=crop',
      achievements: [
        {
          id: 'team-scaling',
          title: 'Built design team from 3 to 25 designers across 4 countries',
          description: 'Led the strategic expansion of our design organization from a small team of 3 to a world-class team of 25 designers distributed across San Francisco, London, Tokyo, and São Paulo. Implemented cross-cultural collaboration frameworks, established mentorship programs, and created scalable hiring processes that maintained design quality while accelerating team growth.',
          images: [
            {
              url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
              alt: 'International team collaboration meeting',
              caption: 'Cross-cultural design team collaboration'
            },
            {
              url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop',
              alt: 'Design team workspace',
              caption: 'Modern collaborative workspace design'
            },
            {
              url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
              alt: 'Team planning session',
              caption: 'Strategic planning and design workshops'
            }
          ]
        },
        {
          id: 'design-to-code',
          title: 'Implemented design-to-code workflow reducing development time by 40%',
          description: 'Pioneered an innovative design-to-code pipeline using advanced design tokens, component libraries, and automated code generation tools. This revolutionary workflow eliminated traditional handoff friction between design and engineering teams, resulting in pixel-perfect implementations and dramatically faster product delivery cycles.',
          images: [
            {
              url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
              alt: 'Code generation workflow',
              caption: 'Automated design-to-code pipeline'
            },
            {
              url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
              alt: 'Design system components',
              caption: 'Comprehensive design system library'
            }
          ]
        },
        {
          id: 'user-engagement',
          title: 'Led redesign resulting in 300% increase in user engagement',
          description: 'Orchestrated a comprehensive platform redesign focused on user-centered design principles, data-driven insights, and innovative interaction patterns. The redesign transformed user experience across all touchpoints, resulting in unprecedented engagement metrics and establishing new industry benchmarks for digital product design.',
          images: [
            {
              url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
              alt: 'User engagement analytics dashboard',
              caption: 'Real-time engagement metrics and analytics'
            },
            {
              url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
              alt: 'User interface redesign',
              caption: 'Before and after interface comparison'
            },
            {
              url: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=600&fit=crop',
              alt: 'User testing session',
              caption: 'Comprehensive user research and testing'
            },
            {
              url: 'https://images.unsplash.com/photo-1562577309-2592ab84b1bc?w=800&h=600&fit=crop',
              alt: 'Design presentation',
              caption: 'Stakeholder alignment and design presentation'
            }
          ]
        }
      ]
    },
    {
      id: 'design-lead-fintech',
      title: 'Senior Design Lead',
      company: 'FinanceFlow',
      period: '2020 - 2022',
      location: 'New York, NY',
      blurb: 'Transforming financial services through human-centered design',
      description: 'Led product design for B2B financial platform serving Fortune 500 companies. Established design practices and mentored junior designers while driving product strategy.',
      tags: ['market leadership', 'full-stack ux', 'started design team', 'data-science'],
      imageUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&h=800&fit=crop',
      achievements: [
        {
          id: 'transaction-platform',
          title: 'Designed platform processing $2B+ in transactions monthly',
          description: 'Created a sophisticated financial platform architecture capable of handling massive transaction volumes with enterprise-grade security and compliance. The platform serves Fortune 500 companies with complex financial workflows, real-time processing capabilities, and comprehensive audit trails.',
          images: [
            {
              url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
              alt: 'Financial dashboard interface',
              caption: 'Real-time transaction monitoring dashboard'
            },
            {
              url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
              alt: 'Data visualization',
              caption: 'Advanced financial data visualization'
            },
            {
              url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
              alt: 'Platform architecture',
              caption: 'Scalable platform architecture design'
            },
            {
              url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=600&fit=crop',
              alt: 'Security features',
              caption: 'Enterprise security and compliance features'
            },
            {
              url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
              alt: 'Mobile interface',
              caption: 'Mobile-responsive financial interface'
            }
          ]
        },
        {
          id: 'onboarding-optimization',
          title: 'Reduced user onboarding time by 75%',
          description: 'Revolutionized the user onboarding experience through comprehensive user research, journey mapping, and iterative design improvements. Implemented progressive disclosure, smart defaults, and contextual guidance that transformed a complex multi-day process into an intuitive experience.',
          images: [
            {
              url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop',
              alt: 'User onboarding flow',
              caption: 'Streamlined onboarding user interface'
            },
            {
              url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
              alt: 'User journey mapping',
              caption: 'Comprehensive user journey analysis'
            }
          ]
        },
        {
          id: 'design-team-foundation',
          title: 'Started and scaled design team to 8 members',
          description: 'Established the design function from ground zero, building processes, culture, and capabilities that would support rapid company growth. Recruited top design talent, implemented design systems, and created collaborative workflows between design, product, and engineering teams.',
          images: [
            {
              url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
              alt: 'Design team collaboration',
              caption: 'Collaborative design team environment'
            },
            {
              url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
              alt: 'Design process documentation',
              caption: 'Design process and methodology documentation'
            },
            {
              url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
              alt: 'Team workshops',
              caption: 'Design thinking workshops and training'
            }
          ]
        }
      ]
    },
    {
      id: 'product-manager-startup',
      title: 'Senior Product Manager',
      company: 'StartupVenture',
      period: '2018 - 2020',
      location: 'Austin, TX',
      blurb: 'Full-stack product management from zero to successful exit',
      description: 'Led product development from concept to public exit. Managed entire product lifecycle including user research, design, development, and go-to-market strategy.',
      tags: ['full-stack-product-management', 'public exit', 'full pl', 'market leadership'],
      imageUrl: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=1200&h=800&fit=crop',
      achievements: [
        {
          id: 'ipo-strategy',
          title: 'Led product strategy resulting in successful IPO',
          description: 'Developed and executed comprehensive product strategy that positioned the company for successful public offering. Managed stakeholder expectations, regulatory compliance, and market positioning while maintaining product innovation and user satisfaction.',
          images: [
            {
              url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
              alt: 'IPO strategy presentation',
              caption: 'Strategic planning for public market readiness'
            }
          ]
        },
        {
          id: 'user-growth',
          title: 'Grew user base from 0 to 500K+ users',
          description: 'Built product-led growth strategies that achieved explosive user acquisition and retention. Implemented viral mechanics, optimized conversion funnels, and created compelling user experiences that drove organic growth.',
          images: [
            {
              url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
              alt: 'User growth analytics',
              caption: 'Exponential user growth metrics'
            },
            {
              url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
              alt: 'Product interface',
              caption: 'User-centric product design'
            }
          ]
        },
        {
          id: 'pl-management',
          title: 'Managed P&L for $50M+ product line',
          description: 'Took full ownership of product profitability, managing complex revenue streams, cost optimization, and strategic investments. Balanced growth initiatives with operational efficiency to maintain healthy unit economics.',
          images: [
            {
              url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
              alt: 'Financial dashboard',
              caption: 'P&L management and financial tracking'
            }
          ]
        }
      ]
    },
    {
      id: 'ux-director-enterprise',
      title: 'UX Director',
      company: 'Enterprise Solutions Inc',
      period: '2015 - 2018',
      location: 'Seattle, WA',
      blurb: 'Scaling design across enterprise software solutions',
      description: 'Directed UX strategy for enterprise software suite used by millions of users worldwide. Focused on accessibility, internationalization, and scalable design systems.',
      tags: ['design ops', 'international design team', 'full-stack ux', 'partial pl'],
      imageUrl: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=1200&h=800&fit=crop',
      achievements: [
        {
          id: 'accessibility-compliance',
          title: 'Achieved WCAG AAA compliance across all products',
          description: 'Led comprehensive accessibility initiative ensuring full WCAG AAA compliance across the entire product suite. Implemented inclusive design practices, automated testing workflows, and accessibility training programs that set new industry standards.',
          images: [
            {
              url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
              alt: 'Accessibility testing',
              caption: 'Comprehensive accessibility testing and validation'
            }
          ]
        },
        {
          id: 'international-team',
          title: 'Led international design team across 6 time zones',
          description: 'Managed globally distributed design team spanning North America, Europe, and Asia. Developed asynchronous collaboration frameworks, cultural adaptation strategies, and time zone optimization that maintained team cohesion and productivity.',
          images: [
            {
              url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
              alt: 'Global team collaboration',
              caption: 'International team coordination and collaboration'
            },
            {
              url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop',
              alt: 'Remote work setup',
              caption: 'Distributed team workflow optimization'
            }
          ]
        },
        {
          id: 'design-system-scale',
          title: 'Implemented design system used by 200+ engineers',
          description: 'Created and deployed enterprise-scale design system that unified user experience across multiple product lines. The system included comprehensive component libraries, design tokens, and documentation that enabled consistent implementation across large engineering teams.',
          images: [
            {
              url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
              alt: 'Design system documentation',
              caption: 'Comprehensive design system documentation'
            },
            {
              url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
              alt: 'Component library',
              caption: 'Scalable component library architecture'
            }
          ]
        }
      ]
    },
    {
      id: 'product-designer-acquisition',
      title: 'Senior Product Designer',
      company: 'InnovateLabs',
      period: '2013 - 2015',
      location: 'Boston, MA',
      blurb: 'Design-driven growth leading to strategic acquisition',
      description: 'Led design for consumer-facing products with focus on user acquisition and retention. Drove design strategy that contributed to successful acquisition by major tech company.',
      tags: ['full-stack ux', 'private exit', 'data-science', 'market leadership'],
      imageUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=800&fit=crop',
      achievements: [
        {
          id: 'user-growth-design',
          title: 'Designed features resulting in 200% user growth',
          description: 'Created innovative user acquisition and retention features through deep user research, behavioral analysis, and iterative design improvements. Implemented growth-focused design patterns that significantly improved user engagement and viral coefficients.',
          images: [
            {
              url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
              alt: 'User growth features',
              caption: 'Growth-focused feature design and implementation'
            }
          ]
        },
        {
          id: 'acquisition-success',
          title: 'Led to $150M acquisition by tech giant',
          description: 'Design strategy and execution directly contributed to company valuation and successful acquisition. Created compelling user experiences and innovative product features that attracted strategic buyer interest and justified premium acquisition price.',
          images: [
            {
              url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
              alt: 'Acquisition announcement',
              caption: 'Strategic acquisition milestone'
            },
            {
              url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
              alt: 'Product showcase',
              caption: 'Award-winning product design showcase'
            }
          ]
        },
        {
          id: 'data-driven-design',
          title: 'Implemented data-driven design methodology',
          description: 'Pioneered data-driven design approach that combined quantitative analytics with qualitative user research. Established A/B testing frameworks, user behavior tracking, and design decision validation processes that became company standard.',
          images: [
            {
              url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
              alt: 'Data analytics dashboard',
              caption: 'Advanced design analytics and metrics tracking'
            },
            {
              url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
              alt: 'A/B testing results',
              caption: 'Data-driven design validation and testing'
            }
          ]
        }
      ]
    }
  ]
};
