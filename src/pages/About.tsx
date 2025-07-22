import React from 'react';
import { MapPin, Mail, ExternalLink, Award, GraduationCap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { aboutData } from '@/data/about';

const About = () => {
  const { personalInfo, biography, skillCategories, values, education, awards, interests, workPhilosophy } = aboutData;

  return (
    <div className="container mx-auto py-10">
      {/* Personal Information Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{personalInfo.name}</CardTitle>
          <CardDescription>{personalInfo.title}</CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col items-start">
            <img
              src={personalInfo.profileImage}
              alt="Profile"
              className="rounded-full w-32 h-32 mb-4"
            />
            <p className="text-muted-foreground">{personalInfo.tagline}</p>
          </div>
          <div>
            <p className="flex items-center text-sm">
              <MapPin className="mr-2 h-4 w-4" />
              {personalInfo.location}
            </p>
            <p className="flex items-center text-sm">
              <Mail className="mr-2 h-4 w-4" />
              <a href={`mailto:${personalInfo.email}`} className="hover:underline">
                {personalInfo.email}
              </a>
            </p>
            {personalInfo.website && (
              <p className="flex items-center text-sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Website
                </a>
              </p>
            )}
            <div className="mt-4">
              <Button asChild>
                <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Biography Section */}
      {biography.map((bio) => (
        <Card key={bio.id} className="mb-8">
          <CardHeader>
            <CardTitle>{bio.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {bio.content.map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
            {bio.image && <img src={bio.image} alt={bio.title} className="mt-4 rounded-md" />}
          </CardContent>
        </Card>
      ))}

      {/* Skills Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Skills</CardTitle>
          <CardDescription>Technical proficiencies and areas of expertise.</CardDescription>
        </CardHeader>
        <CardContent>
          {skillCategories.map((category) => (
            <div key={category.name} className="mb-6">
              <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between">
                    <span>{skill.name}</span>
                    <div className="w-1/2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Values Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Core Values</CardTitle>
          <CardDescription>Principles that guide my work and interactions.</CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {value.icon === 'Heart' ? <Heart className="h-6 w-6 mb-2 text-primary" /> : null}
              <h4 className="font-semibold">{value.title}</h4>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Education Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Education</CardTitle>
          <CardDescription>Academic qualifications and learning experiences.</CardDescription>
        </CardHeader>
        <CardContent>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center mb-1">
                <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                <h5 className="font-semibold">{edu.institution}</h5>
              </div>
              <p className="text-sm">{edu.degree} in {edu.field} ({edu.year})</p>
              {edu.description && <p className="text-sm text-muted-foreground">{edu.description}</p>}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Awards Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Awards & Recognition</CardTitle>
          <CardDescription>Notable achievements and recognitions.</CardDescription>
        </CardHeader>
        <CardContent>
          {awards.map((award, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center mb-1">
                <Award className="mr-2 h-4 w-4 text-muted-foreground" />
                <h5 className="font-semibold">{award.title}</h5>
              </div>
              <p className="text-sm">{award.organization} ({award.year})</p>
              <p className="text-sm text-muted-foreground">{award.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Interests Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Personal Interests</CardTitle>
          <CardDescription>Hobbies and interests outside of work.</CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((interest, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {interest.image && <img src={interest.image} alt={interest.title} className="rounded-md w-24 h-24 mb-2" />}
              <h4 className="font-semibold">{interest.title}</h4>
              <p className="text-sm text-muted-foreground">{interest.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Work Philosophy Section */}
      <Card>
        <CardHeader>
          <CardTitle>Work Philosophy</CardTitle>
          <CardDescription>My approach to professional work and collaboration.</CardDescription>
        </CardHeader>
        <CardContent>
          <h4 className="font-semibold mb-2">{workPhilosophy.title}</h4>
          {workPhilosophy.content.map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
