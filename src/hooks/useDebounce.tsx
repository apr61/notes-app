import { useEffect, useState } from "react"

function useDebounce<T>(value: T, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const setHandler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        return () => {
            clearTimeout(setHandler)
        }
    }, [value, delay])
    return debouncedValue
}

export default useDebounce