import { useCallback, useState } from 'react'

interface UseRequestResult<T> {
	executeRequest: (...args: any[]) => Promise<T>
	isLoading: boolean
	error: string | null
}

export const useRequest = <T,>(
	apiCallback: (...args: any[]) => Promise<T>
): UseRequestResult<T> => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const executeRequest = useCallback(
		async (...args: any[]) => {
			setIsLoading(true)
			setError(null)
			try {
				const result = await apiCallback(...args)
				return result
			} catch (err: any) {
				setError(err.message || 'An unknown error occurred')
				throw err
			} finally {
				setIsLoading(false)
			}
		},
		[apiCallback]
	)

	return { executeRequest, isLoading, error }
}
