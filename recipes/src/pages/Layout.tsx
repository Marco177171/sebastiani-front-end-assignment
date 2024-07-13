import React, { ReactNode } from "react";
import SideBar from "../components/SideBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <header>
        <p>RECIPIENT</p>
      </header>
      <nav>
        <a href="/">all recipes</a>
      </nav>
      <SideBar />
      <main>
        {children}
        <footer>
          <div className="row">
            <div className="col4">
              <p>by Pulsar for Xtream</p>
            </div>
            <div className="col4">
              <p>contacts</p>
              <ul>
                <li>
                  <a href="https://www.instagram.com/_studiopulsar_/">
                    instagram
                  </a>
                </li>
                <li>
                  <a href="https://marco177171.github.io/">github pages</a>
                </li>
                <li>
                  <a href="mailto:sebastianimarco@proton.me?subject=hi_there!">
                    email
                  </a>
                </li>
              </ul>
            </div>
            <div className="col4">
              <p>Marco Sebastiani</p>
              <ul>
                <li>
                  <a href="https://github.com/Marco177171">github</a>
                </li>
                <li>
                  <a href="https://www.instagram.com/5ebastiani/">instagram</a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/marco-sebastiani-123520b9/">
                    linkedin
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </main>
      <div className="explorer">
        <a href="/recipes/add">add recipe</a>
      </div>
    </>
  );
};

export default Layout;
