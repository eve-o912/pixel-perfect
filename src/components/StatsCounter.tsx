import CountingNumber from "./CountingNumber";
import { TrendingUp, Users, Award, BarChart3 } from "lucide-react";

const StatsCounter = () => {
  const stats = [
    {
      icon: Users,
      value: 50000,
      suffix: "+",
      label: "Active Users",
    },
    {
      icon: Award,
      value: 1000000,
      suffix: "+",
      label: "Votes Cast",
    },
    {
      icon: BarChart3,
      value: 5000,
      suffix: "+",
      label: "Films Analyzed",
    },
    {
      icon: TrendingUp,
      value: 99,
      suffix: "%",
      label: "Uptime",
    },
  ];

  return (
    <div className="py-20 px-4 bg-background/50 backdrop-blur-sm relative overflow-hidden">
      <VoteTickerBackground />
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 gradient-gold rounded-2xl mb-4 animate-pulse-glow">
                <stat.icon className="w-8 h-8 text-deep-black" />
              </div>
              <CountingNumber
                end={stat.value}
                suffix={stat.suffix}
                className="text-4xl md:text-5xl font-bold text-gold mb-2"
                duration={2500}
              />
              <p className="text-sm md:text-base text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VoteTickerBackground = () => {
  const voteWords = [
    "VOTE",
    "BLOCKCHAIN",
    "VERIFIED",
    "SECURE",
    "TRANSPARENT",
    "ANALYTICS",
    "FILM",
    "WALLET",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden opacity-5">
      <div className="flex animate-ticker whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 px-8">
            {voteWords.map((word, index) => (
              <span key={index} className="text-6xl font-bold text-gold">
                {word}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCounter;
