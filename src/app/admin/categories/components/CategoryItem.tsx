'use client'
import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import {CategoryItemProps} from '../types';

const CategoryItem: React.FC<CategoryItemProps> = ({
                                                       category,
                                                       onView,
                                                       onEdit,
                                                       onDelete
                                                   }) => {
    return (
        <TableRow
            key={category.id}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            <TableCell component="th" scope="row">
                {category.id}
            </TableCell>
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.description}</TableCell>
            <TableCell>{category.slug}</TableCell>
            <TableCell align="center">
                <Tooltip title="View Category">
                    <IconButton
                        aria-label="view"
                        color="primary"
                        onClick={() => onView(category.id)}
                    >
                        <VisibilityIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Edit Category">
                    <IconButton
                        aria-label="edit"
                        color="primary"
                        onClick={() => onEdit(category.id)}
                    >
                        <EditIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete Category">
                    <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => onDelete(category.id)}
                    >
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
};

export default CategoryItem;