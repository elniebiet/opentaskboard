import React, { useState, useContext } from 'react';
import { api_personal_details } from './otb_apis';

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
  const { global_access_token } = useContext(_global_state_context);
  const [first_name, _set_first_name] = useState("");
  const [last_name, _set_last_name] = useState("");
  const [role, _set_role] = useState("");
  const [company, _set_company] = useState("");
  const [country, _set_country] = useState("");
  const [jobtitle, _set_job_title] = useState("");
  const [joined, _set_joined] = useState("");

  // fetch personal details 
  React.useEffect(() => {
    const _fetch_personal_details = async () => {
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
          const response = await fetch(api_personal_details, request);

          const data = await response.json();

          if (response.ok && data.statusCode === 200) {
            _set_first_name(data.personalDetails.firstname);
            _set_last_name(data.personalDetails.lastname);
            _set_role(data.personalDetails.role);
            _set_company(data.personalDetails.company);
            _set_country(data.personalDetails.country);
            _set_job_title(data.personalDetails.jobtitle);
            _set_joined(new Date(data.personalDetails.joined).toLocaleDateString());
          }
          else {
            _set_first_name("");
            _set_last_name("");
          }
        } catch (error) {
          _set_first_name("");
          _set_last_name("");
        }
      }
    };

    _fetch_personal_details();
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

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
          <Typography variant="h6">{first_name} {last_name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {global_email}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1">Role: {role}</Typography>
          <Typography variant="body1">Company: {company}</Typography>
          <Typography variant="body1">Job Title: {jobtitle}</Typography>
          <Typography variant="body1">Location: {country}</Typography>
          <Typography variant="body1">Joined: {joined}</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default _user_profile;
