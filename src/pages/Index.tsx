import Navbar from "@/components/Navbar";
import StockGraph from "@/components/StockGraph";
import SearchSection from "@/components/SearchSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero section with stock graph */}
        <section className="text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              FTSE 100 Market Insights
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track real-time performance of the UK's leading companies with professional-grade analytics
            </p>
          </div>
          <StockGraph />
        </section>

        {/* Search Section */}
        <section>
          <SearchSection />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">
            © 2024 FTSE Insight. Real-time market data and analytics platform.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
