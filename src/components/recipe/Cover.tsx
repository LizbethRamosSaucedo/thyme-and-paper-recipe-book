import { useEffect, useRef, useState } from "react";
import leather from "@/assets/leather.jpg";
import bunny from "@/assets/bunny.png";

export function Cover({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const open = () => {
    if (opening) return;
    setOpening(true);
    timer.current = setTimeout(onOpen, 900);
  };
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <button
        type="button"
        onClick={open}
        aria-label="Abrir el recetario"
        className={`group relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-r-2xl rounded-l-md shadow-book transition-transform duration-500 hover:-rotate-1 hover:scale-[1.02] ${opening ? "animate-cover-open" : ""}`}
        style={{ backgroundImage: `url(${leather})`, backgroundSize: "cover" }}
      >
        <div className="absolute right-10 top-0 h-full w-6 bg-ribbon-rose/90 shadow-md transition-all group-hover:w-7" />
        <div className="absolute inset-8 flex flex-col items-center justify-center gap-4 rounded-md border-2 border-gold/60 p-6 text-center">
          <div className="linen corner-stitch clipping w-full -rotate-2 px-6 py-6 transition-transform group-hover:rotate-0">
            <p className="font-script text-sm text-primary">Recetas de la casa de mamá Gris</p>
            <h1 className="mt-2 font-serif text-4xl font-bold leading-tight text-ink md:text-5xl">Recetario</h1>
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">Hecho a mano</p>
          </div>
          <img src={bunny} alt="Conejita con cuchara de madera" width={816} height={816} className="h-40 w-40 object-contain drop-shadow-lg" />
          <span className="rounded-full border border-gold/70 px-5 py-2 font-serif text-sm italic text-gold transition-colors group-hover:bg-gold/20">
            Toca para abrir ✦
          </span>
        </div>
      </button>
    </div>
  );
}
