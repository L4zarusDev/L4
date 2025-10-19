import React from 'react';

interface SectionHeadingProps {
  heading: string;
  subheading?: string;
  animationId?: string;
}

export default function SectionHeading({
  heading,
  subheading,
  animationId,
}: SectionHeadingProps) {
  return (
    <div className="mb-5 lg:mb-10 text-white">
      <h2 
        className="text-1xl mb-2 text-center font-bold text-white lg:text-3xl"
        {...(animationId && { 'data-gsap': `${animationId}-heading` })}
      >
        {heading}
      </h2>
      {subheading && (
        <p 
          className="mx-auto mb-8 w-[90%] text-center text-sm text-gray-300/75 lg:text-lg"
          {...(animationId && { 'data-gsap': `${animationId}-subheading` })}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
