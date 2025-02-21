import React from 'react';
import {Box} from '@mui/material';
import CommentItem from './CommentItem ';

interface CommentListProps {
    comments: Comment[];
    sessionId: string;
    onAddComment: (text: string, rating: number, parentId?: string, level?: number) => void;
    onDeleteComment: (commentId: string, parentId?: string) => void;
    onReaction: (type: ReactionType, commentId: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({
                                                     comments,
                                                     sessionId,
                                                     onAddComment,
                                                     onDeleteComment,
                                                     onReaction
                                                 }) => {
    return (
        <Box sx={{mt: 4}}>
            {comments.map(comment => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    sessionId={sessionId}
                    onAddComment={onAddComment}
                    onDeleteComment={onDeleteComment}
                    onReaction={onReaction}
                />
            ))}
        </Box>
    );
};

export default CommentList;