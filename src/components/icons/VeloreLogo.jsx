import { cn } from "../../lib/utils";

export function VeloreLogo(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(props.className)}
      {...props}
    >
      <path d="M2 3l10 17L22 3" />
      <path d="M6.5 3L12 12l5.5-9" />
    </svg>
  );
}
