import { Link } from "react-router-dom";

export default function NavBar({ user, setUser}) {

const handleLogout= ()=>{
  setUser(null)
}

  return (
    <nav>
      {user ? (
        <>
          <Link to="/orders">Order History</Link>
          &nbsp; | &nbsp;
          <Link to="/orders/new">New Order</Link>
          &nbsp; | &nbsp;
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/users/login">Login</Link>
          &nbsp; | &nbsp;
          <Link to="/users/signup">Sign Up</Link>
          
        </>
      )}
    </nav>
  );
}
