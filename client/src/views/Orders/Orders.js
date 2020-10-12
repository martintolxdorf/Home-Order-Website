import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import Table from "react-bootstrap/Table"
import OrderTable from './OrderTable'
import SelectedOrder from './SelectedOrder'
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Jumbotron from 'react-bootstrap/esm/Jumbotron'

const Orders = (props) => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const setOrder = (id) => {
        setSelectedOrder(orders.filter(order => id === order._id));
    }

    useEffect(() => {
        async function fetchOrders() {
            const result = await Axios.get('/orders/');
            setOrders(result.data);
        }
        fetchOrders();
    }, []);

    const acceptOrder = (id) => {
        Axios.post('/orders/update/' + id, {status: "Accepted by: " + props.user.name}); // add phone number here?
        console.log(document.getElementById("_" + id));
        if(document.getElementById("_" + id)) document.getElementById('_' + id).remove();
        setOrders(orders.filter(order => order._id !== id));
        setSelectedOrder(null);
    }

    // const log = () => {  // testing
    //     console.log(orders);
    //     console.log(document.getElementsByTagName('ul'));
    //     Array.prototype.slice.call(document.getElementsByTagName('ul')).forEach(item => console.log(item));  // .slice since length property present
    // }


    return (
        <div className="col text-center">
        <Row>
        <Col xs={12} md={1} /> {/* easier than making margins */}
        <Col xs={12} md={7}>
        <Table striped bordered hover variant="dark" id="cart">
            <thead>
                <tr key="header">
                    <td><u>User</u></td>
                    <td><u>Store Name</u></td>
                    <td><u>Store Address</u></td>
                    <td><u>Price</u></td>
                    <td><u>View Products</u></td>
                    <td><u>Accept Order</u></td>
                </tr>
            </thead>
            <OrderTable orders={orders} setOrder={setOrder} acceptOrder={acceptOrder}/>
        </Table>
        </Col>
        <Col xs={12} md={3}>
        <Jumbotron>
            <SelectedOrder order={selectedOrder}></SelectedOrder>
        </Jumbotron>
        </Col>
        </Row>
	</div>
    )
};

export default Orders;