import React from "react";
import { Badge } from "@/components/ui/badge";

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

const SkillsSection = () => {
  return (
    <section className="bg-muted/50 min-h-screen flex flex-col justify-center py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
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
  );
};

export default SkillsSection;
