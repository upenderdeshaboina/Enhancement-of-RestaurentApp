import {useContext} from 'react'
import Header from '../Header'
import CartItem from '../CartItem'
import CartContext from '../../Context/CartContext'

import './index.css'

const Cart = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)

  const renderingNoCartItemsView = () => (
    <div className="no-cart-items-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        className="img"
        alt="no-cart-items"
      />
      <p className="empty-msg">Your cart is Empty.</p>
    </div>
  )

  const renderingCartItems = () => (
    <>
      <div className="cart-container">
        <h1>Cart Items</h1>
        <button
          className="remove-all-btn"
          type="button"
          onClick={removeAllCartItems}
        >
          Remove All
        </button>
      </div>
      <ul className="cart-list-container">
        {cartList.map(e => (
          <CartItem key={e.dishId} details={e} />
        ))}
      </ul>
    </>
  )

  return (
    <>
      <Header />
      <div className="main-container">
        {cartList.length !== 0
          ? renderingCartItems()
          : renderingNoCartItemsView()}
      </div>
    </>
  )
}
export default Cart
