import React from 'react'
import type { ProductType } from '../types/Types'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: ProductType
}

function ProductCard(props:ProductCardProps) {
  const {id, title, price, description, category, image, rating} = props.product;
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 300, margin: '60px 10px', padding: 2 }}>
        <img src={image} width={250} height={250}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title.substring(0, 15) + '...'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description.substring(0,100) + '...'}
          </Typography>
          <h3>{price}</h3>
        </CardContent>
        <CardActions>
          <Button onClick={()=> navigate("/product-detail/" + id)} size="small">Detay</Button>
        </CardActions>
    </Card>
  )
}

export default ProductCard