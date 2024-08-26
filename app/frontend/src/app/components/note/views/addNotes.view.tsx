import { Grid } from '@mui/material';
import { TopTitleView } from '../../../shared/views';
import { NoteFormView } from '.';
import { Note } from '@blackstone-challenge/data-model/entities';

export const AddNotesView = () => {
	const mockNote: Note = {
		id: '1',
		title: 'Test',
		content:
			'<h1>Tempor occaecat cupidatat laboris mollit exercitation incididunt commodo culpa ex ea enim occaecat. Enim nisi aliqua et deserunt laborum esse. Et velit excepteur enim incididunt amet nostrud. Nostrud commodo non proident officia proident id.</h1><p><br></p><p>aSasaS</p>',
		author: '',
		updatedBy: '',
		updateHistories: [],
		sharedUsers: [],
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	return (
		<Grid
			container
			direction="row"
			justifyContent="space-between"
			alignContent="center"
			sx={{ mb: 1 }}
		>
			<TopTitleView title="Add Note"></TopTitleView>
			<NoteFormView note={mockNote}></NoteFormView>
		</Grid>
	);
};
