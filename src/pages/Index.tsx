import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Film, Shield, Wallet, Zap, TrendingUp, Users, Award, ChevronRight } from "lucide-react";
import filmlyticLogo from "@/assets/filmlytic-logo.png";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Blockchain Verified",
      description: "Every vote and transaction recorded on-chain for complete transparency",
    },
    {
      icon: Wallet,
      title: "Custodial Wallets",
      description: "Secure, managed wallets created automatically for every user",
    },
    {
      icon: TrendingUp,
      title: "Film Analytics",
      description: "Advanced analytics and insights for the film industry",
    },
    {
      icon: Zap,
      title: "Instant Setup",
      description: "Create your account and wallet in seconds, no crypto knowledge needed",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join a global community of film enthusiasts and professionals",
    },
    {
      icon: Award,
      title: "Earn Rewards",
      description: "Get rewarded for active participation and valuable contributions",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-hero overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-40"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>
        
        {/* Animated orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-cyan/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="mx-auto w-32 h-32 rounded-3xl flex items-center justify-center mb-8 animate-scale-in animate-pulse-glow relative">
              <div className="absolute inset-0 gradient-primary rounded-3xl opacity-20 animate-rotate-slow"></div>
              <img src={filmlyticLogo} alt="Filmlytic Logo" className="w-24 h-24 relative z-10 animate-float" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight bg-gradient-to-r from-cyan via-purple to-magenta bg-clip-text text-transparent animate-slide-up">
              Filmlytic
            </h1>
            
            <p className="text-2xl md:text-3xl mb-4 text-foreground/90 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Blockchain-Powered Film Analytics
            </p>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Revolutionary platform combining blockchain security with film industry analytics.
              Get your custodial wallet and join the future of film voting.
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Button
                size="xl"
                onClick={() => navigate("/auth")}
                className="gradient-primary text-foreground shadow-cyan hover:shadow-glow hover:scale-105 transition-all duration-300 border-2 border-cyan/50"
              >
                Get Started
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="xl"
                variant="outline"
                onClick={() => navigate("/auth")}
                className="border-2 border-cyan text-cyan hover:bg-cyan hover:text-background transition-all duration-300"
              >
                Sign In
              </Button>
            </div>

            <p className="mt-8 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
              ✨ Free custodial wallet created automatically on signup
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 bg-background relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan via-purple to-magenta bg-clip-text text-transparent">
              Why Choose Filmlytic?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge technology meets cinematic excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="gradient-card border-cyan/30 shadow-lg hover:shadow-cyan transition-all duration-500 hover:scale-105 hover:border-cyan/60 animate-scale-in group backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center mb-4 shadow-cyan group-hover:animate-pulse-glow transition-all">
                    <feature.icon className="w-8 h-8 text-foreground" />
                  </div>
                  <CardTitle className="text-2xl text-cyan">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,hsl(190,95%,55%)_50%,transparent_75%)] bg-[length:200%_200%] animate-shimmer"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan/20 rounded-full blur-3xl animate-pulse-glow"></div>
        
        <div className="container mx-auto text-center relative z-10 animate-fade-in">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan via-purple to-magenta bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12">
              Join thousands of film enthusiasts already using Filmlytic.
              Your custodial wallet awaits.
            </p>
            <Button
              size="xl"
              onClick={() => navigate("/auth")}
              className="gradient-primary text-foreground shadow-glow hover:shadow-cyan-lg hover:scale-110 transition-all duration-300 border-2 border-cyan/50"
            >
              Create Your Account
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-background border-t border-cyan/20">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center">
              <img src={filmlyticLogo} alt="Filmlytic" className="w-10 h-10" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">Filmlytic</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 Filmlytic. Blockchain-powered film analytics platform.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
