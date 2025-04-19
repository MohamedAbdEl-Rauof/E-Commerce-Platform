import React from 'react';
import { motion } from 'framer-motion';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { ReplyState } from './types';

// Custom styled button that uses CSS variables
const StyledButton = styled(Button)(() => ({
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
  backgroundColor: 'transparent',
  color: 'var(--muted)',
  border: '1px solid var(--border)',
  '&:hover': {
    backgroundColor: 'var(--hover)',
    color: 'var(--foreground)',
    borderColor: 'var(--muted)',
  },
  '&.active': {
    backgroundColor: 'var(--primary)',
    color: 'var(--light)',
    borderColor: 'var(--primary)',
    opacity: 0.9,
    '&:hover': {
      backgroundColor: 'var(--primary)',
      opacity: 1,
    }
  }
}));

interface ReplyButtonProps {
  level: number;
  maxLevel: number;
  commentId: string;
  replyState: ReplyState;
  setReplyStates: (callback: (prev: any) => any) => void;
}

const ReplyButton: React.FC<ReplyButtonProps> = ({
  level,
  maxLevel,
  commentId,
  replyState,
  setReplyStates
}) => {
  if (level >= maxLevel) return null;
  
  const isReplying = replyState.isReplying;
  
  const handleClick = () => {
    setReplyStates(prev => ({
      ...prev,
      [commentId]: {...replyState, isReplying: !replyState.isReplying}
    }));
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <StyledButton
        onClick={handleClick}
        size="small"
        disableElevation
        variant="outlined"
        className={isReplying ? 'active' : ''}
        startIcon={<ChatBubbleOutlineIcon fontSize="small" />}
      >
        <Typography variant="body2" component="span">
          {isReplying ? 'Cancel' : 'Reply'}
        </Typography>
      </StyledButton>
    </motion.div>
  );
};

export default ReplyButton;