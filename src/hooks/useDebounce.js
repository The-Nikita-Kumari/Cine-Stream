import { useState, useEffect } from 'react'

/**
 * useDebounce — delays updating the returned value until the user stops
 * changing the input for `delay` milliseconds.
 *
 * @param {*}      value  - The value to debounce (typically a search string)
 * @param {number} delay  - Milliseconds to wait (default 500ms)
 * @returns debounced value
 *
 * HOW IT WORKS:
 * Every time `value` changes a new timer is started. If `value` changes
 * again before the timer fires, the old timer is cleared and a new one
 * starts. The output only updates when the timer actually fires — i.e.
 * when the user stops typing for `delay` ms.
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    // Cleanup: cancel the previous timer on each re-render
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
