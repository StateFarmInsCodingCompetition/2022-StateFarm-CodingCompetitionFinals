import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AppBar, Box, Toolbar, Typography, Container, Stack, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function Header(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const theme = createTheme();
    theme.typography.nav = {
        fontFamily: [
            'Open Sans',
            'sans-serif'
        ].join(','),
        fontSize: '1rem',
        fontWeight: 'bold',
        '@media (min-width:580px)': {
            fontSize: '1.3rem',
            fontWeight: 'medium'
        },
        '@media (min-width:690px)': {
            fontSize: '1.7rem',
            fontWeight: "medium"
        }
    };
    theme.typography.sidenav = {
        fontFamily: [
            'Open Sans',
            'sans-serif'
        ].join(','),
        fontSize: '11px',
        fontWeight: 1000,
        '@media (min-width:510px)': {
            fontSize: '12px',
            fontWeight: 1000
        },
        '@media (min-width:580px)': {
            fontSize: '14px',
            fontWeight: 800,
        },
        '@media (min-width:690px)': {
            fontSize: '15px',
            fontWeight: 7000,
        }
    };
    
    return (
        <AppBar position="static">
            <Toolbar variant="dense" disableGutters>
                <ThemeProvider theme={theme}>
                    <Button href="/" sx={{ ml: '15px', mr: "60%" }}>
                        <Box
                            component="img"
                            sx={{
                                height: 60,
                                width: "auto",
                            }}
                            alt="StateFarm Logo"
                            src="https://logodix.com/logo/340273.png"
                        />
                    </Button>
                    {props.loginStatus &&
                        <Stack direction='row'>
                            <Button
                                href="/"
                                onClick={() => {
                                    props.onLog('false');
                                    localStorage.setItem('isLoggedIn', 'false');
                                }}
                                color='inherit'
                                sx={{
                                    align: "right",
                                    mr: "20px",
                                    fontFamily: [
                                        'Open Sans',
                                        'sans-serif'
                                    ].join(',')
                                }}>
                                <Typography variant="sidenav" color="inherit" component="div" align='left' sx={{ ml: '0px' }}>
                                    <Box fontWeight="700" sx={{
                                        width: '58px',
                                        '@media (min-width:510px)': {
                                            width: '63px',
                                        },
                                        '@media (min-width:580px)': {
                                            width: '67px',
                                        },
                                        '@media (min-width:690px)': {
                                            width: '72px',
                                        },
                                        textAlign:'center'}}>
                                            Sign Out
                                    </Box>
                                </Typography>
                            </Button>
                        </Stack>
                    }
                </ThemeProvider>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
