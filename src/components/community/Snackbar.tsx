import * as React from 'react';
import Snackbar, { SnackbarProps } from '@mui/joy/Snackbar';

export default function SnackbarColors() {
  const [open, setOpen] = React.useState(false);
  const [variant, setVariant] = React.useState<SnackbarProps['variant']>('outlined');
  const [color, setColor] = React.useState<SnackbarProps['color']>('neutral');
  return (
    <Snackbar
        autoHideDuration={4000}
        open={open}
        variant={variant}
        color={color}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setOpen(false);
        }}
      >
        {variant} snackbar with {color} color.
      </Snackbar>
  );
}