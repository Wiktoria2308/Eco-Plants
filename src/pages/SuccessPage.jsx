import {BsCheck2Circle} from 'react-icons/bs'
import { Link } from 'react-router-dom';
const SuccessPage = () => {
  return (
    
    <div className="success-page-container">
      <BsCheck2Circle className='success-icon'/>
      <h1>Thanks for your order!</h1>
      <p>
        We appreciate your business! If you have any questions, please email: ecoplants@example.com
      </p>
      <Link className="continue-shop" to='/'>Return to home page</Link>
      </div>

  );
};
export default SuccessPage;
