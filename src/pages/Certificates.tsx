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
  {
    id: 3,
    title: "Java Programming",
    issuer: "Oracle",
    date: "2024-06",
    description:
      "Comprehensive Java certification covering object-oriented programming, core Java APIs, and JVM concepts.",
    skills: ["Java", "OOP", "JVM", "APIs"],
    credentialUrl:
      "https://drive.google.com/file/d/1Vbedb1286my5Ll4nCRJXAJg2iOVLVFJc/view?usp=drive_link",
  },
  {
    id: 4,
    title: "Data Structures & Algorithms",
    issuer: "Infosys",
    date: "2024-05",
    description:
      "In-depth study and application of fundamental data structures and algorithms for efficient problem solving.",
    skills: ["Data Structures", "Algorithms", "Problem Solving"],
    credentialUrl:
      "https://drive.google.com/file/d/1yL3rjR9bIwRNSgnediLSqADWzzvv9cL1/view?usp=drive_link",
  },
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
                      View Certificate
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