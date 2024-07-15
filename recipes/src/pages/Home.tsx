import RecipeList from "../components/RecipeList";
import Layout from "./Layout";
import Footer from "../components/Footer";

function Home(children: any) {
  return (
    <Layout>
      <RecipeList />
      <Footer />
    </Layout>
  );
}

export default Home;
