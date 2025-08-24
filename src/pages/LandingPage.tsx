import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Sparkles, Star, TrendingUp, Wallet } from "lucide-react"
import { PiggyBank, BarChart3, Shield, Smartphone, Target, CreditCard } from "lucide-react"

import avatar1 from "@/assets/professional-woman-avatar.png"
import avatar2 from "@/assets/professional-man-avatar.png"
import avatar3 from "@/assets/business-woman-avatar.png"
import { useNavigate } from "react-router"


const features = [
  {
    icon: PiggyBank,
    title: "Smart Budgeting",
    description: "Set intelligent budgets that adapt to your spending patterns and help you save more effectively.",
  },
  {
    icon: BarChart3,
    title: "Expense Tracking",
    description:
      "Automatically categorize and track your expenses with detailed insights and beautiful visualizations.",
  },
  {
    icon: Target,
    title: "Goal Setting",
    description: "Set and achieve financial goals with personalized recommendations and progress tracking.",
  },
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "Your financial data is protected with 256-bit encryption and multi-factor authentication.",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Manage your finances on-the-go with our intuitive mobile app available on iOS and Android.",
  },
  {
    icon: CreditCard,
    title: "Account Sync",
    description: "Connect all your bank accounts and credit cards for a complete financial overview.",
  },
]


const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    content:
      "FinanceFlow helped me save $5,000 in just 6 months. The budgeting features are incredibly intuitive and the insights are spot-on.",
    rating: 5,
    avatar: avatar1,
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    content:
      "As a tech person, I appreciate the clean interface and powerful features. Finally, a finance app that doesn't feel overwhelming.",
    rating: 5,
    avatar: avatar2,
  },
  {
    name: "Emily Rodriguez",
    role: "Small Business Owner",
    content:
      "Managing both personal and business finances has never been easier. The goal tracking feature keeps me motivated every day.",
    rating: 5,
    avatar: avatar3,
  },
]

const LandingPage = () => {


  const navigate = useNavigate();

  const onLogin = () => {
    navigate("/login")
  }
  const onRegister = () => {
    navigate("/register")
  }


  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Wallet className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">FinanceFlow</span>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-foreground hover:text-primary cursor-pointer" onClick={onLogin}>
            Login
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer" onClick={onRegister}>Get Started</Button> 
        </div>
      </div>
    </header>
      <main>

        <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-muted py-20 lg:py-32">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-[url('./assets/abstract-financial-growth.png')] bg-cover bg-center opacity-5" />

          <div className="container relative m-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                <TrendingUp className="mr-2 h-4 w-4" />
                Take Control of Your Financial Future
              </div>

              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Smart Money
                <span className="text-primary"> Management</span>
                <br />
                Made Simple
              </h1>

              <p className="mb-8 text-lg text-muted-foreground sm:text-xl lg:text-2xl">
                Track expenses, set budgets, and achieve your financial goals with our intuitive personal finance app. Join
                thousands who've transformed their financial lives.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  Watch Demo
                </Button>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">$2M+</div>
                  <div className="text-sm text-muted-foreground">Money Saved</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">4.9★</div>
                  <div className="text-sm text-muted-foreground">App Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>



         <section className="py-20 lg:py-32">
          <div className="container m-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Everything you need to manage your money
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Powerful features designed to help you take control of your financial life
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="border-border bg-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-card-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>



        <section className="bg-muted py-20 lg:py-32">
          <div className="container m-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Loved by thousands of users</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                See what our users have to say about their financial transformation
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-background border-border">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-card-foreground mb-6">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="h-10 w-10 rounded-full mr-3"
                      />
                      <div>
                        <div className="font-semibold text-card-foreground">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>


        
        <section className="bg-primary py-20 lg:py-32">
          <div className="container m-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center rounded-full bg-primary-foreground/10 px-4 py-2 text-sm font-medium text-primary-foreground">
                <Sparkles className="mr-2 h-4 w-4" />
                Limited Time Offer
              </div>

              <h2 className="mb-6 text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
                Ready to transform your financial life?
              </h2>

              <p className="mb-8 text-lg text-primary-foreground/80 sm:text-xl">
                Join thousands of users who have already taken control of their finances. Start your free trial today and
                see the difference in just 30 days.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                >
                  Schedule a Demo
                </Button>
              </div>

              <p className="mt-6 text-sm text-primary-foreground/60">
                No credit card required • 30-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        </section>


      </main>
      
      <footer className="border-t bg-muted">
        <div className="container py-12 m-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center md:text-left">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Wallet className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold text-foreground">FinanceFlow</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering individuals to take control of their financial future with smart, intuitive tools.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Mobile App
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    GDPR
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 FinanceFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>


    </div>
  )
}

export default LandingPage