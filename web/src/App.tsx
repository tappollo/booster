import React from "react";
import { ReactComponent as AppStore } from "./assets/appstore.svg";
import { ReactComponent as PlayStore } from "./assets/playstore.svg";

const App: React.FC = () => {
  return (
    <div className="container mx-auto min-h-screen bg-gray-200">
      <h1>Booster</h1>
      <p>
        Intergrated scaffolding codes,UI components, integration and delivery
        pipeline for fast pro-typing{" "}
      </p>
      <div className="flex">
        <AppStore />
        <PlayStore />
      </div>
    </div>
  );
};

export default App;
