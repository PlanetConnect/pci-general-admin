import React from "react";

import MuiImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

interface ImageListProps {
  width: number;
  cols: number;
  images: Image[];
}

interface Image {
  url: string;
  alt: string;
}

const ImageList = ({ width, cols, images }: ImageListProps) => {
  console.log(images);
  return (
    <MuiImageList
      sx={{ width: width, height: "100%" }}
      cols={cols}
      rowHeight="auto"
    >
      {images.map((item: Image, index: number) => (
        <ImageListItem key={item.url}>
          <img
            src={`${item.url}`}
            srcSet={`${item.url}`}
            alt={item.alt}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </MuiImageList>
  );
};

export default ImageList;
