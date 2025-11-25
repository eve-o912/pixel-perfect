import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const eventSchema = z.object({
  event_name: z.string().min(1, "Event name is required").max(100),
  category: z.string().min(1, "Category is required").max(50),
  number_of_items: z.number().min(2, "Must have at least 2 items"),
  vote_mode: z.enum(["single", "multiple", "ranked"]),
  number_of_choices: z.number().min(1),
  number_of_winners: z.number().min(1),
  start_time: z.string().min(1, "Start time is required"),
  end_time: z.string().min(1, "End time is required"),
});

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    event_name: "",
    category: "",
    number_of_items: 5,
    vote_mode: "single" as "single" | "multiple" | "ranked",
    number_of_choices: 1,
    number_of_winners: 1,
    start_time: "",
    end_time: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      eventSchema.parse(formData);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("events")
        .insert([
          {
            ...formData,
            created_by: user.id,
            status: "draft",
          },
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Event created successfully",
      });

      navigate(`/admin/event/${data.id}`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to create event",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-hero py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin")}
          className="mb-6 text-gold hover:text-gold/80"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card className="gradient-card border-gold/20">
          <CardHeader>
            <CardTitle className="text-3xl text-gold">Create New Event</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="event_name" className="text-foreground">Event Name</Label>
                <Input
                  id="event_name"
                  value={formData.event_name}
                  onChange={(e) => setFormData({ ...formData, event_name: e.target.value })}
                  className="bg-background/50 border-gold/30 focus:border-gold"
                  placeholder="e.g., Best Film Awards 2024"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-foreground">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="bg-background/50 border-gold/30 focus:border-gold"
                  placeholder="e.g., Films, Songs, Products"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="number_of_items" className="text-foreground">Number of Items</Label>
                  <Input
                    id="number_of_items"
                    type="number"
                    min="2"
                    value={formData.number_of_items}
                    onChange={(e) => setFormData({ ...formData, number_of_items: parseInt(e.target.value) })}
                    className="bg-background/50 border-gold/30 focus:border-gold"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vote_mode" className="text-foreground">Vote Mode</Label>
                  <Select
                    value={formData.vote_mode}
                    onValueChange={(value: "single" | "multiple" | "ranked") => 
                      setFormData({ ...formData, vote_mode: value })
                    }
                  >
                    <SelectTrigger className="bg-background/50 border-gold/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Choice</SelectItem>
                      <SelectItem value="multiple">Multiple Choice</SelectItem>
                      <SelectItem value="ranked">Ranked Choice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="number_of_choices" className="text-foreground">Number of Choices</Label>
                  <Input
                    id="number_of_choices"
                    type="number"
                    min="1"
                    value={formData.number_of_choices}
                    onChange={(e) => setFormData({ ...formData, number_of_choices: parseInt(e.target.value) })}
                    className="bg-background/50 border-gold/30 focus:border-gold"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="number_of_winners" className="text-foreground">Number of Winners</Label>
                  <Input
                    id="number_of_winners"
                    type="number"
                    min="1"
                    value={formData.number_of_winners}
                    onChange={(e) => setFormData({ ...formData, number_of_winners: parseInt(e.target.value) })}
                    className="bg-background/50 border-gold/30 focus:border-gold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_time" className="text-foreground">Start Time</Label>
                  <Input
                    id="start_time"
                    type="datetime-local"
                    value={formData.start_time}
                    onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                    className="bg-background/50 border-gold/30 focus:border-gold"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end_time" className="text-foreground">End Time</Label>
                  <Input
                    id="end_time"
                    type="datetime-local"
                    value={formData.end_time}
                    onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                    className="bg-background/50 border-gold/30 focus:border-gold"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full gradient-gold text-deep-black shadow-gold hover:shadow-xl"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Event"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateEvent;