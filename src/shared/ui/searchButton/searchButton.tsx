import SearchIcon from '@mui/icons-material/Search'
import { IconButton, IconButtonProps } from '@mui/material'
import { FC } from 'react'

export const SearchButton: FC<IconButtonProps> = props => {
	return (
		<IconButton {...props}>
			<SearchIcon />
		</IconButton>
	)
}
