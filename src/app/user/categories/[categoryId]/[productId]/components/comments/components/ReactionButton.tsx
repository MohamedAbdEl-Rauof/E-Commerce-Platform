import React from 'react';
import { motion } from 'framer-motion';
import { Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Comment, reactionIcons } from './types';

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'hasReaction' && prop !== 'reactionColor'
})<{ hasReaction?: boolean; reactionColor?: string }>(({ hasReaction, reactionColor }) => ({
  borderRadius: '24px',
  padding: '6px 12px',
  minWidth: 'auto',
  textTransform: 'none',
  fontSize: '0.875rem',
  fontWeight: 500,
  boxShadow: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'all 0.2s ease',
  
  ...(hasReaction ? {
    backgroundColor: `var(--${reactionColor || 'primary'})`,
    color: 'var(--light)',
    opacity: 0.85,
    '&:hover': {
      backgroundColor: `var(--${reactionColor || 'primary'})`,
      opacity: 1,
      boxShadow: '0 2px 8px var(--shadow)',
    }
  } : {
    backgroundColor: 'transparent',
    color: 'var(--muted)',
    border: '1px solid var(--border)',
    '&:hover': {
      backgroundColor: 'var(--hover)',
      borderColor: 'var(--muted)',
    }
  })
}));

const reactionColorMap: Record<string, string> = {
  like: 'primary',
  love: 'danger',
  haha: 'warning',
  wow: 'info',
  sad: 'muted',
  angry: 'danger'
};

interface ReactionButtonProps {
  comment: Comment;
  showReactionPicker: string | null;
  setShowReactionPicker: (id: string | null) => void;
}

const ReactionButton: React.FC<ReactionButtonProps> = ({ 
  comment, 
  showReactionPicker, 
  setShowReactionPicker 
}) => {
  const hasReaction = !!comment.reaction;
  const reactionColor = hasReaction ? reactionColorMap[comment.reaction!] : undefined;
  
  return (
    <Box sx={{ position: 'relative' }}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <StyledButton
          hasReaction={hasReaction}
          reactionColor={reactionColor}
          onClick={() => setShowReactionPicker(showReactionPicker === comment.id ? null : comment.id)}
          size="small"
          disableElevation
          variant={hasReaction ? "contained" : "outlined"}
        >
          {hasReaction ? (
            <>
              {React.createElement(reactionIcons[comment.reaction!].icon, { 
                size: 16, 
                style: { color: 'inherit' } 
              })}
              {reactionIcons[comment.reaction!].label}
            </>
          ) : (
            'Feeling'
          )}
        </StyledButton>
      </motion.div>
    </Box>
  );
};

export default ReactionButton;