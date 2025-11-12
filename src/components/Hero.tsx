import React from "react";
import { Github, Linkedin, Mail, Download, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/one.jpg";
import { Link } from "react-router-dom";


const Hero = () => {
  const handleResumeDownload = () => {
    const driveUrl =
      "https://drive.google.com/file/d/1YggSqMTz0-ERKSohQJ5g_Oy7QnYWrl0l/view?usp=drive_link";
    const fileId = driveUrl.match(/\/d\/(.*?)\//)?.[1];
    if (fileId) {
      // Direct download URL for Drive files
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
      window.open(downloadUrl, "_blank");
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <section className="container mx-auto px-4 min-h-screen flex items-center py-20">
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left order-2 md:order-1">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Hi, I'm <span className="text-gradient">Maulik</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Full Stack Developer passionate about creating beautiful, functional
            web applications that make a difference.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              onClick={handleResumeDownload}
              size="lg"
              className="bg-gradient-hero shadow-elegant"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Resume
            </Button>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                <Mail className="h-5 w-5 mr-2" />
                Get In Touch
              </Button>
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-start space-x-6">
            <a
              href="https://github.com/Maulik7278/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/maulik-ghasadiya-5253252a3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:maulikghasadiya2712@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-shrink-0 order-1 md:order-2">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-elegant bg-gradient-hero p-2">
              <img
                src={profileImage}
                alt="Maulik Ghasadiya"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-card border-card-border rounded-full p-4 shadow-card">
              <Code className="h-8 w-8 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
