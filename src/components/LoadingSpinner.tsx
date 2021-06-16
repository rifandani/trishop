interface LoadingSpinnerProps {
  className?: string
}

export default function LoadingSpinner({
  className,
}: LoadingSpinnerProps): JSX.Element {
  return <div className={`lds-dual-ring ${className}`}></div>
}
