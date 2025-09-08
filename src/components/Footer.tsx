import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary/10 via-background to-secondary/10 border-t border-border mt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 text-center md:text-left">
          {/* Brand / About */}
          <div>
            <h2 className="text-2xl font-extrabold text-primary mb-4">
              Maulik Patel
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Full Stack Developer crafting scalable apps & elegant UIs with
              modern technologies. Passionate about solving problems with code.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Navigation
            </h3>
            <ul className="flex flex-wrap gap-6 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-primary transition">
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/certificates"
                  className="hover:text-primary transition"
                >
                  Certificates
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Connect
            </h3>
            <div className="flex justify-center md:justify-start gap-5">
              <a
                href="https://github.com/Maulik7278"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-card shadow hover:bg-primary hover:text-primary-foreground transition"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/maulik-ghasadiya-5253252a3"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-card shadow hover:bg-primary hover:text-primary-foreground transition"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:maulikghasadiya2712@gmail.com"
                className="p-2 rounded-full bg-card shadow hover:bg-primary hover:text-primary-foreground transition"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider + Bottom */}
        <div className="border-t border-border pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Maulik Ghasadiya · All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
