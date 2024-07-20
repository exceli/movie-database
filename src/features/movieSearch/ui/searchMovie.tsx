import { Grid } from '@mui/material'
import { searchMovies } from 'entities/movie/api/movieApi'
import { FC, useState } from 'react'
import { SearchButton } from 'shared/ui/searchButton'
import { SearchInput } from 'shared/ui/searchInput'

interface SearchMovieProps {
	onSearch: (query: string) => void
}

export const SearchMovie: FC<SearchMovieProps> = () => {
	const [query, setQuery] = useState('')

	const handleSearch = async () => {
		try {
			const data = await searchMovies(query)
			console.log(data)
		} catch (error) {
			console.error('Error searching movies:', error)
		}
	}

	const handleKeyPress = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			handleSearch()
		}
	}

	return (
		<Grid container spacing={2} justifyContent="center">
			<Grid item xs={10} md={8}>
				<SearchInput
					value={query}
					onChange={e => setQuery(e.target.value)}
					label="Search Movie"
					type="search"
					onKeyPress={handleKeyPress}
					endAdornment={
						<SearchButton
							onClick={handleSearch}
							color="primary"
							aria-label="search"
						/>
					}
				/>
			</Grid>
		</Grid>
	)
}
