import { Link } from "react-router-dom";

import "./Home.css";

const Home = () => {
  return (
    <div className='home'>
      <h1>Home</h1>

      <p className='description'>
        Welcome the database explorer for the school management system.
        <br />
        Use the links below to explore and edit the school's recoreds.
      </p>
      <div className='nav'>
        <Link to='/students'>Students</Link>
        <Link to='/classes'>Classes</Link>
        <Link to='/staff'>Staff</Link>
        <Link to='/locations'>Locations</Link>
      </div>

      <iframe
        src='https://giphy.com/embed/3ov9jZ0V6gOO0oa98Y'
        width='480'
        height='450'
        frameBorder='0'
        className='giphy-embed'
        allowFullScreen
      ></iframe>
      <p>
        <a href='https://giphy.com/gifs/capoo-cat-3ov9jZ0V6gOO0oa98Y'>
          via GIPHY
        </a>
      </p>
    </div>
  );
};

export default Home;
