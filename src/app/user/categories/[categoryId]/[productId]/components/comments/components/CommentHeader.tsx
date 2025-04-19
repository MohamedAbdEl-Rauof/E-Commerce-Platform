import React from 'react';
import { motion } from 'framer-motion';
import { 
  Avatar, 
  Typography, 
  Box, 
  IconButton, 
  Tooltip, 
  Stack,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { formatDate } from './types';

// Custom styled components that use CSS variables
const UserAvatar = styled(Avatar)(() => ({
  width: 36,
  height: 36,
  boxShadow: '0 2px 8px var(--shadow)',
  border: '2px solid var(--search-bar-bg)',
  backgroundColor: 'var(--primary)',
  color: 'var(--light)',
  fontWeight: 600
}));

const DeleteButton = styled(IconButton)(() => ({
  color: 'var(--muted)',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'var(--danger)',
    opacity: 0.8,
    color: 'var(--light)',
  },
}));

const StyledTypography = styled(Typography)(() => ({
  color: 'var(--foreground)',
  fontWeight: 600
}));

const SecondaryTypography = styled(Typography)(() => ({
  color: 'var(--muted)',
}));

const StyledChip = styled(Chip)(() => ({
  height: 20,
  fontSize: '0.65rem',
  fontWeight: 600,
  backgroundColor: 'var(--primary)',
  color: 'var(--light)',
  borderColor: 'var(--primary)',
  '& .MuiChip-label': {
    padding: '0 8px',
  }
}));

interface CommentHeaderProps {
  userId: string;
  timestamp: number;
  sessionId: string;
  handleDelete: () => void;
  userName: string;
  userImage: string;
}

const CommentHeader: React.FC<CommentHeaderProps> = ({
  userId,
  timestamp,
  sessionId,
  handleDelete,
  userName,
  userImage
}) => {
  const isCurrentUser = userId === sessionId;
  const displayName = userName || `User ${userId.substring(0, 4)}`;
  const formattedDate = new Date(timestamp).toLocaleString();
  
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'flex-start',
      mb: 1.5
    }}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <UserAvatar src={userImage} alt={displayName}>
          {!userImage && (displayName.charAt(0).toUpperCase())}
        </UserAvatar>
        
        <Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <StyledTypography variant="subtitle2">
              {displayName}
            </StyledTypography>
            
            {isCurrentUser && (
              <StyledChip 
                label="You" 
                size="small" 
                variant="outlined" 
              />
            )}
          </Stack>
          
          <SecondaryTypography variant="caption">
            {formattedDate}
          </SecondaryTypography>
        </Box>
      </Stack>

      {isCurrentUser && (
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Tooltip 
            title="Delete comment"
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
            <DeleteButton
              size="small"
              onClick={handleDelete}
              aria-label="delete comment"
            >
              <DeleteOutlineIcon fontSize="small" />
            </DeleteButton>
          </Tooltip>
        </motion.div>
      )}
    </Box>
  );
};

export default CommentHeader;