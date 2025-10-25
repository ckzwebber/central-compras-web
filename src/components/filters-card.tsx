import { ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export type ProductFilters = {
  search: string;
  category: string;
  minPrice: number | null;
  maxPrice: number | null;
};

export const defaultFilters: ProductFilters = {
  search: "",
  category: "all",
  minPrice: null,
  maxPrice: null,
};

type FiltersCardProps = {
  filters: ProductFilters;
  categories: string[];
  onFiltersChange: (filters: ProductFilters) => void;
  className?: string;
};

export const FiltersCard = ({ filters, categories, onFiltersChange, className }: FiltersCardProps) => {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, search: event.target.value });
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, category: event.target.value });
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const numericValue = value === "" ? null : Number(value);

    onFiltersChange({
      ...filters,
      [name]: Number.isNaN(numericValue) ? null : numericValue,
    });
  };

  const handleReset = () => {
    onFiltersChange({ ...defaultFilters });
  };

  return (
    <Card className={cn("lg:sticky lg:top-32 bg-zinc-950 border border-zinc-800 transition-all hover:border-zinc-500", className)}>
      <CardHeader className="gap-1">
        <CardTitle className="text-lg text-white">Filters</CardTitle>
        <CardDescription className="text-zinc-500">Refine results by search, category, or price range.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="search" className="text-zinc-100">
            Search
          </Label>
          <Input className="text-white border border-zinc-800" id="search" name="search" value={filters.search} placeholder="Product name" onChange={handleSearchChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-zinc-100">
            Category
          </Label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleCategoryChange}
            className="text-zinc-500 h-9 w-full rounded-md px-3 text-sm transition-colors focus:outline-none border border-zinc-800">
            <option value="all">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="minPrice" className="text-zinc-100">
              Minimum price
            </Label>
            <Input className="text-white border border-zinc-800" id="minPrice" name="minPrice" type="number" inputMode="decimal" placeholder="0.00" value={filters.minPrice ?? ""} onChange={handlePriceChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxPrice" className="text-zinc-100">
              Maximum price
            </Label>
            <Input className="text-white border border-zinc-800" id="maxPrice" name="maxPrice" type="number" inputMode="decimal" placeholder="0.00" value={filters.maxPrice ?? ""} onChange={handlePriceChange} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-start text-zinc-100">
        <Button variant="ghost" size="sm" onClick={handleReset}>
          Clear filters
        </Button>
      </CardFooter>
    </Card>
  );
};
