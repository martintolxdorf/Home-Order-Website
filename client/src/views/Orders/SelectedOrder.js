import React from 'react'

const SelectedOrder = (props) => {
    // console.log(props.order)
    if(props.order !== null) {
        const list = props.order[0].products.map((product) => {
            return (<li>{product.name} | ${product.price}</li>);
        });

        return (
            <div>
                <h3>Product List</h3>
                <hr className="my-4" />
                <div style={{textAlign: 'left'}}>{list}</div>
            </div>
        )
    }
    else {
        return(<p>Click on an order to see products</p>);
    }
}; 

export default SelectedOrder;