// Import Modules
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Hero />
      <main>
        <Features />
      </main>
    </div>
  );
}

// Hero Content
const Hero = () => (
  <section className="hero">
    <div className="hero__content">
      <img className="hero__image" src="../img/Logo.png" alt="Logo" height="200" width="200"></img>
      <h1 className="hero__title">Lunar Exchange</h1>
      <p className="hero__subtitle">The All-In-One Stock Exchange Portal</p>
      <p className="hero__paragraph">Start exploring to view all our trading stocks and sort via Industry Sectors</p>
      <br></br>
      <Link to="/Stocks">Stocks</Link>
    </div>
  </section>
);

// features section
function Features() {
  const featuresData = [
    {
      heading: "Our Goal ",
      text:
        "We aim to provide the most efficient and accurate stock market information to make your life easier",
      img: { src: "img/icon1.png", alt: "Planet Icon" }
    },
    {
      heading: "Trading Hours",
      text:
        "We're open every weekday: 9:30am - 4pm and closed for Weekends and Public Holidays",
      img: { src: "img/icon2.png", alt: "Planet Icon" }
    },
    {
      heading: "Contact Us",
      text:
        "Have a question you want to ask? No problem call us at 1800-LUNAR or email help@lunarex.com",
      img: { src: "img/icon3.png", alt: "Planet Icon" }
    }
  ];

  return (
    <article className="features">
      <div className="features__header">
        <h2>About Us</h2>
      </div>

      <div className="features__box-wrapper">
        {// display the information for each of our features in their own Box
        featuresData.map(feature => (
          <FeatureBox feature={feature} />
        ))}
      </div>
    </article>
  );
}

// Display a Feature box when passed in the information for the feature
const FeatureBox = ({ feature }) => (
  <div className="features__box">
    <img src={feature.img.src} alt={feature.img.alt} />
    <h5>{feature.heading}</h5>
    <p>{feature.text}</p>
  </div>
);
