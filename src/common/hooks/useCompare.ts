import { useRef } from 'react'
import { isEqual } from 'lodash'

const useCompare = <T>(value: T) => {
    const ref = useRef<T | null>(null)

    if (!isEqual(value, ref.current)) {
        ref.current = value
    }

    return ref.current
}
export default useCompare
