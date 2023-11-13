import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";

export const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  export const ButtonStyles = styled(Button)(({ theme }) => ({
      margin: '30px 2px'
  }));

  export const Paragraph = styled(Typography)(({ theme }) => ({
    margin: ' 0px 20px',
    color: theme.palette.text.primary
}));