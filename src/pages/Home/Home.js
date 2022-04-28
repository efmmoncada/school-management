import { Link } from "react-router-dom";

import "./Home.css";

const Home = () => {
  return (
    <div className='home'>
      <h1>Home</h1>

      <p className='description'>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur
        dolorem excepturi sunt voluptate esse, ullam nihil, expedita laborum
        ipsum praesentium quae quis reprehenderit enim autem facilis similique
        numquam. Assumenda, excepturi.
      </p>
      <Link to='/students'>Students</Link>
      <Link to='/classes'>Classes</Link>
      <Link to='/staff'>Staff</Link>
      <Link to='/locations'>Locations</Link>

      <iframe src="https://giphy.com/embed/3ov9jZ0V6gOO0oa98Y" width="480" height="450" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/capoo-cat-3ov9jZ0V6gOO0oa98Y">via GIPHY</a></p>
    </div>

    
  );
};

export default Home;
