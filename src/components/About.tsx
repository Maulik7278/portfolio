import React, { useState, useEffect } from "react";
import { MapPin, Mail } from "lucide-react";

const About = () => {
  const [userInfo, setUserInfo] = useState<{
    public_repos: number;
    followers: number;
  } | null>(null);

  // Fetch GitHub data on component mount
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
        } else {
          console.error("Failed to fetch GitHub data");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchGitHub();
  }, []);

  return (
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
              Full-stack developer passionate about creating modern, scalable
              web apps with React & Node.js. I love solving complex problems,
              building clean user experiences, and contributing to open-source
              communities.
            </p>
            {/* this is mobaile wise show email */}
            <div className="flex items-center gap-4 mt-auto pt-8 border-t border-muted/30">
              {/* Location: icon always visible, text only on desktop */}
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="hidden lg:inline font-semibold text-primary">
                  India
                </span>
              </div>

              {/* Email: icon always visible, text only on desktop */}
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <span className="hidden lg:inline font-semibold text-primary">
                  maulikghasadiya2712@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
