interface StarsProps {
  rating: number;
  size?: number;
}

export function Stars({ rating, size = 14 }: StarsProps) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.25 && rating - full < 0.75;
  const hasQuarter = rating - full > 0 && rating - full < 0.25;
  const hasThreeQuarter = rating - full >= 0.75;

  return (
    <div className="flex items-center gap-0.5 text-yellow-400">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) {
          return <StarFull key={i} size={size} />;
        }
        if (i === full && hasThreeQuarter) {
          return <StarThreeQuarter key={i} size={size} />;
        }
        if (i === full && hasHalf) {
          return <StarHalf key={i} size={size} />;
        }
        if (i === full && hasQuarter) {
          return <StarQuarter key={i} size={size} />;
        }
        return <StarEmpty key={i} size={size} />;
      })}
      <span className="ml-1 text-sm text-[#ededed]">{rating}</span>
    </div>
  );
}

function StarFull({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.91 14.14z" />
    </svg>
  );
}

function StarHalf({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <defs>
        <linearGradient id="half-fill" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.91 14.14z" fill="url(#half-fill)" />
      </svg>
  );
}

function StarQuarter({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <defs>
        <linearGradient id="quarter-fill" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="25%" stopColor="currentColor" />
          <stop offset="25%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.91 14.14z" fill="url(#quarter-fill)" />
    </svg>
  );
}

function StarThreeQuarter({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <defs>
        <linearGradient id="three-quarter-fill" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="75%" stopColor="currentColor" />
          <stop offset="75%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.91 14.14z" fill="url(#three-quarter-fill)" />
    </svg>
  );
}

function StarEmpty({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.91 14.14z" />
    </svg>
  );
}
