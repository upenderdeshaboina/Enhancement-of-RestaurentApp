import React, {useState, useEffect, useContext} from 'react'
import Loader from 'react-loader-spinner'
import DishItem from '../DishItem'
import Header from '../Header'
import CartContext from '../../Context/CartContext'
import './index.css'

const Home = () => {
  const {cartList, setRestaurentName} = useContext(CartContext)
  const [isLoading, setIsLoading] = useState(true)
  const [dataFromApi, setDataFromApi] = useState([])
  const [activeCateId, setActiveCateId] = useState('')
  const [cartItems, setCartItems] = useState([])

  const addingToCart = dish => {
    const isExists = cartItems.find(e => e.dishId === dish.dishId)
    if (!isExists) {
      const newDish = {...dish, quantity: 1}
      setCartItems(prevCartItems => [...prevCartItems, newDish])
    } else {
      setCartItems(prevCartItems =>
        prevCartItems.map(e =>
          e.dishId === dish.dishId ? {...e, quantity: e.quantity + 1} : e,
        ),
      )
    }
  }

  const removingFromCart = dish => {
    const isExists = cartItems.find(e => e.dishId === dish.dishId)
    if (isExists && isExists.quantity > 1) {
      setCartItems(prevCartItems =>
        prevCartItems.map(e =>
          e.dishId === dish.dishId ? {...e, quantity: e.quantity - 1} : e,
        ),
      )
    } else if (isExists && isExists.quantity === 1) {
      setCartItems(prevCartItems =>
        prevCartItems.filter(e => e.dishId !== dish.dishId),
      )
    }
  }

  useEffect(() => {
    const getData = async () => {
      const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
      try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        const jsonData = data[0].table_menu_list.map(e => ({
          menuCategory: e.menu_category,
          menuCategoryId: e.menu_category_id,
          menuCategoryImg: e.menu_category_image,
          categoryDishes: e.category_dishes.map(eDish => ({
            dishId: eDish.dish_id,
            dishName: eDish.dish_name,
            dishPrice: eDish.dish_price,
            dishImg: eDish.dish_image,
            dishCurrency: eDish.dish_currency,
            dishCalories: eDish.dish_calories,
            dishDescription: eDish.dish_description,
            dishAvailability: eDish.dish_Availability,
            dishType: eDish.dish_Type,
            addonCat: eDish.addonCat.map(f => ({
              addonCategory: f.addon_category,
              addonCategoryId: f.addon_category_id,
              addonSelection: f.addon_selection,
              nxtUrl: f.nexturl,
            })),
          })),
        }))
        setDataFromApi(jsonData)
        setActiveCateId(jsonData[0].menuCategoryId)
        setIsLoading(false)
        setRestaurentName(data[0].restaurant_name)
      } catch (error) {
        console.error('Error:- ', error)
      }
    }

    getData()
  }, [setRestaurentName])

  const updatingActiveCatId = menuCategoryId => {
    setActiveCateId(menuCategoryId)
  }

  const renderTabs = () =>
    dataFromApi.map(e => (
      <li
        key={e.menuCategoryId}
        className={`tab ${
          e.menuCategoryId === activeCateId ? 'active-tab' : ''
        }`}
        onClick={() => updatingActiveCatId(e.menuCategoryId)}
      >
        <button
          type="button"
          className={`tab-btn ${
            e.menuCategoryId === activeCateId ? 'active-tab-btn' : ''
          }`}
        >
          {e.menuCategory}
        </button>
      </li>
    ))

  const renderDishes = () => {
    const {categoryDishes} = dataFromApi.find(
      e => e.menuCategoryId === activeCateId,
    )
    return (
      <ul className="dishes-list-container">
        {categoryDishes.map(e => (
          <DishItem
            key={e.dishId}
            details={e}
            cartItems={cartItems}
            addingToCart={addingToCart}
            removingFromCart={removingFromCart}
          />
        ))}
      </ul>
    )
  }

  const renderLoadingView = () => (
    <div className="loader">
      <Loader />
    </div>
  )

  return (
    <>
      <Header cartItems={cartList} />
      {isLoading ? (
        renderLoadingView()
      ) : (
        <div className="main-container">
          <ul className="tab-list-container">{renderTabs()}</ul>
          {renderDishes()}
        </div>
      )}
    </>
  )
}

export default Home
