import { Box, CircularProgress } from '@mui/material'
import React from 'react'

interface LoadingProps {
	size?: number
	color?: 'inherit' | 'primary' | 'secondary'
}

export const Loading: React.FC<LoadingProps> = ({
	size = 40,
	color = 'primary',
}) => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			height="100%"
		>
			<CircularProgress size={size} color={color} />
		</Box>
	)
}
