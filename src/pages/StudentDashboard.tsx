import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Heart, MessageCircle, Share2, Trophy, BookOpen, Users, Calendar } from "lucide-react";

const StudentDashboard = () => {
  const mockAchievements = [
    {
      id: 1,
      student: "Sarah Johnson",
      avatar: "SJ",
      achievement: "Dean's List Spring 2024",
      description: "Maintained a 3.8 GPA throughout the semester while taking advanced courses in Computer Science.",
      category: "Academic",
      date: "2 days ago",
      likes: 24,
      comments: 8,
      status: "approved"
    },
    {
      id: 2,
      student: "Michael Chen",
      avatar: "MC",
      achievement: "Hackathon Winner - TechFest 2024",
      description: "Led a team of 4 to create an innovative AI-powered study assistant that won first place.",
      category: "Competition",
      date: "1 week ago",
      likes: 42,
      comments: 15,
      status: "approved"
    },
    {
      id: 3,
      student: "Emily Rodriguez",
      avatar: "ER",
      achievement: "Community Service Leader",
      description: "Organized and led 5 community outreach programs, impacting over 200 local residents.",
      category: "Service",
      date: "2 weeks ago",
      likes: 31,
      comments: 12,
      status: "approved"
    }
  ];

  const quickActions = [
    { icon: Plus, label: "Submit Achievement", color: "bg-primary" },
    { icon: Trophy, label: "View My Awards", color: "bg-accent" },
    { icon: Users, label: "Join Study Group", color: "bg-success" },
    { icon: Calendar, label: "Upcoming Events", color: "bg-warning" }
  ];

  const recentUpdates = [
    "New achievement category: Research Publications",
    "Faculty approval average time: 2.3 days",
    "Top achievement this week: Innovation Award",
    "Featured student: Alex Thompson"
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Achievement Feed</h1>
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              <Plus className="h-4 w-4 mr-2" />
              Post Achievement
            </Button>
          </div>

          {/* Achievement Posts */}
          <div className="space-y-4">
            {mockAchievements.map((achievement) => (
              <Card key={achievement.id} className="shadow-medium hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>{achievement.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground">{achievement.student}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.date}</p>
                      </div>
                    </div>
                    <Badge variant={achievement.status === "approved" ? "default" : "secondary"} className="bg-success">
                      Approved
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-bold text-lg text-primary mb-2">{achievement.achievement}</h4>
                      <Badge variant="outline" className="mb-3">{achievement.category}</Badge>
                      <p className="text-muted-foreground">{achievement.description}</p>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
                          <Heart className="h-4 w-4 mr-1" />
                          {achievement.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {achievement.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
                    className="w-full justify-start hover:bg-muted/50"
                  >
                    <div className={`w-8 h-8 rounded-full ${action.color} flex items-center justify-center mr-3`}>
                      <action.icon className="h-4 w-4 text-white" />
                    </div>
                    {action.label}
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
                      <p className="text-muted-foreground">{update}</p>
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