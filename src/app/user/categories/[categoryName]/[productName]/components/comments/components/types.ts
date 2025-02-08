export interface Comment {
    id: string;
    userId: string;
    text: string;
    timestamp: number;
    rating: number;
    replies: Comment[];
    parentId?: string;
    level: number;
    reaction?: ReactionType;
}

export type ReactionType = 'like' | 'love' | 'angry' | 'sad' | 'haha' | 'dislike';
