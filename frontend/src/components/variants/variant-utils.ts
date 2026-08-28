import { ProductVariantData, SelectedAttributes, AttributeMap } from "./variant-types";

export function parseVariantAttributes(v: ProductVariantData): Record<string, string> {
  if (v.attributes && Object.keys(v.attributes).length > 0) {
    const cleaned: Record<string, string> = {};
    Object.entries(v.attributes).forEach(([k, val]) => {
      if (val !== undefined && val !== null && String(val).trim() !== "") {
        cleaned[k.trim()] = String(val).trim();
      }
    });
    if (Object.keys(cleaned).length > 0) return cleaned;
  }

  if (v.name && v.name.includes("/")) {
    const parts = v.name.split("/").map((s) => s.trim());
    if (parts.length >= 2) {
      return {
        Color: parts[0],
        Storage: parts[1],
      };
    } else if (parts.length === 1 && parts[0]) {
      return { Color: parts[0] };
    }
  }

  if (v.name) {
    return { Color: v.name.trim() };
  }

  return {};
}

export function extractAttributeMap(variants: ProductVariantData[]): AttributeMap {
  const map: AttributeMap = {};
  variants.forEach((v) => {
    const attrs = parseVariantAttributes(v);
    Object.entries(attrs).forEach(([key, val]) => {
      const normalizedKey = key;
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
      const attrs = parseVariantAttributes(v);
      return selectedKeys.every(
        (key) =>
          String(attrs[key] || "").toLowerCase() === String(selected[key] || "").toLowerCase()
      );
    }) || variants[0]
  );
}

export function getInitialSelectedAttributes(
  variants: ProductVariantData[]
): SelectedAttributes {
  if (!variants || variants.length === 0) return {};
  return parseVariantAttributes(variants[0]);
}
