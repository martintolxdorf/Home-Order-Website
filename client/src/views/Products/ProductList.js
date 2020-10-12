import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Cart from './Cart'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import './ProductList.css'
//Axios.defaults.baseURL = process.env.baseURL || "http://localhost:3000";
// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


const ProductList = (props) => {
    const [products, setProducts] = useState([]);  // init to empty array so useEffect triggers on mount

    useEffect(() => {
        async function fetchProducts() {
            try {
                const result = await Axios.get('/products/' + props.user.name)  // fetches product list for user on mount
                setProducts(result.data.products); //temp kinda; restricts fetching when submitted test function
            }
            catch(e) {  // if user does not yet have product list create one
                const result = await Axios.post('/products/create', {username: props.user.name}).then(Axios.get('/products/' + props.user.name))
                setProducts(result.data.products);
            }
            
        }
        fetchProducts();
      }, [props.user]);

      useEffect(() => {  // updates total cost
          let sum = 0;
          products.forEach(prod => sum += Number(prod.price));
          document.getElementById("total").innerHTML = "Total Cost: $" + sum.toFixed(2);
      })

    async function addProduct(name, price) {  // maybe implement accepting no more than 2 decimal places
        price = Number(price);
        if(isNaN(price) || Math.floor(price * 100) !== price * 100) console.log("u suck at typing numbers");  // fix to some kind of popup?
        else {
            price = price.toFixed(2);  // 12 => 12.00
            const product = {
                name: name,
                price: price
            }
            const response = await Axios.post('/products/update/' + props.user.name, product);  // TODO:need to account for invalid input
            setProducts(response.data.products);
        }
    }

    async function removeProduct(id) {
        const response = await Axios.delete('/products/' + props.user.name + '/' + id);
        setProducts(response.data.products);
    }

    const submit = async () => {
        const response = await Axios.get('/products/' + props.user.name);
        if(response.data.products.length !== 0 && (document.getElementById('storeName').value !== '' && document.getElementById('storeAddress').value !== '')) {
            Axios.delete('/products/' + props.user.name);
            response.data.price = document.getElementById("total").innerHTML.substr(12);
            response.data.store = document.getElementById('storeName').value;
            response.data.address = document.getElementById('storeAddress').value;
            document.getElementById('storeName').value = '';
            document.getElementById('storeAddress').value = '';
            Axios.post('/orders/create', response.data);
            Axios.post('/products/create', {username: props.user.name});
            setProducts([]);
        }
        //redirect to dashboard here?
    }

    return (
    <div className="col text-center">
	<Container>
	<Jumbotron>
		<Form>
			<Form.Label className="text-center">
				<input type="text" id="name" placeholder="Name" autoComplete="off" />
				<input type="text" id="price" placeholder="Price" autoComplete="off"></input>
			</Form.Label>
		</Form>

		<div className='mb-2'>	
			<ButtonGroup  size="md">
			<Button variant="flat" onClick={() => {
				if(document.getElementById("name").value !== '' && document.getElementById("price").value !== '')
					addProduct(document.getElementById("name").value, document.getElementById("price").value);//maybe have else w/ alert of some sort saying invalid input
				document.getElementById("name").value = '';
				document.getElementById("price").value = '';
			}}>Add Product</Button>
			
			</ButtonGroup>
		</div>
	
		
        <Table striped bordered hover variant="dark" id="cart">
            <thead>
                <tr key="header">
                    <td><u>Name</u></td>
                    <td><u>Price</u></td>
                </tr>
            </thead>
            <Cart products={products} removeProduct={removeProduct}/>
        </Table>
        <p className='thick' id="total"></p>

        <input type="text" id="storeName" placeholder="Name of the Store" autoComplete="off" />
        <input type="text" id="storeAddress" placeholder="Address of the Store" autoComplete="off" />
        <button id='submit' onClick={submit}>Submit Order</button>  {/* needs style fixing once functional */}
        <hr className='my-4' />

		<iframe title="map" src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d110926.60600101169!2d-82.34703429229806!3d29.677543761586634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgainesville%20hardware%20stores!5e0!3m2!1sen!2sus!4v1595889792807!5m2!1sen!2sus" width="80%" height="400" frameBorder="1" style={{border:"1px solid #000000"}} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>	
		</Jumbotron>
		
		</Container>
		
		
	</div>
    )
};

export default ProductList;