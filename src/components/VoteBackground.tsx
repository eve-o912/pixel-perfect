import { useEffect, useState } from "react";
import { Film, Check, Star, Award } from "lucide-react";

interface Vote {
  id: number;
  x: number;
  delay: number;
  duration: number;
  icon: number;
}

const VoteBackground = () => {
  const [votes, setVotes] = useState<Vote[]>([]);
  
  const icons = [Film, Check, Star, Award];

  useEffect(() => {
    const generateVotes = () => {
      const newVotes: Vote[] = [];
      for (let i = 0; i < 30; i++) {
        newVotes.push({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 5,
          duration: 8 + Math.random() * 4,
          icon: Math.floor(Math.random() * icons.length),
        });
      }
      setVotes(newVotes);
    };

    generateVotes();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {votes.map((vote) => {
        const Icon = icons[vote.icon];
        return (
          <div
            key={vote.id}
            className="absolute animate-vote-float opacity-20"
            style={{
              left: `${vote.x}%`,
              animationDelay: `${vote.delay}s`,
              animationDuration: `${vote.duration}s`,
            }}
          >
            <Icon className="w-6 h-6 text-gold" />
          </div>
        );
      })}
    </div>
  );
};

export default VoteBackground;
