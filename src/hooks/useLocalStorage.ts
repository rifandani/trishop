import { useState } from 'react'

// Hook
function useLocalStorage<T>(
  key: string,
  initialValue: T
): readonly [T, (value: T | ((val: T) => T)) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      let item: string

      // Get from local storage by key
      if (typeof window !== 'undefined') {
        item = window.localStorage.getItem(key)
      }
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (err) {
      // If error also return initialValue
      console.error(err)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (err) {
      // A more advanced implementation would handle the error case
      console.error(err)
    }
  }

  return [storedValue, setValue] as const
}

export default useLocalStorage
