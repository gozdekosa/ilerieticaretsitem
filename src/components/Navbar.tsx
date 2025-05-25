import React from 'react'
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { InputAdornment } from '@mui/material';
import { filterProducts, setCurrentUser, setDrawer, setProducts } from '../redux/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ProductService from '../services/ProductService';
import type { ProductType } from '../types/Types';
import { FaShoppingBasket } from "react-icons/fa";
import Badge from '@mui/material/Badge';
import type { RootState } from '../redux/store';

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {basket} = useSelector((state:RootState)=> state.basket);

    const logout =()=>{
        localStorage.removeItem('currentUser');
        dispatch(setCurrentUser(null));
        navigate('/login');
        toast.success('Çıkış Yapıldı');
    }

    const handleFilter = async(e:React.ChangeEvent<HTMLInputElement>)=>{
      try {
          if(e.target.value){
            dispatch(filterProducts(e.target.value));
          } else{
          const result:ProductType[] = await  ProductService.getAllProducts();
            dispatch(setProducts(result));
          }
        
      } catch (error) {
        toast.error("filtreleme yaparken hata oluştu" + error)
      }
    }

    const openDrawer =()=>{
      dispatch(setDrawer(true));
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => navigate('/')}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            resim
          </IconButton>
          <Typography  onClick={() => navigate('/')} variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
            E-ticaret
          </Typography>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <TextField
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleFilter(e)}
                    id="searchInput"
                    placeholder='ara..'
                    slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                            </InputAdornment>
                        ),
                        style: {
                            color: 'lightgray',
                            borderBottom: '1px solid lightgray',
                        }
                    },
                    }}
                    variant="standard"
                />
                
                <Badge onClick={openDrawer} style={{cursor:'pointer'}} badgeContent={basket.length} color="warning">
                  <FaShoppingBasket />
                </Badge>
                

                <Button onClick={logout} color="inherit">Çıkış Yap</Button>
          </div>
         
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar