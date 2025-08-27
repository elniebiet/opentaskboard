import React, { useState, useContext, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, 
    Box, Divider, Select, MenuItem } from '@mui/material';
import { _get_toolbar_z_index } from './globals';
import { _global_state_context } from './global_state_context';
import { ORIENTATION } from './globals';
import { _set_selected_color_theme, _get_all_themes, _get_selected_color_theme, _set_global_settings, _get_global_settings } from './components/global_settings';
import { api_load_settings, api_save_settings } from './otb_apis';
import COLOR_THEMES from '../db/colour_themes_db_temp';

const _settings = ({ trigger_width, trigger_height, img_src, re_render_func }) => {

  const { global_access_token } = useContext(_global_state_context);
  const [toolbar_orientation, _set_toolbar_orientation] = useState(ORIENTATION.HORIZONTAL);

  // load taskboard settings from database
  useEffect(() => {
    // Load updated settings from DB here
    const _fetch_settings = async () => {
      if (global_access_token) {

        let request = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: global_email,
            accessToken: global_access_token
          })
        };

        try {
          const response = await fetch(api_load_settings, request);
          const data = await response.json();

          if (response.ok && data.statusCode === 200) {            
            _set_global_settings({
                toolbar_orientation: data.settings.toolbar_orientation,
                color_theme: data.settings.color_theme,
                show_tips: (data.settings.show_tips == 0) ? "false" : "true",
            });

            _set_toolbar_orientation(data.settings.toolbar_orientation);

            re_render_func(data.settings.color_theme); // notify parent
          }
          else {
            ;
          }
        } catch (error) {
          ;// Network error. log error
        }
      }
      else {
        return;
      }
    };

    _fetch_settings().then(() => {});    
  }, [global_access_token]);

  const [open, set_open] = useState(false);
  const { global_email, _set_global_email } = useContext(_global_state_context);
  const { global_login_status, _set_global_login_status } = useContext(_global_state_context);
  const { global_route, _set_global_route } = useContext(_global_state_context);

  // Load updated settings from DB here
  const _save_new_settings = async ({new_orientation = 0, new_color_theme = COLOR_THEMES.Light.name, new_show_tips = false}) => {
    if (global_access_token) {
      
      let request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: global_email,
          accessToken: global_access_token,
          toolbar_orientation: new_orientation,
          color_theme: new_color_theme,
          show_tips: (new_show_tips) ? 1 : 0,
        })
      };

      try {
        const response = await fetch(api_save_settings, request);
        const data = await response.json();

        if (response.ok && data.statusCode === 200) {            
          // Settings saved successfully
        }
        else {
          ;
        }
      } catch (error) {
        ;// Network error. log error
      }
    }
    else {
      return;
    }
  };


  const _handle_theme_change = (event) => {
    const new_value = event.target.value;
    _set_selected_color_theme(new_value);

    // get current settings
    let current_settings = _get_global_settings();

    // upload theme change 
    _save_new_settings({
      new_orientation: current_settings.toolbar_orientation, 
      new_color_theme: new_value, 
      new_show_tips: current_settings.show_tips
    }).then(() => {});

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
    _set_global_route("/");
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
                value={_get_selected_color_theme().name}
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
