import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: string;
  event_name: string;
  category: string;
  status: string;
  start_time: string;
  end_time: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .single();

    if (!roles) {
      toast({
        title: "Access Denied",
        description: "You need admin privileges to access this page",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setIsAdmin(true);
    fetchEvents();
  };

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch events",
        variant: "destructive",
      });
    } else {
      setEvents(data || []);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-hero">
        <div className="text-gold text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero">
      <header className="border-b border-gold/20 bg-background/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gold">Admin Dashboard</h1>
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="border-gold/30 text-gold hover:bg-gold hover:text-deep-black"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gold">Events</h2>
          <Button
            onClick={() => navigate("/admin/create-event")}
            className="gradient-gold text-deep-black shadow-gold hover:shadow-xl"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </div>

        {events.length === 0 ? (
          <Card className="gradient-card border-gold/20">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground text-lg mb-4">
                No events created yet
              </p>
              <Button
                onClick={() => navigate("/admin/create-event")}
                className="gradient-gold text-deep-black"
              >
                Create Your First Event
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card
                key={event.id}
                className="gradient-card border-gold/20 hover:border-gold/50 transition-all cursor-pointer"
                onClick={() => navigate(`/admin/event/${event.id}`)}
              >
                <CardHeader>
                  <CardTitle className="text-gold">{event.event_name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">
                      <span className="font-semibold">Category:</span> {event.category}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-semibold">Status:</span>{" "}
                      <span className={`capitalize ${
                        event.status === "active" ? "text-green-500" :
                        event.status === "completed" ? "text-blue-500" :
                        "text-yellow-500"
                      }`}>
                        {event.status}
                      </span>
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {new Date(event.start_time).toLocaleDateString()} -{" "}
                      {new Date(event.end_time).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;