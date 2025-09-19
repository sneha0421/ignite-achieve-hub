import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { GraduationCap, Trophy, Users, TrendingUp, Star, BookOpen } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const features = [
    {
      icon: Trophy,
      title: "Achievement Tracking",
      description: "Document and showcase academic and non-academic accomplishments"
    },
    {
      icon: Users,
      title: "Faculty Approval",
      description: "Streamlined review process for validating student achievements"
    },
    {
      icon: TrendingUp,
      title: "Progress Analytics",
      description: "Track your growth and celebrate milestones throughout your journey"
    },
    {
      icon: Star,
      title: "Recognition System",
      description: "Get recognized for your hard work and dedication"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-background to-muted py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-8 shadow-glow">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
            
            <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
              Welcome to <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Ignite Achieve</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Empower your academic journey with a platform designed to celebrate, track, and validate your achievements. 
              Connect students and faculty in a seamless achievement recognition ecosystem.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <>
                  <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-medium">
                    <Link to="/student">
                      <GraduationCap className="h-5 w-5 mr-2" />
                      Student Dashboard
                    </Link>
                  </Button>
                  
                  <Button size="lg" variant="outline" asChild className="border-primary text-primary hover:bg-primary hover:text-white">
                    <Link to="/faculty">
                      <Users className="h-5 w-5 mr-2" />
                      Faculty Panel
                    </Link>
                  </Button>
                </>
              ) : (
                <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-medium">
                  <Link to="/auth">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Get Started
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything You Need to <span className="text-primary">Succeed</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform provides comprehensive tools for students to showcase their achievements 
              and for faculty to efficiently manage the approval process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300 border-0">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1,200+</div>
              <div className="text-primary-foreground/80">Achievements Recorded</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-primary-foreground/80">Approval Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">Active Students</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to <span className="text-accent">Ignite</span> Your Success?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of students and faculty members who are already using Ignite Achieve 
            to track, validate, and celebrate academic excellence.
          </p>
          
          <Button size="lg" asChild className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90">
            <Link to={user ? "/student" : "/auth"}>
              <BookOpen className="h-5 w-5 mr-2" />
              {user ? "Go to Dashboard" : "Get Started Today"}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
