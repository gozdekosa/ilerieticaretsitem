import React, { useEffect, useState } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import category from '../services/CategoryService';
import { useDispatch } from 'react-redux';
import { setLoading, setProducts } from '../redux/appSlice';
import { toast } from 'react-toastify';
import productService from '../services/ProductService';
import type { ProductType } from '../types/Types';

function Category() {

    const dispatch = useDispatch();
    const [categories, setCategories] = useState<string[]>();

    const getAllCategories = async ()=>{
        try {
            dispatch(setLoading(true));
            const categories: string[] = await category.getAllCategories();
            setCategories(categories);
        } catch (error) {
            toast.error("kategori listesi hata");
        }finally{
            dispatch(setLoading(false));
        }
    }

    const handleCategory = async (e:React.ChangeEvent<HTMLInputElement>, categoryName:string)=>{
        console.log(categoryName);
        try {
            dispatch(setLoading(true));
            if(e.target.checked){
                const products: ProductType[] = await  category.getProductsByCategoryName(categoryName);
                dispatch(setProducts(products));
            }
            else{
                const products: ProductType[] = await productService.getAllProducts();
                dispatch(setProducts(products));
            }
        } catch (error) {
            toast.error("Kategoriler alınırken hata oluştu")
        }
        finally{
            dispatch(setLoading(false));
        }
    }

    useEffect(()=> {
        getAllCategories();
    }, [])

    return (
        <FormGroup style={{ marginTop: '60px', marginLeft: '20px' }}>
        {categories && categories.map((category:string, index:number)=>(
            <FormControlLabel key={index} control={<Checkbox onChange={(e:React.ChangeEvent<HTMLInputElement>)=> handleCategory(e, category)} />} label={category} />
        ))}
        </FormGroup>
    )
}

export default Category