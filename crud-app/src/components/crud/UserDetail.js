import React,{useState, useEffect} from 'react'
import { Grid,Button,Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useNavigate,useParams} from 'react-router-dom';
import axios from "axios"
import {getSingleUser} from '../../redux/actions/actions'
import {useSelector, useDispatch} from "react-redux"

const useStyles = makeStyles((theme) => ({
  container: {
    '& p': {
       marginLeft: 10
     },
    '& h3': {
      color: theme.palette.secondary.dark,
     }
    },
  }));

 
const UserDetail = () => {
    const classes = useStyles();
    const [state,setState] = useState({
        firstname:"",
        email:"",
        gender:"female", 
    });
    const dispatch = useDispatch()
    let {id} = useParams()
    const {oneuser} = useSelector((state) => state.allUsers)
    const{firstname,email,gender}=state;
    const navigate = useNavigate();

  
    
  const getSingle = (userid) => {
    return function(dispatch){
  axios.get(`http://localhost:5000/users/${userid}`)
  .then((res)=>{
      console.log('data',res.data)
      dispatch(getSingleUser(res.data))
  })
  .catch((error)=> console.log(error))    
}}

useEffect(() => {
  dispatch(getSingle(id))
 },[]);

useEffect(() => {
  if(oneuser){
    setState({...oneuser})
  }
 },[oneuser]);

 
   
    return (
        <Grid container justifyContent='center'>
            <Grid item xs={12} sm={8} style={{padding: "0px 4%",}}>           
                <h1>DETAIL USER</h1>       
                <Button style={{marginBottom:"20px"}} onClick={()=>  navigate("/")}  variant="contained" color="primary">GO BACK</Button>
                <Box className={classes.container}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <h3>First Name:</h3>
                    <p>{firstname}</p>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <h3>Email:</h3>
                    <p>{email}</p>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <h3>Gender:</h3>
                    <p>{gender}</p>
                  </Box>
                </Box>
            </Grid>
        </Grid>
)}

export default UserDetail


