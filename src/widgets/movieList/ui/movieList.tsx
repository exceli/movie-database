import { AppDispatch, RootState } from '@/app/store'
import { useMarkAsWatched } from '@/entities/playlist/hooks/useMarkAsWatched'
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
	const { handleMarkAsWatched, isMarkMovieLoading, markingMovieId } =
		useMarkAsWatched(movies)

	const handleDeleteMovie = async (movieId: string) => {
		if (user?.id) {
			await dispatch(
				deleteMovieFromPlaylist({ userId: user.id, movieId })
			)
		}
	}

	return (
		<Grid container spacing={2}>
			{status === 'loading' ? (
				<Loading />
			) : status === 'failed' ? (
				<Typography color="error">{error}</Typography>
			) : (
				<List sx={{ width: '100%' }}>
					{movies.map(movie => (
						<MovieListItem
							key={movie.id}
							movie={movie}
							onDelete={handleDeleteMovie}
							isMarkMovieLoading={
								isMarkMovieLoading &&
								markingMovieId === movie.id.toString()
							}
							onMarkAsWatched={() => handleMarkAsWatched(movie)}
						/>
					))}
				</List>
			)}
		</Grid>
	)
}
