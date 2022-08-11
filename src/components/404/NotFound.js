import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound({ title }) {
  document.title = title;
  return (
    <div className="not-found-page">
      <h1>Whoops!</h1>
      <h2>Error 404:</h2>
      <h5>This page might be broken but our products are just right</h5>

      <Link className="btn border border-dark" to={'/'}>
        Return Home
      </Link>
    </div>
  );
}

export default NotFound;
