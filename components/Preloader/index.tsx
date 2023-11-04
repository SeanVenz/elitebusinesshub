import React, { useState, useEffect } from "react";
import "./index.scss";

interface ImagePreloaderProps {
  src: any;
  alt: string;
  width: number;
  height: number;
}

const ImagePreloader: React.FC<ImagePreloaderProps> = ({
  src,
  alt,
  width,
  height,
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setLoaded(true);
    };
  }, [src]);

  return loaded ? (
    <img src={src} alt={alt} width={width} height={height} />
  ) : (
    <div>
      <Loader />
    </div>
  );
};

export const Loader = () => {
  return <div className="dots"></div>;
};

export default ImagePreloader;
