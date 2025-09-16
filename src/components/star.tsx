import { getRatingStar } from "@/features/detail/utils/get-rating-star";
import { FaStar as FullStar } from "react-icons/fa";
import { FaRegStar as EmptyStar } from "react-icons/fa";
import { FaStarHalfAlt as HalfStar } from "react-icons/fa";
const Star = ({ rating }: { rating: number }) => {
  const convertedRating = getRatingStar(rating);
  const FULL_RATING = 5;
  const stars = [];

  const fullStars = Math.floor(convertedRating);
  for (let i = 0; i < fullStars; i++) stars.push(<FullStar key={`full-star${i + 1}`} />);

  const halfStars = convertedRating % 1 !== 0;
  if (halfStars) stars.push(<HalfStar key={`half-star`} />);

  const emptyStars = FULL_RATING - Math.ceil(convertedRating);
  for (let i = 0; i < emptyStars; i++) stars.push(<EmptyStar key={`empty-star${i + 1}`} />);

  return <span className="flex">{stars}</span>;
};

export default Star;
