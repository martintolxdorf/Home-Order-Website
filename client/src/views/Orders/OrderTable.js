import React from 'react'

// const collapse = (id, products) => {  // i dont know why i did this in pure js instead of react... :/
//     if(!document.getElementById("_" + id)) {
//         let row = document.getElementById(id);
//         let ul = document.createElement('ul');
//         ul.id = "_" + id;
//         products.forEach(product => {
//             let li = document.createElement('li');
//             li.innerText = product.name + ' | ' + product.price;
//             ul.appendChild(li);
//         });
//         row.parentNode.insertBefore(ul, row.nextSibling);
//     }
//     else {
//         let element = document.getElementById("_" + id);
//         element.parentNode.removeChild(element);
//     } 
// }

const OrderTable = (props) => {
    if(props.orders !== []) {
        const orders = props.orders.map((order) => {
            return (
                <tr id={order._id} key={order._id}>
                    <td>{order.username}</td>
                    <td>{order.store}</td>
                    <td>{order.address}</td>
                    <td>{order.price}</td>
                    <td><button onClick={() => props.setOrder(order._id)}>View Products</button></td>
                    <td><button onClick={() => props.acceptOrder(order._id)}>Accept Order</button></td>
                </tr>
            );
        });

        return <tbody>{orders}</tbody>
    }
    else {
        return(null);
    }
}; 

export default OrderTable;