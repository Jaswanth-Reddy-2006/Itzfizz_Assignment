"use client";

import React from "react";

interface StatBoxProps {
  /** The percentage value to display (e.g. "58%") */
  percentage: string;
  /** Short description of the stat */
  description: string;
  /** Background color variant */
  variant: "yellow" | "blue" | "dark" | "orange";
  /** Unique ID for GSAP targeting */
  id: string;
  /** Optional inline styles for positioning */
  style?: React.CSSProperties;
}

const variantStyles: Record<StatBoxProps["variant"], string> = {
  yellow: "bg-[#def54f] text-[#111]",
  blue: "bg-[#6ac9ff] text-[#111]",
  dark: "bg-[#222222] text-white",
  orange: "bg-[#fa7328] text-[#111]",
};

/**
 * A statistics card that appears during scroll animation.
 * Features large dimensions, generous padding, ample breathing room, and premium typography.
 */
const StatBox: React.FC<StatBoxProps> = ({
  percentage,
  description,
  variant,
  id,
  style,
}) => {
  return (
    <div
      id={id}
      className={`stat-box opacity-0 rounded-3xl p-8 sm:p-9 md:p-10 absolute z-10 flex flex-col justify-center gap-3 shadow-2xl backdrop-blur-sm min-w-[300px] sm:min-w-[340px] md:min-w-[380px] min-h-[160px] md:min-h-[180px] ${variantStyles[variant]}`}
      style={{ willChange: "opacity, transform", ...style }}
    >
      <span className="text-5xl sm:text-6xl md:text-7xl font-black leading-none tracking-tight">
        {percentage}
      </span>
      <span className="text-base sm:text-lg font-bold leading-relaxed max-w-[280px] opacity-95">
        {description}
      </span>
    </div>
  );
};

export default StatBox;
