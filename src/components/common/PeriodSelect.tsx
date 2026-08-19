interface PeriodOption {
  label: string
  value: number
}

interface PeriodSelectProps {
  value: number
  options: PeriodOption[]
  onChange: (value: number) => void
  className?: string
}

export default function PeriodSelect({
  value,
  options,
  onChange,
  className = '',
}: PeriodSelectProps) {
  return (
    <label className={`flex items-center gap-2 text-sm text-gray-600 ${className}`}>
      <span>기간</span>
      <select
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="rounded border border-gray-300 bg-white px-2 py-1 text-sm text-gray-800 outline-none ring-0 transition focus:border-blue-500"
        aria-label="좋아요 집계 기간 선택"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
