import { Box, Grid } from '@mui/material'
import { RootState } from 'app/store'
import { useSearchMovies } from 'entities/movie/hooks/useSearchMovie'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { addToPlaylist } from 'shared/api/firebase'
import { useAuth } from 'shared/hooks/useAuth'
import { useDebounce } from 'shared/hooks/useDebounce'
import { Movie } from 'shared/types'
import { SearchButton } from 'shared/ui/searchButton'
import { SearchInput } from 'shared/ui/searchInput'
import { ResultsDropdown } from './resultsDropdown'

export const SearchMovie: FC = () => {
	const [query, setQuery] = useState<string>('')
	const [open, setOpen] = useState<boolean>(false)
	const movies = useSelector((state: RootState) => state.search.movies)
	const { searchMovies, isLoading, error } = useSearchMovies()
	const user = useAuth()

	const debouncedQuery = useDebounce(query, 500)

	useEffect(() => {
		if (debouncedQuery) {
			searchMovies(debouncedQuery, 1, 4)
			setOpen(true)
		} else {
			setOpen(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedQuery])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value)
		if (e.target.value === '') {
			setOpen(false)
		}
	}

	const handleAddToPlaylist = async (movie: Movie) => {
		if (user && user.id) {
			try {
				await addToPlaylist(user.id, movie)
				alert(`Фильм ${movie.name} успешно добавлен`)
			} catch (error) {
				throw new Error(error)
			}
		}
	}

	return (
		<Grid container spacing={2} justifyContent="center">
			<Grid item xs={10} md={8}>
				<Box position="relative">
					<SearchInput
						value={query}
						onChange={handleInputChange}
						label="Search Movie"
						type="search"
						endAdornment={
							<SearchButton
								color="primary"
								aria-label="search"
								disabled={isLoading}
							/>
						}
					/>
					{open && (
						<ResultsDropdown
							movies={movies}
							isLoading={isLoading}
							error={error}
							onItemClick={handleAddToPlaylist}
							userId={user?.id}
						/>
					)}
				</Box>
			</Grid>
		</Grid>
	)
}
