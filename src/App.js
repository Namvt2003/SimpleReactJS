import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import ProductData from './data/data.json'
import React,{useState, useEffect} from 'react'
import { Container, Typography, Box,TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

export default function App(){
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setProducts(ProductData)
  },[])
  function handleSearchProduct(e){
    setSearch(e.target.value)
  }
  function handleSaveProduct(product){
    if(product.id){
      setProducts(products.map(p => (p.id === product.id ? product : p)))
    }
    else{
      product.id = products.length ? products[products.length -1] + 1: 1;
      setProducts([...products,product])
    }
    setSelectedProduct(null)
  }


  function handleEditProduct(product){
    setSelectedProduct(product)
    
  }

  function handleDeleteProduct(id){
    setProducts(products.filter(p => p.id !==id))
  }
  function handleFilteredProduct(){
    if(search === ""){
      return products
    }
    return products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
  }


  return (
    <div>
      <Container>
            <Typography variant="h4" gutterBottom>
                Product Management
            </Typography>
            <Box mb={4}>
            <TextField
                    label="Search Products"
                    variant="outlined"
                    fullWidth
                    value={search}
                    onChange={handleSearchProduct}
                    InputProps={{
                       startAdornment : <SearchIcon />,
                    }}
                />
            </Box>
            <Box mb={4}>
                <ProductForm selectedProduct={selectedProduct} onSave={handleSaveProduct} />
            </Box>
            <ProductList products={handleFilteredProduct()} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
        </Container>
    </div>
  )

}