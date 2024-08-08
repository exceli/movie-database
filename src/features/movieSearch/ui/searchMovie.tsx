import { Box, Grid } from '@mui/material'
import { RootState } from 'app/store'
import { useSearchMovies } from 'entities/movie/hooks/useSearchMovie'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDebounce } from 'shared/hooks/useDebounce'
import { colors } from 'shared/ui/colors/colors'
import { SearchButton } from 'shared/ui/searchButton'
import { SearchInput } from 'shared/ui/searchInput'
import { ResultsDropdown } from './resultsDropdown'

export const SearchMovie: FC = () => {
	const [query, setQuery] = useState<string>('')
	const [open, setOpen] = useState<boolean>(false)
	const movies = useSelector((state: RootState) => state.search.movies)
	const { searchMovies, isLoading, error } = useSearchMovies()

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

	return (
		<Grid container spacing={2} justifyContent="center">
			<Grid item xs={10} md={8}>
				<Box position="relative">
					<SearchInput
						value={query}
						onChange={handleInputChange}
						label="Search Movie"
						type="search"
						sx={{
							color: colors.textPrimary,
							backgroundColor: colors.inputBackground,
							borderRadius: '10px',
							'& .MuiInputBase-input::placeholder': {
								color: colors.textPrimary,
							},
							'& .MuiInputLabel-root': {
								color: colors.textPrimary,
							},
						}}
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
						/>
					)}
				</Box>
			</Grid>
		</Grid>
	)
}
