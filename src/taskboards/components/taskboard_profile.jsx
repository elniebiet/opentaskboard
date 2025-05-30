import React, { useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import { _get_toolbar_z_index } from '../../common/globals';
import { SELECTED_COLOR_THEME } from '../../common/components/use_colour_themes';

const _taskboard_profile = ({ trigger_width, trigger_height, img_src }) => {
  const [open, _set_open] = useState(false);

  return (
    <>
      <IconButton
        variant="plain"
        onClick={() => _set_open(true)}
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
          alt="Profile"
          title="Profile"
          style={{ width: trigger_width, height: trigger_height }}
        />
      </IconButton>

      <Modal 
        open={open} 
        onClose={() => _set_open(false)}
        sx={{ zIndex: _get_toolbar_z_index() + 1 }}
      >
        <ModalDialog sx={{ maxWidth: 400, p: 3 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Avatar 
              src="/static/images/avatar/2.jpg"
              sx={{ width: 80, height: 80, mb: 2, mx: 'auto' }}
            />
            <Typography level="h5">Jane Doe</Typography>
            <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
              janedoe@email.com
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography level="body-md">
              Role: Administrator
            </Typography>
            <Typography level="body-md">
              Joined: January 2023
            </Typography>
            <Typography level="body-md">
              Location: New York, USA
            </Typography>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default _taskboard_profile;