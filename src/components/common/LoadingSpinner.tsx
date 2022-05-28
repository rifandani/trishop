import { FC } from 'react'

interface Props {
  className?: string
}

const LoadingSpinner: FC<Props> = ({ className }) => {
  return <div className={`lds-dual-ring ${className}`}></div>
}

export default LoadingSpinner
