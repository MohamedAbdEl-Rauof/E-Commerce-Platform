import { motion } from "framer-motion";
import React from "react";
import { Box, Skeleton } from "@mui/material";

const TextSectionLoading = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
    };

    return (
        <Box
            component={motion.div}
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ duration: 0.3 }}
            sx={{
                width: { xs: '100%', md: '50%' },
                backgroundColor: 'var(--background)',
                borderRadius: '8px',
                padding: '16px',
                border: '1px solid var(--border)',
                boxShadow: '0 2px 8px var(--shadow)'
            }}
        >
            <Skeleton 
                variant="rectangular" 
                height={32} 
                width="70%" 
                animation="pulse"
                sx={{ 
                    mb: 2, 
                    backgroundColor: 'var(--border)' 
                }}
            />
            <Skeleton 
                variant="text" 
                height={16} 
                width="100%" 
                animation="pulse"
                sx={{ 
                    mb: 1, 
                    backgroundColor: 'var(--border)' 
                }}
            />
            <Skeleton 
                variant="text" 
                height={16} 
                width="90%" 
                animation="pulse"
                sx={{ 
                    mb: 1, 
                    backgroundColor: 'var(--border)' 
                }}
            />
            <Skeleton 
                variant="text" 
                height={16} 
                width="80%" 
                animation="pulse"
                sx={{ 
                    backgroundColor: 'var(--border)' 
                }}
            />
        </Box>
    );
};

export default TextSectionLoading;