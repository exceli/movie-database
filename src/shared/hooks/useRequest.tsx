import { useCallback, useState } from 'react'

interface UseRequestResult<T> {
	executeRequest: (...args: any[]) => Promise<T | undefined>
	isLoading: boolean
	error: string | null
	data: T | null
}

export const useRequest = <T,>(
	requestFunction: (...args: any[]) => Promise<T>
): UseRequestResult<T> => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [data, setData] = useState<T | null>(null)

	const executeRequest = useCallback(
		async (...args: any[]) => {
			setIsLoading(true)
			setError(null)
			try {
				const result = await requestFunction(...args)
				setData(result)
				return result
			} catch (err: any) {
				setError(err.message || 'An unknown error occurred')
				setData(null)
				throw err
			} finally {
				setIsLoading(false)
			}
		},
		[requestFunction]
	)

	return { executeRequest, isLoading, error, data }
}
