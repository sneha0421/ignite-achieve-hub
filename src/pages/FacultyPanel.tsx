import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, XCircle, Clock, Eye, Users, Trophy, BookOpen, TrendingUp } from "lucide-react";

const FacultyPanel = () => {
  const pendingAchievements = [
    {
      id: 1,
      student: "David Park",
      avatar: "DP",
      achievement: "Research Publication - AI Ethics",
      description: "Co-authored paper on 'Ethical Implications of AI in Education' published in Journal of Educational Technology.",
      category: "Research",
      submittedDate: "3 days ago",
      evidence: "Publication link, peer reviews"
    },
    {
      id: 2,
      student: "Maria Santos",
      avatar: "MS",
      achievement: "Internship Completion - NASA",
      description: "Successfully completed 12-week internship at NASA Goddard Space Flight Center, contributing to Mars mission planning.",
      category: "Professional",
      submittedDate: "5 days ago",
      evidence: "Completion certificate, supervisor recommendation"
    },
    {
      id: 3,
      student: "James Wilson",
      avatar: "JW",
      achievement: "Startup Launch - EcoTech Solutions",
      description: "Founded and launched a sustainable technology startup focused on renewable energy solutions for urban areas.",
      category: "Entrepreneurship",
      submittedDate: "1 week ago",
      evidence: "Business registration, initial funding documentation"
    }
  ];

  const stats = [
    { icon: Clock, label: "Pending Reviews", value: "12", color: "text-warning" },
    { icon: CheckCircle, label: "Approved Today", value: "8", color: "text-success" },
    { icon: Users, label: "Active Students", value: "247", color: "text-primary" },
    { icon: Trophy, label: "Total Achievements", value: "1,234", color: "text-accent" }
  ];

  const recentActivity = [
    "Approved: Dean's List Achievement - Sarah Johnson",
    "Reviewed: Hackathon Winner - Michael Chen",
    "Pending: Research Publication - David Park",
    "Approved: Community Service - Emily Rodriguez"
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Faculty Approval Panel</h1>
            <p className="text-muted-foreground mt-1">Review and approve student achievements</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-soft hover:shadow-medium transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Approvals */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-primary flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Pending Approvals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingAchievements.map((achievement) => (
                    <Card key={achievement.id} className="border-l-4 border-l-warning">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src="" />
                                <AvatarFallback>{achievement.avatar}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold text-foreground">{achievement.student}</h4>
                                <p className="text-sm text-muted-foreground">{achievement.submittedDate}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="border-warning text-warning">
                              {achievement.category}
                            </Badge>
                          </div>
                          
                          <div>
                            <h5 className="font-bold text-primary mb-2">{achievement.achievement}</h5>
                            <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                            <p className="text-xs text-muted-foreground">
                              <strong>Evidence:</strong> {achievement.evidence}
                            </p>
                          </div>
                          
                          <Separator />
                          
                          <div className="flex items-center space-x-2">
                            <Button size="sm" className="bg-success hover:bg-success/90">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive">
                              <XCircle className="h-4 w-4 mr-1" />
                              Decline
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-primary flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="text-sm">
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-muted-foreground">{activity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-primary">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    View All Submissions
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Trophy className="h-4 w-4 mr-2" />
                    Achievement Categories
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Student Profiles
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyPanel;