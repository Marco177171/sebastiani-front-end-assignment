import React, { ReactNode } from "react";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <header>
        <p>Recipient | Marco Sebastiani for Xtream</p>
      </header>
      <nav>
        <a href="/">all recipes</a>
      </nav>
      <SideBar />
      <main>
        {children}
        <Footer />
      </main>
      <div className="explorer">
        <a href="/recipes/add">add recipe</a>
      </div>
    </>
  );
};

export default Layout;
