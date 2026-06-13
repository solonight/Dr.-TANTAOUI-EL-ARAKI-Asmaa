import React from "react";
import { FaStar } from "react-icons/fa";

export default function ReviewCard({ review }) {
  const stars = new Array(5).fill(0).map((_, i) => i < review.rating);

  return (
    <article className="card-3d bg-[var(--card)] rounded-lg p-4 border border-transparent">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-[var(--bg)] rounded-full flex items-center justify-center text-lg font-semibold">
          {review.name.charAt(0)}
        </div>
        <div>
          <div className="font-medium">{review.name}</div>
          <div className="flex text-yellow-400 mt-1">
            {stars.map((filled, idx) => (
              <FaStar
                key={idx}
                className={filled ? "opacity-100" : "opacity-30"}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-[var(--muted)]">{review.text}</p>
    </article>
  );
}
