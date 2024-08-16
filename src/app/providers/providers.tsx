import { store } from 'app/store'
import { FC } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { Fallback } from 'shared/ui/fallback'

interface IProviders {
	readonly children: JSX.Element
}

export const Providers: FC<IProviders> = ({ children }) => {
	return (
		<ErrorBoundary FallbackComponent={Fallback}>
			<Provider store={store}>{children}</Provider>
		</ErrorBoundary>
	)
}
