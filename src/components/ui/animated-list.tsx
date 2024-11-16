"use client"

import React, { ReactElement, useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import useIsOnscreen from "@/hooks/use-is-onscreen"

export interface AnimatedListProps {
  className?: string
  children: React.ReactNode
  delay?: number
}

export const AnimatedList = React.memo(
  ({ className, children, delay = 1000 }: AnimatedListProps) => {
    const [messges, setMessages] = useState<React.ReactNode[]>([])
    const childrenArray = React.Children.toArray(children)
    const elementRef = React.useRef<HTMLDivElement | null>(null)
    const isOnscreen = useIsOnscreen(elementRef)
    console.log(isOnscreen)
    const [hasStartedAnimation, setHasStartedAnimation] = useState(false)

    React.useEffect(() => {
      if (isOnscreen && !hasStartedAnimation) {
        setHasStartedAnimation(true)
      }
    }, [isOnscreen, hasStartedAnimation])

    useEffect(() => {
      if (!hasStartedAnimation) {
        return
      }
      const id = setInterval(() => {
        if (childrenArray.length > messges.length) {
          setMessages((prev) => [childrenArray[messges.length], ...prev])
        } else {
          clearInterval(id)
        }
      }, delay)

      return () => {
        return clearInterval(id)
      }
    }, [childrenArray.length, delay, messges.length, hasStartedAnimation])

    return (
      <div
        className={`flex flex-col-reverse items-center gap-4 ${className}`}
        ref={elementRef}
      >
        <AnimatePresence>
          {messges.map((item) => (
            <AnimatedListItem key={(item as ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    )
  }
)

AnimatedList.displayName = "AnimatedList"

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  }

  return (
    <>
      <motion.div {...animations} layout className="mx-auto w-full">
        {children}
      </motion.div>
    </>
  )
}
