import { useState } from "react";
import { ACCENTS, RIBBON_BG, type Accent } from "@/lib/recipes";

const LABELS: Record<Accent, string> = {
  "ribbon-rose": "rosa",
  "ribbon-sage": "salvia",
  "ribbon-butter": "mantequilla",
  "ribbon-peach": "durazno",
};

/** Botones de costura ilustrados: al tocar uno, la página cambia su listón de acento. */
export function SewingButtons({ accent, onPick }: { accent: Accent; onPick: (a: Accent) => void }) {
  const [wiggling, setWiggling] = useState<Accent | null>(null);

  const pick = (a: Accent) => {
    setWiggling(a);
    onPick(a);
    window.setTimeout(() => setWiggling((c) => (c === a ? null : c)), 450);
  };

  return (
    <div role="group" aria-label="Botones de costura para cambiar el listón del recetario" className="flex items-center gap-3">
      <span className="font-script text-sm text-primary">Costura:</span>
      {ACCENTS.map((a) => (
        <button
          key={a}
          type="button"
          onClick={() => pick(a)}
          aria-pressed={accent === a}
          aria-label={`Botón de costura color ${LABELS[a]}`}
          title={`Botón de costura color ${LABELS[a]}`}
          className={`sew-button relative flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-110 ${
            accent === a ? "ring-2 ring-ink/50 ring-offset-2 ring-offset-paper" : "opacity-85"
          } ${wiggling === a ? "animate-wiggle" : ""}`}
        >
          {/* Los cuatro agujeritos del botón */}
          <span className="grid grid-cols-2 gap-1.5">
            <span className="h-1 w-1 rounded-full bg-ink/70" />
            <span className="h-1 w-1 rounded-full bg-ink/70" />
            <span className="h-1 w-1 rounded-full bg-ink/70" />
            <span className="h-1 w-1 rounded-full bg-ink/70" />
          </span>
        </button>
      ))}
    </div>
  );
}
