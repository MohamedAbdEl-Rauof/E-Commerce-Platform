import React, {useState} from 'react';
import {Button, Paper, TextField} from '@mui/material';

interface CommentFormProps {
    onSubmit: (text: string, rating: number) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({onSubmit}) => {
    const [text, setText] = useState('');
    const [rating, setRating] = useState(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(text, rating);
        setText('');
        setRating(1);
    };

    return (
        <Paper sx={{p: 2, mb: 2}}>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Comment"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                />
                <TextField
                    label="Rating"
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    inputProps={{min: 1, max: 5}}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </Paper>
    );
};

export default CommentForm;
