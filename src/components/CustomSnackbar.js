import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const CustomSnackbar = ({ open, message, handleClose, setSeverity }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={setSeverity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;