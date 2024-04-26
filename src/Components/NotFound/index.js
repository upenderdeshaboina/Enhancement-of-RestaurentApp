import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWIQLwA5DP4hA0J7I2jS6oPEEk_ThTWW0-sQ&s"
      className="img"
      alt="not-found-img"
    />
    <div className="text-container">
      <h1>404:- Not Found</h1>
      <Link to="/">
        <button type="button">Home</button>
      </Link>
    </div>
  </div>
)
export default NotFound
