import React, {useState} from 'react';
import {Box, Paper, Typography} from '@mui/material';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const ProductReviews: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9));

    const handleAddComment = (text: string, rating: number, parentId?: string, level: number = 0) => {
        if (!text.trim()) return;

        const newComment: Comment = {
            id: Math.random().toString(36).substr(2, 9),
            userId: sessionId,
            text: text.trim(),
            timestamp: Date.now(),
            rating,
            replies: [],
            parentId,
            level
        };

        setComments(prevComments => {
            if (!parentId) {
                return [...prevComments, newComment];
            }

            const updateReplies = (comments: Comment[]): Comment[] => {
                return comments.map(comment => {
                    if (comment.id === parentId) {
                        return {
                            ...comment,
                            replies: [...comment.replies, newComment]
                        };
                    }
                    if (comment.replies.length > 0) {
                        return {
                            ...comment,
                            replies: updateReplies(comment.replies)
                        };
                    }
                    return comment;
                });
            };

            return updateReplies(prevComments);
        });
    };

    const handleDeleteComment = (commentId: string, parentId?: string) => {
        setComments(prevComments => {
            if (!parentId) {
                return prevComments.filter(comment => comment.id !== commentId);
            }

            const updateReplies = (comments: Comment[]): Comment[] => {
                return comments.map(comment => {
                    if (comment.id === parentId) {
                        return {
                            ...comment,
                            replies: comment.replies.filter(reply => reply.id !== commentId)
                        };
                    }
                    if (comment.replies.length > 0) {
                        return {
                            ...comment,
                            replies: updateReplies(comment.replies)
                        };
                    }
                    return comment;
                });
            };

            return updateReplies(prevComments);
        });
    };

    const handleReaction = (type: ReactionType, commentId: string) => {
        setComments(prevComments => {
            const updateReaction = (comments: Comment[]): Comment[] => {
                return comments.map(comment => {
                    if (comment.id === commentId) {
                        return {
                            ...comment,
                            reaction: comment.reaction === type ? undefined : type
                        };
                    }
                    if (comment.replies.length > 0) {
                        return {
                            ...comment,
                            replies: updateReaction(comment.replies)
                        };
                    }
                    return comment;
                });
            };

            return updateReaction(prevComments);
        });
    };

    return (
        <Box sx={{minHeight: '100vh', bgcolor: 'grey.100', py: 4}}>
            <Paper sx={{maxWidth: '4xl', mx: 'auto', p: 4}}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Customer Reviews
                </Typography>
                <CommentForm onSubmit={(text, rating) => handleAddComment(text, rating)}/>
                <CommentList
                    comments={comments}
                    sessionId={sessionId}
                    onAddComment={handleAddComment}
                    onDeleteComment={handleDeleteComment}
                    onReaction={handleReaction}
                />
            </Paper>
        </Box>
    );
};

export default ProductReviews;