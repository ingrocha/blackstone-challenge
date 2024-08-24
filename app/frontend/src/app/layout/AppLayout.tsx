import { Box } from '@mui/material';
import { ReactNode } from 'react';

export const AppLayout = ({ children }: { children: ReactNode }) => {
	return (
		<Box sx={{ display: 'flex' }}>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				{children}
			</Box>
		</Box>
	);
};
