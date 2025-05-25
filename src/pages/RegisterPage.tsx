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

function RegisterPage() {

    const navigate = useNavigate();

    const submit = async (values:any , actions:any)=>{
        
        try {
            const payload: UserType = {
                id: String(Math.floor(Math.random() * 999)),
                username: values.username,
                password: values.password,
                balance:1000
            }
          const responce = await registerPageService.register(payload)

          if(responce){
            clear();
            toast.success('Kayıt Başarılı');
            navigate('/login');
          }
        } catch (error) {
              toast.error('Kullanıcı Kaydedilemedi')
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
                    <Button type='submit' variant="outlined"  sx={{ color: '#ffff' }} size="small">Kayıt Ol</Button>
                    <Button onClick={clear} variant="outlined" sx={{ color: '#ffff' }} color="error" size="small">Temizle</Button>
                </Box>
            </form>
        </div>
    </div>
  )
}

export default RegisterPage