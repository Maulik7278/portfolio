import React from 'react';
import { Award, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
  credentialUrl?: string;
  imageUrl?: string;
}

const certificatesData: Certificate[] = [
  {
    id: 1,
    title: "React Developer Certification",
    issuer: "Meta",
    date: "2024-01",
    description: "Comprehensive React.js development course covering modern React patterns, hooks, state management, and best practices for building scalable applications.",
    skills: ["React", "JavaScript", "JSX", "Hooks", "Redux"],
    credentialUrl: "#",
  },
  {
    id: 2,
    title: "Full Stack Web Development",
    issuer: "FreeCodeCamp",
    date: "2023-12",
    description: "Complete full-stack development certification covering frontend and backend technologies, databases, and deployment strategies.",
    skills: ["HTML5", "CSS3", "JavaScript", "Node.js", "MongoDB"],
    credentialUrl: "#",
  },
  {
    id: 3,
    title: "TypeScript Fundamentals",
    issuer: "Microsoft Learn",
    date: "2023-11",
    description: "Advanced TypeScript certification covering type systems, generics, decorators, and integration with modern frameworks.",
    skills: ["TypeScript", "JavaScript", "Types", "Generics"],
    credentialUrl: "#",
  },
  {
    id: 4,
    title: "Cloud Computing Essentials",
    issuer: "AWS",
    date: "2023-10",
    description: "Foundation course in cloud computing covering AWS services, deployment, scalability, and cloud architecture principles.",
    skills: ["AWS", "Cloud Computing", "EC2", "S3", "Lambda"],
    credentialUrl: "#",
  },
  {
    id: 5,
    title: "Git & Version Control",
    issuer: "GitHub",
    date: "2023-09",
    description: "Professional Git workflow certification covering branching strategies, collaboration, and advanced Git operations.",
    skills: ["Git", "GitHub", "Version Control", "Collaboration"],
    credentialUrl: "#",
  },
  {
    id: 6,
    title: "Responsive Web Design",
    issuer: "FreeCodeCamp",
    date: "2023-08",
    description: "Modern responsive design principles using CSS Grid, Flexbox, and mobile-first design methodologies.",
    skills: ["CSS3", "Responsive Design", "Flexbox", "Grid", "Mobile-First"],
    credentialUrl: "#",
  }
];

const Certificates = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
            Certificates
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My journey of continuous learning and professional development in technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificatesData.map((cert) => (
            <Card key={cert.id} className="bg-card border-card-border shadow-card hover:shadow-elegant transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Award className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <Badge variant="outline" className="text-xs">
                    {cert.issuer}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {cert.title}
                </CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(cert.date)}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {cert.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {cert.credentialUrl && (
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
                      View Credential
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificates;