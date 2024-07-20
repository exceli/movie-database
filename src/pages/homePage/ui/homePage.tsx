import { Grid, Typography } from '@mui/material'
import { SearchMovie } from 'features/movieSearch/ui/searchMovie'
import { FC } from 'react'

export const HomePage: FC = () => {
	const handleSearch = (query: string) => {
		console.log(query)
	}

	return (
		<Grid container spacing={2} justifyContent="center">
			<Grid item xs={12}>
				<Typography variant="h2" align="center" gutterBottom>
					Welcome to Movie Database App
				</Typography>
			</Grid>
			<Grid item xs={10} md={8}>
				<SearchMovie onSearch={handleSearch} />
			</Grid>
		</Grid>
	)
}

export default HomePage
