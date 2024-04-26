import {useState, useContext} from 'react'
import CartContext from '../../Context/CartContext'
import './index.css'

const DishItem = props => {
  const {details} = props
  const {
    dishId,
    dishName,
    dishType,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishImg,
    dishCalories,
    addonCat,
    dishAvailability,
  } = details

  const [quantity, setQuantity] = useState(0)
  const {addCartItem} = useContext(CartContext)

  const onIncreaseQuanitity = () => setQuantity(prevState => prevState + 1)
  const onDecreaseQuantity = () => setQuantity(prevState => prevState + 1)

  const onAddItemToCart = () => addCartItem({...details, quantity})

  const renderingBtns = () => (
    <div className="btn-container">
      <button
        className="btn"
        type="button"
        onClick={onDecreaseQuantity}
        data-testid="decrement"
      >
        -
      </button>
      <p className="quantity">{quantity}</p>
      <button
        className="btn"
        type="button"
        onClick={onIncreaseQuanitity}
        data-testid="increment"
      >
        +
      </button>
    </div>
  )

  return (
    <li className="card-container">
      <div className={`${dishType === 1 ? 'red-border' : 'green-border'}`}>
        <div className={`${dishType === 1 ? 'red-round' : 'green-round'}`} />
      </div>
      <div className="details-container">
        <h1 className="dish-name">{dishName}</h1>
        <p className="currency-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="description">{dishDescription}</p>
        {dishAvailability && renderingBtns()}
        {!dishAvailability && (
          <p className="not-available-para">Not available</p>
        )}
        {addonCat.length !== 0 && (
          <p className="addons-available-para">Customizations available</p>
        )}
        {quantity > 0 && (
          <button
            className="add-cart-btn"
            type="button"
            onClick={onAddItemToCart}
          >
            ADD TO CART
          </button>
        )}
      </div>
      <p className="calories-para">{dishCalories} calories</p>
      <img src={dishImg} alt={dishName} className="dish-img" />
    </li>
  )
}
export default DishItem
