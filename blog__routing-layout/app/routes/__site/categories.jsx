import { CATEGORIES as categories } from "~/../data/dummy";
import CategoriesList from "~/components/site/category/CategoriesList";

export default function CategoriesPage() {
  return (
    <div class="categories-list">
      <h1 class="font-bold text-xl mb-3 border-b">Categories</h1>
      
      <CategoriesList categories={categories} />
    </div>
  );
}
