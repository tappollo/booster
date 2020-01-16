import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="relative mt-20 pb-8 bg-gray-900 text-green-200">
    <div className="flex justify-center items-center py-4 bg-gray-800 text-white font-medium">
      <Link to="/terms_of_service" className="px-8 border-r border-white">
        Terms of Service
      </Link>
      <Link to="/privacy_policy" className="px-8">
        Privacy Policy
      </Link>
    </div>
    <p className="mt-8 text-center leading-loose tracking-wide">
      <span className="font-bold text-lg uppercase">Contact US</span>
      <br />
      <a className="font-semibold" href="mailto:general@tappollo.com">
        general@tappollo.com
      </a>
    </p>
    <p className="mt-8 text-center px-2 text-xs text-gray-600 font-thin tracking-wider">
      Copyright © 2020 Tappollo Media. All rights reserved.
    </p>
  </footer>
);

export default Footer;
