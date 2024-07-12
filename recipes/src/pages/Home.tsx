import RecipeList from "../components/RecipeList";
import Layout from "./Layout";

function Home(children: any) {
  return (
    <Layout>
      <RecipeList />
    </Layout>
  );
}

export default Home;
