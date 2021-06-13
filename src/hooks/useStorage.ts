import firebase from 'firebase'
import { useState, useEffect } from 'react'
// files
import { storage } from 'firebase/config'

interface IUseStorage {
  progress: number
  url: string
  error: firebase.storage.FirebaseStorageError
}

export const useStorage = (file: File, prefix: string): IUseStorage => {
  const [progress, setProgress] = useState<number>(0)
  const [error, setError] =
    useState<firebase.storage.FirebaseStorageError>(null)
  const [url, setUrl] = useState<string>('')

  // runs every time the file value changes
  useEffect(() => {
    if (file) {
      // storage ref
      const storageRef = storage.ref(`images/${prefix}/${file.name}`)

      storageRef.put(file).on(
        'state_changed',
        (snap) => {
          // track the upload progress
          const percentage = Math.round(
            (snap.bytesTransferred / snap.totalBytes) * 100
          )
          setProgress(percentage)
        },
        (err) => {
          setError(err)
        },
        async () => {
          try {
            // get the public download img url
            const downloadUrl = await storageRef.getDownloadURL()

            // save the url to local state
            setUrl(downloadUrl as string)
          } catch (err) {
            console.error(err)
          }
        }
      )
    }
  }, [file])

  return { progress, url, error }
}
