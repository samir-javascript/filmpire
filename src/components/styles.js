// MyStyledButton.js

import { styled } from '@mui/system';
import Button from '@mui/material/Button';

const MyStyledButton = styled(Button)({
  backgroundColor: 'blue',
  color: 'white',
  '&:hover': {
    backgroundColor: 'darkblue',
  },
});

export default MyStyledButton;