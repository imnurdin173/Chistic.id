import { Star } from 'lucide-react';

interface ReviewItem {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
}

interface EventReviewsProps {
  reviews?: ReviewItem[];
}

const defaultReviews: ReviewItem[] = [
  {
    id: '1',
    name: 'john wakwaw',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
    rating: 5,
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.',
  },
];

export default function EventReviews({
  reviews = defaultReviews,
}: EventReviewsProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-gray-900">Reviews</h3>
        <a
          href="#"
          className="text-xs font-semibold text-amber-600 hover:underline"
        >
          See More Reviews
        </a>
      </div>

      {/* Review Card List */}
      <div className="flex flex-col gap-3">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-100 bg-gray-50/50 rounded-lg"
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={rev.avatar}
                alt={rev.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-200"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-800">
                  {rev.name}
                </span>
                {/* Star Ratings */}
                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? 'fill-amber-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {rev.comment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}