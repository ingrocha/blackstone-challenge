import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './styles.css';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BlackstoneApp } from './blackstoneApp';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<StrictMode>
		<Provider store={store}>
			<Toaster richColors />
			<BrowserRouter>
				<BlackstoneApp />
			</BrowserRouter>
		</Provider>
	</StrictMode>
);
