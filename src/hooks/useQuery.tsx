// import { useEffect, useState } from "react"

// type UseQueryProps<T> = {
//     fn: () => Promise<T>
//     dependencies: string[]
//     initialLoading: boolean
// }


// export function useQuery<T>({ fn, dependencies, initialLoading= false }: UseQueryProps<T>) {
//     const [isLoading, setIsLoading] = useState<boolean>(initialLoading)
//     const [data, setData] = useState<T[]>([])
//     const [error, setError] = useState<string>('')

//     useEffect(() => {
//         ; (async () => {
//             try {
//                 setIsLoading(true)
//                 const response = await fn();
//                 setData(Awaited<T>response)
//             } catch (error) {
//                 if (error instanceof Error) {
//                     setError(error.message)
//                     setData([])
//                 }
//             } finally {
//                 setIsLoading(false)
//             }
//         })()
//     }, dependencies)
//     return { isLoading, error, data }
// }