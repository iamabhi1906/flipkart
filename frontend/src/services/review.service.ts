import { api } from "@/utils/api";

export interface ReviewData {
  id?: string;
  orderItemId: string;
  productId: string;
  rating: number;
  title?: string;
  comment?: string;
  isVerifiedPurchase?: boolean;
  createdAt?: string;
  user?: {
    id?: string;
    name?: string;
    avatar?: string;
  };
}

export interface ProductReviewStats {
  totalReviews: number;
  avgRating: number;
  ratingCounts: Record<number, number>;
}

export interface ProductReviewsResponse {
  reviews: ReviewData[];
  stats: ProductReviewStats;
}

export const submitProductReview = async (
  data: Partial<ReviewData>,
): Promise<ReviewData> => {
  const response = await api.post("/reviews", data);
  return response.data?.data || response.data;
};

export const getProductReviews = async (
  productId: string,
): Promise<ProductReviewsResponse> => {
  const response = await api.get(`/reviews/product/${productId}`);
  return response.data?.data || response.data;
};

export const getOrderItemReview = async (
  orderItemId: string,
): Promise<ReviewData | null> => {
  try {
    const response = await api.get(`/reviews/order-item/${orderItemId}`);
    return response.data?.data || response.data || null;
  } catch {
    return null;
  }
};
