import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Plus, TrendingUp, Target, Users, BookOpen, PenTool, Hash, Clock } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [activities, setActivities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  // Fetch pending activities
  useEffect(() => {
    fetchPendingActivities();
  }, []);

  const fetchPendingActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('activities')
        .select(`
          *,
          profiles!activities_user_id_fkey (
            full_name
          )
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const handlePhotoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (3KB = 3072 bytes)
    if (file.size > 3072) {
      toast({
        title: "File Too Large",
        description: "Photo must be smaller than 3KB. Please select a smaller image.",
        variant: "destructive",
      });
      return;
    }

    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File Type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    setSelectedPhoto(file);
    toast({
      title: "Photo Selected",
      description: `${file.name} (${(file.size / 1024).toFixed(1)}KB) ready to upload.`,
    });
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmitActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !title.trim()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('activities')
        .insert({
          user_id: user.id,
          title: title.trim(),
          description: description.trim(),
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Achievement Posted!",
        description: "Your achievement has been shared successfully.",
      });

      // Clear form
      setTitle("");
      setDescription("");
      setSelectedPhoto(null);
      setTags([]);
      setTagInput("");
      setShowTagInput(false);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
      // Refresh activities
      fetchPendingActivities();
    } catch (error) {
      console.error('Error creating activity:', error);
      toast({
        title: "Error",
        description: "Failed to post your achievement. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <form onSubmit={handleSubmitActivity} className="space-y-4">
                <Input 
                  placeholder="What did you accomplish today?" 
                  className="text-lg"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <Textarea 
                  placeholder="Tell us more about your achievement..." 
                  className="min-h-[100px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                
                {/* Tags Display */}
                {tags.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="flex items-center gap-1"
                        >
                          #{tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 hover:text-destructive"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tag Input */}
                {showTagInput && (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a tag and press Enter"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={handleTagInputKeyPress}
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      onClick={handleAddTag}
                      variant="outline"
                      size="sm"
                    >
                      Add
                    </Button>
                  </div>
                )}

                {/* Selected Photo Display */}
                {selectedPhoto && (
                  <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                    <span className="text-sm text-muted-foreground">
                      📷 {selectedPhoto.name} ({(selectedPhoto.size / 1024).toFixed(1)}KB)
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedPhoto(null)}
                      className="h-6 w-6 p-0"
                    >
                      ×
                    </Button>
                  </div>
                )}

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoSelect}
                  className="hidden"
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Add Photo
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowTagInput(!showTagInput)}
                    >
                      Add Tag
                    </Button>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !title.trim()}
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Posting..." : "Post Achievement"}
                  </Button>
                </div>
              </form>
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

          {/* Activity Feed */}
          <div className="space-y-4">
            {activities.length > 0 ? (
              activities.map((activity: any) => (
                <Card key={activity.id} className="shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-primary-foreground text-sm font-medium">
                            {activity.profiles?.full_name?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{activity.profiles?.full_name || 'Anonymous'}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(activity.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
                        Pending
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{activity.title}</h3>
                    {activity.description && (
                      <p className="text-muted-foreground leading-relaxed">{activity.description}</p>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="shadow-soft">
                <CardContent className="p-8 text-center">
                  <div className="text-muted-foreground">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold mb-2">No Activities Yet</h3>
                    <p>Share your first achievement to get started!</p>
                  </div>
                </CardContent>
              </Card>
            )}
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
                    className="w-full justify-start hover:bg-muted/50 text-left"
                    onClick={() => action.label === "View Portfolio" ? navigate('/portfolio') : undefined}
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