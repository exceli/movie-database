import { TextField } from '@mui/material'
import { FC } from 'react'

interface InputProps extends React.ComponentProps<typeof TextField> {}

export const Input: FC<InputProps> = ({ ...props }) => {
	return <TextField {...props} />
}
