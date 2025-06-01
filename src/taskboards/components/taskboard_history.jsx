import React, { useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Table from '@mui/joy/Table';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import { _get_toolbar_z_index } from '../../common/globals';

const _taskboard_history = ({
  trigger_width,
  trigger_height,
  img_src,
  win_width,
  img_alt_txt,
  taskboard_rerender_func,
  request_taskboard_state_func,
}) => {
  const [open, _set_open] = useState(false);

  // Responsive sizes based on win_width
  const modalWidth = Math.min(0.8 * win_width, 1000); // max 600px
  const avatarSize = Math.max(win_width * 0.02, 16);  // min 32px
  const fontSize = Math.max(win_width * 0.008, 12);   // min 12px
  const gapSize = Math.max(win_width * 0.005, 8);     // min 8px

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
          alt={img_alt_txt}
          title={img_alt_txt}
          style={{ width: trigger_width, height: trigger_height }}
        />
      </IconButton>

      <Modal open={open} onClose={() => _set_open(false)} sx={{ zIndex: _get_toolbar_z_index() + 1 }}>
        <ModalDialog sx={{ maxWidth: modalWidth }}>
          <Typography level="h4" sx={{ mb: 2, fontSize: fontSize * 1.4 }}>History</Typography>
          <Table aria-label="table with ellipsis texts" noWrap sx={{ fontSize }}>
            <thead>
              <tr>
                <th>Name</th>
                <th style={{ width: '60%' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: gapSize }}>
                    <Avatar src="/static/images/avatar/1.jpg" sx={{ width: avatarSize, height: avatarSize }} />
                    <Box sx={{ minWidth: 0 }}>
                      <Typography noWrap sx={{ fontWeight: 'lg', fontSize }}>
                        Morty D Ardiousdellois Addami
                      </Typography>
                      <Typography noWrap level="body-sm" sx={{ fontSize: fontSize * 0.9 }}>
                        Writer, Youtuber
                      </Typography>
                    </Box>
                  </Box>
                </td>
                <td>
                  Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at
                  velit. Vivamus vel nulla eget eros elementum pellentesque.
                </td>
              </tr>
              <tr>
                <td>Joseph Morriso</td>
                <td>
                  <Typography noWrap sx={{ fontSize }}>
                    <Link href="#text-ellipsis" startDecorator="ℹ️">
                      In eleifend quam a odio
                    </Link>
                    . Suspendisse potenti in hac habitasse platea dictumst.
                  </Typography>
                </td>
              </tr>
            </tbody>
          </Table>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default _taskboard_history;
