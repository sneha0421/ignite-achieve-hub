import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MessageCircle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface Activity {
  id: string;
  title: string | null;
  description: string | null;
  user_id: string;
  status: string;
  created_at: string;
}

interface Profile {
  full_name: string | null;
}

interface ActivityWithProfile extends Activity {
  profiles: Profile | null;
}

const FacultyPanel = () => {
  const [pendingAchievements, setPendingAchievements] = useState<ActivityWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchPendingActivities = async () => {
    if (!user) return;
    
    try {
      // Get current faculty member's profile id
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (profileError) throw profileError;

      const { data, error } = await supabase
        .from('activities')
        .select(`
          *,
          profiles!activities_user_id_fkey (
            full_name
          )
        `)
        .eq('status', 'pending')
        .eq('approving_faculty_id', profile.id)
        .neq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setPendingAchievements(data || []);
    } catch (error) {
      console.error('Error fetching pending activities:', error);
      toast({
        title: "Error",
        description: "Failed to fetch pending activities",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateActivityStatus = async (activityId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('activities')
        .update({ status: newStatus })
        .eq('id', activityId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Achievement ${newStatus === 'approved' ? 'approved' : 'updated'} successfully`,
      });

      // Refresh the list
      fetchPendingActivities();
    } catch (error) {
      console.error('Error updating activity status:', error);
      toast({
        title: "Error",
        description: "Failed to update achievement status",
        variant: "destructive",
      });
    }
  };

  const handleApprove = (activityId: string) => {
    updateActivityStatus(activityId, 'approved');
  };

  const handleRequestMoreInfo = (activityId: string) => {
    updateActivityStatus(activityId, 'request more info');
  };

  useEffect(() => {
    fetchPendingActivities();
  }, []);

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
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : pendingAchievements.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No pending achievements to review
                </div>
              ) : (
                pendingAchievements.map((achievement) => (
                  <Card key={achievement.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-foreground mb-1">
                              {achievement.profiles?.full_name || 'Unknown Student'}
                            </h4>
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
                          <Button 
                            size="sm" 
                            className="bg-primary hover:bg-primary/90"
                            onClick={() => handleApprove(achievement.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleRequestMoreInfo(achievement.id)}
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Request More Info
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacultyPanel;