import React, { useContext, useEffect, useState } from 'react'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import CartContext from '../../store/cart-context'

export const HeaderCartButton = (props) => {
  const [btnIsHighLighted, setBtnIsHighLighted] = useState(false)
  const cartCtx = useContext(CartContext)
  const {items} = cartCtx
  const numberOfCartItem = cartCtx.item.reduce((curNumber, item) => {
    return curNumber + item.amount
  },0)

  
  const btnClasses = `${classes.button} ${btnIsHighLighted ? classes.bump : ''}`

  useEffect(() => {
    if (cartCtx.item.length===0) {
      return
    }
    setBtnIsHighLighted(true)
  }, [items])
  return (
    <button className={btnClasses} onClick = {props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>
            Your Cart
            </span>
        <span className={classes.badge}>
            {numberOfCartItem}
        </span>
    </button>
  )
}
