import type { LucideProps } from "lucide-react"

export function Running(props: LucideProps) {
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
      <path d="M13 4v6l3.5 3.5" />
      <path d="M6.5 20.5 8 19l2.5-3 2.5 1 4.5-4 2.5 2" />
      <path d="m4.5 15.5 3-2.5 3 3" />
      <circle cx="15" cy="5" r="1" />
      <path d="M4 20h16" />
    </svg>
  )
}