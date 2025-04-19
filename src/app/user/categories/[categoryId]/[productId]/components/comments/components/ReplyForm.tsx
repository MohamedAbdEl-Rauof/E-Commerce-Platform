import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TextField, 
  Button, 
  Box, 
  Stack 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReplyState } from './types';

// Custom styled components that use CSS variables
const StyledTextField = styled(TextField)(() => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'var(--search-bar-bg)',
    color: 'var(--foreground)',
    borderRadius: '12px',
    transition: 'all 0.2s ease',
    '& fieldset': {
      borderColor: 'var(--border)',
    },
    '&:hover fieldset': {
      borderColor: 'var(--muted)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--primary)',
      borderWidth: '2px',
    },
  },
  '& .MuiInputBase-input': {
    padding: '12px 16px',
    fontSize: '0.9rem',
    lineHeight: 1.5,
  },
  '& .MuiInputLabel-root': {
    color: 'var(--muted)',
    '&.Mui-focused': {
      color: 'var(--primary)',
    },
  },
}));

const SubmitButton = styled(Button)(() => ({
  backgroundColor: 'var(--primary)',
  color: 'var(--light)',
  borderRadius: '8px',
  padding: '8px 16px',
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: '0 2px 8px var(--shadow)',
  '&:hover': {
    backgroundColor: 'var(--primary)',
    opacity: 0.9,
    boxShadow: '0 4px 12px var(--shadow)',
  },
}));

const CancelButton = styled(Button)(() => ({
  backgroundColor: 'var(--hover)',
  color: 'var(--foreground)',
  borderRadius: '8px',
  padding: '8px 16px',
  textTransform: 'none',
  fontWeight: 500,
  border: '1px solid var(--border)',
  '&:hover': {
    backgroundColor: 'var(--hover)',
    opacity: 0.8,
    borderColor: 'var(--muted)',
  },
}));

interface ReplyFormProps {
  replyState: ReplyState;
  commentId: string;
  level: number;
  setReplyStates: (callback: (prev: any) => any) => void;
  handleAddComment: (text: string, rating: number, parentId?: string, level?: number) => void;
}

const ReplyForm: React.FC<ReplyFormProps> = ({
  replyState,
  commentId,
  level,
  setReplyStates,
  handleAddComment
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyStates(prev => ({
      ...prev,
      [commentId]: { ...replyState, text: e.target.value }
    }));
  };

  const handleSubmit = () => {
    if (replyState.text.trim()) {
      handleAddComment(replyState.text, 5, commentId, level + 1);
      // Reset form after submission
      setReplyStates(prev => ({
        ...prev,
        [commentId]: { text: '', isReplying: false }
      }));
    }
  };

  const handleCancel = () => {
    setReplyStates(prev => ({
      ...prev,
      [commentId]: { text: '', isReplying: false }
    }));
  };

  return (
    <AnimatePresence>
      {replyState.isReplying && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          sx={{ overflow: 'hidden' }}
        >
          <StyledTextField
            multiline
            rows={2}
            value={replyState.text}
            onChange={handleChange}
            placeholder="Write a reply..."
            variant="outlined"
            fullWidth
          />
          
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Box component={motion.div} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <SubmitButton 
                variant="contained" 
                disableElevation
                onClick={handleSubmit}
                disabled={!replyState.text.trim()}
              >
                Reply
              </SubmitButton>
            </Box>
            
            <Box component={motion.div} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <CancelButton 
                variant="outlined"
                onClick={handleCancel}
              >
                Cancel
              </CancelButton>
            </Box>
          </Stack>
        </Box>
      )}
    </AnimatePresence>
  );
};

export default ReplyForm;