import { InputAdornment, TextField, TextFieldProps } from '@mui/material'
import { FC } from 'react'

type SearchInputProps = Omit<TextFieldProps, 'InputProps'> & {
	endAdornment?: React.ReactNode
}

export const SearchInput: FC<SearchInputProps> = ({
	endAdornment,
	...props
}) => {
	return (
		<TextField
			fullWidth
			variant="outlined"
			margin="normal"
			InputProps={{
				endAdornment: endAdornment ? (
					<InputAdornment position="end">{endAdornment}</InputAdornment>
				) : undefined,
			}}
			{...props}
		/>
	)
}

export default SearchInput
