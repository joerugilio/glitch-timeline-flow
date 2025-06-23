
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
        'Built design team from 3 to 25 designers across 4 countries',
        'Implemented design-to-code workflow reducing development time by 40%',
        'Led redesign resulting in 300% increase in user engagement'
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
        'Designed platform processing $2B+ in transactions monthly',
        'Reduced user onboarding time by 75%',
        'Started and scaled design team to 8 members'
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
        'Led product strategy resulting in successful IPO',
        'Grew user base from 0 to 500K+ users',
        'Managed P&L for $50M+ product line'
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
        'Achieved WCAG AAA compliance across all products',
        'Led international design team across 6 time zones',
        'Implemented design system used by 200+ engineers'
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
        'Designed features resulting in 200% user growth',
        'Led to $150M acquisition by tech giant',
        'Implemented data-driven design methodology'
      ]
    }
  ]
};
