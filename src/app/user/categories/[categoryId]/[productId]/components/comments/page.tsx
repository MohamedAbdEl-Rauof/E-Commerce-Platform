"use client";
import React, {useState} from 'react';
import {Angry, Frown, Heart, Laugh, MessageCircle, ThumbsUp, Trash2} from 'lucide-react';
import {AnimatePresence, motion} from 'framer-motion';
import {Rating} from '@mui/material';

// Types
type ReactionType = 'like' | 'love' | 'angry' | 'sad' | 'haha';

interface BaseComment {
    id: string;
    userId: string;
    text: string;
    timestamp: number;
    reaction?: ReactionType;
    replies: BaseComment[];
    parentId?: string;
    level?: number;
}

interface Comment extends BaseComment {
    rating: number;
}

interface ReactionIcon {
    icon: typeof ThumbsUp | typeof Heart | typeof Angry | typeof Frown | typeof Laugh;
    label: string;
    color: string;
    gradient: string;
}

interface ReplyState {
    text: string;
    isReplying: boolean;
    rating?: number;
}

interface ReplyStates {
    main: ReplyState;

    [key: string]: ReplyState;
}

// Constants
const reactionIcons: Record<ReactionType, ReactionIcon> = {
    like: {
        icon: ThumbsUp,
        label: 'Like',
        color: 'blue-500',
        gradient: 'from-blue-400 to-blue-600'
    },
    love: {
        icon: Heart,
        label: 'Love',
        color: 'red-500',
        gradient: 'from-red-400 to-red-600'
    },
    angry: {
        icon: Angry,
        label: 'Angry',
        color: 'orange-500',
        gradient: 'from-orange-400 to-orange-600'
    },
    sad: {
        icon: Frown,
        label: 'Sad',
        color: 'purple-500',
        gradient: 'from-purple-400 to-purple-600'
    },
    haha: {
        icon: Laugh,
        label: 'Haha',
        color: 'yellow-500',
        gradient: 'from-yellow-400 to-yellow-600'
    }
};

const MAX_NESTING_LEVEL = 10;

const commentVariants = {
    initial: {opacity: 0, y: 20},
    animate: {opacity: 1, y: 0},
    exit: {opacity: 0, x: -20}
};

const reactionPickerVariants = {
    initial: {opacity: 0, scale: 0.8, y: 10},
    animate: {opacity: 1, scale: 1, y: 0},
    exit: {opacity: 0, scale: 0.8, y: 10}
};

