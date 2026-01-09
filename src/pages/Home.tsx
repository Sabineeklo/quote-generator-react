import Footer from '../components/Footer';
import QuoteCard from '../components/QuoteCard';
import bg from '../assets/bg.jpg';

const Home = () => {
  return (
    <div
      className='w-full h-screen flex flex-col items-center justify-center bg-cover bg-center'
      style={{ backgroundImage: `url(${bg})` }} >
      <div className='w-full h-full flex flex-col items-center justify-center'>
        <QuoteCard />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
