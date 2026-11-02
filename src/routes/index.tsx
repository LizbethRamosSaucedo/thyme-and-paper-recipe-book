import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Cover } from "@/components/recipe/Cover";
import { RecipeIndex } from "@/components/recipe/RecipeIndex";
import { RecipeDetail } from "@/components/recipe/RecipeDetail";
import { RECIPES, type Accent, type Category } from "@/lib/recipes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Recetario — Recetas de la casa de mamá Gris" },
      { name: "description", content: "El recetario de la casa de mamá Gris: recetas caseras paso a paso, con búsqueda, filtros y favoritas." },
      { property: "og:title", content: "Recetario — Recetas de la casa de mamá Gris" },
      { property: "og:description", content: "Abre el recetario y descubre las recetas de la casa de mamá Gris." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const FAV_KEY = "recetario-favs";

function Index() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [category, setCategory] = useState<Category | "Todas">("Todas");
  const [query, setQuery] = useState("");
  const [onlyFav, setOnlyFav] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [accent, setAccent] = useState<Accent>("ribbon-rose");

  useEffect(() => {
    try { setFavorites(new Set(JSON.parse(localStorage.getItem(FAV_KEY) || "[]"))); } catch {}
  }, []);

  const toggleFav = (id: string) =>
    setFavorites((f) => {
      const n = new Set(f);
      n.has(id) ? n.delete(id) : n.add(id);
      localStorage.setItem(FAV_KEY, JSON.stringify([...n]));
      return n;
    });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RECIPES.filter((r) =>
      (category === "Todas" || r.category === category) &&
      (!onlyFav || favorites.has(r.id)) &&
      (!q || r.title.toLowerCase().includes(q) || r.ingredients.some((i) => i.toLowerCase().includes(q))));
  }, [category, query, onlyFav, favorites]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [selected, open]);

  if (!open) return <Cover onOpen={() => setOpen(true)} />;

  const recipe = RECIPES.find((r) => r.id === selected);
  const list = filtered.length ? filtered : RECIPES;
  const move = (d: number) => {
    const idx = list.findIndex((r) => r.id === selected);
    const next = list[(idx + d + list.length) % list.length];
    if (next) setSelected(next.id);
  };

  return (
    <main className="min-h-screen px-3 py-8 md:px-8 md:py-14">
      {recipe ? (
        <RecipeDetail key={recipe.id} recipe={recipe} fav={favorites.has(recipe.id)} toggleFav={() => toggleFav(recipe.id)}
          onBack={() => setSelected(null)} onPrev={() => move(-1)} onNext={() => move(1)} accent={accent} />
      ) : (
        <RecipeIndex recipes={filtered} category={category} setCategory={setCategory} query={query} setQuery={setQuery}
          onlyFav={onlyFav} setOnlyFav={setOnlyFav} favorites={favorites} toggleFav={toggleFav}
          onSelect={setSelected} onClose={() => setOpen(false)} accent={accent} setAccent={setAccent} />
      )}
    </main>
  );
}
