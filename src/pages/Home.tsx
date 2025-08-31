import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Phone
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import profileImage from '@/assets/profile-image.jpg';

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

const skills = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'HTML5', 'CSS3',
  'Tailwind CSS', 'Next.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Git',
  'AWS', 'Docker', 'REST APIs', 'GraphQL', 'Firebase', 'Prisma', 'Redux'
];

const certificatesPreview = [
  {
    id: 1,
    title: "React Developer Certification",
    issuer: "Meta",
    date: "2024-01",
    skills: ["React", "JavaScript", "JSX", "Hooks"]
  },
  {
    id: 2,
    title: "Full Stack Web Development",
    issuer: "FreeCodeCamp", 
    date: "2023-12",
    skills: ["HTML5", "CSS3", "JavaScript", "Node.js"]
  }
];

const Home = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [userInfo, setUserInfo] = useState<GitHubUser | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    // Fetch GitHub repositories
    const fetchData = async () => {
      try {
        const [reposResponse, userResponse] = await Promise.all([
          fetch('https://api.github.com/users/Maulik7278/repos?sort=updated&per_page=6'),
          fetch('https://api.github.com/users/Maulik7278')
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
        console.error('Error fetching GitHub data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link
    const subject = encodeURIComponent(formData.subject || 'Contact from Portfolio');
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
    `);
    
    window.location.href = `mailto:maulikghasadiya2712@gmail.com?subject=${subject}&body=${body}`;
    
    toast({
      title: "Email client opened!",
      description: "Your default email client should open with the message.",
    });

    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleResumeDownload = () => {
    const driveUrl = "https://docs.google.com/document/d/1tM5LRCCW2eYUhB-3HXIwxi9Kmnlhtyva/edit?usp=sharing&ouid=108913065731991156964&rtpof=true&sd=true";
    const fileId = driveUrl.match(/\/d\/(.*?)\//)?.[1];
    if (fileId) {
      const downloadUrl = `https://docs.google.com/document/d/${fileId}/export?format=pdf`;
      window.open(downloadUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left order-2 md:order-1">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Hi, I'm <span className="text-gradient">Maulik</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Full Stack Developer passionate about creating beautiful, functional web applications
              that make a difference.
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
                    const element = document.getElementById('contact');
                    if (element) {
                      const offsetTop = element.offsetTop - 80;
                      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
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
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gradient">
              About Me
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              I'm a passionate Full Stack Developer with a love for creating innovative web solutions.
              With expertise in modern JavaScript frameworks and backend technologies, I enjoy turning 
              complex problems into simple, beautiful designs. I'm always eager to learn new technologies 
              and contribute to meaningful projects that make a positive impact.
            </p>
            
            {userInfo && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{userInfo.public_repos}</div>
                  <div className="text-muted-foreground">Public Repositories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{userInfo.followers}</div>
                  <div className="text-muted-foreground">GitHub Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2+</div>
                  <div className="text-muted-foreground">Years Experience</div>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-center space-x-6 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>maulikghasadiya2712@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground">
              Some of my recent work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {repositories.map((repo) => (
              <Card key={repo.id} className="bg-card border-card-border shadow-card hover:shadow-elegant transition-all duration-300">
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
                    {repo.description || 'No description available'}
                  </p>
                  
                  {repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {repo.topics.slice(0, 4).map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    {repo.homepage && (
                      <Button size="sm" asChild>
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
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
              <Link to="/projects">
                View All Projects
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Skills & Technologies
            </h2>
            <p className="text-lg text-muted-foreground">
              Technologies I work with
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {skills.map((skill) => (
              <Badge 
                key={skill} 
                variant="secondary" 
                className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Preview */}
      <section className="py-20">
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
              <Card key={cert.id} className="bg-card border-card-border shadow-card hover:shadow-elegant transition-all duration-300">
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
                    {new Date(cert.date + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/certificates">
                View All Certificates
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Get In Touch
            </h2>
            <p className="text-lg text-muted-foreground">
              Let's discuss your next project or just say hello!
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <Card className="bg-card border-card-border shadow-card">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-hero shadow-elegant">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;