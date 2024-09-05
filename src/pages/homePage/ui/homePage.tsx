import { SearchMovie } from '@/features/searchMovie'
import { Box, Grid } from '@mui/material'

export const HomePage = () => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			minHeight={'calc(100vh - 64px)'}
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
