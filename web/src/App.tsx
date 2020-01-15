import React from "react";
import { ReactComponent as AppStore } from "./assets/appstore.svg";
import { ReactComponent as PlayStore } from "./assets/playstore.svg";
import { ReactComponent as Background } from "./assets/background.svg";
import { ReactComponent as Intro1 } from "./assets/intro1.svg";
import { ReactComponent as Intro2 } from "./assets/intro2.svg";
import { ReactComponent as Intro3 } from "./assets/intro3.svg";

const App: React.FC = () => {
  return (
    <div className="">
      <div className="absolute w-full h-screen overflow-hidden">
        <Background
          style={{
            width: 800,
            height: 672,
            marginLeft: -400,
            marginTop: -200
          }}
        />
      </div>
      <div className="relative container mx-auto min-h-screen">
        <header className="flex flex-col">
          <div className="flex flex-col items-center mt-20">
            <h1 className="text-5xl font-black">Booster</h1>
            <p className="mt-2 text-sm px-12 text-center font-medium">
              Intergrated scaffolding codes,UI components, integration and
              delivery pipeline for fast pro-typing{" "}
            </p>
            <div className="flex mt-8 justify-center">
              <a href="#">
                <AppStore className="h-12" />
              </a>
              <a href="#" className="ml-4">
                <PlayStore className="h-12" />
              </a>
            </div>
          </div>
          <img
            src={require("./assets/screenshot.png")}
            alt="Screenshot"
            className="mt-12 object-contain"
            style={{ height: 380 }}
          />
        </header>
        <section className="mt-12">
          <h2 className="font-bold text-3xl px-12 text-center">
            Your Digital Vault for Logins and More...
          </h2>
          <ul className="mt-8 flex justify-around">
            <li>
              <Intro1 className="w-20 h-20" />
              <h4 className="mt-3 leading-tight text-sm font-medium text-center w-20">
                Multi Platform
              </h4>
            </li>
            <li>
              <Intro2 className="w-20 h-20" />
              <h4 className="mt-3 leading-tight text-sm font-medium text-center w-20">
                Prebuilt Components
              </h4>
            </li>
            <li>
              <Intro3 className="w-20 h-20" />
              <h4 className="mt-3 leading-tight text-sm font-medium text-center w-20">
                CI / CD Integration
              </h4>
            </li>
          </ul>
        </section>
        <footer className="mt-20 pb-8 bg-gray-900 text-green-200">
          <div className="flex justify-center items-center py-4 bg-gray-800 text-white font-medium">
            <a href="#" className="px-8 border-r border-white">
              Terms of Service
            </a>
            <a href="#" className="px-8">
              Privacy Policy
            </a>
          </div>
          <p className="mt-8 text-center leading-loose tracking-wide">
            <span className="font-bold text-lg uppercase">Contact US</span>
            <br />
            <span className="font-semibold">general@tappollo.com</span>
          </p>
          <p className="mt-8 text-center px-2 text-xs text-gray-600 font-thin tracking-wider">
            Copyright © 2020 Tappollo Media. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
