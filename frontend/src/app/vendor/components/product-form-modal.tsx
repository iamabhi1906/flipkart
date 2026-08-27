"use client";

import React from "react";
import { ProductData } from "@/services/product.service";
import { ProductFormValues } from "../schemas/product-form-schema";
import ProductFormContainer from "./product-form-container";

interface ProductFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmitProduct: (values: ProductFormValues) => void;
  formData: ProductData & { editingId?: string };
  categories: any[];
  submitting: boolean;
  onCategorySearchInputChange?: (val: string) => void;
  loadingCategories?: boolean;
}

export default function ProductFormModal(props: ProductFormModalProps) {
  return <ProductFormContainer {...props} />;
}
