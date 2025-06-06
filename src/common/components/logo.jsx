import React, { useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Table from '@mui/joy/Table';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import { _get_toolbar_z_index } from '../globals';
import _opentaskboard_icon from '../../home/components/opentaskboard_icon';

const _logo = ({
  logo_width,
  logo_height,
  img_src,
  win_width,
  img_alt_txt,
}) => {
  const [open, _set_open] = useState(false);

  const modalWidth = Math.min(0.8 * win_width, 1000); // max 600px
  const avatarSize = Math.max(win_width * 0.02, 16);  // min 32px
  const fontSize = Math.max(win_width * 0.008, 12);   // min 12px
  const gapSize = Math.max(win_width * 0.005, 8);     // min 8px

  return (
    <>
      <IconButton
        variant="plain"
        onClick={() => {/* go home*/}}
        sx={{
          borderRadius: 10,
          width: logo_width,
          height: logo_height,
          p: 0,
          backgroundColor: '#ffffff',
        }}
      >
        <img
          src={img_src}
          alt={img_alt_txt}
          title={img_alt_txt}
          style={{ width: logo_width, height: logo_height }}
        />

      </IconButton>
    </>
  );
};

export default _logo;
