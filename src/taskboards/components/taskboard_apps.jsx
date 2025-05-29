import React, { useState } from 'react';
import IconButton from '@mui/joy/IconButton';
import Avatar from '@mui/joy/Avatar';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import MenuButton from '@mui/joy/MenuButton';
import Apps from '@mui/icons-material/Apps';
import Dropdown from '@mui/joy/Dropdown';
import { SELECTED_COLOR_THEME } from '../../common/components/use_colour_themes';

const _taskboard_apps = ({ }) => {
  
  return (
    <Dropdown>
        <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: 'plain' } }}
            sx={{
                //TODO: SET COMPLEMENTARY COLOUR FROM THEME
                borderRadius: 40,
                backgroundColor: '#FF5733', // sets the button background
                color: '#FFFFFF',           // optional: sets text/icon color for contrast
            }}
        >
            <Apps />
        </MenuButton>
        <Menu
            variant="solid"
            invertedColors
            aria-labelledby="apps-menu-demo"
            sx={{
                '--List-padding': '0.5rem',
                '--ListItemDecorator-size': '3rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 100px)',
                gridAutoRows: '100px',
                gap: 1,
            }}
        >
            <MenuItem orientation="vertical">
            <ListItemDecorator>
                <Avatar>S</Avatar>
            </ListItemDecorator>
            Share
            </MenuItem>
            <MenuItem orientation="vertical">
            <ListItemDecorator>
                <Avatar>R</Avatar>
            </ListItemDecorator>
            Record
            </MenuItem>
            <MenuItem orientation="vertical">
            <ListItemDecorator>
                <Avatar>M</Avatar>
            </ListItemDecorator>
            Mail
            </MenuItem>
            <MenuItem orientation="vertical">
            <ListItemDecorator>
                <Avatar>D</Avatar>
            </ListItemDecorator>
            Drive
            </MenuItem>
            <MenuItem orientation="vertical">
            <ListItemDecorator>
                <Avatar>C</Avatar>
            </ListItemDecorator>
            Calendar
            </MenuItem>
        </Menu>
    </Dropdown>
  );
};

export default _taskboard_apps;
