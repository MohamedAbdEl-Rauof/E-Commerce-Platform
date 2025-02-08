import React from 'react';
import {Box, Button, Paper, TextField, Typography} from '@mui/material';
import {Comment, ReactionType} from './types';

interface CommentListProps {
    comments: Comment[];
    sessionId: string;
    onAddComment: (text: string, rating: number, parentId?: string, level?: number) => void;
    onDeleteComment: (commentId: string, parentId?: string) => void;
    onReaction: (type: ReactionType, commentId: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({comments, onAddComment, onDeleteComment, onReaction}) => {
    const handleAddReply = (text: string, rating: number, parentId: string) => {
        onAddComment(text, rating, parentId, 1);
    };

    const handleDelete = (commentId: string, parentId?: string) => {
        onDeleteComment(commentId, parentId);
    };

    const handleReact = (type: ReactionType, commentId: string) => {
        onReaction(type, commentId);
    };

    const renderComments = (comments: Comment[], level: number = 0) => {
        return comments.map(comment => (
            <Paper key={comment.id} sx={{p: 2, mb: 2, ml: level * 2}}>
                <Typography variant="body1">
                    {comment.text} - Rating: {comment.rating}
                </Typography>
                <Typography variant="caption">
                    {new Date(comment.timestamp).toLocaleString()}
                </Typography>
                <Button onClick={() => handleReact('like', comment.id)} color="primary">
                    Like
                </Button>
                <Button onClick={() => handleReact('dislike', comment.id)} color="secondary">
                    Dislike
                </Button>
                <Button onClick={() => handleDelete(comment.id)}>Delete</Button>
                <TextField
                    label="Reply"
                    onChange={(e) => handleAddReply(e.target.value, 1, comment.id)}
                    fullWidth
                    margin="normal"
                />
                {comment.replies.length > 0 && renderComments(comment.replies, level + 1)}
            </Paper>
        ));
    };

    return (
        <Box>
            {renderComments(comments)}
        </Box>
    );
};

export default CommentList;
