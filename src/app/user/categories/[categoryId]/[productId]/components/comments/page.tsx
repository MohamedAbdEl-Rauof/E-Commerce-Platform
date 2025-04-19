"use client";
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Comment, ReactionType, ReplyStates } from './components/types';
import NewCommentForm from './components/NewCommentForm';
import CommentComponent from './components/CommentComponent';
import { useSession } from 'next-auth/react'; 

function ProductDetails() {
    // Get user session data
    const { data: session } = useSession();
    const [userName, setUserName] = useState(session?.user?.name || 'Anonymous User');
    const userId = session?.user?.id || 'AnonymousUser';
    const [userImage, setUserImage] = useState(session?.user?.image || 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/user?id=${userId}`);
                const data = await response.json();

                if (data) {
                    if (data?.name) setUserName(data?.name);
                    if (data?.image) setUserImage(data?.image);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();

    }, [userId]);

    // Load comments from localStorage on initial render
    const [comments, setComments] = useState<Comment[]>(() => {
        if (typeof window !== 'undefined') {
            const savedComments = localStorage.getItem('productComments');
            return savedComments ? JSON.parse(savedComments) : [];
        }
        return [];
    });

    const [showReactionPicker, setShowReactionPicker] = useState<string | null>(null);

    // Load reply states from localStorage on initial render
    const [replyStates, setReplyStates] = useState<ReplyStates>(() => {
        if (typeof window !== 'undefined') {
            const savedReplyStates = localStorage.getItem('productReplyStates');
            return savedReplyStates ? JSON.parse(savedReplyStates) : {
                main: { text: '', isReplying: false, rating: 5 }
            };
        }
        return {
            main: { text: '', isReplying: false, rating: 5 }
        };
    });

    // Load sessionId from localStorage or create a new one
    const [sessionId] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedSessionId = localStorage.getItem('commentSessionId');
            if (savedSessionId) return savedSessionId;

            const newSessionId = Math.random().toString(36).substr(2, 9);
            localStorage.setItem('commentSessionId', newSessionId);
            return newSessionId;
        }
        return Math.random().toString(36).substr(2, 9);
    });

    // Save comments to localStorage whenever they change
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('productComments', JSON.stringify(comments));
        }
    }, [comments]);

    // Save reply states to localStorage whenever they change
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('productReplyStates', JSON.stringify(replyStates));
        }
    }, [replyStates]);

    const handleAddComment = (text: string, rating: number, parentId?: string, level: number = 0) => {
        if (!text.trim()) return;

        const newComment: Comment = {
            id: Math.random().toString(36).substr(2, 9),
            userId: userId || sessionId,
            userName: userName,
            userImage: userImage,
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
                            replies: [...comment.replies, newComment] as Comment[]
                        };
                    }
                    if (comment.replies.length > 0) {
                        return {
                            ...comment,
                            replies: updateReplies(comment.replies as Comment[])
                        };
                    }
                    return comment;
                });
            };

            return updateReplies(prevComments);
        });

        // Reset the reply state
        if (parentId) {
            setReplyStates(prev => ({
                ...prev,
                [parentId]: { text: '', isReplying: false }
            }));
        } else {
            setReplyStates(prev => ({
                ...prev,
                main: { text: '', isReplying: false, rating: 5 }
            }));
        }
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
                            replies: updateReplies(comment.replies as Comment[])
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
                            replies: updateReaction(comment.replies as Comment[])
                        };
                    }
                    return comment;
                });
            };

            return updateReaction(prevComments);
        });
        setShowReactionPicker(null);
    };

    return (
        <div className="max-full ml-0 px-4 py-8 text-left ">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[var(--background)] rounded-xl shadow-lg p-8"
            >
                <h2 className="text-3xl font-bold mb-8 bg-[var(--background)]">Customer Reviews</h2>

                <NewCommentForm
                    replyStates={replyStates}
                    setReplyStates={setReplyStates}
                    handleAddComment={(text, rating) => handleAddComment(text, rating)}
                />

                <motion.div layout className="space-y-6">
                    <AnimatePresence>
                        {comments.map(comment => (
                            <CommentComponent
                                key={comment.id}
                                comment={comment}
                                sessionId={sessionId}
                                showReactionPicker={showReactionPicker}
                                replyStates={replyStates}
                                setShowReactionPicker={setShowReactionPicker}
                                setReplyStates={setReplyStates}
                                handleDeleteComment={handleDeleteComment}
                                handleReaction={handleReaction}
                                handleAddComment={handleAddComment}
                                userId={userId}
                                userName={userName}
                                userImage={userImage}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default ProductDetails;