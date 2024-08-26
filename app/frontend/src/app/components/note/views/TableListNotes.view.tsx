import {
	Grid,
	Paper,
	Table,
	TableCell,
	TableContainer,
	TableRow,
	TableHead,
	TableBody,
	Hidden,
} from '@mui/material';

import { Note } from '@blackstone-challenge/data-model/entities';

import { TableItemNotesView } from './TableItemNotes.view';

export const TableListNotesView = ({ notes }: { notes: Note[] }) => {
	return (
		<Grid container>
			<TableContainer component={Paper}>
				<Table
					sx={{
						width: '100%',
						tableLayout: 'fixed',
						whiteSpace: 'nowrap',
					}}
				>
					<TableHead>
						<TableRow>
							<TableCell>Title</TableCell>
							<Hidden mdDown>
								<TableCell>Content</TableCell>
							</Hidden>
							<Hidden smDown>
								<TableCell
									sx={{
										width: '90px',
									}}
								>
									Last Update
								</TableCell>
							</Hidden>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{notes.map((note) => (
							<TableItemNotesView key={note.id} note={note} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Grid>
	);
};
