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
        <Background className="xl:-mt-64" />
      </div>
      <div className="relative container mx-auto">
        <header className="flex flex-col md:flex-row md:h-screen md:pb-32 items-center justify-center">
          <div className="flex flex-col items-center mt-20 md:mt-0 md:items-start max-w-md md:ml-10">
            <h1 className="text-5xl font-black md:text-6xl xl:text-7xl">
              Booster
            </h1>
            <p className="mt-2 text-sm px-12 text-center font-medium md:text-left md:pl-0 md:text-lg">
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
            className="mt-12 object-contain md:mt-0 screenshot"
          />
        </header>
        <section className="mt-16 md:-mt-32">
          <h2 className="font-bold text-3xl px-16 text-center">
            Your Digital Vault for Logins and More...
          </h2>
          <ul className="mt-12 px-8 flex justify-around max-w-3xl mx-auto">
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
      </div>
      <footer className="relative mt-20 pb-8 bg-gray-900 text-green-200">
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
  );
};

export default App;
