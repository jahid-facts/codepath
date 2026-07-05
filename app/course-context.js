'use client'

import { createContext, useContext } from 'react'

// Holds the active course plus its scoped modules/topics/labs. Components read it
// via useCourse() instead of importing the (course-agnostic) data arrays directly.
export const CourseContext = createContext(null)

export function useCourse() {
  return useContext(CourseContext)
}
