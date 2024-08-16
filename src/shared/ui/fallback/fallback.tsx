import { Box, Button, Container, Typography } from '@mui/material'
import { FC } from 'react'
import { useErrorBoundary } from 'react-error-boundary'

export const Fallback: FC = () => {
	const { resetBoundary } = useErrorBoundary()

	return (
		<Container>
			<Box>
				<Typography variant="h4" gutterBottom>
					Что-то пошло не так
				</Typography>
				<Typography variant="body1" gutterBottom>
					Произошла ошибка, и мы не смогли загрузить страницу.
				</Typography>
				<Button variant="contained" color="primary" onClick={resetBoundary}>
					Перезагрузить страницу
				</Button>
			</Box>
		</Container>
	)
}
