export type Category = "Desayunos" | "Panes" | "Pasteles" | "Galletas" | "Sopas" | "Conservas";

export interface Recipe {
  id: string;
  title: string;
  category: Category;
  time: string;
  serves: number;
  note: string;
  ingredients: string[];
  steps: string[];
}

export const CATEGORIES: { name: Category; color: string }[] = [
  { name: "Desayunos", color: "ribbon-peach" },
  { name: "Panes", color: "ribbon-rose" },
  { name: "Pasteles", color: "ribbon-sage" },
  { name: "Galletas", color: "ribbon-butter" },
  { name: "Sopas", color: "ribbon-sky" },
  { name: "Conservas", color: "ribbon-lilac" },
];

/** Clases Tailwind por listón (necesarias estáticas para que Tailwind las genere). */
export const RIBBON_BG: Record<string, string> = {
  "ribbon-rose": "bg-ribbon-rose",
  "ribbon-sage": "bg-ribbon-sage",
  "ribbon-butter": "bg-ribbon-butter",
  "ribbon-sky": "bg-ribbon-sky",
  "ribbon-lilac": "bg-ribbon-lilac",
  "ribbon-peach": "bg-ribbon-peach",
};

/** Botones de costura interactivos: cambian el listón de acento de la página. */
export const ACCENTS = ["ribbon-rose", "ribbon-sage", "ribbon-butter", "ribbon-peach"] as const;
export type Accent = (typeof ACCENTS)[number];

