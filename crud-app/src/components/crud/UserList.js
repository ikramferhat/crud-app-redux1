import React,{useState, useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import axios from "axios"
import { getUsers,deleteUser} from '../../redux/actions/actions'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid,Button} from '@material-ui/core';
import {useNavigate} from 'react-router-dom';


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      textDecoration: 'none'

    },
    body: {
      fontSize: 14,
      textDecoration: 'none',
      "& a": {
        textDecoration: 'none',  
      }
    },


  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    btn: {   
      display:'flex',
    },
  
  });


const UserList = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const users = useSelector((state) => state.allUsers.users)
    const list = users;
    const dispatch = useDispatch()

    const showUsers = () => {
      return function(dispatch){
        axios({
          method: 'get',
          url:'http://localhost:5000/users',
          params: {    }
        })
        .then((response)=>{
          console.log('DATA===>',response.data)
          dispatch(getUsers(response.data))
        })
        .catch((err)=>{console.log("err", err)})
      }}

     const delete_User = (id) => {
       return function(dispatch){
         axios.delete(`http://localhost:5000/users/${id}`)    
         .then((res)=>{
         dispatch(deleteUser())
         dispatch(showUsers())
      })    
    }}

    const onDelete = (id) => {
      dispatch(delete_User(id))
     }

    useEffect(() => {
      dispatch(showUsers());
    }, []);

    return (
  <Grid container  sm={10} style={{display: "flex", justifyContent:"center" ,margin:"0 auto"}}>
     <Grid item xs={12} sm={12} style={{padding: "0px 4%",}}>
     <Button onClick={()=>  navigate("/adduser")}  style={{marginBottom:"10px"}} variant="contained" color="primary">ADD USER</Button>
      <TableContainer  component={Paper}>
        <Table  aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>User</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Gender</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.length === 0 && (<TableRow><TableCell colSpan={6}>no records found</TableCell></TableRow>)}
            {list?.map((index)=>(
              <StyledTableRow key={index.id}>
                <StyledTableCell component="th" scope="row">{index.firstname}</StyledTableCell>
                <StyledTableCell>{index.email}</StyledTableCell>
                <StyledTableCell>{index.gender}</StyledTableCell>
                <StyledTableCell>
                  <div className={classes.btn}>
                    <Button onClick={()=>  navigate(`/detail/${index.id}`)} variant="contained" color="primary">DETAILS</Button>
                    <Button onClick={()=> onDelete(index.id)} style={{margin:"0 10px"}} variant="contained" color="secondary">DELETE</Button>
                    <Button onClick={()=>  navigate(`/edit/${index.id}`)} variant="contained">EDIT</Button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  </Grid>
    );
}

export default UserList
