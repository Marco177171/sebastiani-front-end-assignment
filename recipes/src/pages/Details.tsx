import RecipeDetail from "../components/RecipeDetail";
import Layout from "./Layout";
import Footer from "../components/Footer";

function Details(children: any) {
  return (
    <Layout>
      <RecipeDetail />
      <Footer />
    </Layout>
  );
}

export default Details;
