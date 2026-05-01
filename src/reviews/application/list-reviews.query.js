import { ReviewsRepository } from '../infrastructure/reviews.repository.js';
export const listReviewsQuery = () => ReviewsRepository.list();
