import {useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import Cookies from 'js-cookie'
import CartContext from '../../Context/CartContext'
import './index.css'

const Header = props => {
  const {cartList, nameOfRestaurent} = useContext(CartContext)

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="header">
      <Link to="/">
        <h1 className="header-name">{nameOfRestaurent}</h1>
      </Link>
      <div className="my-orders-section">
        <p className="my-orders">My Orders</p>
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
        <div className="cart-icon">
          <Link to="/cart">
            <button className="cart-icon-btn" type="button" data-testid="cart">
              <AiOutlineShoppingCart size={45} className="cart" />
            </button>
          </Link>
        </div>
        <p>{cartList.length}</p>
      </div>
    </nav>
  )
}

export default withRouter(Header)
