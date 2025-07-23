import React from 'react';
import Link from 'next/link';

interface AnimatedLinkProps {
  url: string;
  text: string;
  customClassName?: string; // Optional custom class for extra styling
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({ url, text, customClassName = '' }) => {
  return (
      <Link href={url} className={`relative inline-block group py-1 font-semibold ${customClassName}`}>
        {/* Link Text */}
        <span className="relative z-10 text-secondary">{text}</span>

        {/* Default underline */}
        <span className="absolute left-0 bottom-0 w-full rounded h-1 bg-transparent"></span>

        {/* Hover overlay to create progress fill effect */}
        <span className="absolute left-0 bottom-0 w-full h-1 bg-primary rounded scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
      </Link>
  );
};

export default AnimatedLink;
