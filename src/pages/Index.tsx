import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Film, Shield, Wallet, Zap, TrendingUp, Users, Award, ChevronRight, UserCircle2, Lock, Globe, BarChart3, Star, CheckCircle2, LogOut } from "lucide-react";
import filmlyticLogo from "@/assets/filmlytic-logo.png";
import { TiltCard } from "@/components/TiltCard";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

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
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b-2 border-cyan/40 shadow-lg shadow-cyan/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
          {user ? (
            <Button
              variant="outline"
              onClick={() => signOut()}
              className="border-cyan/50 hover:bg-cyan/10 hover:border-cyan transition-all duration-300"
            >
              <LogOut className="h-4 w-4 mr-2 text-cyan" />
              Sign Out
            </Button>
          ) : (
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/auth")}
              className="border-cyan/50 hover:bg-cyan/10 hover:border-cyan transition-all duration-300"
            >
              <UserCircle2 className="h-5 w-5 text-cyan" />
            </Button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative gradient-hero overflow-hidden pt-20">
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
              <img 
                src={filmlyticLogo} 
                alt="Filmlytic Logo" 
                className="w-24 h-24 relative z-10 animate-float object-contain" 
                onError={(e) => {
                  console.error("Logo failed to load");
                  e.currentTarget.style.display = 'none';
                }}
              />
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

      {/* How It Works Section */}
      <section className="py-24 px-4 bg-background/50 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan via-purple to-magenta bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to join the future of film analytics
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-20 h-20 mx-auto gradient-primary rounded-full flex items-center justify-center mb-6 shadow-cyan">
                <span className="text-4xl font-bold text-foreground">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-cyan">Sign Up Instantly</h3>
              <p className="text-muted-foreground leading-relaxed">
                Create your account in seconds. No complicated forms, no lengthy verification process. Just your email and you're in.
              </p>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-20 mx-auto gradient-primary rounded-full flex items-center justify-center mb-6 shadow-cyan">
                <span className="text-4xl font-bold text-foreground">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-cyan">Get Your Wallet</h3>
              <p className="text-muted-foreground leading-relaxed">
                We automatically create a secure custodial wallet for you. No crypto knowledge required—we handle all the technical details.
              </p>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="w-20 h-20 mx-auto gradient-primary rounded-full flex items-center justify-center mb-6 shadow-cyan">
                <span className="text-4xl font-bold text-foreground">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-cyan">Start Voting</h3>
              <p className="text-muted-foreground leading-relaxed">
                Vote on films, view analytics, and track everything on the blockchain. Your votes are secure, transparent, and immutable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan via-purple to-magenta bg-clip-text text-transparent">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join a growing community revolutionizing film analytics
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-5xl font-bold bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent mb-2">10K+</div>
              <p className="text-muted-foreground text-lg">Active Users</p>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-5xl font-bold bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent mb-2">50K+</div>
              <p className="text-muted-foreground text-lg">Films Voted</p>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-5xl font-bold bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent mb-2">100%</div>
              <p className="text-muted-foreground text-lg">Transparent</p>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-5xl font-bold bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent mb-2">24/7</div>
              <p className="text-muted-foreground text-lg">Blockchain Security</p>
            </div>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto" style={{ perspective: "1000px" }}>
            {features.map((feature, index) => (
              <TiltCard
                key={index}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card 
                  className="gradient-card border-cyan/30 shadow-lg hover:shadow-cyan transition-all duration-500 hover:border-cyan/60 group backdrop-blur-sm h-full"
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
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Why Blockchain Section */}
      <section className="py-24 px-4 bg-background/50 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-20"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan via-purple to-magenta bg-clip-text text-transparent">
              Why Blockchain for Film Voting?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Traditional voting systems have limitations. Blockchain solves them all.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-cyan">
                    <Lock className="w-6 h-6 text-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-cyan">Immutable Records</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every vote is permanently recorded on the blockchain. No one can alter, delete, or manipulate voting history. What's recorded stays recorded forever.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-cyan">
                    <Globe className="w-6 h-6 text-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-cyan">Complete Transparency</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    All voting data is publicly verifiable on the blockchain. Anyone can audit the results and verify their authenticity at any time.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-cyan">
                    <BarChart3 className="w-6 h-6 text-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-cyan">Real-Time Analytics</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Track voting trends, analyze patterns, and get instant insights. All powered by blockchain data that updates in real-time across the network.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-cyan">
                    <CheckCircle2 className="w-6 h-6 text-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-cyan">No Intermediaries</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Direct peer-to-peer voting eliminates middlemen and gatekeepers. Your vote goes straight to the blockchain without third-party interference.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan via-purple to-magenta bg-clip-text text-transparent">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trusted by film enthusiasts and industry professionals worldwide
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <Card className="gradient-card border-cyan/30 shadow-lg backdrop-blur-sm animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-foreground">SM</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Sarah Mitchell</h4>
                    <p className="text-sm text-muted-foreground">Film Critic</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  "Filmlytic has completely transformed how I engage with film analytics. The blockchain transparency gives me confidence that every vote matters."
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-cyan/30 shadow-lg backdrop-blur-sm animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-foreground">JC</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">James Chen</h4>
                    <p className="text-sm text-muted-foreground">Producer</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  "As a producer, having access to immutable voting data is invaluable. The analytics help me understand audience preferences better than ever."
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-cyan/30 shadow-lg backdrop-blur-sm animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-foreground">ER</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Emma Rodriguez</h4>
                    <p className="text-sm text-muted-foreground">Film Student</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  "The custodial wallet made it so easy to get started. No complicated crypto setup—just sign up and start voting. Perfect for beginners!"
                </p>
              </CardContent>
            </Card>
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
              <img 
                src={filmlyticLogo} 
                alt="Filmlytic" 
                className="w-10 h-10 object-contain" 
                onError={(e) => {
                  console.error("Footer logo failed to load");
                  e.currentTarget.style.display = 'none';
                }}
              />
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
