export interface ChildrenProps {
  children: React.ReactNode
}

export interface IPhotoURL {
  lastModified: number
  lastModifiedDate: Date
  name: string
  path: string
  preview?: string // hasil URL.createObjectURL(image)
  size: number
  type: string
  webkitRelativePath: string
}
