import { fetchUser } from '@/entities/user/model/userSlice'
import { AppDispatch, RootState } from 'app/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((state: RootState) => state.user)

    useEffect(() => {
        if (!user.id) {
            dispatch(fetchUser())
        }
    }, [dispatch, user.id])

    return user
}
