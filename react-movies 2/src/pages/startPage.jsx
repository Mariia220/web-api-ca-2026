import { Link } from "react-router";

const StartPage = () => {
  
    return(
        <>
            <p>
               <h1>Welcome to Movie App!</h1> View your <Link to="/profile">Profile</Link>.
            </p>
            <p>
                <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to manage your movie collection!
            </p>
        </>
    );
  };

export default StartPage;
