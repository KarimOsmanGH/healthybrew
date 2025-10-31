import { SVGProps } from "react";

const baseProps = "h-6 w-6";

type IconProps = SVGProps<SVGSVGElement> & {
  className?: string;
};

export function TeaLeafIcon({ className = baseProps, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M28 4C15.2 5.333 6.667 16.017 4 28c12-2.667 22.667-11.2 24-24Z"
        fill="currentColor"
        opacity={0.12}
      />
      <path
        d="M16 6c-1 6-5 12-12 15"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d="M27 6c-6.539 0-12.593 6.055-12.593 12.593v.663c0 .38.308.688.688.688h.663C21.296 19.944 27.35 13.89 27.35 7.35V6.688A.688.688 0 0 0 26.662 6h-.663Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CoffeeBeanIcon({ className = baseProps, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <ellipse
        cx={12}
        cy={20}
        rx={8}
        ry={11}
        transform="rotate(-30 12 20)"
        fill="currentColor"
        opacity={0.14}
      />
      <path
        d="M18.5 5.5c3.6 2 6.5 7.3 5.1 12.1-1.7 5.6-7.7 9.4-12.9 8.8"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d="M13.2 6c-3.3 1.7-6 6.6-4.9 11.2 1.2 5 6.2 9 11.7 8.7"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CupSteamIcon({ className = baseProps, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M7 11h14v7a7 7 0 0 1-7 7h-.273A6.727 6.727 0 0 1 7 18.273V11Z"
        fill="currentColor"
        opacity={0.12}
      />
      <path
        d="M7 11h14v7a7 7 0 0 1-7 7h-.273A6.727 6.727 0 0 1 7 18.273V11Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d="M21 14h3a4 4 0 0 1 0 8h-3"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 4c0 1.333-.667 2-2 2s-2-.667-2-2c0-1.333.667-2 2-2s2 .667 2 2ZM19 4c0 1.333-.667 2-2 2s-2-.667-2-2c0-1.333.667-2 2-2s2 .667 2 2Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HeartHerbIcon({ className = baseProps, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M16 28s-11-7.444-11-15A6 6 0 0 1 16 9a6 6 0 0 1 11 4c0 7.556-11 15-11 15Z"
        fill="currentColor"
        opacity={0.12}
      />
      <path
        d="M16 28s-11-7.444-11-15A6 6 0 0 1 16 9a6 6 0 0 1 11 4c0 7.556-11 15-11 15Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d="m10 17 3 2 3-5 4 3 2-4"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SparkIcon({ className = baseProps, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M16 3v6M16 23v6M29 16h-6M9 16H3M24.5 7.5l-4.243 4.243M11.743 20.257 7.5 24.5M24.5 24.5l-4.243-4.243M11.743 11.743 7.5 7.5"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <circle cx={16} cy={16} r={4} fill="currentColor" opacity={0.12} />
    </svg>
  );
}
