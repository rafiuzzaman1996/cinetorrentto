'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import clsx from 'clsx'; // optional, for cleaner class merging (install if needed)

interface Props extends ImageProps {
  fallbackSrc?: string;
}

export default function ImageWithFallback({
  src,
  fallbackSrc = '/cinetorrentto-placeholder.webp',
  className,
  alt = 'image',
  ...props
}: Props) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative overflow-hidden">
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        onError={() => setImgSrc(fallbackSrc)}
        onLoadingComplete={() => setIsLoading(false)}
        className={clsx(
          className,
          'transition-all duration-700 ease-in-out',
          isLoading ? 'blur-xl scale-105' : 'blur-0 scale-100'
        )}
      />
    </div>
  );
}
