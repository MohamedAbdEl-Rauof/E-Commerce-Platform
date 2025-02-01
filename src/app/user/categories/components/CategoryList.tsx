import React from 'react';
import Link from 'next/link';
import {Grid} from '@mui/material';
import CategoryCard from './CategoryCard';

const CategoryList = ({categories}) => {
    return (
        <Grid container spacing={4}>
            {categories.map((category) => (
                <Grid item key={category._id} xs={12} sm={6} md={4}>
                    <Link
                        href={`/user/categories/${encodeURIComponent(category.name)}`}
                        onClick={() => console.log("Category name:", category.name)}
                    >
                        <CategoryCard category={category}/>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};

export default CategoryList;