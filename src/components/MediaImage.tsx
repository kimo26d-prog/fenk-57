import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

export interface MediaImageProps {
  src?: string;
  alt: string;
  fallbackIcon?: string;
  className?: string;
  containerClassName?: string;
}

export const MediaImage: React.FC<MediaImageProps> = ({
  src,
  alt,
  fallbackIcon = '📦',
  className = 'w-full h-full object-cover',
  containerClassName = 'w-full h-full relative flex items-center justify-center overflow-hidden'
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const isValidUrl = src && (src.startsWith('http') || src.startsWith('data:') || src.startsWith('/'));

  if (!isValidUrl || hasError) {
    return (
      <div className={containerClassName}>
        <span className="text-5xl sm:text-6xl drop-shadow-md select-none">
          {fallbackIcon}
        </span>
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#161622] animate-pulse flex items-center justify-center text-slate-700">
          <ImageIcon className="w-8 h-8 opacity-40 animate-pulse" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      />
    </div>
  );
};

export const ProductImage = MediaImage;

export interface CraftsmanAvatarProps {
  photo?: string;
  avatarIcon?: string;
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const CraftsmanAvatar: React.FC<CraftsmanAvatarProps> = ({
  photo,
  avatarIcon = '👷‍♂️',
  name,
  className = '',
  size = 'md'
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10 text-xl rounded-xl',
    md: 'w-14 h-14 text-2xl rounded-2xl',
    lg: 'w-20 h-20 text-4xl rounded-2xl',
    xl: 'w-28 h-28 text-6xl rounded-3xl'
  };

  const isUrl = photo && (photo.startsWith('http') || photo.startsWith('data:') || photo.startsWith('/'));

  if (isUrl && !hasError) {
    return (
      <div className={`${sizeClasses[size]} overflow-hidden border-2 border-purple-500/30 bg-[#12121a] shrink-0 relative shadow-md ${className}`}>
        <img
          src={photo}
          alt={name}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} bg-gradient-to-tr from-purple-600 to-indigo-700 border-2 border-purple-500/40 flex items-center justify-center shrink-0 shadow-md ${className}`}>
      <span>{avatarIcon}</span>
    </div>
  );
};
