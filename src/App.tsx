import { use, useEffect } from 'react';
import './App.css'
import Navbar from './components/Navbar';
import Spinner from './components/Spinner';
import RouterConfig from './config/RouterConfig'
  import { ToastContainer } from 'react-toastify';
import type { RootState } from './redux/store';
import { useDispatch, useSelector } from 'react-redux';
import type { ProductType, UserType } from './types/Types';
import { setCurrentUser, setProducts } from './redux/appSlice';
import productService from './services/ProductService';
import { setBasket } from './redux/basketSlice';
import BasketDetails from './components/BasketDetails';

function App() {

  const dispatch = useDispatch();

  const getAllProducts = async ()=>{

    const products:ProductType[] =  await productService.getAllProducts();
    dispatch(setProducts(products));
  }

  useEffect(()=>{
    getAllProducts();
  })

  useEffect(() => {
    const result: string | null = localStorage.getItem('currentUser');
    if (result) {
      const currentUser: UserType = JSON.parse(result) as UserType;
      dispatch(setCurrentUser(currentUser));
    }
  }, [])

  useEffect(()=> {
    const basketString = localStorage.getItem("basket");
    if(basketString){
      const basket: ProductType[] = JSON.parse(basketString) as ProductType[];
      dispatch(setBasket(basket));
    }
  }, [])

  const {currentUser} = useSelector((state: RootState ) => state.app);

  return (
    <>
      {currentUser && <Navbar />}
      <RouterConfig />
      <ToastContainer autoClose={2500}/>
      <Spinner/>
      <BasketDetails/>
    </>
  )
}

export default App
