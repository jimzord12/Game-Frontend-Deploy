import React from 'react';

// MUI Components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// JSS styles
import { townFinances } from './townHallActionMenuStyles.js';

const THAMCategory = ({
  title,
  isVisible = true,
  isDisplayed = true,
  isDevCompleted = false,
  is760px,
  isFake = false,
  overrideStyles,
  children,
}) => {
  const styles = {
    visibility: isVisible ? 'visible' : 'hidden',
    display: isDisplayed ? '' : 'none',
    minWidth: is760px ? '42%' : '90%',
    maxWidth: is760px ? (isFake ? '42%' : '46%') : '90%',
    // outline: isDevCompleted ? '' : '3px dashed red',
  };

  function stylesOverrider(styles) {
    const newStyles = {};
    for (const style in styles) {
      if (Object.hasOwnProperty.call(styles, style)) {
        if (style.includes('Width')) {
          newStyles[style] = is760px ? styles[style].sm : styles[style].lg;
        } else {
          newStyles[style] = styles[style];
        }
      }
    }
    return { ...styles, ...newStyles };
  }

  return (
    <Box
      sx={
        overrideStyles === undefined
          ? styles
          : stylesOverrider(overrideStyles, styles)
      }
    >
      <Typography variant="h6" align="center" gutterBottom>
        {title}
      </Typography>
      <Box sx={townFinances.boxContainer}>
        <Grid
          container
          spacing={1}
          justifyContent="flex-start"
          direction="column"
          px={1}
          gap={overrideStyles === undefined ? 0 : 0.75}
        >
          {children}
        </Grid>
      </Box>
    </Box>
  );
};

export default THAMCategory;
