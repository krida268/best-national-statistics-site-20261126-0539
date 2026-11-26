// main.js — titik masuk DataNusa: pasang router hash, render halaman pertama.
import { render } from "./views.js";

window.addEventListener("hashchange", render);
render();
