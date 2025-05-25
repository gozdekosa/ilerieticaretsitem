import React, { useEffect } from 'react'
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { setDrawer } from '../redux/appSlice';
import { Button } from '@mui/material';
import { calculateBasket, removeProductFromBasket } from '../redux/basketSlice';

function BasketDetails() {
    const {drawer} = useSelector((state: RootState)=>state.app);

    const {basket, totalAmount} = useSelector((state:RootState)=>state.basket)
    const dispatch = useDispatch();

    const closeDrawer=()=>{
        dispatch(setDrawer(false));
    }

    useEffect(()=>{
        dispatch(calculateBasket());
    }, [basket])

    const removeProduct=(productId:number)=>{
        dispatch(removeProductFromBasket(productId));
    }
  return (
    <Drawer open={drawer} anchor='right' onClose={closeDrawer}>
    {basket && basket.map((product)=>(
        <>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', padding:'30px 20px'}}>
            <div>
                <img src={product.image} width={50} height={50}/>
            </div>
            <div style={{marginLeft:'10px', width:'300px'}}>
                <p>{product.title.substring(0,40)}</p>
                <p>{product.description.substring(0,40)}</p>
            </div>
            <div style={{marginRight:'10px'}}>{product.count}</div>
            <div style={{width:'50px'}}>{product.price}₺</div>
            <Button onClick={()=>removeProduct(product.id)}>Sil</Button>
            </div>
          
        </>

    ))}
      <div>
            Toplam: {totalAmount}
      </div>
    </Drawer>
  )
}

export default BasketDetails