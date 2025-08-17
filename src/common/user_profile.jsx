import React, { useState, useContext } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Avatar,
  Box,
  Divider,
} from '@mui/material';
import { _get_toolbar_z_index } from './globals';
import { _global_state_context } from './global_state_context';

const _user_profile = ({ trigger_width, trigger_height, img_src }) => {
  const [open, _set_open] = useState(false);
  const { global_email, _set_global_email } = useContext(_global_state_context);

  return (
    <>
      <IconButton
        onClick={() => _set_open(true)}
        sx={{
          borderRadius: '50%',
          width: trigger_width,
          height: trigger_height,
          p: 0,
          backgroundColor: '#f0f0f0',
        }}
      >
        <img
          src={img_src}
          alt="Profile"
          title="Profile"
          style={{ width: trigger_width, height: trigger_height, borderRadius: '50%' }}
        />
      </IconButton>

      <Dialog
        open={open}
        onClose={() => _set_open(false)}
        sx={{ zIndex: _get_toolbar_z_index() + 1 }}
        maxWidth="xs"
        fullWidth
      >
        <DialogContent sx={{ textAlign: 'center', p: 3 }}>
          <Avatar
            src="/static/images/avatar/2.jpg"
            sx={{ width: trigger_width, height: trigger_height, mb: 2, mx: 'auto' }}
          />
          <Typography variant="h6">Jane Doe</Typography>
          <Typography variant="body2" color="text.secondary">
            {global_email}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1">Role: Administrator</Typography>
          <Typography variant="body1">Joined: January 2023</Typography>
          <Typography variant="body1">Location: New York, USA</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default _user_profile;
