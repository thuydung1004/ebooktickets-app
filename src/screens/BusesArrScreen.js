import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Row, Spinner, ListGroup, Button, Card, Form, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import APIs, { endpoints } from '../configs/APIs'
import { createOrder, payOrder } from '../actions/OrderActions'
import Loader from '../components/Loader'
import { PayPalButton } from 'react-paypal-button-v2'


export default function BusesArrScreen() {

    const [lines, setLines] = useState(null)
    const { id} = useParams()
    const dispatch = useDispatch()

    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [sdkReady, setSdkReady] = useState(false)
    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    useEffect(() => {
        let loadLine = async () =>{
            try {
                let res = await APIs.get(endpoints["detail-bus"](id))
                setLines(res.data)
            } catch (error) {
                console.error(error)
            }
        }
        loadLine()

        if (!window.paypal) {
            addPayPalScript()
        } else {
            setSdkReady(true)
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React Hooks POST Request Example' })
        };
        fetch('/ticket/', requestOptions)
            .then(response => response.json())
            .then(data => setLines(data.id));

    },[])

    const placeOrder = () => {
        dispatch(createOrder({
            ticket_price: lines.ticket_price,
            content: "BUS",
            name, phone,
            ticket_quantity: 1,
            paymentMethod: "PayPal",
        }))
    }

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(id ,paymentResult))
    }

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AZSI0PvFkU4b4zCTGhyghtLUnKRsYvi1qgukf4x8LhVFKSt-PCiM8eTD_JFnkbjnRAdZlmCJMMJ42bHE&disable-funding=credit'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    if(lines === null){
        return <Spinner animation="border" />
    }

    
    return (
        <>
            {/* <!-- banner --> */}
            <section className="inner-page-banner" id="home">
            </section>
            {/* <!-- //banner -->
            <!-- page details --> */}
            <div className="breadcrumb-agile">
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                        <a href="index.html">Trang ch???</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Chi Ti???t Chuy???n Xe</li>
                </ol>
            </div>
            {/* <!-- //page details -->*/}
            <h1 className="text-center text-danger py-5">Chi Ti???t Chuy???n Xe</h1>
            <Row key={lines.id}>
                {/* <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col> */}

                <Col md={8} xs={12}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                        <h5><strong>M?? s??? xe: {lines.User}</strong></h5>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>{lines.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p><strong>??i???m kh???i h??nh: </strong> {lines.departure}</p>
                            <p><strong>??i???m t???i: </strong> {lines.destination}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h5>Gi?? v??: ${lines.ticket_price}</h5>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>M?? t???: {lines.description}</p>
                        </ListGroup.Item>
                    </ListGroup>        
                </Col>
                <Col md={4}>
                    <Card>
                    <ListGroup>
                        <ListGroup.Item><h1>Personal</h1></ListGroup.Item>
                        <ListGroup.Item>
                        <Form>
                            <Form.Group controlId='address'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder='Enter name'
                                    value={name ? name : ''}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='city'>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder='Enter phone'
                                    value={phone ? phone : ''}
                                    onChange={(e) => setPhone(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                        </Form>
                        </ListGroup.Item>
                        
                    </ListGroup>
                        
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>Th??ng tin ?????t v??</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Gi?? Xe: 
                                    </Col>
                                    <Col>
                                        <strong>${lines.ticket_price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Tr???ng th??i: 
                                    </Col>
                                    <Col>
                                        {lines.active === true ? '??ang ho???t ?????ng' : 'Ng???ng ho???t ?????ng'}                               
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            
                            <ListGroup.Item>
                                <h3>Ph????ng th???c thanh to??n</h3>
                                <p>
                                    <strong>Ph????ng th???c: PayPal</strong>
                                </p>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {/* <Button
                                    type='button'
                                    className='btn-block'
                                    onClick={placeOrder}
            
                                >
                                    Place Order
                                </Button> */}
                                {loadingPay && <Loader />}
                                {!sdkReady ? (
                                    <Loader />
                                ) : (
                                        <PayPalButton
                                            type='button'
                                            className='btn-block'
                                            onClick={placeOrder}
                                            amount={lines.ticket_price}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                            </ListGroup.Item>
                                  
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <hr/>
            
        </>
    )
}