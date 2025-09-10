import React, { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Project from "@/components/Projects";
import Skills from "@/components/Skills";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Home = () => {
  const [userInfo, setUserInfo] = useState<{
    public_repos: number;
    followers: number;
  } | null>(null);

  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const res = await fetch("https://api.github.com/users/Maulik7278");
        if (res.ok) {
          const data = await res.json();
          setUserInfo({
            public_repos: data.public_repos,
            followers: data.followers,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchGitHub();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <About />
      <Skills />
      <Project />
      <Certificates />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
