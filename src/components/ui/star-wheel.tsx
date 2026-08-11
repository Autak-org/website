/**
 * The star wheel from the wheelchair: three rimmed wheels on a rotating
 * carrier. Drawn rather than photographed so it can spin cheaply.
 */
export function StarWheel({ className }: { className?: string }) {
  const arms = [0, 120, 240];

  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <g fill="none" stroke="currentColor" strokeWidth="3">
        <circle cx="100" cy="100" r="14" />
        {arms.map((angle) => {
          const radians = (angle - 90) * (Math.PI / 180);
          const cx = 100 + Math.cos(radians) * 56;
          const cy = 100 + Math.sin(radians) * 56;

          return (
            <g key={angle}>
              <line x1="100" y1="100" x2={cx} y2={cy} strokeWidth="7" />
              <circle cx={cx} cy={cy} r="34" strokeWidth="5" />
              <circle cx={cx} cy={cy} r="10" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
