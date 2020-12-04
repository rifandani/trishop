import { useState, useEffect } from 'react';
// files
import { storage } from '../firebase/config';

export const useStorage = (file: any, prefix: string) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<any>(null);
  const [url, setUrl] = useState(null);

  // runs every time the file value changes
  useEffect(() => {
    if (file) {
      // storage ref
      const storageRef = storage.ref(`images/${prefix}/${file.name}`);

      storageRef.put(file).on(
        'state_changed',
        (snap) => {
          // track the upload progress
          let percentage = Math.round(
            (snap.bytesTransferred / snap.totalBytes) * 100,
          );
          setProgress(percentage);
        },
        (err) => {
          setError(err);
        },
        async () => {
          // get the public download img url
          const downloadUrl = await storageRef.getDownloadURL();

          // save the url to local state
          setUrl(downloadUrl);
        },
      );
    }
  }, [file]);

  return { progress, url, error };
};
