import { FC } from 'react'
import { Providers } from './providers'
import { AppRouter } from './routers/appRouter'

export const App: FC = () => {
	return (
		<Providers>
			<AppRouter />
		</Providers>
	)
}
