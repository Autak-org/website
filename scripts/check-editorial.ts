import { newsByDate } from "../src/content/news";
import { positions } from "../src/content/positions";
import { products } from "../src/content/shop";

if (newsByDate.length === 0) throw new Error("no news loaded");
if (positions.length === 0) throw new Error("no positions loaded");
if (products.length === 0) throw new Error("no products loaded");

console.log(
  `${newsByDate.length} news (latest ${newsByDate[0].slug}), ${positions.length} positions (${positions[0].id}), ${products.length} products (${products[0].id})`,
);
