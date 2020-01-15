import React from "react";
import { ReactComponent as AppStore } from "./assets/appstore.svg";
import { ReactComponent as PlayStore } from "./assets/playstore.svg";
import { ReactComponent as Background } from "./assets/background.svg";
import { ReactComponent as Intro1 } from "./assets/intro3.svg";
import { ReactComponent as Intro2 } from "./assets/intro3.svg";
import { ReactComponent as Intro3 } from "./assets/intro3.svg";

const App: React.FC = () => {
  return (
    <div>
      <Background className="absolute left-auto" />
      <div className="relative container mx-auto min-h-screen">
        <header>
          <div>
            <h1>Booster</h1>
            <p>
              Intergrated scaffolding codes,UI components, integration and
              delivery pipeline for fast pro-typing{" "}
            </p>
            <div className="flex">
              <AppStore />
              <PlayStore />
            </div>
          </div>
          <img src={require("./assets/screenshot.png")} alt="Screenshot" />
        </header>
        <section>
          <h2>Your Digital Vault for Logins and More...</h2>
          <ul>
            <li>
              <Intro1 />
              <h4>Multi Platform</h4>
            </li>
            <li>
              <Intro2 />
              <h4>Prebuilt Components</h4>
            </li>
            <li>
              <Intro3 />
              <h4>CI / CD Integration</h4>
            </li>
          </ul>
        </section>
        <footer>
          <div>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
          </div>
          <p>
            <span>Contact US</span>
            <br />
            <span>general@tappollo.com</span>
          </p>
          <p>Copyright © 2020 Tappollo Media. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
