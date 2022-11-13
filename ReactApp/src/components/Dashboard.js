import { React } from 'react';
import { Grid, Paper, Button, Typography, Container } from '@mui/material';
import Table from './Table';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: {
            main: red[700],
        },
    },
    typography: {
        h1: {
          fontWeight: 'bold',
            fontSize: 35,
            fontFamily: [
                'Open Sans',
                'sans-serif'
            ].join(',')
        },
        textbody: {
            fontStyle: 'italic',
            fontWeight: 'bold',
            textAlign: 'center',
            fontFamily: [
                'Open Sans',
                'sans-serif'
            ].join(','),
            color: red[900]
        }
      },
});

const Dashboard = props => { 
    const navigate = useNavigate();
    const paperStyle = { backgroundColor: red[100], padding: 30, height: 100, width: "50%", margin: "40px auto"}
    const btnstyle = {
        backgroundColor: red[700], color: '#fff', borderRadius: 35, fontSize: '15px', fontWeight: 'bold', fontFamily: [
            'Open Sans',
            'sans-serif'
        ].join(','),marginBottom: 20}

    return (
        <ThemeProvider theme={theme} >
            <ThemeProvider theme={theme.typography} >
                <img src=""></img>
                <Typography variant="h1" align='center' marginTop={5} marginBottom={3}>
                    Welcome!
                </Typography>
                <Container align='center'>
                    <Typography variant="textbody" align='center'>
                        This is your dashboard.
                    </Typography>
                </Container>
                <Container align='center'>
                    <Table></Table>
                </Container>
            </ThemeProvider>
            {/* <Grid sx = {{mt: '-15px'}}>
                <Paper elevation={2} style={paperStyle}>
                    <Button
                        onClick={() => navigate("/keyspaces")}
                        type='submit'
                        color='primary'
                        variant="contained"
                        style={btnstyle}
                        fullWidth>
                            Data Center
                    </Button>
                    <Button
                        onClick={() => navigate("/cluster") }
                        type='submit'
                        color='primary'
                        variant="contained"
                        style={btnstyle}
                        fullWidth>
                            Cluster Info
                    </Button>
                </Paper>
            </Grid> */}
        </ThemeProvider>
    );


}

export default Dashboard;
