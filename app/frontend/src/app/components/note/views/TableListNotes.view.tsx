import {
	Grid,
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from '@mui/material';

import { Note } from '@blackstone-challenge/data-model/entities';
import { TableItemNotesView } from '.';

export const TableListNotesView = ({ notes }: { notes: Note[] }) => {
	return (
		<Grid container>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: '100%' }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Title</TableCell>
							<TableCell>Content</TableCell>
							<TableCell>Last Update</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{notes.map((note) => (
							<TableItemNotesView note={note} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Grid>
	);
};
