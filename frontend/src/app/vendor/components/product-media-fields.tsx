"use client";

import React from "react";
import { Box } from "@mui/material";
import ProductImageDropzone from "./product-image-dropzone";

interface ProductMediaFieldsProps {
  imageUrls: string[];
  onAddImageUrl: () => void;
  onImageUrlChange: (index: number, val: string) => void;
  onRemoveImageUrl: (index: number) => void;
  setValue?: (name: any, val: any) => void;
}

export default function ProductMediaFields({
  imageUrls,
  setValue,
}: ProductMediaFieldsProps) {
  const handleImagesChange = (newUrls: string[]) => {
    if (setValue) {
      setValue("imageUrls", newUrls.length > 0 ? newUrls : [""]);
    }
  };

  return (
    <Box style={{ width: "100%" }}>
      <ProductImageDropzone
        label="Product Gallery Images (Direct File Upload)"
        images={imageUrls}
        onChangeImages={handleImagesChange}
        multiple
      />
    </Box>
  );
}
