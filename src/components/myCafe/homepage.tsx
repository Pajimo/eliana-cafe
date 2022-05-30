import { Link } from "react-router-dom";

interface HomePageProps {
    
}
 
const HomePage: React.FunctionComponent<HomePageProps> = () => {
    return ( 
        <div>
            <Link to='homepage/all-products'>
                <button>Order now</button>
            </Link>
        </div>
     );
}
 
export default HomePage;