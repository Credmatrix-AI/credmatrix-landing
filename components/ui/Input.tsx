import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({
  label,
  error,
  className,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-8">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        className={cn(
          'w-full px-16 py-12 border border-neutral-300 rounded-lg',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          'placeholder:text-neutral-400',
          'disabled:bg-neutral-100 disabled:cursor-not-allowed',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
