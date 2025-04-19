import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rating, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Paper, 
  Stack,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import StarIcon from '@mui/icons-material/Star';
import { ReplyStates } from './types';

const StyledPaper = styled(Paper)(() => ({
  padding: '24px',
  borderRadius: '16px',
  boxShadow: '0 4px 20px var(--shadow)',
  marginBottom: '32px',
  backgroundColor: 'var(--background)',
  border: '1px solid var(--border)'
}));

const StyledButton = styled(Button)(() => ({
  borderRadius: '12px',
  padding: '10px 24px',
  fontWeight: 600,
  textTransform: 'none',
  backgroundColor: 'var(--primary)',
  color: 'var(--light)',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: 'var(--primary)',
    opacity: 0.9,
    boxShadow: '0 4px 12px var(--shadow)',
  },
  '&:disabled': {
    backgroundColor: 'var(--muted)',
    color: 'var(--background)',
    opacity: 0.7
  }
}));

const StyledTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: 'var(--search-bar-bg)',
    color: 'var(--foreground)',
    '& fieldset': {
      borderColor: 'var(--border)',
    },
    '&:hover fieldset': {
      borderColor: 'var(--primary)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--primary)',
      borderWidth: '2px',
    },
  },
  '& .MuiInputBase-input': {
    color: 'var(--foreground)',
    '&::placeholder': {
      color: 'var(--muted)',
      opacity: 0.8,
    },
  },
}));

const StyledRating = styled(Rating)(() => ({
  '& .MuiRating-iconFilled': {
    color: 'var(--primary)',
  },
  '& .MuiRating-iconHover': {
    color: 'var(--primary)',
    opacity: 0.8,
  },
  '& .MuiRating-iconEmpty': {
    color: 'var(--rating-unselected-color)',
  }
}));

interface NewCommentFormProps {
  replyStates: ReplyStates;
  setReplyStates: (callback: (prev: ReplyStates) => ReplyStates) => void;
  handleAddComment: (text: string, rating: number) => void;
}

const NewCommentForm: React.FC<NewCommentFormProps> = ({
  replyStates,
  setReplyStates,
  handleAddComment
}) => {
  const labels: { [index: string]: string } = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent',
  };

  const rating = replyStates.main?.rating || 5;
  const text = replyStates.main?.text || '';

  return (
    <StyledPaper elevation={0}>
      <Typography 
        variant="h6" 
        gutterBottom 
        fontWeight="bold" 
        sx={{ color: 'var(--foreground)' }}
      >
        Write Your Review
      </Typography>
      
      <Divider sx={{ my: 2, borderColor: 'var(--border)' }} />
      
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <StyledRating
            value={rating}
            onChange={(_, value) => value && setReplyStates(prev => ({
              ...prev,
              main: {...prev.main, rating: value}
            }))}
            size="large"
            precision={0.5}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          <Typography variant="body2" sx={{ color: 'var(--foreground)' }}>
            {labels[Math.round(rating)]}
          </Typography>
        </Box>
        
        <StyledTextField
          value={text}
          onChange={(e) => setReplyStates(prev => ({
            ...prev,
            main: {...prev.main, text: e.target.value}
          }))}
          placeholder="Share your thoughts about this product..."
          multiline
          rows={4}
          fullWidth
          variant="outlined"
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <StyledButton
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => handleAddComment(text, rating)}
              disabled={!text.trim()}
            >
              Publish Review
            </StyledButton>
          </motion.div>
        </Box>
      </Stack>
    </StyledPaper>
  );
};

export default NewCommentForm;