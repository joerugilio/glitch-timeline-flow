import React from 'react';
import { Mail, MapPin, Globe, Award, GraduationCap } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import { aboutData } from '@/data/about';
import * as LucideIcons from 'lucide-react';

const About = () => {
  const {
    personalInfo,
    biography,
    skillCategories,
    values,
    education,
    awards,
    interests,
    workPhilosophy
  } = aboutData;

  const renderSkillBar = (skill: typeof skillCategories[0]['skills'][0]) => <div key={skill.name} className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-foreground">{skill.name}</span>
        <span className="text-xs text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div className="bg-primary h-2 rounded-full transition-all duration-500 ease-out" style={{
        width: `${skill.level}%`
      }} />
      </div>
    </div>;

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon size={24} /> : null;
  };

  const handleLinkedInClick = () => {
    window.open(personalInfo.socialLinks.linkedin, '_blank', 'noopener,noreferrer');
  };

  return <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        

        {/* Biography Section */}
        <section className="px-4 bg-muted/30 py-[16px]">
          <div className="max-w-4xl mx-auto">
            {biography.map((section, index) => <div key={section.id} className={`mb-16 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} lg:flex lg:gap-12 lg:items-center`}>
                <div className="lg:flex-1">
                  <h2 className="text-3xl font-light text-primary mb-6">{section.title}</h2>
                  {section.content.map((paragraph, pIndex) => <p key={pIndex} className="text-foreground mb-4 leading-relaxed">
                      {paragraph}
                    </p>)}
                </div>
                {section.image && <div className="lg:flex-1 mt-8 lg:mt-0">
                    
                  </div>}
              </div>)}
          </div>
        </section>

        {/* Skills Section */}
        

        {/* Values Section */}
        

        {/* Work Philosophy Section */}
        

        {/* Education & Awards Section */}
        <section className="px-4 py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Education */}
              <div>
                <h2 className="text-3xl font-light text-primary mb-8 flex items-center gap-3">
                  <GraduationCap size={32} />
                  Education
                </h2>
                <div className="space-y-6">
                  {education.map((edu, index) => <Card key={index} className="hover-lift">
                      <CardHeader>
                        <CardTitle className="text-lg">{edu.degree} in {edu.field}</CardTitle>
                        <p className="text-primary font-medium">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">{edu.year}</p>
                      </CardHeader>
                      {edu.description && <CardContent>
                          <p className="text-muted-foreground">{edu.description}</p>
                        </CardContent>}
                    </Card>)}
                </div>
              </div>

              {/* Awards */}
              <div>
                <h2 className="text-3xl font-light text-primary mb-8 flex items-center gap-3">
                  <Award size={32} />
                  Recognition
                </h2>
                <div className="space-y-6">
                  {awards.map((award, index) => <Card key={index} className="hover-lift">
                      <CardHeader>
                        <CardTitle className="text-lg">{award.title}</CardTitle>
                        <p className="text-primary font-medium">{award.organization}</p>
                        <p className="text-sm text-muted-foreground">{award.year}</p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{award.description}</p>
                      </CardContent>
                    </Card>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Interests Section */}
        <section className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-light text-primary mb-12 text-center">Beyond Design</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {interests.map(interest => <Card key={interest.title} className="overflow-hidden hover-lift">
                  {interest.image && <div className="h-48 overflow-hidden">
                      <img src={interest.image} alt={interest.title} className="w-full h-full object-cover" />
                    </div>}
                  <CardHeader>
                    <CardTitle className="text-xl">{interest.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {interest.description}
                    </p>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-4 py-16 bg-gradient-dark text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-light text-primary mb-6">Let's Create Something Amazing</h2>
            <p className="text-xl text-muted-foreground mb-8">
              New opportunities, sharing design insights, or simply connecting with fellow creators.
            </p>
            <Button size="lg" className="hover-lift" onClick={handleLinkedInClick}>
              <FontAwesomeIcon icon={faLinkedin} className="mr-2" size="lg" />
              Contact me via LinkedIn
            </Button>
          </div>
        </section>
      </main>
    </div>;
};

export default About;
