import dynamic from 'next/dynamic'

export default dynamic(() => import('./Nav'), { ssr: false })
