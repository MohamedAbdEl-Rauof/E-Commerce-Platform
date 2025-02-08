import React, {useState} from 'react';
import {Avatar, Box, Button, Rating, Typography} from '@mui/material';
import ReactionPicker from './ReactionPicker';
import CommentForm from './CommentForm';
import {Comment, ReactionType} from './types';

interface CommentItemProps {
    comment: Comment;
    sessionId: string;
    onAddComment: (text: string, rating: number, parentId?: string, level?: number) => void;
    onDeleteComment: (commentId: string, parentId?: string) => void;
    onReaction: (type: ReactionType, commentId: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
                                                     comment,
                                                     sessionId,
                                                     onAddComment,
                                                     onDeleteComment,
                                                     onReaction
                                                 }) => {
    const [isReplying, setIsReplying] = useState(false);
    const [showReactionPicker, setShowReactionPicker] = useState(false);

    const handleReply = (text: string, rating: number) => {
        onAddComment(text, rating, comment.id, (comment.level || 0) + 1);
        setIsReplying(false);
    };

    return (
        <Box sx={{mb: 2, ml: comment.level ? comment.level * 4 : 0}}>
            <Box sx={{display: 'flex', alignItems: 'center', mb: 1}}>
                <Avatar sx={{mr: 1}}>{comment.userId.slice(0, 2).toUpperCase()}</Avatar>
                <Typography variant="subtitle2">User {comment.userId.slice(0, 8)}</Typography>
                <Typography variant="caption" sx={{ml: 1}}>
                    {new Date(comment.timestamp).toLocaleDateString()}
                </Typography>
            </Box>
            {comment.level === 0 && (
                <Rating value={comment.rating} readOnly size="small" sx={{mb: 1}}/>
            )}
            <Typography variant="body2" sx={{mb: 1}}>
                {comment.text}
            </Typography>
            <Box sx={{display: 'flex', gap: 1}}>
                <Button
                    size="small"
                    onClick={() => setShowReactionPicker(!showReactionPicker)}
                >
                    {comment.reaction || 'React'}
                </Button>
                <Button size="small" onClick={() => setIsReplying(!isReplying)}>
                    Reply
                </Button>
                {comment.userId === sessionId && (
                    <Button
                        size="small"
                        onClick={() => onDeleteComment(comment.id, comment.parentId)}
                    >
                        Delete
                    </Button>
                )}
            </Box>
            {showReactionPicker && (
                <ReactionPicker
                    onReaction={(type) => {
                        onReaction(type, comment.id);
                        setShowReactionPicker(false);
                    }}
                />
            )}
            {isReplying && (
                <CommentForm onSubmit={handleReply}/>
            )}
            {comment.replies.map((reply) => (
                <CommentItem
                    key={reply.id}
                    comment={reply}
                    sessionId={sessionId}
                    onAddComment={onAddComment}
                    onDeleteComment={onDeleteComment}
                    onReaction={onReaction}
                />
            ))}
        </Box>
    );
};

export default CommentItem;
