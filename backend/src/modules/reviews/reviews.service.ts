import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductReview } from './entities/product-review.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
import {
  OrderItemStatusEnum,
  OrderStatusEnum,
} from '../common/enums/erd.enums';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ProductReview)
    private readonly reviewRepository: Repository<ProductReview>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(
    userId: string,
    createReviewDto: CreateReviewDto,
  ): Promise<ProductReview> {
    const { orderItemId, productId, rating, title, comment } = createReviewDto;

    // 1. Verify OrderItem existence and ownership
    const orderItem = await this.orderItemRepository.findOne({
      where: { id: orderItemId },
      relations: { order: true },
    });

    if (!orderItem) {
      throw new NotFoundException(
        `Order item with ID "${orderItemId}" not found`,
      );
    }

    if (orderItem.order.customerId !== userId) {
      throw new ForbiddenException(
        'You can only review items from your own orders.',
      );
    }

    if (orderItem.productId !== productId) {
      throw new BadRequestException(
        'Order item does not match the specified product.',
      );
    }

    // 2. Strict Delivery Status Check: Order or OrderItem MUST be DELIVERED
    const isDelivered =
      orderItem.status === OrderItemStatusEnum.DELIVERED ||
      orderItem.order.status === OrderStatusEnum.DELIVERED;

    if (!isDelivered) {
      throw new BadRequestException(
        'You can only rate and review products that have been delivered to you.',
      );
    }

    // 3. Check for existing review on this order item
    const existingReview = await this.reviewRepository.findOne({
      where: { userId, orderItemId },
    });

    if (existingReview) {
      existingReview.rating = rating;
      existingReview.title = title;
      existingReview.comment = comment;
      return this.reviewRepository.save(existingReview);
    }

    // 4. Create and save new review
    const review = this.reviewRepository.create({
      userId,
      orderItemId,
      productId,
      rating,
      title,
      comment,
      isVerifiedPurchase: true,
      isVisible: true,
    });

    return this.reviewRepository.save(review);
  }

  async findByProduct(productId: string) {
    const reviews = await this.reviewRepository.find({
      where: { productId, isVisible: true },
      relations: { user: { profile: true } },
      order: { createdAt: 'DESC' },
    });

    const totalReviews = reviews.length;
    const avgRating =
      totalReviews > 0
        ? Number(
            (
              reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
            ).toFixed(1),
          )
        : 0;

    const ratingCounts: Record<number, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    reviews.forEach((r) => {
      if (ratingCounts[r.rating] !== undefined) {
        ratingCounts[r.rating]++;
      }
    });

    return {
      reviews: reviews.map((r) => {
        const profile = r.user?.profile;
        const name = profile?.firstName
          ? `${profile.firstName} ${profile.lastName || ''}`.trim()
          : r.user?.email
            ? r.user.email.split('@')[0]
            : 'Verified Customer';

        return {
          id: r.id,
          rating: r.rating,
          title: r.title,
          comment: r.comment,
          isVerifiedPurchase: r.isVerifiedPurchase,
          createdAt: r.createdAt,
          user: {
            id: r.user?.id,
            name,
            avatar: profile?.profilePictureUrl || profile?.avatar,
          },
        };
      }),
      stats: {
        totalReviews,
        avgRating,
        ratingCounts,
      },
    };
  }

  async findByOrderItem(
    userId: string,
    orderItemId: string,
  ): Promise<ProductReview | null> {
    return this.reviewRepository.findOne({
      where: { userId, orderItemId },
    });
  }

  async update(
    userId: string,
    id: string,
    updateReviewDto: UpdateReviewDto,
  ): Promise<ProductReview> {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException(`Review with ID "${id}" not found`);
    }

    if (review.userId !== userId) {
      throw new ForbiddenException('You can only update your own review');
    }

    Object.assign(review, updateReviewDto);
    return this.reviewRepository.save(review);
  }

  async remove(userId: string, id: string): Promise<{ success: boolean }> {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException(`Review with ID "${id}" not found`);
    }

    if (review.userId !== userId) {
      throw new ForbiddenException('You can only delete your own review');
    }

    await this.reviewRepository.remove(review);
    return { success: true };
  }
}
