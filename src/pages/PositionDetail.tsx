import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { portfolioData } from '@/data/portfolio';
import CompanyLogo from '@/components/CompanyLogo';
import AchievementImages from '@/components/AchievementImages';

const PositionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const position = portfolioData.positions.find((pos) => pos.id === id);

  if (!position) {
    return <div>Position not found</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <Link to="/" className="inline-flex items-center gap-2 mb-4">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="mb-8">
        <div className="md:flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{position.title}</h1>
            <div className="flex items-center space-x-2">
              <CompanyLogo logoUrl={position.logoUrl} companyName={position.company} size="md" />
              <span className="text-lg">{position.company}</span>
            </div>
          </div>
          {position.exit && (
            <div className="mt-2 md:mt-0">
              <Badge variant="secondary">
                {position.exit.type}: {position.exit.company || 'N/A'}
              </Badge>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4 text-muted-foreground mb-2">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{position.location}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{position.period}</span>
          </div>
        </div>

        <p className="text-lg">{position.blurb}</p>

        <div className="mt-4">
          {position.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="overview">
            <AccordionTrigger>Overview</AccordionTrigger>
            <AccordionContent>
              <p>{position.description}</p>
            </AccordionContent>
          </AccordionItem>

          {position.achievements.length > 0 && (
            <AccordionItem value="achievements">
              <AccordionTrigger>Key Achievements</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-2">
                  {position.achievements.map((achievement) => (
                    <li key={achievement.id}>
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="mb-2">{achievement.description}</p>
                      {achievement.images && achievement.images.length > 0 && (
                        <AchievementImages images={achievement.images} />
                      )}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}

          {position.exit && (
            <AccordionItem value="exit">
              <AccordionTrigger>Exit Details</AccordionTrigger>
              <AccordionContent>
                <p>{position.exit.details}</p>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>
    </div>
  );
};

export default PositionDetail;
