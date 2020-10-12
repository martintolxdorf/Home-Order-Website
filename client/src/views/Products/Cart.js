import React from 'react'


const Cart = (props) => {
    if(props.products !== []) {
        const products = props.products.map((product) => {
            return (
                <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td><button onClick={() => props.removeProduct(product._id)}>Remove</button></td>
                </tr>
            );
        });

        return <tbody>{products}</tbody>
    }
    else {
        return(null);
    }
}; 

export default Cart;