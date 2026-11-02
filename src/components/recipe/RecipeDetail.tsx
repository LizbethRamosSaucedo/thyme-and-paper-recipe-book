import { useState } from "react";
import { ArrowLeft, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import bunny from "@/assets/bunny.png";
import { RIBBON_BG, type Recipe, type Accent } from "@/lib/recipes";

interface Props {
  recipe: Recipe;
  fav: boolean;
  toggleFav: () => void;
  onBack: () => void;
  onPrev: () => void;
  onNext: () => void;
  accent: Accent;
}

export function RecipeDetail({ recipe, fav, toggleFav, onBack, onPrev, onNext, accent }: Props) {
  const [step, setStep] = useState(0);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setChecked((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });

  return (
    <article key={recipe.id} className="paper animate-page relative mx-auto max-w-5xl rounded-lg px-5 py-8 md:px-12 md:py-12">
      {/* Listón de tela de la página, del color elegido en los botones de costura */}
      <div className={`pointer-events-none absolute -top-2 right-12 h-24 w-5 shadow-md [clip-path:polygon(0_0,100%_0,100%_100%,50%_85%,0_100%)] ${RIBBON_BG[accent]}`} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={onBack} className="flex items-center gap-1 font-serif italic text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Volver al índice
        </button>
        <div className="flex gap-2">
          <button type="button" onClick={onPrev} className="kraft rounded-full p-2 text-ink hover:scale-110 transition-transform" aria-label="Receta anterior"><ChevronLeft className="h-4 w-4" /></button>
          <button type="button" onClick={onNext} className="kraft rounded-full p-2 text-ink hover:scale-110 transition-transform" aria-label="Receta siguiente"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>

      <header className="mt-6 border-b-2 border-dashed pb-6">
        <p className="font-script text-primary">Receta de la casa de mamá Gris</p>
        <p className="mt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">{recipe.category}</p>
        <h2 className="font-serif text-3xl font-bold text-ink md:text-5xl">{recipe.title}</h2>
        <p className="mt-2 italic text-muted-foreground">“{recipe.note}”</p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-ink">
          <span>⏲ {recipe.time}</span><span>🍽 {recipe.serves} porciones</span>
          <button type="button" onClick={toggleFav} className="flex items-center gap-1 rounded-full border-2 border-dotted border-primary/60 px-3 py-1 hover:bg-accent">
            <Heart className={`h-4 w-4 text-primary ${fav ? "fill-primary" : ""}`} /> {fav ? "Favorita" : "Guardar"}
          </button>
        </div>
      </header>

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.5fr]">
        {/* Servilleta bordada con los ingredientes */}
        <section className="linen corner-stitch clipping relative p-6">
          <h3 className="font-serif text-xl font-bold text-ink">Ingredientes</h3>
          <ul className="mt-3 space-y-2">
            {recipe.ingredients.map((ing, i) => (
              <li key={ing}>
                <button type="button" onClick={() => toggle(i)} className="flex w-full items-center gap-3 text-left text-ink">
                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-ink/60 text-[10px] ${checked.has(i) ? "bg-ribbon-sage" : "bg-paper"}`}>{checked.has(i) ? "✓" : "··"}</span>
                  <span className={checked.has(i) ? "line-through opacity-60" : ""}>{ing}</span>
                </button>
              </li>
            ))}
          </ul>
          <img src={bunny} alt="" width={816} height={816} loading="lazy" className="pointer-events-none absolute -bottom-4 -right-2 h-20 w-20 object-contain opacity-90" />
        </section>

        <section>
          <h3 className="font-serif text-xl font-bold text-ink">Paso a paso</h3>
          <ol className="mt-4 space-y-3">
            {recipe.steps.map((s, i) => (
              <li key={i}>
                <button type="button" onClick={() => setStep(i)}
                  className={`flex w-full gap-4 rounded-md p-4 text-left transition-all ${i === step ? "paper scale-[1.02] ring-2" : i < step ? "opacity-50" : "hover:bg-muted"}`}
                  style={i === step ? { "--tw-ring-color": `var(--${accent})` } as React.CSSProperties : undefined}>
                  <span className="font-serif text-3xl font-bold text-primary">{i + 1}</span>
                  <span className="text-ink">{s}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex justify-between">
            <button type="button" disabled={step === 0} onClick={() => setStep(step - 1)} className="rounded-md border-2 border-dashed px-4 py-2 font-serif text-ink disabled:opacity-40 hover:bg-muted">← Anterior</button>
            {step < recipe.steps.length - 1 ? (
              <button type="button" onClick={() => setStep(step + 1)} className="rounded-md bg-primary px-4 py-2 font-serif text-primary-foreground hover:opacity-90">Siguiente paso →</button>
            ) : (
              <span className="font-script text-primary">¡Buen provecho! ✿</span>
            )}
          </div>
        </section>
      </div>
    </article>
  );
}
