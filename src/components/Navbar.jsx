import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import { useCart } from './ContextReducer';
import Cart from '../screens/Cart';
import Modal from '../Modal';
import MyOrder from '../screens/MyOrder';
export default function Navbar() {
  let navigate = useNavigate();
  const [cartView, setCartView] = useState(false)
    const handleLogout = () => {
        localStorage.removeItem('authToken')

        navigate("/login")
    }
    const items = useCart();
    const loadCart = () => {
      setCartView(true)
  }
  return (
    <div>
        
<nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className='container-fluid'>
  <Link className="navbar-brand fs-1 fst-italic" to='/'>FoodReady</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse d-flex" id="navbarNav">
    <ul className="navbar-nav me-auto mb-2">
      <li className="nav-item active">
        <Link className="nav-link active fs-5" to='/'>Home </Link>
      </li>
      {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myOrders" >My Orders</Link>  {/* index.css - nav-link color white */}
                                </li> : ""}
      
    </ul>
    {
      (!localStorage.getItem("authToken"))?
      <div className='d-flex'>
    
      <Link className="btn bg-white text-success mx-1" to='/login'>Login</Link>
    
    
      <Link className="btn bg-white text-success mx-1" to='/signup'>SignUp</Link>
      
   
      </div>:
      <div>
      <div  className="btn bg-white text-success mx-2" onClick={loadCart}>My Cart{" "}
      <Badge color="secondary" >
      {items.length}
      </Badge>
      </div>
      {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
      <div  className="btn bg-white text-danger mx-2" onClick={handleLogout}>Logout</div></div>
    }
  </div>
  </div>
</nav>
    </div>
  )
}
