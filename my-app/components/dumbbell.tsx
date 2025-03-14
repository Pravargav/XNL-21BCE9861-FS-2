import type { LucideProps } from "lucide-react"

export function Dumbbell(props: LucideProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 7v10" />
      <path d="M18 7v10" />
      <path d="M8 7h8" />
      <path d="M8 17h8" />
      <path d="M2 9v6" />
      <path d="M22 9v6" />
      <path d="M4 9h2" />
      <path d="M4 15h2" />
      <path d="M18 9h2" />
      <path d="M18 15h2" />
    </svg>
  )
}