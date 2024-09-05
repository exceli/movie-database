import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton, Modal, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { SearchMovie } from './searchMovie'

export const SearchModal: FC = () => {
	const [open, setOpen] = useState(false)

	const handleClose = () => setOpen(false)

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="search-modal-title"
			aria-describedby="search-modal-description"
		>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 400,
					bgcolor: 'background.paper',
					border: '2px solid #000',
					boxShadow: 24,
					p: 4,
					borderRadius: 2,
				}}
			>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
				>
					<Typography
						id="search-modal-title"
						variant="h6"
						component="h2"
					>
						Search Movies
					</Typography>
					<IconButton>
						<CloseIcon />
					</IconButton>
				</Box>
				<SearchMovie />
			</Box>
		</Modal>
	)
}
