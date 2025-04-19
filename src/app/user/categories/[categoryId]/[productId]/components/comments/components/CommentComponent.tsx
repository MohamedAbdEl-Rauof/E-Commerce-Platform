import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rating, 
  Typography, 
  Box, 
  Divider, 
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Comment, ReactionType, ReplyState, ReplyStates, commentVariants, MAX_NESTING_LEVEL } from './types';
import CommentHeader from './CommentHeader';
import ReactionButton from './ReactionButton';
import ReactionPicker from './ReactionPicker';
import ReplyButton from './ReplyButton';
import ReplyForm from './ReplyForm';

const CommentCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'level'
})<{ level?: number }>(({ level = 0 }) => ({
  position: 'relative',
  borderRadius: '16px',
  backgroundColor: 'var(--search-bar-bg)',
  boxShadow: '0 2px 12px var(--shadow)',
  transition: 'all 0.2s ease-in-out',
  overflow: 'visible',
  border: '1px solid var(--border)',
  '&:hover': {
    boxShadow: '0 4px 20px var(--shadow)',
  },
  ...(level > 0 && {
    marginLeft: Math.min(level * 16, 64),
    borderLeft: `4px solid var(--primary)`,
    marginTop: '16px',
    marginBottom: '16px',
  }),
}));

const CommentContent = styled(CardContent)(() => ({
  padding: '24px',
  '&:last-child': {
    paddingBottom: '16px',
  },
  color: 'var(--foreground)'
}));

const StyledDivider = styled(Divider)(() => ({
  borderColor: 'var(--border)',
  opacity: 0.7
}));

const StyledTypography = styled(Typography)(() => ({
  color: 'var(--foreground)',
  whiteSpace: 'pre-line',
  lineHeight: 1.6
}));

const StyledRating = styled(Rating)(() => ({
  '& .MuiRating-iconFilled': {
    color: 'var(--primary)',
  },
  '& .MuiRating-iconEmpty': {
    color: 'var(--rating-unselected-color)',
  }
}));

const StyledCardActions = styled(CardActions)(() => ({
  padding: '8px 0',
  justifyContent: 'flex-start',
  gap: '16px',
  borderTop: '1px solid var(--border)',
  borderTopWidth: '0px',
}));

interface CommentComponentProps {
  comment: Comment;
  sessionId: string;
  showReactionPicker: string | null;
  replyStates: ReplyStates;
  setShowReactionPicker: (id: string | null) => void;
  setReplyStates: (callback: (prev: ReplyStates) => ReplyStates) => void;
  handleDeleteComment: (commentId: string, parentId?: string) => void;
  handleReaction: (type: ReactionType, commentId: string) => void;
  handleAddComment: (text: string, rating: number, parentId?: string, level?: number) => void;
  userId: string;
  userName: string;
  userImage: string;
}

const CommentComponent: React.FC<CommentComponentProps> = ({
  comment,
  sessionId,
  showReactionPicker,
  replyStates,
  setShowReactionPicker,
  setReplyStates,
  handleDeleteComment,
  handleReaction,
  handleAddComment,
  userId,
  userName,
  userImage
}) => {
  const replyState = replyStates[comment.id] || { text: '', isReplying: false };
  const level = comment.level || 0;

  return (
    <motion.div
      variants={commentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
    >
      <CommentCard level={level}>
        <CommentContent>
          <CommentHeader
            userId={comment.userId}
            timestamp={comment.timestamp}
            sessionId={sessionId}
            handleDelete={() => handleDeleteComment(comment.id, comment.parentId)}
            userName={comment.userName || userName}
            userImage={comment.userImage || userImage}
          />

          {level === 0 && (
            <Box sx={{ mt: 2, mb: 1 }}>
              <StyledRating 
                value={comment.rating || 5} 
                readOnly 
                size="small" 
                precision={0.5}
              />
            </Box>
          )}

          <StyledTypography 
            variant="body2" 
            sx={{ mt: 2, mb: 2 }}
          >
            {comment.text}
          </StyledTypography>

          <StyledDivider sx={{ my: 1.5 }} />

          <StyledCardActions>
            <Box sx={{ position: 'relative' }}>
              <ReactionButton
                comment={comment}
                showReactionPicker={showReactionPicker}
                setShowReactionPicker={setShowReactionPicker}
              />
              
              <ReactionPicker
                commentId={comment.id}
                showReactionPicker={showReactionPicker}
                handleReaction={handleReaction}
              />
            </Box>

            <ReplyButton
              level={level}
              maxLevel={MAX_NESTING_LEVEL}
              commentId={comment.id}
              replyState={replyState}
              setReplyStates={setReplyStates}
            />
          </StyledCardActions>

          <ReplyForm
            replyState={replyState}
            commentId={comment.id}
            level={level}
            setReplyStates={setReplyStates}
            handleAddComment={handleAddComment}
          />
        </CommentContent>

        {comment.replies.length > 0 && (
          <motion.div layout>
            <Box sx={{ 
              px: 2, 
              pb: 2, 
              pt: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}>
              {comment.replies.map(reply => (
                <CommentComponent
                  key={reply.id}
                  comment={reply as Comment}
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
            </Box>
          </motion.div>
        )}
      </CommentCard>
    </motion.div>
  );
};

export default CommentComponent;