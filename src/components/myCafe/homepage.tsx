import { Link, useNavigate } from "react-router-dom";

interface HomePageProps {
    
}
 
const HomePage: React.FunctionComponent<HomePageProps> = () => {
    const navigate = useNavigate()
    return ( 
        <div>
            <Link to='homepage/all-products'>
                <button>Order now</button>
            </Link>
            <button onClick={() => navigate('/authentication')}>Log In / Sign Up</button>
        </div>
     );
}
 
export default HomePage;