import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';
import _template_menu from './MenuTemplate';
import _taskboard_menu from './MenuTaskBoard';
import _pricing_menu from './MenuPricing';
import _FAQ_menu from './MenuFAQ';
import _about_menu from './MenuAbout';
import { _get_window_size } from '../../common/components/window_size';
import otb_logo from '../../../res/imgs/otb_logo/otb_logo_200x72.png';
import _logo from '../../common/components/logo';
import { Icon } from 'lucide-react';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar(props) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const LOGO_WIDTH_PERC = 0.06;
  const LOGO_HEIGHT_PERC = LOGO_WIDTH_PERC / 3;

  const window_size = _get_window_size();
  const logo_width = window_size.width * LOGO_WIDTH_PERC;
  const logo_height = window_size.width * LOGO_HEIGHT_PERC;


  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <IconButton
              variant="plain"
              onClick={() => {/* go home*/}}
              sx={{
                borderRadius: 20,
                width: logo_width,
                height: logo_height,
                p: 0,
                backgroundColor: '#ffffff',
              }}
            >
              <img
                src={otb_logo}
                alt={"OpenTaskBoard"}
                title={"OpenTaskBoard"}
                style={{ width: logo_width, height: logo_height, borderRadius: 20, }}
              />

            </IconButton>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Box sx={{ minWidth: 120 }}>
              <_taskboard_menu _on_update_route={props._on_update_route} />
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <_template_menu _on_update_route={props._on_update_route} />
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <_pricing_menu _on_update_route={props._on_update_route} />
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <_FAQ_menu _on_update_route={props._on_update_route} />
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <_about_menu _on_update_route={props._on_update_route} />
            </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Button color="primary" variant="text" size="small">
              Sign in
            </Button>
            <Button color="primary" variant="contained" size="small">
              Sign up
            </Button>
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <MenuItem>Features</MenuItem>
                <MenuItem>Testimonials</MenuItem>
                <MenuItem>Highlights</MenuItem>
                <MenuItem>Pricing</MenuItem>
                <MenuItem>FAQ</MenuItem>
                <MenuItem>Blog</MenuItem>
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Button color="primary" variant="contained" fullWidth>
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="outlined" fullWidth>
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
