import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Plus, TrendingUp, Target, Users, BookOpen, PenTool, Hash } from "lucide-react";

const StudentDashboard = () => {
  const quickActions = [
    { icon: PenTool, label: "Create Activity Post", color: "bg-primary" },
    { icon: BookOpen, label: "View Portfolio", color: "bg-accent" },
    { icon: Target, label: "Set Goals", color: "bg-success" },
    { icon: Users, label: "Find Study Groups", color: "bg-warning" }
  ];

  const recentUpdates = [
    "New achievement validation system launched",
    "Study group matching algorithm updated",
    "Portfolio templates now available",
    "Weekly goal tracking feature added",
    "Career mentorship program announced"
  ];

  const trendingTopics = [
    "#MachineLearning",
    "#Internships", 
    "#Research",
    "#Hackathons",
    "#Certifications"
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-3 space-y-6">
          {/* Post Creation Section */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-primary flex items-center">
                <PenTool className="h-5 w-5 mr-2" />
                Share Your Achievement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input placeholder="What did you accomplish today?" className="text-lg" />
                <Textarea placeholder="Tell us more about your achievement..." className="min-h-[100px]" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">Add Photo</Button>
                    <Button variant="outline" size="sm">Add Tag</Button>
                  </div>
                  <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Post Achievement
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trending Topics */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-primary flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {trendingTopics.map((topic, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                  >
                    <Hash className="h-3 w-3 mr-1" />
                    {topic.replace('#', '')}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Feed Placeholder */}
          <Card className="shadow-soft">
            <CardContent className="p-8 text-center">
              <div className="text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Your Feed Will Appear Here</h3>
                <p>Start following topics and connecting with peers to see activity updates.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-primary">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button 
                    key={index}
                    variant="ghost" 
                    className="w-full justify-start hover:bg-muted/50 text-left"
                  >
                    <div className={`w-8 h-8 rounded-full ${action.color} flex items-center justify-center mr-3 shrink-0`}>
                      <action.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="truncate">{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Updates */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-primary">Recent Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentUpdates.map((update, index) => (
                  <div key={index} className="text-sm">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground leading-relaxed">{update}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;