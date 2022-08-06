import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='shadow col-12'>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <h5>Pages</h5>
            <h6>
              <Link to={'/'}>Home</Link>
            </h6>
            <h6>
              <Link to={'/products'}>Products</Link>
            </h6>
          </div>
          <div className="col">
            <h5>Know US</h5>
            <h6>
              <Link to={'/'}>Return Policy</Link>
            </h6>
            <h6>
              <Link to={'/products'}>Our Gurantee</Link>
            </h6>
            <h6>
              <Link to={'/faq'}>FAQ</Link>
            </h6>
          </div>
          <div className="col">
            <h5>follow us</h5>
            <a
              className="icon"
              href="https://github.com/M-Massoud/Furniture-Store"
              target="_blank" rel="noreferrer"
            >
              <FaGithub />
            </a>
          </div>
        </div>
        <hr />
        <p className="text-center">
          Copyright © 2022 ITI TEAM 4, Inc. All rights reserved.{' '}
        </p>
      </div>
    </footer>
  );
};
export default Footer;
