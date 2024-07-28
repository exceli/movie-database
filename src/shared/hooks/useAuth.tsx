import { RootState } from 'app/store'
import { setUser } from 'entities/user/model/slice/userSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useAuth = () => {
	const dispatch = useDispatch()
	const user = useSelector((state: RootState) => state.user)

	useEffect(() => {
		const id = localStorage.getItem('user_id')
		const email = localStorage.getItem('user_email')
		const token = localStorage.getItem('user_token')

		if (id && email && token) {
			dispatch(setUser({ id, email, token }))
		}
	}, [dispatch])

	return user
}
