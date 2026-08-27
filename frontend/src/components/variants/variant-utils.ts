import { ProductVariantData, SelectedAttributes, AttributeMap } from "./variant-types";

export function extractAttributeMap(variants: ProductVariantData[]): AttributeMap {
  const map: AttributeMap = {};
  variants.forEach((v) => {
    if (!v.attributes) return;
    Object.entries(v.attributes).forEach(([key, val]) => {
      const normalizedKey = key.trim();
      const normalizedVal = String(val).trim();
      if (!map[normalizedKey]) {
        map[normalizedKey] = [];
      }
      if (!map[normalizedKey].includes(normalizedVal)) {
        map[normalizedKey].push(normalizedVal);
      }
    });
  });
  return map;
}

export function findMatchingVariant(
  variants: ProductVariantData[],
  selected: SelectedAttributes
): ProductVariantData | null {
  if (!variants || variants.length === 0) return null;
  const selectedKeys = Object.keys(selected);
  if (selectedKeys.length === 0) return variants[0] || null;

  return (
    variants.find((v) => {
      if (!v.attributes) return false;
      return selectedKeys.every(
        (key) => String(v.attributes?.[key]).trim() === String(selected[key]).trim()
      );
    }) || null
  );
}

export function getInitialSelectedAttributes(
  variants: ProductVariantData[]
): SelectedAttributes {
  if (!variants || variants.length === 0) return {};
  const firstVariant = variants[0];
  return firstVariant.attributes ? { ...firstVariant.attributes } : {};
}
