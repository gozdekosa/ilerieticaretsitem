import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import productService from '../services/ProductService';
import { setLoading } from '../redux/appSlice';
import { toast } from 'react-toastify';
import type { ProductType } from '../types/Types';
import { addProductToBasket } from '../redux/basketSlice';

function ProductDetail() {
    const {productId} = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState<ProductType | null>();
    const [count, setCount] = useState<number>(0);

    const increment = ()=>{
        setCount(count+1);
    }

    const decriment = ()=>{
        if (count > 0) {
            setCount(count - 1);
        }
    }

    const getProductById = async (productId:number)=>{
        try {
            dispatch(setLoading(true));
          const product:ProductType = await  productService.getProductById(productId);
          setProduct(product);
        } catch (error) {
            toast.error("ürün detayını getirirken hata oluştu" + error)
        } finally{
            dispatch(setLoading(false));
        }
    }

    const addBasket = ()=>{
        if(product){
        const payload: ProductType ={
            ...product,
            count:count
        }
        dispatch(addProductToBasket(payload));
        toast.success("Ürün başarıyla eklendi");
        }
    }

    useEffect(()=>{
        getProductById(Number(productId));
    }, [])

  return (
    <Container maxWidth="lg">
        {product && <>
        
        <Card sx={{ margin: '60px 10px', padding: 2 }}>
            <img src={product.image} width={250} height={250}/>
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {product.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {product.description}
            </Typography>
            <h3>{product.price}</h3>

            <div>
                <span onClick={increment} style={{ fontSize:'40px', fontWeight:'bold', cursor:'pointer', marginRight:'10px' }}>+</span>
                <span style={{ fontSize:'30px' }}>{count}</span>
                <span onClick={decriment} style={{ fontSize:'40px', fontWeight:'bold', cursor:'pointer', marginLeft:'10px' }}>-</span>
            </div>
            <Button onClick={addBasket} variant="contained">Sepete Ekle</Button>
            </CardContent>
        </Card>
        
        </>}

    </Container>
  )
}

export default ProductDetail