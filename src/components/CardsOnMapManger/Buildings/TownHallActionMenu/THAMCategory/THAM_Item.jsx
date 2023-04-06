import React, { useEffect, useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ReactSVG } from 'react-svg';

import { townFinances } from './townHallActionMenuStyles.js';

const THAM_Item = ({ text, icon, stats }) => {
  return (
    <Grid item xs={6} sx={{ minWidth: 'fit-content' }}>
      <Box sx={townFinances.insideBorderElement}>
        {/* <FaRegChartBar size={24} color="black" style={{ minWidth: '24px' }} /> */}
        {icon}
        <Typography variant="body1" align="center">
          {text} :{' '}
          <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{stats}</span>
        </Typography>
      </Box>
    </Grid>
  );
};

export default THAM_Item;
