import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // TODO: Implement actual search functionality
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Find Your Investment</h2>
        <p className="text-lg text-muted-foreground">
          Search through FTSE 100 companies and discover market opportunities
        </p>
      </div>

      <div className="financial-card bg-white">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search stocks... (e.g., AAPL, Tesla, Vodafone)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="h-12 text-lg px-4 bg-input border-border focus:border-primary focus:ring-primary/20 transition-smooth"
            />
          </div>
          <Button 
            onClick={handleSearch}
            className="h-12 px-8 bg-gradient-primary hover:opacity-90 text-white shadow-soft transition-smooth flex items-center gap-2"
          >
            <Search className="h-5 w-5" />
            Search
          </Button>
        </div>

        {/* Popular searches */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">Popular searches:</p>
          <div className="flex flex-wrap gap-2">
            {['Shell', 'BP', 'Vodafone', 'HSBC', 'Tesco', 'Unilever'].map((stock) => (
              <button
                key={stock}
                onClick={() => setSearchQuery(stock)}
                className="px-3 py-2 text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md transition-smooth"
              >
                {stock}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;