import React from 'react';
import Link from 'next/link';
import {Button} from '@mui/material';

const BackToCategoryButton = ({categoryName}) => {
    return (
        <Link href={`/user/categories/${categoryName}`} passHref>
            <Button variant="outlined" color="secondary" style={{marginLeft: '10px'}}>
                Back to Category
            </Button>
        </Link>
    );
};

export default BackToCategoryButton;