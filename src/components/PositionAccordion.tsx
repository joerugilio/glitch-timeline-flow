import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Calendar, ExternalLink, Trophy, Users, Building } from 'lucide-react';
import { Position } from '@/types/portfolio';
import AchievementImages from './AchievementImages';

interface PositionAccordionProps {
  positions: Position[];
}

const PositionAccordion: React.FC<PositionAccordionProps> = ({ positions }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPositionId = searchParams.get('position');
  const selectedAchievementId = searchParams.get('achievement');

  const handlePositionClick = (positionId: string) => {
    // If the position is already selected, clear the selection
    if (selectedPositionId === positionId) {
      setSearchParams({});
    } else {
      setSearchParams({ position: positionId });
    }
  };

  const handleAchievementClick = (achievementId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent accordion from closing
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('position', selectedPositionId || '');
      params.set('achievement', achievementId);
      return params;
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Button Row */}
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-4 w-full max-w-2xl">
          <Button variant="outline" className="w-full">
            Overview
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/experience">
              Experience
            </Link>
          </Button>
          <Button variant="outline" className="w-full">
            Skills
          </Button>
          <Button variant="outline" className="w-full">
            Contact
          </Button>
        </div>
      </div>

      {/* Position Cards */}
      <div className="space-y-4">
        {positions.map((position) => (
          <Accordion key={position.id} type="single" collapsible className="w-full">
            <AccordionItem value={position.id}>
              <AccordionTrigger onClick={() => handlePositionClick(position.id)} data-state={selectedPositionId === position.id ? 'open' : 'closed'}>
                <div className="flex justify-between w-full">
                  <CardHeader className="p-0">
                    <CardTitle>{position.title}</CardTitle>
                    <CardDescription>
                      {position.company} - {position.period}
                    </CardDescription>
                  </CardHeader>
                  <Calendar className="h-4 w-4 shrink-0 ml-2 text-muted-foreground" aria-hidden="true" />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>{position.title}</CardTitle>
                    <CardDescription>{position.blurb}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid grid-cols-[1fr_2fr] gap-4">
                      <div className="flex flex-col gap-2">
                        <img src={position.imageUrl} alt={position.title} className="rounded-md aspect-video object-cover" />
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                          <span>{position.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                          <span>{position.location}</span>
                        </div>
                      </div>
                      <div>
                        <p>{position.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {position.tags.map((tag) => (
                            <Badge key={tag}>{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {position.exit && (
                      <div className="border rounded-md p-4">
                        <h4 className="text-sm font-bold">Exit Details</h4>
                        <p>
                          Type: {position.exit.type}
                          {position.exit.company && `, Acquired by ${position.exit.company}`}
                        </p>
                        <p>Details: {position.exit.details}</p>
                      </div>
                    )}

                    {position.achievements.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold">Key Achievements</h4>
                        <div className="grid gap-4">
                          {position.achievements.map((achievement) => (
                            <Card
                              key={achievement.id}
                              className={`border-primary ${selectedAchievementId === achievement.id ? 'bg-primary/10' : ''}`}
                              onClick={(event) => handleAchievementClick(achievement.id, event)}
                            >
                              <CardHeader className="space-y-1">
                                <CardTitle className="text-sm font-bold flex items-center gap-1">
                                  <Trophy className="h-4 w-4" aria-hidden="true" />
                                  {achievement.title}
                                </CardTitle>
                                <CardDescription className="text-xs">{achievement.description}</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <AchievementImages images={achievement.images} />
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default PositionAccordion;
