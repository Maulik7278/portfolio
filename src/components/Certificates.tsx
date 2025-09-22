import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Award, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

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
      "https://drive.google.com/file/d/14WuCj2w-hlmaj-NkvK6cwAZFR05qz4mD/view?usp=drive_link",
  },
];

const CertificatesSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Recent Certificates
          </h2>
          <p className="text-lg text-muted-foreground">
            My latest achievements
          </p>
        </div>

        {/* Certificates Grid */}
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
                <p className="text-sm text-muted-foreground">
                  {cert.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

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
  );
};

export default CertificatesSection;
