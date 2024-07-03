import React from 'react';
import {useState, useEffect} from 'react';
import { TextField, Button, Box } from '@mui/material';

export default function ProductForm({selectedProduct, onSave }) {
    const [product, setProduct] = useState({name:'',price:''})
    useEffect(() => {
        if(selectedProduct){
            setProduct(selectedProduct)

        }
        else
        {
            setProduct({name:'',price:''})
        }
    },[selectedProduct])


    function handleChange(e){
        const {name, value} = e.target
        setProduct({...product, [name]: value})
    }

    function handleSubmit(e){
        e.preventDefault()
        onSave(product)
    }


    return(
        <form onSubmit={handleSubmit}>
            <Box mb={2}>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                />
            </Box>
            <Box mb={2}>
                <TextField
                    label="Price"
                    variant="outlined"
                    fullWidth
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                />
            </Box>
            <Button variant="contained" color="primary" type="submit">
                Save
            </Button>
        </form>
    )
}

