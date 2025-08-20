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
import Dialog from '@mui/material/Dialog';
import _template_menu from './MenuTemplate';
import _taskboard_menu from './MenuTaskBoard';
import _pricing_menu from './MenuPricing';
import _FAQ_menu from './MenuFAQ';
import _about_menu from './MenuAbout';
import { _get_window_size } from '../../common/components/window_size';
import otb_logo from '../../../res/imgs/otb_logo/otb_logo_200x72.png';
import _logo from '../../common/components/logo';
import _login from '../components/Login';
import _sign_up from '../components/Signup';
import blank_profile_img from '../../../res/imgs/blank_profile_100x100.png';
import { _global_state_context } from '../../common/global_state_context';
import { useContext } from 'react';
import { _auth_is_valid_access_token } from '../../common/auth';
import _user_profile from '../../common/user_profile';
import _settings from '../../common/settings';
import settings_img from '../../../res/imgs/settings_100x100.png';
import { SELECTED_COLOR_THEME } from '../../common/components/use_colour_themes';


// AppBar component

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
  const [signup_open, _set_signup_open] = React.useState(false);
  const [login_open, _set_login_open] = React.useState(false);
  
  const { global_email, _set_global_email } = useContext(_global_state_context);
  const { global_login_status, _set_global_login_status } = useContext(_global_state_context);
  const { global_route, _set_global_route } = useContext(_global_state_context);
  const { global_access_token, _set_global_access_token } = useContext(_global_state_context);
  

  // check if user has valid access token 
  React.useEffect(() => {
    _auth_is_valid_access_token(global_access_token, global_email).then(res => {

    if (res === true) {
      _set_global_login_status(true);
    }
    else
    {
      _set_global_login_status(false);
    }
    });
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const LOGO_WIDTH = 6.75; // rem
  const logo_width = `${LOGO_WIDTH}rem`;
  const logo_height = `${LOGO_WIDTH/3}rem`;;

  const top_right_toolbar_item_width = "2.25rem";   // Appbar right toolbar item res
  const top_right_toolbar_item_height = "2.25rem";  // Appbar right toolbar item res

  const _signup_page_login_link_clicked = () => {
    _set_signup_open(false);
    _set_login_open(true);
  };

  const _login_page_signup_link_clicked = () => {
    _set_login_open(false);
    _set_signup_open(true);
  };

  const _login_success = () => {
    _set_login_open(false);
    _set_global_login_status(true);
  };

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
          {/* Desktop view AppBar Components begins */}
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <IconButton
              variant="plain"
              onClick={() => _set_global_route('/')}
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

            <Box sx={{ display: { xs: 'none', md: 'flex', gap: 5 } }}>
              <Box sx={{ minWidth: 0, marginLeft: 2 }}>
                <_taskboard_menu />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <_template_menu />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <_pricing_menu />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <_FAQ_menu />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <_about_menu />
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
            {!global_login_status && (
                <Button 
                color="primary" 
                style={{ fontWeight: 'bold', color: SELECTED_COLOR_THEME.text_colour }} 
                variant="text" 
                size="small"
                onClick={() => _set_login_open(true)}
              >
                Sign in
              </Button>
            )}

            {!global_login_status && (
              <Button
                color="primary"
                style={{ fontWeight: 'bold' }}
                variant="contained"
                size="small"
                onClick={() => _set_signup_open(true)}
              >
                Sign up
              </Button>
            )}

            {/* User Profile Button */}
            {global_login_status && (
              <div>
                <_user_profile
                trigger_width={top_right_toolbar_item_width}
                trigger_height={top_right_toolbar_item_height}
                img_src={blank_profile_img}
                />
              </div>
            )} 

            {/* Settings Button */}
            {global_login_status && (
              <div>
                <_settings trigger_width={top_right_toolbar_item_width} trigger_height={top_right_toolbar_item_height} img_src={settings_img} 
                  img_alt_txt={"Settings"} re_render_func={props.rerender_func}     
                />
              </div>
            )} 
          </Box>
          {/* Desktop view AppBar Components ends*/}

          {/* Mobile view AppBar Components begins */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
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

                <Box sx={{ minWidth: 120 }}>
                  <_taskboard_menu />
                </Box>
                <Box sx={{ minWidth: 120 }}>
                  <_template_menu />
                </Box>
                <Box sx={{ minWidth: 120 }}>
                  <_pricing_menu />
                </Box>
                <Box sx={{ minWidth: 120 }}>
                  <_FAQ_menu />
                </Box>
                <Box sx={{ minWidth: 120 }}>
                  <_about_menu />
                </Box>
                
                {!global_login_status && (
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      onClick={() => _set_signup_open(true)}
                    >
                      Sign up
                    </Button>
                  </MenuItem>
                )}

                {!global_login_status && (
                  <MenuItem>
                    <Button 
                      color="primary" 
                      variant="outlined" 
                      fullWidth
                      onClick={() => _set_login_open(true)}
                    >
                      Sign in
                    </Button>
                  </MenuItem>
                )}

                <Divider sx={{ my: 3 }} />
                {global_login_status && (
                  <MenuItem>
                    {/* User Profile Button for mobile/drawer */}
                    {global_login_status && (
                      <div>
                        <_user_profile trigger_width={top_right_toolbar_item_width} trigger_height={top_right_toolbar_item_height}
                          img_src={blank_profile_img}
                        />
                      </div>
                    )} 
                  </MenuItem>
                )}

                {global_login_status && (
                  <MenuItem>
                    {/* Settings Button for mobile/drawer */}
                    {global_login_status && (
                      <div>
                        <_settings trigger_width={top_right_toolbar_item_width} trigger_height={top_right_toolbar_item_height} img_src={settings_img} 
                          img_alt_txt={"Settings"} re_render_func={props.rerender_func}     
                        />
                      </div>
                    )} 
                  </MenuItem>
                )}
              </Box>
            </Drawer>
          </Box>
          {/* Mobile view AppBar Components ends */}
        </StyledToolbar>
        <Dialog open={signup_open} onClose={() => _set_signup_open(false)} maxWidth="xs" fullWidth>
          <_sign_up login_link_clicked_handler_func={_signup_page_login_link_clicked}/>
        </Dialog>
        <Dialog open={login_open} onClose={() => _set_login_open(false)} maxWidth="xs" fullWidth>
          <_login signup_link_clicked_handler_func={_login_page_signup_link_clicked} login_success_func={_login_success}/>
        </Dialog>
      </Container>
    </AppBar>
  );
}