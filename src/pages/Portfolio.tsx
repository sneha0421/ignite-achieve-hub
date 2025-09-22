import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Share, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';

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
  const { toast } = useToast();

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

  const downloadPDF = () => {
    const pdf = new jsPDF();
    const userName = user?.user_metadata?.full_name || 'User';
    
    // Header
    pdf.setFontSize(20);
    pdf.text(`${userName}'s Portfolio`, 20, 30);
    pdf.setFontSize(12);
    pdf.text('Digital Resume & Achievements', 20, 40);
    
    // Achievements section
    pdf.setFontSize(16);
    pdf.text('Achievements', 20, 60);
    
    let yPosition = 75;
    
    if (activities.length === 0) {
      pdf.setFontSize(12);
      pdf.text('No achievements yet.', 20, yPosition);
    } else {
      activities.forEach((activity, index) => {
        if (yPosition > 270) {
          pdf.addPage();
          yPosition = 20;
        }
        
        pdf.setFontSize(14);
        pdf.text(activity.title, 20, yPosition);
        yPosition += 10;
        
        pdf.setFontSize(10);
        const description = activity.description || '';
        const lines = pdf.splitTextToSize(description, 170);
        pdf.text(lines, 20, yPosition);
        yPosition += lines.length * 5 + 5;
        
        const date = new Date(activity.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        pdf.text(date, 20, yPosition);
        yPosition += 15;
      });
    }
    
    pdf.save(`${userName}_Portfolio.pdf`);
    toast({
      title: "PDF Downloaded",
      description: "Your portfolio has been downloaded successfully.",
    });
  };

  const sharePortfolio = async () => {
    const shareData = {
      title: `${user?.user_metadata?.full_name || 'User'}'s Portfolio`,
      text: 'Check out my digital portfolio and achievements!',
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        toast({
          title: "Shared Successfully",
          description: "Portfolio shared successfully.",
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy link to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied",
          description: "Portfolio link copied to clipboard.",
        });
      } catch (error) {
        toast({
          title: "Share",
          description: "Share this link: " + window.location.href,
        });
      }
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
            <Button variant="outline" className="flex items-center gap-2" onClick={downloadPDF}>
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button variant="outline" className="flex items-center gap-2" onClick={sharePortfolio}>
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