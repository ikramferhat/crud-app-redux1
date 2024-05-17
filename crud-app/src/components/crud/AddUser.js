import React,{useState} from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { Grid,Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useNavigate} from 'react-router-dom';
import axios from "axios"
import {addUser} from '../../redux/actions/actions'
import {useSelector, useDispatch} from "react-redux"

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2)
    }
  }));

 
const AddUser = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const Schema = Yup.object().shape({
      email: Yup.string().email().required('Email is required'),
      firstname: Yup.string().required('first name is required')
    });

    const onAdd = (user) => {
      return function(dispatch){
        axios({
          method: 'post',
          url:'http://localhost:5000/users',
          data:user,
          headers: {
            'Content-Type': 'application/json',
             Authorization: 'sometoken'
            },
        })
        .then((ress)=>{
          dispatch(addUser())
        })    
      }
    }

    const formik = useFormik({
      initialValues: {
        email: '',
        firstname: '',
        gender: 'female'
      },
      validationSchema: Schema,
      onSubmit: (values) => {
        const payload = {
          email: values.email,
          firstname: values.firstname,
          gender: values.gender
        };
        console.log('DData===>', payload);
        dispatch(onAdd(payload))
          navigate("/")
        ;
      }
    });

    const { errors, touched, values, getFieldProps } = formik;

    return (
      <Grid container justifyContent='center'>
        <Grid item xs={12} sm={8} style={{padding: "20px"}}>           
          <h3>ADD USER</h3>         
          <Button style={{marginBottom:"20px"}} onClick={()=>  navigate("/")}  variant="contained" color="primary">GO BACK</Button>             
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>             
              <TextField
                className={classes.root}
                fullWidth
                label="First Name"
                {...getFieldProps('firstname')}
                error={Boolean(touched.firstname && errors.firstname)}
                helperText={touched.firstname && errors.firstname}
              />
              <TextField
                className={classes.root}
                fullWidth
                label="Email"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField  
                className={classes.root}
                fullWidth                 
                select
                {...getFieldProps('gender')}
                SelectProps={{native: true}}
                helperText="Please select your gender"
              >
                <option key="male" value="male">Male</option>
                <option key="female" value="female">Female</option>
              </TextField>
              <Button type='submit' style={{marginTop:"10px"}} variant="contained" color="primary">ADD USER</Button>
            </Form>
          </FormikProvider>
        </Grid>
      </Grid>
    )
  }

export default AddUser
