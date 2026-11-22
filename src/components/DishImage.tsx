import { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface DishImageProps {
  src: string;
  alt: string;
  focus?: 'full' | 'panini' | 'pizza';
  className?: string;
}

export function DishImage({ src, alt, focus = 'full', className = '' }: DishImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center bg-[#25282E] text-[#A3A7B0] p-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <UtensilsCrossed className="w-7 h-7 mb-2 opacity-60 text-[#FF5900]" aria-hidden="true" />
        <span className="text-xs font-medium line-clamp-2 max-w-[18ch]">{alt}</span>
      </div>
    );
  }

  let cropClass = 'w-full h-full object-cover';
  if (focus === 'panini') {
    cropClass = 'w-full h-full object-cover scale-[2] origin-[0%_54%]';
  } else if (focus === 'pizza') {
    cropClass = 'w-full h-full object-cover scale-[2] origin-[100%_54%]';
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`${cropClass} ${className}`}
      loading="lazy"
    />
  );
}
