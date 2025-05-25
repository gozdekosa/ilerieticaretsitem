import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { BsPersonCircle } from "react-icons/bs";
import { MdLockOutline } from "react-icons/md";
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import '../css/RegisterPage.css';
import { RegisterPageSchema } from '../schemas/RegisterPageSchema';
import registerPageService from '../services/RegisterPageService';
import type { UserType } from '../types/Types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import loginPageService from '../services/LoginPageService';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setLoading } from '../redux/appSlice';

interface CheckUserType {
  result: boolean;
  currentUser: UserType | null;
}

function LoginPage() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const checkUser = (userList: UserType[], username:string, password:string): CheckUserType=>{
    const response:CheckUserType ={result: false, currentUser: null};
    userList.forEach((user:UserType)=>{
      if(user.username === username && user.password === password){
        response.result = true;
        response.currentUser = user;
      }
    })

    return response;
  }

  const submit = async (values:any, actions:any)=>{
    try {
      dispatch(setLoading(true));
      const response:UserType[] = await loginPageService.login();
      if(response){
        const checkUserResponce:CheckUserType= checkUser(response, values.username, values.password);
        if(checkUserResponce.result && checkUserResponce.currentUser){
            dispatch(setCurrentUser(checkUserResponce.currentUser));
            localStorage.setItem('currentUser', JSON.stringify(checkUserResponce.currentUser));
            navigate('/');
        }
        else{
          toast.error('Kullanıcı Bulunamadı');
        }
      }
    } catch (error) {
      toast.error('Kullanıcı Bulunamadı');
    }
    finally{
      dispatch(setLoading(false));
    }
  }
  const {values, handleSubmit, handleChange, errors, resetForm} = useFormik({
      initialValues: {
          username: '',
          password: ''
      },
      onSubmit: submit,
      validationSchema: RegisterPageSchema,
  });

  const clear = ()=>{
    resetForm();
  }

  return (
     <div className='register'>
        <div className='card'>
            <form onSubmit={handleSubmit}>
                <div className='pt-2'>
                    <TextField
                        id="username"
                        placeholder='Kullanıcı Adı'
                        value={values.username}
                        onChange={handleChange}
                        slotProps={{
                        input: {
                            startAdornment: (
                            <InputAdornment position="start">
                               <BsPersonCircle />
                            </InputAdornment>
                            ),
                        },
                        }}
                        variant="standard"
                        helperText={errors.username && <span style={{ color:'red' }}>{errors.username}</span>}
                        sx={{
                            input: {
                            color: 'white',
                            },
                            '& .MuiInputAdornment-root': {
                            color: 'white',
                            },
                            '& .MuiInput-underline:before': {
                            borderBottomColor: 'white',
                            },
                            '& .MuiInput-underline:after': {
                            borderBottomColor: 'white',
                            },
                            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                            borderBottomColor: 'white',
                            },
                            '& .MuiInputBase-input::placeholder': {
                            color: 'white',
                            opacity: 1,
                            },
                        }}
                    />
                </div>
                <div className='pt-2'>
                    <TextField
                        id="password"
                        type="password"
                        placeholder='Şifre'
                        value={values.password}
                        onChange={handleChange}
                        slotProps={{
                        input: {
                            startAdornment: (
                            <InputAdornment position="start">
                              <MdLockOutline />
                            </InputAdornment>
                            ),
                        },
                        }}
                        variant="standard"
                        helperText={errors.password && <span style={{ color:'red' }}>{errors.password}</span>}
                        sx={{
                            input: {
                            color: 'white',
                            },
                            '& .MuiInputAdornment-root': {
                            color: 'white',
                            },
                            '& .MuiInput-underline:before': {
                            borderBottomColor: 'white',
                            },
                            '& .MuiInput-underline:after': {
                            borderBottomColor: 'white',
                            },
                            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                            borderBottomColor: 'white',
                            },
                            '& .MuiInputBase-input::placeholder': {
                            color: 'white',
                            opacity: 1,
                            },
                        }}
                    />
                </div>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }} >
                    <Button type='submit' variant="outlined"  sx={{ color: '#ffff' }} size="small">Giriş Yap</Button>
                    <Button onClick={clear} variant="outlined" sx={{ color: '#ffff' }} color="error" size="small">Temizle</Button>
                </Box>
            </form>
        </div>
    </div>
  )
}

export default LoginPage