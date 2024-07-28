import { Box, Grid } from '@mui/material'
import { SearchMovie } from 'features/movieSearch/ui/searchMovie'

export const HomePage = () => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			minHeight="90vh"
		>
			<Grid container spacing={2} justifyContent="center">
				<Grid item xs={10} md={8}>
					<SearchMovie />
				</Grid>
			</Grid>
		</Box>
	)
}

export default HomePage
