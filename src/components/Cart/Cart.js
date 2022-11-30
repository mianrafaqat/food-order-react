import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Chekout from "./Chekout";

const Cart = (props) => {
  const [isCheckOut, SetIsCheckOut] = useState(false)
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.item.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item)
  };
  const orderHandler = () => {
    SetIsCheckOut(true)
  }

  const onSubmitOrderHandler = (userData) => {
    fetch('https://react-app-c161c-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderItem: cartCtx.item
      })
    })
  }

  const cartItems = (
    <ul className={classes["cart-item"]}>
      {cartCtx.item.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  
  const modalAction = (
    <div className={classes.actions}>
    <button className={classes["button--alt"]} onClick={props.onClose}>
      Close
    </button>
    {hasItems && <button className={classes.button} onClick={orderHandler} >Order</button>}
  </div>
  )
  return (
    <Modal  onClose={props.onClose}  >
      {cartItems }
      <div className={classes.total} >
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>

      {isCheckOut && <Chekout onConfirnm={onSubmitOrderHandler} onCancel={props.onClose}/>}
     
     {!isCheckOut && modalAction}
    </Modal>
  );
};

export default Cart;
