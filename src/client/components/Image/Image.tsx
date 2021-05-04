import { FC, ImgHTMLAttributes } from 'react';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

const Image: FC<ImageProps> = ({ src, alt, className = '', ...props }) => {
  return <img className={`${className}`} src={src} alt={alt} {...props} />;
};

export default Image;
