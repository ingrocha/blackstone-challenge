import { Note } from '@blackstone-challenge/data-model/entities';
import { TableRow, TableCell, Button } from '@mui/material';

export const TableItemNotesView = ({ note }: { note: Note }) => {
	return (
		<TableRow key={note.id}>
			<TableCell component="th" scope="row">
				{note.title}
			</TableCell>
			<TableCell
				sx={{
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					maxWidth: 700,
				}}
			>
				{note.content}
			</TableCell>
			<TableCell>{note.updatedAt?.toLocaleDateString()}</TableCell>
			<TableCell>
				<Button color="primary" sx={{ padding: 2 }}>
					Edit
				</Button>
				<Button color="error" sx={{ padding: 2 }}>
					Delete
				</Button>
			</TableCell>
		</TableRow>
	);
};
