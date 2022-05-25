import Header from '../../components/Header/Header';

import './Home.css';

const Home = () => {
    return (
        <div className='home'>
            <Header title='Home' />

            <p className='description'>
                Welcome the database explorer for the school management system.
                <br />
                Use the links above to explore and edit the school's recoreds.
            </p>

            <iframe
                title='Capoo cat'
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

            <div>
                {/* This app was bootstrapped with{' '}
                <a
                    href='https://create-react-app.dev'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Create React App.
                </a> */}
                Check out the source code for this page on{' '}
                <a
                    href='https://github.com/efmmoncada/school-management'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Github
                </a>
            </div>
        </div>
    );
};

export default Home;
