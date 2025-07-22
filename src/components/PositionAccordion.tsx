import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Position } from '@/types/portfolio';
import CompanyLogo from './CompanyLogo';

interface PositionAccordionProps {
  position: Position;
}

const PositionAccordion: React.FC<PositionAccordionProps> = ({ position }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={position.id}>
        <AccordionTrigger>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <CompanyLogo logoUrl={position.logoUrl} company={position.company} className="w-12 h-8" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{position.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{position.location}</span>
                  <span className="mx-2">•</span>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{position.period}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              {position.tags.map((tag) => (
                <Badge key={tag} className="mr-2">{tag}</Badge>
              ))}
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">{position.blurb}</p>
            <Link to={`/position/${position.id}`} className="inline-flex items-center mt-4 font-medium hover:underline">
              Learn More
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PositionAccordion;
