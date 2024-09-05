import { AppDispatch, RootState } from '@/app/store'
import { deleteMovieFromPlaylist } from '@/entities/playlist/model/playlistSlice'
import { useAuth } from '@/entities/user/hook/useAuth'
import { MovieListItem } from '@/features/movie'
import { Loading } from '@/shared/ui/loading'
import { Grid, List, Typography } from '@mui/material'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const MovieList: FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const user = useAuth()

	const { movies, status, error } = useSelector(
		(state: RootState) => state.playlist
	)

	const handleDeleteMovie = async (movieId: string) => {
		await dispatch(deleteMovieFromPlaylist({ userId: user.id, movieId }))
	}

	return (
		<Grid container spacing={2}>
			{status === 'loading' ? (
				<Loading />
			) : status === 'failed' ? (
				<Typography color="error">{error}</Typography>
			) : (
				<List>
					{movies.map(movie => (
						<MovieListItem
							key={movie.id}
							movie={movie}
							onDelete={handleDeleteMovie}
						/>
					))}
				</List>
			)}
		</Grid>
	)
}
