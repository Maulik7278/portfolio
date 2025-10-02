import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Send,
  Code,
  Award,
  User,
  Download,
  Calendar,
  MapPin,
  Phone,
  MessageSquare,
} from "lucide-react";
import { Card,CardContent,CardDescription,CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import profileImage from "@/assets/IMG-20250331-WA0058.jpg";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  topics: string[];
  language: string;
  updated_at: string;
}

interface GitHubUser {
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
}

const categorizedSkills = {
  Frontend: ["React", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Redux"],
  Backend: [
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "Prisma",
    "Firebase",
    "REST APIs",
    "GraphQL",
  ],
  "Programming Languages": ["JavaScript", "TypeScript", "Python"],
  "Tools & Technologies": ["Git", "Docker", "AWS"],
};


const certificatesPreview = [
  {
    id: 1,
    title: "Back-end Developer Certification",
    issuer: "Rjoice talent academy",
    date: "2024-05",
    skills: ["Node", "JavaScript", "Express", "MongoDB"],
    description:
      "Comprehensive Back-end development course covering modern Node patterns, express, mongodb, and best practices for building scalable applications.",
    credentialUrl: "#",
  },

  {
    id: 2,
    title: "Basic Networking",
    issuer: "Cisco",
    date: "2025-08",
    description:
      "Fundamental networking concepts including TCP/IP, routing, switching, and network protocols.",
    skills: ["Networking", "TCP/IP", "Routing", "Switching"],
    credentialUrl:
      "https://drive.google.com/file/d/1S89xGwpUbvlv_HpDbnxMYYpxBR8CjIwJ/view?usp=drive_link",
  },
];



const Home = () => {
    
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [userInfo, setUserInfo] = useState<GitHubUser | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(formData.subject || 'Contact from Portfolio');
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const mailtoLink = `mailto:bhadanidharm9968@gmail.com?subject=${subject}&body=${body}`;

      // Open default email client
      window.location.href = mailtoLink;

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      toast({
        title: "Email client opened!",
        description: "Your default email client should open with the message pre-filled.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
    
  };




  useEffect(() => {
    // Fetch GitHub repositories
    const fetchData = async () => {
      try {
        const [reposResponse, userResponse] = await Promise.all([
          fetch(
            "https://api.github.com/users/Maulik7278/repos?sort=updated&per_page=6"
          ),
          fetch("https://api.github.com/users/Maulik7278"),
        ]);

        if (reposResponse.ok) {
          const repos = await reposResponse.json();
          setRepositories(repos.slice(0, 2));
        }

        if (userResponse.ok) {
          const user = await userResponse.json();
          setUserInfo(user);
        }
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    };

    fetchData();
  }, []);

 
  const handleResumeDownload = () => {
    const driveUrl =
      "https://docs.google.com/document/d/1tM5LRCCW2eYUhB-3HXIwxi9Kmnlhtyva/edit?usp=sharing&ouid=108913065731991156964&rtpof=true&sd=true";
    const fileId = driveUrl.match(/\/d\/(.*?)\//)?.[1];
    if (fileId) {
      const downloadUrl = `https://docs.google.com/document/d/${fileId}/export?format=pdf`;
      window.open(downloadUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 min-h-screen flex items-center py-20 ">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left order-2 md:order-1">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Hi, I'm <span className="text-gradient">Maulik</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Full Stack Developer passionate about creating beautiful,
              functional web applications that make a difference.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                onClick={handleResumeDownload}
                size="lg"
                className="bg-gradient-hero shadow-elegant"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Resume
              </Button>
              <Button variant="outline" size="lg" asChild>
                <button
                  onClick={() => {
                    const element = document.getElementById("contact");
                    if (element) {
                      const offsetTop = element.offsetTop - 80;
                      window.scrollTo({ top: offsetTop, behavior: "smooth" });
                    }
                  }}
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Get In Touch
                </button>
              </Button>
            </div>

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

      {/* About Section */}
      <section className="bg-muted/50 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto rounded-2xl shadow-card bg-card">
            {/* Left side: Stats */}
            <div className="flex flex-col items-center justify-center py-10 px-6">
              <h3 className="text-3xl font-extrabold tracking-tight mb-8 text-primary">
                Maulik Ghasadiya
              </h3>
              <div className="flex flex-col gap-4 w-full">
                <div className="rounded-xl bg-background p-6 flex flex-col items-center shadow">
                  <span className="text-4xl font-bold text-primary">
                    {userInfo?.public_repos ?? "--"}
                  </span>
                  <span className="text-xs text-muted-foreground tracking-wider mt-2">
                    Public Repos
                  </span>
                </div>
                <div className="rounded-xl bg-background p-6 flex flex-col items-center shadow">
                  <span className="text-4xl font-bold text-primary">
                    {userInfo?.followers ?? "--"}
                  </span>
                  <span className="text-xs text-muted-foreground tracking-wider mt-2">
                    GitHub Followers
                  </span>
                </div>
                <div className="rounded-xl bg-background p-6 flex flex-col items-center shadow">
                  <span className="text-4xl font-bold text-primary">1+</span>
                  <span className="text-xs text-muted-foreground tracking-wider mt-2">
                    Years Experience
                  </span>
                </div>
              </div>
            </div>

            {/* Right side: Bio & Highlights */}
            <div className="py-10 px-6 flex flex-col justify-between h-full">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
                About Me
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                Passionate about building innovative web solutions, I create
                modern full stack applications with clean code and elegant UX.
                My expertise includes React, Node, and scalable backend systems.
                I excel at solving complex problems and enjoy sharing with
                open-source communities.
              </p>
              <div className="flex flex-row items-center gap-8 mt-auto pt-8 border-t border-muted/30">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-primary">India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-primary">
                    maulikghasadiya2712@gmail.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="min-h-screen flex items-center py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground">
              Some of my recent work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 h-60 ">
            {repositories.map((repo) => (
              <Card
                key={repo.id}
                className="bg-card border-card-border shadow-card hover:shadow-elegant transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <span className="text-xl font-semibold">{repo.name}</span>
                    {repo.language && (
                      <Badge variant="secondary">{repo.language}</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    {repo.description || "No description available"}
                  </p>

                  {repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {repo.topics.slice(0, 4).map((topic) => (
                        <Badge
                          key={topic}
                          variant="outline"
                          className="text-xs"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    {repo.homepage && (
                      <Button size="sm" asChild>
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="bg-muted/50 min-h-screen flex flex-col justify-center py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-2 text-primary tracking-wide">
              Skills & Technologies
            </h2>
            <div className="w-24 h-1 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full mb-6" />
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed font-medium">
              Technologies I work with
            </p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {Object.entries(categorizedSkills).map(([category, skills]) => (
              <div
                key={category}
                className="bg-card shadow-md rounded-2xl p-6 border border-border"
              >
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="px-5 py-2 rounded-full text-sm font-medium cursor-default transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Preview */}
      <section className="min-h-screen flex items-center py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Recent Certificates
            </h2>
            <p className="text-lg text-muted-foreground">
              My latest achievements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {certificatesPreview.map((cert) => (
              <Card
                key={cert.id}
                className="bg-card border-card-border shadow-card hover:shadow-elegant transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Award className="h-6 w-6 text-primary flex-shrink-0" />
                    <Badge variant="outline">{cert.issuer}</Badge>
                  </div>

                  <CardTitle className="text-lg font-semibold">
                    {cert.title}
                  </CardTitle>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(cert.date + "-01").toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Description */}
                  <p className="text-sm text-muted-foreground">
                    {cert.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Certificate Button */}
                  {cert.credentialUrl && cert.credentialUrl !== "#" && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full mt-4"
                    >
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Certificate
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/certificates">View All Certificates</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Get In Touch
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-8" />
              <p className="text-secondary-text text-lg max-w-2xl mx-auto">
                Have a project in mind or want to collaborate? I'd love to hear
                from you. Let's create something amazing together!
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Form */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                    Send me a message
                  </CardTitle>
                  <CardDescription className="text-secondary-text">
                    Fill out the form below and I'll get back to you as soon as
                    possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your name"
                          required
                          className="border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                          className="border-border"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What's this about?"
                        className="border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about your project or just say hi!"
                        rows={5}
                        required
                        className="border-border"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Opening email client..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8">
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Mail className="w-6 h-6 text-primary mr-3" />
                      <h3 className="text-lg font-semibold text-card-foreground">
                        Email
                      </h3>
                    </div>
                    <p className="text-secondary-text mb-4">
                      Prefer to email directly? No problem!
                    </p>
                    <Button
                      variant="outline"
                      asChild
                      className="border-border hover:bg-muted"
                    >
                      <a href="mailto:bhadanidharm9968@gmail.com">
                        bhadanidharm9968@gmail.com
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <User className="w-6 h-6 text-primary mr-3" />
                      <h3 className="text-lg font-semibold text-card-foreground">
                        Response Time
                      </h3>
                    </div>
                    <p className="text-secondary-text">
                      I typically respond within 24 hours. For urgent matters,
                      please mention it in your subject line.
                    </p>
                  </CardContent>
                </Card>

                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Let's build something great together!
                  </h3>
                  <p className="text-secondary-text">
                    Whether you have a project in mind, need help with
                    development, or just want to connect, I'm always excited to
                    meet new people and explore opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
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
                modern technologies. Passionate about solving problems with
                code.
              </p>
            </div>

            {/* Horizontal Navigation */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                Navigation
              </h3>
              <ul className="flex flex-wrap gap-6 text-sm">
                <li>
                  <Link to=" " className="hover:text-primary transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-primary transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/projects"
                    className="hover:text-primary transition"
                  >
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
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-card shadow hover:bg-primary hover:text-primary-foreground transition"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-card shadow hover:bg-primary hover:text-primary-foreground transition"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:your@email.com"
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
              © {new Date().getFullYear()} Maulik Patel · All Rights Reserved
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
