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
import { SELECTED_COLOR_THEME } from '../../common/components/use_colour_themes';

const _taskboard_history = ({ trigger_width, trigger_height, img_src }) => {
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
          alt="History"
          title="History"
          style={{ width: trigger_width, height: trigger_height }}
        />
      </IconButton>

      <Modal 
        open={open} 
        onClose={() => _set_open(false)}
        sx={{ zIndex: _get_toolbar_z_index() + 1 }}
      >
        <ModalDialog sx={{ maxWidth: 600 }}>
          <Typography level="h4" sx={{ mb: 2 }}>History</Typography>
          <Table aria-label="table with ellipsis texts" noWrap>
            <thead>
              <tr>
                <th>Name</th>
                <th style={{ width: '60%' }}>
                  Description (you should see a part of this message)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar src="/static/images/avatar/1.jpg" />
                    <Box sx={{ minWidth: 0 }}>
                      <Typography noWrap sx={{ fontWeight: 'lg' }}>
                        Morty D Ardiousdellois Addami
                      </Typography>
                      <Typography noWrap level="body-sm">
                        Writer, Youtuber
                      </Typography>
                    </Box>
                  </Box>
                </td>
                <td>
                  Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at
                  velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta
                  volutpat erat. Quisque erat eros, viverra eget, congue eget, semper
                  rutrum, nulla.
                </td>
              </tr>
              <tr>
                <td>Joseph Morriso</td>
                <td>
                  <Typography noWrap>
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