export const RECIPES: Recipe[] = [
  { id: "pan-canela", title: "Rollos de Canela de la Abuela", category: "Panes", time: "2 h 30 min", serves: 12, note: "Mejor recién salidos del horno, con café.",
    ingredients: ["500 g de harina", "250 ml de leche tibia", "7 g de levadura", "80 g de mantequilla", "100 g de azúcar morena", "2 cdas de canela", "1 huevo"],
    steps: ["Disuelve la levadura en la leche tibia con una pizca de azúcar.", "Mezcla con harina, huevo y la mitad de la mantequilla; amasa 10 minutos.", "Deja reposar tapado 1 hora hasta duplicar.", "Extiende, unta mantequilla, azúcar y canela; enrolla y corta.", "Reposa 30 minutos más y hornea a 180 °C por 25 minutos."] },
  { id: "pan-campo", title: "Pan de Campo con Romero", category: "Panes", time: "3 h", serves: 8, note: "Huele a domingo en la granja.",
    ingredients: ["450 g de harina", "320 ml de agua", "10 g de sal", "5 g de levadura", "Romero fresco", "Aceite de oliva"],
    steps: ["Mezcla harina, agua y levadura; reposa 20 minutos.", "Añade sal y romero picado; amasa suave.", "Fermenta 2 horas con pliegues cada 30 minutos.", "Forma una bola y hornea en olla tapada a 230 °C por 40 minutos."] },
  { id: "pastel-zanahoria", title: "Pastel de Zanahoria del Conejo", category: "Pasteles", time: "1 h 20 min", serves: 10, note: "El favorito de todos los conejitos del huerto.",
    ingredients: ["300 g de zanahoria rallada", "250 g de harina", "200 g de azúcar", "3 huevos", "180 ml de aceite", "Nueces", "Queso crema", "Canela"],
    steps: ["Bate huevos, azúcar y aceite hasta espumar.", "Incorpora harina, canela y polvo para hornear.", "Añade zanahoria y nueces con movimientos envolventes.", "Hornea a 175 °C por 45 minutos.", "Cubre con frosting de queso crema ya frío."] },
  { id: "pastel-limon", title: "Bizcocho de Limón y Lavanda", category: "Pasteles", time: "1 h", serves: 8, note: "Ideal para el té de la tarde.",
    ingredients: ["200 g de harina", "180 g de azúcar", "3 huevos", "Ralladura de 2 limones", "1 cdta de lavanda seca", "150 g de mantequilla"],
    steps: ["Acrema mantequilla y azúcar con la lavanda.", "Agrega huevos uno a uno y la ralladura.", "Incorpora la harina tamizada.", "Hornea a 170 °C por 40 minutos y glasea con limón."] },
  { id: "galletas-avena", title: "Galletas de Avena y Pasas", category: "Galletas", time: "35 min", serves: 24, note: "Guárdalas en la lata de flores.",
    ingredients: ["200 g de avena", "150 g de harina", "120 g de mantequilla", "100 g de azúcar morena", "1 huevo", "80 g de pasas", "Vainilla"],
    steps: ["Bate mantequilla y azúcar hasta cremar.", "Añade huevo y vainilla.", "Integra avena, harina y pasas.", "Forma bolitas y hornea a 180 °C por 12 minutos."] },
  { id: "galletas-mantequilla", title: "Galletas de Mantequilla con Botón", category: "Galletas", time: "50 min", serves: 30, note: "Marca el centro con un dedal para que parezcan botones.",
    ingredients: ["250 g de harina", "180 g de mantequilla", "90 g de azúcar glas", "1 yema", "Pizca de sal"],
    steps: ["Mezcla mantequilla y azúcar glas.", "Añade yema, harina y sal; forma una masa.", "Refrigera 30 minutos, estira y corta círculos.", "Marca cuatro agujeritos y hornea a 170 °C por 10 minutos."] },
  { id: "sopa-calabaza", title: "Crema de Calabaza Otoñal", category: "Sopas", time: "45 min", serves: 6, note: "Sirve con pan tostado y una hoja de salvia.",
    ingredients: ["1 kg de calabaza", "1 cebolla", "2 dientes de ajo", "1 l de caldo", "100 ml de crema", "Nuez moscada"],
    steps: ["Sofríe cebolla y ajo en mantequilla.", "Agrega la calabaza en cubos y el caldo.", "Cuece 25 minutos y licúa.", "Termina con crema y nuez moscada."] },
  { id: "sopa-verduras", title: "Sopa de Huerto", category: "Sopas", time: "40 min", serves: 6, note: "Todo lo que el conejo encontró en el huerto.",
    ingredients: ["2 zanahorias", "1 poro", "2 papas", "Chícharos", "Apio", "Caldo de verduras", "Perejil"],
    steps: ["Pica todas las verduras.", "Sofríe el poro y el apio.", "Añade el resto y el caldo; cuece 25 minutos.", "Sirve con perejil fresco."] },
  { id: "mermelada-fresa", title: "Mermelada de Fresa", category: "Conservas", time: "1 h", serves: 4, note: "Cubre la tapa con tela de cuadritos.",
    ingredients: ["1 kg de fresas", "600 g de azúcar", "Jugo de 1 limón"],
    steps: ["Macera las fresas con el azúcar 1 hora.", "Cuece a fuego medio removiendo 35 minutos.", "Añade el limón y prueba el punto en un plato frío.", "Envasa en frascos esterilizados."] },
  { id: "crepas-avena", title: "Crepas de Avena de mamá Gris", category: "Desayunos", time: "15 min", serves: 4, note: "Receta de la casa de mamá Gris; también riquísimas como postre.",
    ingredients: ["1 taza de avena", "1 huevo", "Esencia de vainilla", "3/4 taza de leche", "Canela al gusto", "Mantequilla", "Fresas y miel para decorar (o al gusto)"],
    steps: ["Vierte todos los ingredientes en la licuadora hasta que se haga una mezcla homogénea.", "Pon en el sartén una capa fina, previamente engrasada con mantequilla.", "Cocina hasta dorar ligeramente y decora con fresas y miel al gusto."] },
  { id: "durazno-almibar", title: "Duraznos en Almíbar", category: "Conservas", time: "50 min", serves: 6, note: "Perfectos para el invierno.",
    ingredients: ["1 kg de duraznos", "500 g de azúcar", "500 ml de agua", "1 raja de canela"],
    steps: ["Pela y parte los duraznos.", "Prepara almíbar con agua, azúcar y canela.", "Cuece los duraznos 15 minutos.", "Envasa calientes y sella."] },
];
