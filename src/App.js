import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import Home from './Components/Home'
import Login from './Components/Login'
import Cart from './Components/Cart'
import NotFound from './Components/NotFound'
import ProtectedRoute from './Components/ProtectedRoute'
import CartContext from './Context/CartContext'
import './App.css'

class App extends Component {
  state = {
    cartList: [],
    nameOfRestaurent: '',
  }

  addCartItem = dish => {
    const {cartList} = this.state
    const isExist = cartList.find(item => item.dishId === dish.dishId)
    if (!isExist) {
      this.setState(prev => ({
        cartList: [...prev.cartList, dish],
      }))
    } else {
      this.setState(prev => ({
        cartList: prev.cartList.map(e =>
          e.dishId === dish.dishId
            ? {...e, quantity: e.quantity + dish.quantity}
            : e,
        ),
      }))
    }
  }

  removeCartItem = dishId => {
    this.setState(prev => ({
      cartList: prev.cartList.filter(e => e.dishId !== dishId),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = dishId => {
    this.setState(prev => ({
      cartList: prev.cartList.map(e =>
        e.dishId === dishId ? {...e, quantity: e.quantity + 1} : e,
      ),
    }))
  }

  decrementCartItemQuantity = dishId => {
    this.setState(prev => ({
      cartList: prev.cartList
        .map(e => (e.dishId === dishId ? {...e, quantity: e.quantity - 1} : e))
        .filter(e => e.quantity > 0),
    }))
  }

  setRestaurentName = name => {
    this.setState({nameOfRestaurent: name})
  }

  render() {
    const {cartList, nameOfRestaurent} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
          nameOfRestaurent,
          setRestaurentName: this.setRestaurentName,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}
export default App
