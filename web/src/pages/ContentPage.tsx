import React from "react";
import Footer from "../components/Footer";
import ReactMarkdown from "react-markdown";

const ContentPage = (props: { source: string }) => {
  return (
    <div>
      <div className="markdown container max-w-3xl mx-auto md:pt-10 px-8">
        <ReactMarkdown source={props.source} />
      </div>
      <Footer />
    </div>
  );
};

export default ContentPage;
