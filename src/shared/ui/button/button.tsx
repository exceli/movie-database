import { Button as MUIButton } from '@mui/material'
import { FC } from 'react'

interface ButtonProps extends React.ComponentProps<typeof MUIButton> {}

export const Button: FC<ButtonProps> = ({ ...props }) => {
	return <MUIButton {...props}>{props.children}</MUIButton>
}
