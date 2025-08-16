import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, 
    Box, Divider, Select, MenuItem } from '@mui/material';
import { _get_all_themes, SELECTED_COLOR_THEME, _set_selected_color_theme } from '../../common/components/use_colour_themes';
import { _get_toolbar_z_index } from '../../common/globals';

const _settings = ({ trigger_width, trigger_height, img_src, re_render_func }) => {
  const [open, set_open] = useState(false);

  const _handle_theme_change = (event) => {
    const new_value = event.target.value;
    _set_selected_color_theme(new_value);
    re_render_func(new_value); // notify parent
  };

  const _load_themes = () => {
    const themes = _get_all_themes();
    return Object.keys(themes).map((theme) => (
      <MenuItem key={themes[theme].name} value={themes[theme].name}>
        {themes[theme].name}
      </MenuItem>
    ));
  };

  return (
    <>
      <IconButton
        onClick={() => set_open(true)}
        sx={{
          borderRadius: 40,
          width: trigger_width,
          height: trigger_height,
          p: 0,
          backgroundColor: '#f0f0f0',
        }}
      >
        <img
          src={img_src}
          alt="Settings"
          title="Settings"
          style={{ width: trigger_width, height: trigger_height }}
        />
      </IconButton>

      <Dialog
        open={open}
        onClose={() => set_open(false)}
        sx={{ zIndex: _get_toolbar_z_index() }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Settings</DialogTitle>
        <Divider />
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body1">Theme</Typography>
            <Select
                value={SELECTED_COLOR_THEME.name}
                onChange={_handle_theme_change}
                fullWidth
                sx={{ mt: 1 }}
                MenuProps={{
                    PaperProps: {
                    sx: { zIndex: _get_toolbar_z_index() + 1 },
                    },
                    slotProps: {
                    paper: { sx: { zIndex: _get_toolbar_z_index() + 1 } },
                    },
                    sx: { zIndex: _get_toolbar_z_index() + 1 },
                }}
            >
                { _load_themes() }
            </Select>


            <Typography variant="body1" sx={{ mt: 2, cursor: 'pointer' }}>
              Preferences
            </Typography>
            <Typography variant="body1" sx={{ cursor: 'pointer' }}>
              Account
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default _settings;
