import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MessageCircle, Clock } from "lucide-react";

const FacultyPanel = () => {
  const pendingAchievements = [
    {
      id: 1,
      title: "Research Publication - AI Ethics",
      description: "Co-authored paper on 'Ethical Implications of AI in Education' published in Journal of Educational Technology. This research explores the intersection of artificial intelligence and educational ethics.",
      student_name: "David Park",
      status: "pending"
    },
    {
      id: 2,
      title: "NASA Internship Completion",
      description: "Successfully completed a 12-week internship at NASA Goddard Space Flight Center, contributing to Mars mission planning and satellite data analysis projects.",
      student_name: "Maria Santos", 
      status: "pending"
    },
    {
      id: 3,
      title: "EcoTech Solutions Startup Launch",
      description: "Founded and launched a sustainable technology startup focused on renewable energy solutions for urban areas. Secured initial seed funding and developed MVP.",
      student_name: "James Wilson",
      status: "pending"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Faculty Panel</h1>
            <p className="text-muted-foreground mt-1">Review and approve student achievements</p>
          </div>
        </div>

        {/* Pending Achievements */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-primary flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Pending Approvals ({pendingAchievements.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingAchievements.map((achievement) => (
                <Card key={achievement.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">{achievement.student_name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {achievement.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-bold text-primary mb-2">{achievement.title}</h5>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                      
                      <div className="flex items-center space-x-3 pt-2">
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Request More Info
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
    </div>
  );
};

export default FacultyPanel;