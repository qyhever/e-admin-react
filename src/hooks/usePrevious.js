import { useRef } from 'react'

export default (state, compare) => {
  const prevRef = useRef()
  const curRef = useRef()

  const needUpdate = typeof compare === 'function' ? compare(curRef.current, state) : true
  if (needUpdate) {
    prevRef.current = curRef.current
    curRef.current = state
  }

  return prevRef.current
}

// function usePrevious(value) {
//   const ref = useRef()
//   useEffect(() => {
//     ref.current = value
//   })
//   return ref.current
// }
