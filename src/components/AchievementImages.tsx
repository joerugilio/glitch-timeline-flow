
import React from 'react';
import { AchievementImage } from '../types/portfolio';

interface AchievementImagesProps {
  images: AchievementImage[];
}

const AchievementImages: React.FC<AchievementImagesProps> = ({ images }) => {
  const getGridClassName = (imageCount: number) => {
    switch (imageCount) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 3:
        return 'grid-cols-1 md:grid-cols-3';
      case 4:
        return 'grid-cols-1 md:grid-cols-2';
      case 5:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 6:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <div className={`grid gap-3 ${getGridClassName(images.length)}`}>
      {images.map((image, index) => (
        <div key={index} className="group">
          <div className="aspect-[4/3] overflow-hidden rounded-lg border border-border">
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          {image.caption && (
            <p className="text-xs text-muted-foreground mt-1 text-center">
              {image.caption}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default AchievementImages;
