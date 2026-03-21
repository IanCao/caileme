interface LogoProps {
  size?: number;
}

export default function Logo({ size = 32 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shield */}
      <path
        d="M32 2L6 14v22c0 16 11 26 26 30 15-4 26-14 26-30V14L32 2z"
        fill="#FFFFFF"
        stroke="#1a1a1a"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Hammer and sickle — crossed, classic layout */}
      <g transform="translate(32, 35)">
        {/* Sickle: curved blade */}
        <path
          d="M-4,-16 C-12,-10 -14,0 -8,8 C-4,14 2,16 6,14 C2,14 -4,10 -6,4 C-8,-2 -5,-8 0,-12 Z"
          fill="#DC2626"
        />

        {/* Hammer handle */}
        <rect
          x="-1.5"
          y="-2"
          width="3.5"
          height="22"
          rx="1.5"
          fill="#DC2626"
          transform="rotate(45 0 0)"
        />
        {/* Hammer head */}
        <rect
          x="-7"
          y="-3"
          width="14"
          height="5"
          rx="1.2"
          fill="#DC2626"
          transform="rotate(45 0 0) translate(0, -2)"
        />
      </g>
    </svg>
  );
}
