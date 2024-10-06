import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  Form,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from "../slices/ordersApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const loadPayPalScript = async () => {
      paypalDispatch({
        type: "resetOptions",
        value: {
          "client-id": paypal.clientId,
          currency: "USD",
        },
      });
      paypalDispatch({
        type: "setLoadingStatus",
        value: "pending", // Or true, depending on your reducer logic
      });
    };
  
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      loadPayPalScript();
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  async function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment successful");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }
  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("Payment successful");
  }
  function onError(err) {
    toast.error(err.message);
  }
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">Error fetching order</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <Link to="">{order.user.email}</Link>
              </p>
              <p>
                <strong>Address: </strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                , {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}></Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} x ${item.price} = $
                      {(item.qty * item.price).toFixed(2)}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>

                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>

                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <hr />
                <Row>
                  <Col>Total:</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* PAY ORDER PLACEHOLDER */}

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <Button
                        variant="primary"
                        onClick={onApproveTest}
                        style={{ marginBottom: "10px" }}
                      >
                        Test Pay Order
                      </Button>
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}

              {/* MARK AS DELIVERED PLACEHOLDER */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
