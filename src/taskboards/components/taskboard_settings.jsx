import React, { useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

const _taskboard_settings = ({ trigger_width, trigger_height, img_src, on_theme_change }) => {
  const [open, set_open] = useState(false);
  const [selected_theme, _set_selected_theme] = useState('light');

  const _handle_theme_change = (event, new_value) => {
    _set_selected_theme(new_value);
    on_theme_change(new_value); // call your callback with new theme
  };

  return (
    <>
      <IconButton
        variant="plain"
        onClick={() => set_open(true)}
        sx={{ borderRadius: 40, width: trigger_width, height: trigger_height, p: 0 }}
      >
        <img 
          src={img_src}
          alt="Settings"
          title="Settings"
          style={{ width: trigger_width, height: trigger_height }}
        />
      </IconButton>

      <Modal open={open} onClose={() => set_open(false)}>
        <ModalDialog sx={{ maxWidth: 400, p: 3 }}>
          <Typography level="h5" sx={{ mb: 2 }}>Settings</Typography>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography level="body-md">Theme</Typography>
            <Select
              value={selected_theme}
              onChange={_handle_theme_change}
              sx={{ width: '100%' }}
            >
              <Option value="light">Light</Option>
              <Option value="dark">Dark</Option>
            </Select>

            <Typography level="body-md" sx={{ mt: 2, cursor: 'pointer' }}>
              Preferences
            </Typography>
            <Typography level="body-md" sx={{ cursor: 'pointer' }}>
              Account
            </Typography>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default _taskboard_settings;
