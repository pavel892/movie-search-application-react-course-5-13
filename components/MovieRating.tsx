interface MovieRatingProps {
  rating: number;
}

export default function MovieRating({ rating }: MovieRatingProps) {
  let borderColor: string;
  if (rating <= 3) {
    borderColor = '#E90000';
  } else if (rating > 3 && rating <= 5) {
    borderColor = '#E97E00';
  } else if (rating > 5 && rating <= 7) {
    borderColor = '#E9D100';
  } else borderColor = '#66E900';
  return (
    <div
      style={{ borderColor: borderColor }}
      className="rounded-full border-2 w-[30px] h-[30px] -mr-3 lg:-mr-[11px] text-xs flex items-center justify-center shrink-0"
    >
      {rating.toFixed(1)}
    </div>
  );
}
