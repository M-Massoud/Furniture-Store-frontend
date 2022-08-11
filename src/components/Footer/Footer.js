import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import jwt from 'jwt-decode';
import { FaGithub } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {

  let token = localStorage.getItem('token') ? jwt(localStorage.getItem('token')) : null;

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.isLoggedIn);
  const { role } = useSelector(state => state.isLoggedIn);

  return (
    <footer className='shadow col-12'>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <h5>Pages</h5>
            <h6>
              <Link to={'/'} className='text-hover'>Home</Link>
            </h6>
            <h6>
              <Link to={'/products'} className='text-hover'>Products</Link>
            </h6>
          </div>
          <div className="col">
            <h5>Know US</h5>
            <h6>
              <Link to={'/'} className='text-hover'>Return Policy</Link>
            </h6>
            <h6>
              <Link to={'/products'} className='text-hover'>Our Gurantee</Link>
            </h6>
            <h6>
              <Link to={'/faq'} className='text-hover'>FAQ</Link>
            </h6>
          </div>
          {
            isLoggedIn ?
              < div className="col">
                <h5>Personal Profile</h5>
                {
                  role === "admin" ?
                    <Link to={'/profile/admin'} className="text-hover">My Profile</Link> :
                    role === 'user' ? <Link to={`/profile/${token.id}`} className="text-hover">My Profile</Link> : ''
                }
              </div>
              : ''
          }
          <div className="col">
            <h5>follow us</h5>
            <a
              className="icon"
              href="https://github.com/M-Massoud/Furniture-Store"
              target="_blank" rel="noreferrer"
            >
              <FaGithub className='text-hover' />
            </a>
          </div>
        </div>
        <hr />
        <p className="text-center">
          Copyright © 2022 ITI TEAM 4, Inc. All rights reserved.{' '}
        </p>
      </div>
    </footer >
  );
};
export default Footer;
// personal pages