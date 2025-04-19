import { ThumbsUp, Heart, Angry, Frown, Laugh } from 'lucide-react';

// Types
export type ReactionType = 'like' | 'love' | 'angry' | 'sad' | 'haha';

export interface BaseComment {
    id: string;
    userId: string;
    text: string;
    timestamp: number;
    reaction?: ReactionType;
    replies: BaseComment[];
    parentId?: string;
    level?: number;
}

export interface Comment extends BaseComment {
    rating: number;
    userName: string;
    userImage: string;
    
}

export interface ReactionIcon {
    icon: typeof ThumbsUp | typeof Heart | typeof Angry | typeof Frown | typeof Laugh;
    label: string;
    color: string;
    gradient: string;
}

export interface ReplyState {
    text: string;
    isReplying: boolean;
    rating?: number;
}

export interface ReplyStates {
    main: ReplyState;
    [key: string]: ReplyState;
}

// Constants
export const reactionIcons: Record<ReactionType, ReactionIcon> = {
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

export const MAX_NESTING_LEVEL = 10;

export const commentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -20 }
};

export const reactionPickerVariants = {
    initial: { opacity: 0, scale: 0.8, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 10 }
};

export const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};