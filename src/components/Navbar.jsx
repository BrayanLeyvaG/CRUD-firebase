import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="div" fontWeight={600} sx={{ flexGrow: 1, fontFamily:"Dancing Script" }} >
            Instagrom
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}