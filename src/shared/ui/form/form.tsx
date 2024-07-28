import { Box } from '@mui/material'
import { FC } from 'react'

export type FormProps = {
	children: React.ReactNode
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export const Form: FC<FormProps> = ({ children, onSubmit }) => {
	return (
		<Box onSubmit={onSubmit} component="form">
			{children}
		</Box>
	)
}
