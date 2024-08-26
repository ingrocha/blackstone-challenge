import { useState } from 'react';
import { Note } from '@blackstone-challenge/data-model/entities';
import { ButtonsActions } from '../../../shared/enums';
import { Grid, TextField } from '@mui/material';
import { BottomButtonsView } from '../../../shared/views';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export const NoteFormView = ({ note }: { note: Note }) => {
	const [content, setContent] = useState(note.content);

	const handleButtonClick = (data: ButtonsActions) => {
		if (data === ButtonsActions.SAVE) {
			note.content = content;
			console.log(note);
		}
		console.log(data);
	};

	return (
		<Grid container>
			<TextField
				type="text"
				label="Title"
				variant="filled"
				sx={{ border: 'none', mb: 2 }}
				fullWidth
				defaultValue={note.title}
			/>
			<ReactQuill
				value={content}
				onChange={setContent}
				theme="snow"
				style={{ marginBottom: '60px' }}
			/>
			<BottomButtonsView onButtonClick={handleButtonClick} />
		</Grid>
	);
};
