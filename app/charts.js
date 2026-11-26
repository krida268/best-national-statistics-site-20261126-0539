// charts.js — grafik SVG buatan tangan (tanpa library).
// Semua fungsi mengembalikan string SVG yang bisa disisipkan ke halaman.

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function niceTicks(min, max, count) {
  if (min === max) { min -= 1; max += 1; }
  const step = (max - min) / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step)));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const s = nice * mag;
  const start = Math.floor(min / s) * s;
  const ticks = [];
  for (let v = start; v <= max + s * 0.5; v += s) ticks.push(v);
  return { ticks, step: s };
}

function fmtNum(v, decimals) {
  const d = decimals === undefined ? (Math.abs(v) >= 100 ? 0 : 2) : decimals;
  return v.toLocaleString("id-ID", { minimumFractionDigits: d, maximumFractionDigits: d });
}

// Grafik garis dengan titik + label nilai.
export function lineChart(series, opts) {
  const o = Object.assign({ width: 640, height: 260, color: "#b3261e", unit: "", decimals: undefined, area: true, ymin: null, ymax: null }, opts || {});
  const padL = 52, padR = 14, padT = 18, padB = 30;
  const w = o.width, h = o.height;
  const iw = w - padL - padR, ih = h - padT - padB;
  let min = Math.min.apply(null, series.map((p) => p.value));
  let max = Math.max.apply(null, series.map((p) => p.value));
  if (o.ymin !== null) min = Math.min(min, o.ymin);
  if (o.ymax !== null) max = Math.max(max, o.ymax);
  const span = (max - min) || 1;
  min -= span * 0.08; max += span * 0.12;
  const { ticks } = niceTicks(min, max, 4);
  const x = (i) => padL + (iw * i) / Math.max(series.length - 1, 1);
  const y = (v) => padT + ih - ((v - min) / (max - min)) * ih;
  let grid = "";
  ticks.forEach((t) => {
    if (t < min || t > max) return;
    grid += `<line x1="${padL}" y1="${y(t)}" x2="${w - padR}" y2="${y(t)}" stroke="#e3ddd0" stroke-width="1"/>` +
      `<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="#6b7280">${fmtNum(t, o.decimals)}${o.unit}</text>`;
  });
  const pts = series.map((p, i) => `${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
  let area = "";
  if (o.area) area = `<polygon points="${padL},${y(min)} ${pts} ${x(series.length - 1)},${y(min)}" fill="${o.color}" opacity="0.08"/>`;
  let dots = "";
  series.forEach((p, i) => {
    dots += `<circle cx="${x(i)}" cy="${y(p.value)}" r="4" fill="#fff" stroke="${o.color}" stroke-width="2.5"/>` +
      `<text x="${x(i)}" y="${y(p.value) - 10}" text-anchor="middle" font-size="11.5" font-weight="700" fill="#17252e">${fmtNum(p.value, o.decimals)}${o.unit}</text>`;
  });
  let labels = "";
  series.forEach((p, i) => {
    labels += `<text x="${x(i)}" y="${h - 8}" text-anchor="middle" font-size="11.5" fill="#6b7280">${p.year}</text>`;
  });
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Grafik garis">${grid}${area}` +
    `<polyline points="${pts}" fill="none" stroke="${o.color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${dots}${labels}</svg>`;
}

// Grafik batang vertikal.
export function barChart(series, opts) {
  const o = Object.assign({ width: 640, height: 260, color: "#0f766e", unit: "", decimals: undefined, negColor: "#b3261e" }, opts || {});
  const padL = 52, padR = 14, padT = 26, padB = 30;
  const w = o.width, h = o.height;
  const iw = w - padL - padR, ih = h - padT - padB;
  let min = Math.min(0, Math.min.apply(null, series.map((p) => p.value)));
  let max = Math.max.apply(null, series.map((p) => p.value));
  if (max <= 0) max = 1;
  const span = (max - min) || 1;
  max += span * 0.12;
  const { ticks } = niceTicks(min, max, 4);
  const y = (v) => padT + ih - ((v - min) / (max - min)) * ih;
  const bw = iw / series.length;
  let grid = "";
  ticks.forEach((t) => {
    grid += `<line x1="${padL}" y1="${y(t)}" x2="${w - padR}" y2="${y(t)}" stroke="#e3ddd0" stroke-width="1"/>` +
      `<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="#6b7280">${fmtNum(t, o.decimals)}${o.unit}</text>`;
  });
  let bars = "";
  series.forEach((p, i) => {
    const bx = padL + i * bw + bw * 0.16;
    const bwid = bw * 0.68;
    const top = y(Math.max(p.value, 0));
    const base = y(Math.min(p.value, 0));
    const col = p.value < 0 ? o.negColor : o.color;
    bars += `<rect x="${bx.toFixed(1)}" y="${top.toFixed(1)}" width="${bwid.toFixed(1)}" height="${Math.max(base - top, 1).toFixed(1)}" rx="3" fill="${col}"/>` +
      `<text x="${(bx + bwid / 2).toFixed(1)}" y="${(top - 7).toFixed(1)}" text-anchor="middle" font-size="11.5" font-weight="700" fill="#17252e">${fmtNum(p.value, o.decimals)}${o.unit}</text>` +
      `<text x="${(bx + bwid / 2).toFixed(1)}" y="${h - 8}" text-anchor="middle" font-size="11.5" fill="#6b7280">${p.year}</text>`;
  });
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Grafik batang">${grid}${bars}</svg>`;
}

// Grafik batang ganda (dua seri berdampingan).
export function groupedBarChart(a, b, opts) {
  const o = Object.assign({ width: 640, height: 260, colorA: "#b3261e", colorB: "#0f766e", unit: "", decimals: 0, labelA: "A", labelB: "B" }, opts || {});
  const padL = 52, padR = 14, padT = 26, padB = 30;
  const w = o.width, h = o.height;
  const iw = w - padL - padR, ih = h - padT - padB;
  let max = Math.max.apply(null, a.concat(b).map((p) => p.value));
  max *= 1.15;
  const { ticks } = niceTicks(0, max, 4);
  const y = (v) => padT + ih - (v / max) * ih;
  const gw = iw / a.length;
  let grid = "";
  ticks.forEach((t) => {
    grid += `<line x1="${padL}" y1="${y(t)}" x2="${w - padR}" y2="${y(t)}" stroke="#e3ddd0" stroke-width="1"/>` +
      `<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="#6b7280">${fmtNum(t, o.decimals)}${o.unit}</text>`;
  });
  let bars = "";
  a.forEach((p, i) => {
    const gx = padL + i * gw;
    const bw = gw * 0.36;
    bars += `<rect x="${(gx + gw * 0.08).toFixed(1)}" y="${y(p.value).toFixed(1)}" width="${bw.toFixed(1)}" height="${(y(0) - y(p.value)).toFixed(1)}" rx="3" fill="${o.colorA}"/>` +
      `<rect x="${(gx + gw * 0.50).toFixed(1)}" y="${y(b[i].value).toFixed(1)}" width="${bw.toFixed(1)}" height="${(y(0) - y(b[i].value)).toFixed(1)}" rx="3" fill="${o.colorB}"/>` +
      `<text x="${(gx + gw / 2).toFixed(1)}" y="${h - 8}" text-anchor="middle" font-size="11.5" fill="#6b7280">${p.year}</text>`;
  });
  const legend = `<g font-size="12" fill="#17252e"><rect x="${padL}" y="2" width="12" height="12" rx="2" fill="${o.colorA}"/><text x="${padL + 17}" y="12">${esc(o.labelA)}</text>` +
    `<rect x="${padL + 110}" y="2" width="12" height="12" rx="2" fill="${o.colorB}"/><text x="${padL + 127}" y="12">${esc(o.labelB)}</text></g>`;
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Grafik batang ganda">${legend}${grid}${bars}</svg>`;
}

// Batang horizontal berlabel (untuk pangsa sektor / struktur umur).
export function hbarChart(rows, opts) {
  const o = Object.assign({ width: 640, color: "#0f766e", unit: "%", decimals: 1, max: null }, opts || {});
  const rowH = 34, padT = 8, padB = 10;
  const w = o.width, h = padT + rows.length * rowH + padB;
  const maxV = o.max || Math.max.apply(null, rows.map((r) => r.value));
  const labelW = 210, valW = 58, barX = labelW + 8, barW = w - barX - valW;
  let out = "";
  rows.forEach((r, i) => {
    const y = padT + i * rowH;
    const bw = Math.max((r.value / maxV) * barW, 2);
    out += `<text x="0" y="${y + 15}" font-size="12.5" fill="#17252e">${esc(r.label)}</text>` +
      `<rect x="${barX}" y="${y + 2}" width="${bw.toFixed(1)}" height="16" rx="3" fill="${r.color || o.color}"/>` +
      `<text x="${barX + bw + 8}" y="${y + 15}" font-size="12.5" font-weight="700" fill="#17252e">${fmtNum(r.value, o.decimals)}${o.unit}</text>`;
  });
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Grafik batang horizontal">${out}</svg>`;
}
