import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Share, Trophy } from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

const Portfolio = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserActivities();
    }
  }, [user]);

  const fetchUserActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('activities')
        .select('id, title, description, created_at')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching activities:', error);
      } else {
        setActivities(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {user?.user_metadata?.full_name || 'My Portfolio'}
          </h1>
          <p className="text-muted-foreground">Digital Resume & Achievements</p>
          
          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Achievements Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activities.length === 0 ? (
              <div className="text-center py-8">
                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">No achievements yet.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Start sharing your accomplishments to build your portfolio!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="border-l-4 border-primary pl-4 py-3 hover:bg-accent/50 transition-colors rounded-r-lg"
                  >
                    <h3 className="font-semibold text-foreground mb-2">
                      {activity.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Portfolio;