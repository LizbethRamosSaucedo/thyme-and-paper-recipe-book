import { Heart, Search, BookMarked } from "lucide-react";
import bunny from "@/assets/bunny.png";
import { CATEGORIES, RIBBON_BG, type Category, type Accent, type Recipe } from "@/lib/recipes";

interface Props {
  recipes: Recipe[];
  category: Category | "Todas";
  setCategory: (c: Category | "Todas") => void;
  query: string;
  setQuery: (q: string) => void;
  onlyFav: boolean;
  setOnlyFav: (v: boolean) => void;
  favorites: Set<string>;
  toggleFav: (id: string) => void;
  onSelect: (id: string) => void;
  onClose: () => void;
  accent: Accent;
  setAccent: (a: Accent) => void;
}

export function RecipeIndex(p: Props) {
  return (
    <div className="linen animate-page corner-stitch relative mx-auto max-w-5xl rounded-lg px-5 py-8 md:px-12 md:py-12">
      <button type="button" onClick={p.onClose} className="absolute right-4 top-4 flex items-center gap-1 text-sm italic text-muted-foreground hover:text-primary">
        <BookMarked className="h-4 w-4" /> Cerrar libro
      </button>
      <header className="flex flex-col items-center gap-2 text-center md:flex-row md:text-left">
        <img src={bunny} alt="" width={816} height={816} className="h-24 w-24 object-contain" />
        <div>
          <p className="font-script text-primary">Recetas de la casa de mamá Gris</p>
          <h2 className="font-serif text-4xl font-bold text-ink">Índice del Recetario</h2>
        </div>
      </header>

      {/* Ribbon tabs */}
      <nav className="mt-8 flex flex-wrap gap-2">
        {(["Todas", ...CATEGORIES.map((c) => c.name)] as const).map((name) => {
          const color = CATEGORIES.find((c) => c.name === name)?.color;
          const active = p.category === name;
          return (
            <button
        type="button"
              key={name}
              onClick={() => p.setCategory(name)}
              className={`relative px-4 py-2 font-serif text-sm text-ink shadow-md transition-all [clip-path:polygon(0_0,100%_0,92%_50%,100%_100%,0_100%)] pr-6 hover:-translate-y-1 ${color ? RIBBON_BG[color] : "bg-secondary"} ${active ? "-translate-y-1 font-bold ring-2 ring-ink/40" : "opacity-80"}`}
            >
              {name}
            </button>
          );
        })}
      </nav>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label className="kraft flex flex-1 items-center gap-2 rounded-md px-3 py-2">
          <Search className="h-4 w-4 text-ink" />
          <input
            value={p.query}
            onChange={(e) => p.setQuery(e.target.value)}
            placeholder="Busca por nombre o ingrediente (ej. canela)…"
            className="w-full bg-transparent text-ink placeholder:text-ink/60 focus:outline-none"
          />
        </label>
        <button
        type="button"
          onClick={() => p.setOnlyFav(!p.onlyFav)}
          className={`flex items-center justify-center gap-2 rounded-md border-2 border-dashed px-4 py-2 font-serif transition-colors ${p.onlyFav ? "border-primary bg-accent text-ink" : "border-border text-muted-foreground hover:bg-muted"}`}
        >
          <Heart className={`h-4 w-4 ${p.onlyFav ? "fill-primary text-primary" : ""}`} /> Favoritas ({p.favorites.size})
        </button>
      </div>

      {/* Clippings */}
      {p.recipes.length === 0 ? (
        <div className="paper clipping mx-auto mt-12 flex max-w-md -rotate-1 flex-col items-center gap-3 p-8 text-center">
          <img src={bunny} alt="Conejito buscando en la despensa" width={816} height={816} className="h-28 w-28 animate-bounce object-contain [animation-duration:2.5s]" />
          <p className="font-serif text-lg italic text-ink">No encontramos recetas… el conejito de mamá Gris sigue buscando en la despensa.</p>
          <span className="font-script text-primary">✿ ✿ ✿</span>
        </div>
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {p.recipes.map((r, i) => {
            const color = CATEGORIES.find((c) => c.name === r.category)!.color;
            const fav = p.favorites.has(r.id);
            return (
              <li key={r.id} className={`group relative ${i % 2 ? "rotate-1" : "-rotate-1"} transition-transform hover:rotate-0 hover:scale-[1.03]`}>
                <span className="tape pointer-events-none absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 rotate-[-4deg]" />
                <div className="paper clipping flex h-full flex-col p-5 pt-7">
                  <span className={`self-start rounded-sm px-2 py-0.5 text-xs uppercase tracking-widest text-ink ${RIBBON_BG[color]}`}>{r.category}</span>
                  <button type="button" onClick={() => p.onSelect(r.id)} className="mt-3 text-left font-serif text-xl font-bold text-ink hover:text-primary hover:underline">
                    {r.title}
                  </button>
                  <p className="mt-1 text-sm italic text-muted-foreground">{r.note}</p>
                  <div className="mt-auto flex items-center justify-between pt-4 text-sm text-muted-foreground">
                    <span>⏲ {r.time} · 🍽 {r.serves}</span>
                    <button type="button" onClick={() => p.toggleFav(r.id)} aria-label={fav ? "Quitar de favoritas" : "Marcar favorita"}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-dotted border-primary/50 bg-secondary transition-transform hover:scale-110">
                      <Heart className={`h-4 w-4 ${fav ? "fill-primary text-primary" : "text-primary"}`} />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
