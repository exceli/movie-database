import { Typography } from '@mui/material'
import { FC } from 'react'

interface RatingProps {
	rating: number
}

const getRatingColor = (rating: number) => {
	if (rating < 2) return 'red'
	if (rating < 5) return 'gray'
	if (rating < 6.5) return 'orange'
	return 'green'
}

export const Rating: FC<RatingProps> = ({ rating }) => {
	return (
		<Typography component="span" color={getRatingColor(rating)} sx={{ ml: 1 }}>
			{rating}
		</Typography>
	)
}
