import React from 'react';
import {Box, IconButton, Tooltip} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import {ReactionType} from './types';

interface ReactionPickerProps {
    onReaction: (type: ReactionType) => void;
}

const reactions: { type: ReactionType; icon: React.ReactElement; label: string }[] = [
    {type: 'like', icon: <ThumbUpIcon/>, label: 'Like'},
    {type: 'love', icon: <FavoriteIcon/>, label: 'Love'},
    {type: 'angry', icon: <SentimentVeryDissatisfiedIcon/>, label: 'Angry'},
    {type: 'sad', icon: <SentimentDissatisfiedIcon/>, label: 'Sad'},
    {type: 'haha', icon: <EmojiEmotionsIcon/>, label: 'Haha'},
];

const ReactionPicker: React.FC<ReactionPickerProps> = ({onReaction}) => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            p: 1,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 1
        }}>
            {reactions.map(({type, icon, label}) => (
                <Tooltip key={type} title={label} arrow>
                    <IconButton
                        onClick={() => onReaction(type)}
                        size="small"
                        sx={{
                            '&:hover': {
                                bgcolor: 'action.hover',
                            },
                        }}
                    >
                        {icon}
                    </IconButton>
                </Tooltip>
            ))}
        </Box>
    );
};

export default ReactionPicker;