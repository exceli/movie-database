import { Box, Grid } from '@mui/material'
import { SearchMovie } from 'features/search/ui/searchMovie'
import { colors } from 'shared/ui/colors/colors'

export const HomePage = () => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			minHeight={'calc(100vh - 64px)'}
			sx={{ backgroundColor: colors.pageBackground }}
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
