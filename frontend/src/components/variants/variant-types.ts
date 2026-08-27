export interface ProductVariantData {
  id: string;
  productId: string;
  name: string;
  sku?: string;
  price?: number;
  stockQuantity: number;
  attributes?: Record<string, string>;
  images?: string[];
  thumbnail?: string;
}

export type SelectedAttributes = Record<string, string>;

export interface AttributeMap {
  [attributeName: string]: string[];
}

export interface VariantSelectionResult {
  selectedVariant: ProductVariantData | null;
  selectedAttributes: SelectedAttributes;
  isAvailable: boolean;
}
