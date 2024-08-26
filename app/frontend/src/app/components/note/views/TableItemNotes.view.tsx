import { Note } from '@blackstone-challenge/data-model/entities';
import { TableRow, TableCell, Button, Hidden } from '@mui/material';

export const TableItemNotesView = ({ note }: { note: Note }) => {
	return (
		<TableRow key={note.id}>
			<TableCell component="th" scope="row">
				{note.title}
			</TableCell>
			<Hidden mdDown>
				<TableCell
					sx={{
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					}}
				>
					{note.content}
				</TableCell>
			</Hidden>
			<Hidden smDown>
				<TableCell>{note.updatedAt?.toLocaleDateString()}</TableCell>
			</Hidden>
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
