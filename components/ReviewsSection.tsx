import React from 'react';
import { Review } from '../types';
import StarRating from './StarRating';

interface ReviewsSectionProps {
  reviews: Review[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return null; // Don't render the section if there are no reviews
  }

  return (
    <div className="mt-16 pt-12 border-t border-secondary">
      <h2 className="text-2xl font-serif text-center text-accent mb-12">Ulasan Pelanggan</h2>
      <div className="max-w-3xl mx-auto space-y-8">
        {reviews.map((review) => (
          <div key={review.id} className="p-6 bg-primary rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-text-main">{review.author}</h3>
              <span className="text-xs text-text-muted">{review.date}</span>
            </div>
            <div className="mb-3">
                <StarRating rating={review.rating} />
            </div>
            <p className="text-text-muted leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;