import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Box, IconButton, Paper, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactionType, reactionIcons, reactionPickerVariants } from './types';

// Custom styled components that use CSS variables
const ReactionContainer = styled(Paper)(() => ({
  position: 'absolute',
  top: '100%',
  marginTop: '8px',
  backgroundColor: 'var(--search-bar-bg)',
  boxShadow: '0 8px 24px var(--shadow)',
  borderRadius: '16px',
  padding: '12px',
  display: 'flex',
  gap: '12px',
  zIndex: 10,
  border: '1px solid var(--border)'
}));

// Map reaction types to CSS variable names
const reactionColorMap: Record<string, string> = {
  like: 'primary',
  love: 'danger',
  haha: 'warning',
  wow: 'info',
  sad: 'muted',
  angry: 'danger'
};

// Custom styled reaction button
const ReactionButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'reactionType'
})<{ reactionType: string }>(({ reactionType }) => {
  const colorVar = reactionColorMap[reactionType] || 'primary';
  
  return {
    padding: '10px',
    backgroundColor: `var(--${colorVar})`,
    color: 'var(--light)',
    boxShadow: '0 4px 12px var(--shadow)',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: `var(--${colorVar})`,
      opacity: 0.9,
      boxShadow: '0 6px 16px var(--shadow)',
      transform: 'translateY(-2px)'
    }
  };
});

interface ReactionPickerProps {
  commentId: string;
  showReactionPicker: string | null;
  handleReaction: (type: ReactionType, commentId: string) => void;
}

const ReactionPicker: React.FC<ReactionPickerProps> = ({ 
  commentId, 
  showReactionPicker, 
  handleReaction 
}) => (
  <AnimatePresence>
    {showReactionPicker === commentId && (
      <motion.div
        variants={reactionPickerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ position: 'absolute', width: '100%' }}
      >
        <ReactionContainer elevation={6}>
          {Object.entries(reactionIcons).map(([type, { icon: Icon, label }]) => (
            <Tooltip 
              key={type}
              title={label}
              arrow
              placement="top"
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: 'var(--dark)',
                    color: 'var(--light)',
                    '& .MuiTooltip-arrow': {
                      color: 'var(--dark)',
                    },
                    fontWeight: 500,
                    fontSize: '0.75rem'
                  }
                }
              }}
            >
              <Box component={motion.div} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <ReactionButton
                  reactionType={type}
                  size="small"
                  onClick={() => handleReaction(type as ReactionType, commentId)}
                  aria-label={label}
                >
                  <Icon size={20} />
                </ReactionButton>
              </Box>
            </Tooltip>
          ))}
        </ReactionContainer>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ReactionPicker;