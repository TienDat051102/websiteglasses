import Container from "../components/Home/container";
import About from "../components/Home/about";
import ProductTabs from "../components/Home/product";
import Events from "../components/Home/events";

const Home = () => {
  return (
    <main>
      <Container />
      <About />
      <ProductTabs />
      <Events />
    </main>
  );
};

export default Home;
