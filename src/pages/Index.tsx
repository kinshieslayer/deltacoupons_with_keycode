import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import CouponCard from "@/components/CouponCard";
import NewestCouponsSidebar from "@/components/NewestCouponsSidebar";
import { coupons } from "@/data/coupons";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 12;

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ["All", ...new Set(coupons.map((c) => c.category))];

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesCategory = selectedCategory === "All" || coupon.category === selectedCategory;
    const matchesSearch = coupon.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredCoupons.length / ITEMS_PER_PAGE);
  const paginatedCoupons = filteredCoupons.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-10">
          <HeroSlider />
        </section>

        {/* Search Bar (Mobile/Secondary) */}
        <div className="mb-8 sm:hidden">
          <div className="flex items-center gap-2 bg-card rounded border border-border px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search coupons..."
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Coupons Grid */}
          <section className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <h2 className="text-2xl font-bold text-foreground">
                {selectedCategory === "All" ? "Featured" : selectedCategory} <span className="text-primary">Deals</span>
              </h2>
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                {categories.slice(0, 5).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedCategory(filter)}
                    className={`px-4 py-1.5 text-sm font-semibold rounded border transition-all whitespace-nowrap ${filter === selectedCategory
                      ? "bg-primary text-background border-primary"
                      : "bg-card text-muted-foreground border-border hover:border-primary/50"
                      }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {filteredCoupons.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                  {paginatedCoupons.map((coupon, i) => (
                    <CouponCard key={coupon.id} coupon={coupon} index={i} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="h-10 w-10 border-border bg-card hover:bg-muted text-foreground"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <span className="text-sm font-bold text-muted-foreground">
                      Page <span className="text-primary">{currentPage}</span> of {totalPages}
                    </span>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="h-10 w-10 border-border bg-card hover:bg-muted text-foreground"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-card border border-border p-4 rounded mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">No deals found</h3>
                <p className="text-muted-foreground">Try adjusting your search or category filter.</p>
                <Button
                  variant="link"
                  onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                  className="text-primary mt-2 uppercase font-bold text-xs tracking-wider"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </section>

          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <NewestCouponsSidebar />
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/20 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 KeyHaven. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy", "Terms", "Support"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
