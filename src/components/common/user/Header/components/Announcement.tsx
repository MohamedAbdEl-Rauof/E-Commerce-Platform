import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledBox = styled(Box)({
    backgroundColor: 'var(--warning)',
    textAlign: 'center',
    padding: '0.5rem',
});

const StyledTypography = styled(Typography)({
    fontSize: '1.125rem',
    fontWeight: 600,
    color: 'var(--dark)',
});

const Announcement = () => {
    return (
        <StyledBox>
            <StyledTypography variant="body1">
                Sorry for the inconvenience, the site is still under development.
            </StyledTypography>
        </StyledBox>
    );
};

export default Announcement;