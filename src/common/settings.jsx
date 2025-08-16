import React, { useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, 
    Box, Divider, Select, MenuItem } from '@mui/material';
import { _get_all_themes, SELECTED_COLOR_THEME, _set_selected_color_theme } from './components/use_colour_themes';
import { _get_toolbar_z_index } from './globals';
import { _global_state_context } from './global_state_context';


const _settings = ({ trigger_width, trigger_height, img_src, re_render_func }) => {
  const [open, set_open] = useState(false);
  const { global_email, _set_global_email } = useContext(_global_state_context);
  const { global_login_status, _set_global_login_status } = useContext(_global_state_context);

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

  const _sign_out = () => {
    _set_global_email("");
    _set_global_login_status(false);
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
            {global_login_status && (
              <Typography variant="body1" sx={{ cursor: 'pointer', color: 'red' }}
                onClick={() => {
                  _sign_out();
                }}
              >
                Sign out
              </Typography>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default _settings;
