export default function ArrowDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 6
           C 4 30, 8 58, 32 62
           C 52 65, 58 46, 44 40
           C 32 35, 26 50, 40 58
           C 58 68, 78 62, 88 78"
        stroke="#A78BFA"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
