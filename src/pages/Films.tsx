import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Film, Heart, LogOut, TrendingUp, UserCircle2 } from "lucide-react";
import filmlyticLogo from "@/assets/filmlytic-logo.png";
import { TiltCard } from "@/components/TiltCard";

interface Film {
  id: string;
  title: string;
  description: string | null;
  release_year: number | null;
  image_url: string | null;
  vote_count: number;
}

interface Vote {
  id: string;
  film_id: string;
  user_id: string;
}

const Films = () => {
  const navigate = useNavigate();
  const { user, signOut, isLoading: authLoading } = useAuth();
  const [films, setFilms] = useState<Film[]>([]);
  const [userVotes, setUserVotes] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [votingFilmId, setVotingFilmId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchFilms();
      fetchUserVotes();
      setupRealtimeSubscription();
    }
  }, [user]);

  const fetchFilms = async () => {
    try {
      const { data, error } = await supabase
        .from("films")
        .select("*")
        .order("vote_count", { ascending: false });

      if (error) throw error;
      setFilms(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching films",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserVotes = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("votes")
        .select("film_id")
        .eq("user_id", user.id);

      if (error) throw error;
      setUserVotes(new Set(data?.map((v) => v.film_id) || []));
    } catch (error: any) {
      toast({
        title: "Error fetching votes",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel("films-votes-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "films",
        },
        () => {
          fetchFilms();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "votes",
        },
        () => {
          fetchUserVotes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleVote = async (filmId: string) => {
    if (!user || votingFilmId) return;

    setVotingFilmId(filmId);
    const hasVoted = userVotes.has(filmId);

    try {
      if (hasVoted) {
        const { error } = await supabase
          .from("votes")
          .delete()
          .eq("film_id", filmId)
          .eq("user_id", user.id);

        if (error) throw error;

        toast({
          title: "Vote removed",
          description: "Your vote has been removed",
        });
      } else {
        const { error } = await supabase
          .from("votes")
          .insert({ film_id: filmId, user_id: user.id });

        if (error) throw error;

        toast({
          title: "Vote recorded!",
          description: "Your vote has been recorded on the blockchain",
        });
      }

      await fetchUserVotes();
      await fetchFilms();
    } catch (error: any) {
      toast({
        title: "Error voting",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setVotingFilmId(null);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 animate-pulse-glow">
            <img src={filmlyticLogo} alt="Loading" className="w-full h-full object-contain" />
          </div>
          <p className="text-muted-foreground">Loading films...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b-2 border-cyan/40 shadow-lg shadow-cyan/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center animate-pulse-glow">
              <img 
                src={filmlyticLogo} 
                alt="Filmlytic Logo" 
                className="w-10 h-10 object-contain" 
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
              Filmlytic
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-background/50 border border-cyan/30">
              <UserCircle2 className="h-4 w-4 text-cyan" />
              <span className="text-sm text-muted-foreground">{user?.email}</span>
            </div>
            <Button
              variant="outline"
              onClick={() => signOut()}
              className="border-cyan/50 hover:bg-cyan/10 hover:border-cyan transition-all duration-300"
            >
              <LogOut className="h-4 w-4 mr-2 text-cyan" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan via-purple to-magenta bg-clip-text text-transparent">
            Vote on Films
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your votes are recorded on the blockchain, ensuring transparency and immutability
          </p>
        </div>

        {films.length === 0 ? (
          <Card className="max-w-2xl mx-auto gradient-card border-cyan/30 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <Film className="w-16 h-16 mx-auto mb-4 text-cyan opacity-50" />
              <h3 className="text-2xl font-bold mb-2 text-cyan">No Films Yet</h3>
              <p className="text-muted-foreground">
                Films will appear here once they're added to the platform
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto" style={{ perspective: "1000px" }}>
            {films.map((film, index) => {
              const hasVoted = userVotes.has(film.id);
              const isVoting = votingFilmId === film.id;

              return (
                <TiltCard
                  key={film.id}
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="gradient-card border-cyan/30 shadow-lg hover:shadow-cyan transition-all duration-500 hover:border-cyan/60 backdrop-blur-sm h-full flex flex-col">
                    {film.image_url && (
                      <div className="w-full h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={film.image_url}
                          alt={film.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader className="flex-grow">
                      <CardTitle className="text-2xl text-cyan flex items-center justify-between">
                        {film.title}
                        {film.release_year && (
                          <span className="text-sm text-muted-foreground">
                            ({film.release_year})
                          </span>
                        )}
                      </CardTitle>
                      {film.description && (
                        <CardDescription className="text-muted-foreground leading-relaxed">
                          {film.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardFooter className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-cyan" />
                        <span className="text-lg font-bold text-cyan">
                          {film.vote_count} {film.vote_count === 1 ? "vote" : "votes"}
                        </span>
                      </div>
                      <Button
                        onClick={() => handleVote(film.id)}
                        disabled={isVoting}
                        variant={hasVoted ? "default" : "outline"}
                        className={
                          hasVoted
                            ? "gradient-primary text-foreground shadow-cyan hover:shadow-glow"
                            : "border-cyan/50 hover:bg-cyan/10 hover:border-cyan"
                        }
                      >
                        <Heart
                          className={`w-4 h-4 mr-2 ${hasVoted ? "fill-current" : ""}`}
                        />
                        {isVoting ? "..." : hasVoted ? "Voted" : "Vote"}
                      </Button>
                    </CardFooter>
                  </Card>
                </TiltCard>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Films;
