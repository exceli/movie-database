import { store } from '@/app/store'
import { Fallback } from '@/shared/ui/fallback'
import { FC } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { ModalProvider } from './modal-provider'

interface IProviders {
	readonly children: JSX.Element
}

export const Providers: FC<IProviders> = ({ children }) => {
	return (
		<ErrorBoundary FallbackComponent={Fallback}>
			<ModalProvider />
			<Provider store={store}>{children}</Provider>
		</ErrorBoundary>
	)
}
