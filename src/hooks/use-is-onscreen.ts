import React from "react"

function useIsOnscreen(elementRef: any) {
  const [isOnscreen, setIsOnscreen] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsOnscreen(entry.isIntersecting)
      },
      {
        root: null,
        rootMargin: "400px",
        threshold: 0,
      }
    )
    observer.observe(elementRef.current)

    return () => {
      observer.disconnect()
    }
  }, [elementRef])

  return isOnscreen
}

export default useIsOnscreen
