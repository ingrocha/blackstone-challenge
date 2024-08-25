import { Note } from '@blackstone-challenge/data-model/entities';
import { NotesOutlined, SearchOutlined } from '@mui/icons-material';
import { Button, Grid, TextField } from '@mui/material';
import { TableListNotesView } from './TableListNotes.view';

const mockNotes: Note[] = [
	{
		id: '1',
		title: 'Test',
		content:
			'Tempor occaecat cupidatat laboris mollit exercitation incididunt commodo culpa ex ea enim occaecat. Enim nisi aliqua et deserunt laborum esse. Et velit excepteur enim incididunt amet nostrud. Nostrud commodo non proident officia proident id.',
		author: '',
		updatedBy: '',
		updateHistories: [],
		sharedUsers: [],
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: '2',
		title: 'Test',
		content:
			'Velit sit cillum qui exercitation cupidatat reprehenderit dolore. Dolore est in magna et. Sint non qui amet duis pariatur dolor laborum irure proident sunt aute aliqua non ea.',
		author: '',
		updatedBy: '',
		updateHistories: [],
		sharedUsers: [],
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: '3',
		title: 'Test',
		content:
			'Labore pariatur id nostrud adipisicing aliqua pariatur. Laboris exercitation consequat elit labore deserunt labore culpa nostrud dolore est proident velit. Nostrud eiusmod velit enim laborum eiusmod amet dolore proident nulla laborum aliqua.',
		author: '',
		updatedBy: '',
		updateHistories: [],
		sharedUsers: [],
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

export const ListNotesView = () => {
	return (
		<Grid
			container
			spacing={0}
			direction="row"
			alignItems={'center'}
			justifyContent="space-between"
			sx={{
				md: 1,
			}}
		>
			<Grid container justifyContent="end" sx={{ mb: 7 }}>
				<Button
					color="primary"
					sx={{
						padding: 2,
						backgroundColor: 'primary.main',
						color: 'white',
						':hover': { backgroundColor: 'primary.main' },
					}}
				>
					<NotesOutlined sx={{ fontSize: 30, mb: 1 }} />
					New Note
				</Button>
			</Grid>
			<Grid container>
				<Grid item sm={11}>
					<TextField
						label="Search"
						variant="filled"
						type="text"
						sx={{ border: 'none', mb: 2 }}
						fullWidth
					/>
				</Grid>
				<Grid item sm={1}>
					<Button>
						<SearchOutlined sx={{ fontSize: 35, mb: 1 }} />
						Search
					</Button>
				</Grid>
			</Grid>
			<TableListNotesView notes={mockNotes} />
		</Grid>
	);
};
