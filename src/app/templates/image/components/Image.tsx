import React from "react";
import Box from "@mui/material/Box";

interface ImageProps {
  height: number | string;
  width: number | string;
  src: string;
  alt: string;
}

const Image = ({ height, width, src, alt }: ImageProps) => {
  return (
    <Box
      component="img"
      sx={{
        border: 1,
        borderColor: "grey.500",
        height: { height },
        width: { width },
      }}
      alt={alt}
      src={src}
    />
  );
};

export default Image;
