import { useRef, useCallback } from 'react'

/**
 * useInfiniteScroll — returns a ref callback to attach to the LAST item in a
 * list. When that element enters the viewport the `onLoadMore` callback fires,
 * triggering the next page fetch.
 *
 * @param {boolean}  hasMore    - Whether there are more pages to load
 * @param {boolean}  isLoading  - Prevent triggering while already fetching
 * @param {Function} onLoadMore - Called when the sentinel element is visible
 * @returns {Function} ref callback — attach to the last rendered card
 *
 * HOW IT WORKS:
 * We use the IntersectionObserver API. It watches a single "sentinel" DOM node
 * (the last card). When that node becomes visible (intersects the viewport)
 * we call onLoadMore. We disconnect the old observer before creating a new one
 * so there is never more than one active observer at a time.
 */
export function useInfiniteScroll(hasMore, isLoading, onLoadMore) {
  const observerRef = useRef(null)

  const sentinelRef = useCallback(
    (node) => {
      // Disconnect the previous observer
      if (observerRef.current) observerRef.current.disconnect()

      // Don't observe if we're loading or there's nothing more to load
      if (isLoading || !hasMore) return

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            onLoadMore()
          }
        },
        {
          // Fire when the sentinel is within 200px of the viewport bottom
          rootMargin: '0px 0px 200px 0px',
          threshold: 0,
        }
      )

      if (node) observerRef.current.observe(node)
    },
    [hasMore, isLoading, onLoadMore]
  )

  return sentinelRef
}
