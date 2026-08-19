interface LoadingSpinnerProps {
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function LoadingSpinner({
  label = '로딩 중',
  size = 'md',
  className = '',
}: LoadingSpinnerProps) {
  const sizeClass = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-[3px]',
    lg: 'h-10 w-10 border-4',
  }[size]

  return (
    <div
      className={`inline-flex items-center gap-2 text-sm text-gray-500 ${className}`}
      role="status"
      aria-live="polite"
    >
      <span
        aria-hidden="true"
        className={`${sizeClass} animate-spin rounded-full border-gray-200 border-t-blue-500`}
      />
      <span>{label}</span>
    </div>
  )
}
