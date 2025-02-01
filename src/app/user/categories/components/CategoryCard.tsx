import React from 'react';
import {Card, CardContent, CardMedia, Typography} from '@mui/material';

const CategoryCard = ({category}) => {
    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={category.image}
                alt={category.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {category.name}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CategoryCard;