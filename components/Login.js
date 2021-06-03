import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useHistory } from "react-router";
import Navbar from './Navbar';


import Logo from "../images/sun5.jpg";

function Copyright() {
  return (
  
    
    
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
    
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://wallpapercave.com/wp/wp38040.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [details,setDetails]=useState({email:"",password:""});
  const history = useHistory();

  const submitHandler = e => {
    e.preventDefault();
    axios.post("http://localhost:9090/loginOrSignup/authenticate",details)
      .then(res =>{
      console.log('response => ' + JSON.stringify(res));
      let token = res.data.token;
      localStorage.setItem('token',token);
      let user = res.data.user;
      localStorage.setItem('user',user);
      


    if ( user.designation !== null)
    {
    
    if ( user.designation == "RECEPTIONIST")
    {
      history.push('/receptionist');
    }
    else if ( user.designation == "MANAGER")
    {
      history.push('/manager');
    }
    else 
    {
      history.push('/admin');
    }
    }
    else
    {
      alert("incorrect details");
      history.push('/');
    }
  

   
  }).catch((error) => {
    console.error("Error" +error);
    alert("Invalid Credentials");
    history.push('/');
   });
  }


  return (
    <Grid container component="main" className={classes.root}>
    <Navbar />
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Link href="/">
          <img src={Logo} alt="Logo" width="240" height="80" />
          </Link>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={submitHandler}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => setDetails({...details, email: e.target.value})}
              value={details.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setDetails({...details, password: e.target.value})}
              value={details.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