function ProductDetails() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [showReactionPicker, setShowReactionPicker] = useState<string | null>(null);
    const [replyStates, setReplyStates] = useState<ReplyStates>({
        main: {text: '', isReplying: false, rating: 5}
    });
    const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9));

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

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
                [parentId]: {text: '', isReplying: false}
            }));
        } else {
            setReplyStates(prev => ({
                ...prev,
                main: {text: '', isReplying: false, rating: 5}
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

    const ReactionPicker = ({commentId}: { commentId: string }) => (
        <AnimatePresence>
            {showReactionPicker === commentId && (
                <motion.div
                    variants={reactionPickerVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute top-full mt-2 bg-white shadow-xl rounded-lg p-3 flex gap-3 z-10"
                >
                    {Object.entries(reactionIcons).map(([type, {icon: Icon, label, gradient}]) => (
                        <motion.button
                            key={type}
                            whileHover={{scale: 1.2}}
                            whileTap={{scale: 0.9}}
                            onClick={() => handleReaction(type as ReactionType, commentId)}
                            className={`p-2 rounded-full bg-gradient-to-r ${gradient} text-white shadow-lg 
                                     hover:shadow-xl transition-all duration-200`}
                            title={label}
                        >
                            <Icon size={18}/>
                        </motion.button>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );

    const CommentComponent = ({comment}: { comment: Comment }) => {
        const replyState = replyStates[comment.id] || {text: '', isReplying: false};
        const level = comment.level || 0;
        const indentClass = level > 0 ? `ml-${Math.min(level * 4, 16)}` : '';

        return (
            <motion.div
                variants={commentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                layout
                className={`bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200
                           ${level > 0 ? `${indentClass} border-l-4 border-gray-100` : ''}`}
            >
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <motion.div
                            whileHover={{scale: 1.1}}
                            className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900
                                     text-white rounded-full flex items-center justify-center font-semibold"
                        >
                            {comment.userId.slice(0, 2).toUpperCase()}
                        </motion.div>
                        <div>
                            <div className="text-sm font-medium">User {comment.userId.slice(0, 8)}</div>
                            <div className="text-xs text-gray-500">{formatDate(comment.timestamp)}</div>
                        </div>
                    </div>

                    {comment.userId === sessionId && (
                        <motion.button
                            whileHover={{scale: 1.1}}
                            whileTap={{scale: 0.9}}
                            onClick={() => handleDeleteComment(comment.id, comment.parentId)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full
                                     hover:bg-red-50"
                        >
                            <Trash2 size={16}/>
                        </motion.button>
                    )}
                </div>

                {level === 0 && (
                    <div className="mt-3">
                        <Rating value={comment.rating} readOnly size="small"/>
                    </div>
                )}

                <p className="text-gray-700 mt-3 text-sm leading-relaxed">{comment.text}</p>

                <div className="flex gap-4 mt-4">
                    <div className="relative">
                        <motion.button
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            onClick={() => setShowReactionPicker(showReactionPicker === comment.id ? null : comment.id)}
                            className={`text-sm flex items-center gap-2 px-3 py-1.5 rounded-full
                                     ${comment.reaction
                                ? `bg-${reactionIcons[comment.reaction].color}/10 
                                            text-${reactionIcons[comment.reaction].color}`
                                : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            {comment.reaction ? (
                                <>
                                    {React.createElement(reactionIcons[comment.reaction].icon, {size: 16})}
                                    {reactionIcons[comment.reaction].label}
                                </>
                            ) : (
                                'Feeling'
                            )}
                        </motion.button>
                        <ReactionPicker commentId={comment.id}/>
                    </div>

                    {level < MAX_NESTING_LEVEL && (
                        <motion.button
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            onClick={() => setReplyStates(prev => ({
                                ...prev,
                                [comment.id]: {...replyState, isReplying: !replyState.isReplying}
                            }))}
                            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2
                                     px-3 py-1.5 rounded-full hover:bg-gray-100"
                        >
                            <MessageCircle size={16}/>
                            Reply
                        </motion.button>
                    )}
                </div>

                <AnimatePresence>
                    {replyState.isReplying && (
                        <motion.div
                            initial={{opacity: 0, height: 0}}
                            animate={{opacity: 1, height: 'auto'}}
                            exit={{opacity: 0, height: 0}}
                            className="mt-4"
                        >
                            <textarea
                                value={replyState.text}
                                onChange={(e) => setReplyStates(prev => ({
                                    ...prev,
                                    [comment.id]: {...replyState, text: e.target.value}
                                }))}
                                placeholder="Write a reply..."
                                className="w-full p-3 border rounded-lg text-sm focus:ring-2
                                         focus:ring-gray-200 focus:border-gray-300 transition-all"
                                rows={2}
                            />
                            <motion.div className="flex gap-2 mt-2">
                                <motion.button
                                    whileHover={{scale: 1.02}}
                                    whileTap={{scale: 0.98}}
                                    onClick={() => handleAddComment(replyState.text, 5, comment.id, level + 1)}
                                    className="px-4 py-2 bg-black text-white text-sm rounded-lg
                                             hover:bg-gray-800 transition-colors"
                                >
                                    Reply
                                </motion.button>
                                <motion.button
                                    whileHover={{scale: 1.02}}
                                    whileTap={{scale: 0.98}}
                                    onClick={() => setReplyStates(prev => ({
                                        ...prev,
                                        [comment.id]: {text: '', isReplying: false}
                                    }))}
                                    className="px-4 py-2 bg-gray-100 text-sm rounded-lg
                                             hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {comment.replies.length > 0 && (
                    <motion.div layout className="mt-4 space-y-4">
                        {comment.replies.map(reply => (
                            <CommentComponent key={reply.id} comment={reply as Comment}/>
                        ))}
                    </motion.div>
                )}
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    className="bg-white rounded-xl shadow-lg p-8"
                >
                    <h2 className="text-3xl font-bold mb-8 text-gray-800">Customer Reviews</h2>

                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <Rating
                                value={replyStates.main?.rating || 5}
                                onChange={(_, value) => value && setReplyStates(prev => ({
                                    ...prev,
                                    main: {...prev.main, rating: value}
                                }))}
                                size="large"
                            />
                            <span className="text-sm text-gray-600">Select rating</span>
                        </div>

                        <div className="space-y-3">
                            <textarea
                                value={replyStates.main?.text || ''}
                                onChange={(e) => setReplyStates(prev => ({
                                    ...prev,
                                    main: {...prev.main, text: e.target.value}
                                }))}
                                placeholder="Share your thoughts about this product..."
                                className="w-full p-4 border rounded-xl text-sm focus:ring-2
                                         focus:ring-gray-200 focus:border-gray-300 transition-all"
                                rows={4}
                            />
                            <motion.button
                                whileHover={{scale: 1.02}}
                                whileTap={{scale: 0.98}}
                                onClick={() => handleAddComment(replyStates.main?.text || '', replyStates.main?.rating || 5)}
                                className="w-full px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800
                                         transition-colors text-sm font-medium"
                            >
                                Publish Review
                            </motion.button>
                        </div>
                    </div>

                    <motion.div layout className="space-y-6">
                        <AnimatePresence>
                            {comments.map(comment => (
                                <CommentComponent key={comment.id} comment={comment}/>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

export default ProductDetails;