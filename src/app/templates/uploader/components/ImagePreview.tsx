import { Image } from "../../image";

interface ImagePreviewProps {
  width: number | string;
  height: number | string;
  url: string;
}

const ImagePreview = ({ width, height, url }: ImagePreviewProps) => {
  if (url) {
    return <Image src={url} width={width} height={height} alt="test" />;
  }
  return null;
};

export default ImagePreview;
