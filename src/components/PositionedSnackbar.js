import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

export default function PositionedSnackbar({open, text, position}) {
  let vertical, horizontal; 
  switch (position) {
      case "Top-Left":
          vertical = "top"
          horizontal = "Left"
          break;
      case "Top-Center":
          vertical = "top"
          horizontal = "center"
          break;
      case "Top-Right":
          vertical = "top"
          horizontal = "right"
          break;
      case "Bottom-Right":
          vertical = "bottom"
          horizontal = "right"
          break;
      case "Bottom-Center":
          vertical = "bottom"
          horizontal = "center"
          break;
  
      default:
            vertical = "top"
            horizontal = "right"
          break;
  }
 



  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        message={text}
        key={vertical + horizontal}
      />
    </div>
  );
}
