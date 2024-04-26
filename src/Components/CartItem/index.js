import {useContext} from 'react'

import {FaRegTrashAlt} from 'react-icons/fa'
import CartContext from '../../Context/CartContext'

import './index.css'

const CartItem = props => {
  const {details} = props
  const {dishId, dishName, dishImg, quantity, dishCurrency, dishPrice} = details
  const {incrementCartItemQuantity, decrementCartItemQuantity, removeCartItem} =
    useContext(CartContext)

  const onIncreasingQuantity = () => incrementCartItemQuantity(dishId)
  const onDecreasingQuantity = () => decrementCartItemQuantity(dishId)
  const onRemoveCartItem = () => removeCartItem(dishId)

  return (
    <li className="cart-item-card">
      <img src={dishImg} alt={dishName} className="dish-img" />
      <div className="cart-item-details">
        <p className="dish-name">{dishName}</p>
        <p className="currency-price">
          {dishCurrency} {(quantity * dishPrice).toFixed(2)}
        </p>
        <div className="btns-container">
          <button className="btn" type="button" onClick={onDecreasingQuantity}>
            -
          </button>
          <p className="quantity">{quantity}</p>
          <button className="btn" type="button" onClick={onIncreasingQuantity}>
            +
          </button>
        </div>
      </div>
      <button className="remove-item" onClick={onRemoveCartItem} type="button">
        <FaRegTrashAlt />
      </button>
    </li>
  )
}
export default CartItem
