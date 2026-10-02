/* =========================================================
   EDIT YOUR DETAILS HERE
   Everything on the page is filled in from this block.
   ========================================================= */
const CONFIG = {
  brideName: "Maria",
  groomName: "Franz",
  monogram: "F&M",
  monogramLong: "Franz & Maria",

  // Countdown target (Philippine time, +08:00)
  weddingDate: "2027-12-12T00:00:00+08:00",
  dateDisplay: "12 . 12 . 2027",

  venue: "The Garden Hive Events Place",
  venueCity: "Antipolo, Rizal",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=The+Garden+Hive+Events+Place+Antipolo+Rizal",

  tagline: "A beautiful day,<br>surrounded by the people<br>we love most.",

  // The torn-paper letter. Each <p> is a paragraph.
  letter: `
    <p>As I start this new chapter of my life, I keep thinking about the people who have walked with me through every other one.</p>
    <p>I can't imagine standing at the altar without you beside me.</p>
  `,

  thanksMessage: "You just made my heart so full. I can't wait to celebrate with you!",

  // Couple photo: put a file in /assets and set e.g. "assets/couple.jpg".
  // Leave empty to show the monogram instead.
  couplePhoto: "",

  // Background music: put an mp3 in /assets and set e.g. "assets/music.mp3".
  // Leave empty to hide the music button.
  music: "",

  expenses: [
    "Dress Sewing Fee <em>(fabric is on us)</em>",
    "Hair &amp; Make-Up",
    "Travel to Antipolo",
  ],

  duties: [
    "Capture BTS Photos &amp; Videos",
    "Stand by My Side on My Special Day",
    "Cry Happy Tears with Me",
    "Make Beautiful Memories Together ✨",
  ],

  dates: [
    { label: "Prenup shoot", when: "TBA" },
    { label: "The big day", when: "Dec 12, 2027" },
  ],
};

/* =========================================================
   Nothing below needs editing.
   ========================================================= */

// Always start at the top. Phones otherwise restore the old scroll
// position on reload, which drops guests straight onto the question.
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
const toTop = () => scrollTo({ top: 0, left: 0, behavior: "instant" });
toTop();

document.body.classList.add("locked");

// ---------- Fill content ----------
document.querySelectorAll("[data-bind]").forEach((el) => {
  el.textContent = CONFIG[el.dataset.bind] ?? "";
});
document.querySelectorAll("[data-bind-html]").forEach((el) => {
  el.innerHTML = CONFIG[el.dataset.bindHtml] ?? "";
});

document.getElementById("map-link").href = CONFIG.mapUrl;

const listItems = (items) => items.map((t) => `<li>${t}</li>`).join("");
document.getElementById("expenses").innerHTML = listItems(CONFIG.expenses);
document.getElementById("duties").innerHTML = listItems(CONFIG.duties);

document.getElementById("timeline").innerHTML = CONFIG.dates
  .map((d) => `<li><b>${d.label}</b><span>${d.when}</span></li>`)
  .join("");

if (CONFIG.couplePhoto) {
  const photo = document.getElementById("couple-photo");
  photo.style.backgroundImage = `url("${CONFIG.couplePhoto}")`;
  photo.classList.add("has-photo");
}

// ---------- Baby's breath sprigs (generated SVG) ----------
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function flower(x, y, r) {
  let petals = "";
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    petals += `<circle class="petal" cx="${(x + Math.cos(a) * r * 0.55).toFixed(1)}" cy="${(y + Math.sin(a) * r * 0.55).toFixed(1)}" r="${(r * 0.55).toFixed(1)}"/>`;
  }
  return petals + `<circle class="eye" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r * 0.28).toFixed(1)}"/>`;
}

function makeSprig(seed) {
  const rnd = mulberry32(seed * 9973);
  let stems = "";
  let blooms = "";

  // main stems radiate from the top-left corner
  const mains = 3 + Math.floor(rnd() * 2);
  for (let m = 0; m < mains; m++) {
    const angle = 0.15 + (m / mains) * 1.25 + rnd() * 0.15;
    const len = 150 + rnd() * 110;
    const ex = Math.cos(angle) * len;
    const ey = Math.sin(angle) * len;
    const cx = ex * 0.5 + (rnd() - 0.5) * 40;
    const cy = ey * 0.5 + (rnd() - 0.5) * 40;
    stems += `<path class="stem" d="M0 0 Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}"/>`;

    // side branches ending in clusters
    const branches = 4 + Math.floor(rnd() * 4);
    for (let b = 0; b < branches; b++) {
      const t = 0.3 + (b / branches) * 0.7;
      // point on quadratic curve
      const px = 2 * (1 - t) * t * cx + t * t * ex;
      const py = 2 * (1 - t) * t * cy + t * t * ey;
      const ba = angle + (rnd() - 0.5) * 1.6;
      const bl = 18 + rnd() * 34;
      const bx = px + Math.cos(ba) * bl;
      const by = py + Math.sin(ba) * bl;
      stems += `<path class="stem" style="stroke-width:.7" d="M${px.toFixed(1)} ${py.toFixed(1)} L${bx.toFixed(1)} ${by.toFixed(1)}"/>`;

      const count = 3 + Math.floor(rnd() * 4);
      for (let f = 0; f < count; f++) {
        const fa = rnd() * Math.PI * 2;
        const fd = 3 + rnd() * 9;
        const fx = bx + Math.cos(fa) * fd;
        const fy = by + Math.sin(fa) * fd;
        stems += `<path class="stem" style="stroke-width:.45" d="M${bx.toFixed(1)} ${by.toFixed(1)} L${fx.toFixed(1)} ${fy.toFixed(1)}"/>`;
        blooms += rnd() < 0.2
          ? `<circle class="bud" cx="${fx.toFixed(1)}" cy="${fy.toFixed(1)}" r="2"/>`
          : flower(fx, fy, 3.4 + rnd() * 2.2);
      }
    }
    blooms += flower(ex, ey, 5);
  }

  return `<svg viewBox="-10 -10 300 300" xmlns="http://www.w3.org/2000/svg">${stems}${blooms}</svg>`;
}

document.querySelectorAll("[data-sprig]").forEach((el) => {
  el.innerHTML = makeSprig(Number(el.dataset.sprig));
});

// ---------- Music ----------
const audio = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-toggle");

function setPlaying(on) {
  musicBtn.classList.toggle("is-playing", on);
  musicBtn.setAttribute("aria-label", on ? "Pause music" : "Play music");
}

if (CONFIG.music) {
  audio.src = CONFIG.music;
  audio.volume = 0.5;
  musicBtn.addEventListener("click", () => {
    if (audio.paused) audio.play().then(() => setPlaying(true)).catch(() => {});
    else { audio.pause(); setPlaying(false); }
  });
  audio.addEventListener("error", () => { musicBtn.hidden = true; });
}

// ---------- Envelope ----------
const intro = document.getElementById("intro");
const page = document.getElementById("page");

document.getElementById("envelope").addEventListener("click", () => {
  if (intro.classList.contains("is-opening")) return;
  intro.classList.add("is-opening");

  if (CONFIG.music) {
    musicBtn.hidden = false;
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }

  setTimeout(() => {
    intro.classList.add("is-gone");
    document.body.classList.remove("locked");
    page.classList.add("is-visible");
    page.removeAttribute("aria-hidden");
    toTop();
    requestAnimationFrame(toTop);
  }, 2500);
});

// ---------- Scroll reveal ----------
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }),
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
document.getElementById("envelope").addEventListener("click", () =>
  setTimeout(() => document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in")), 6000)
);

// ---------- Countdown ----------
const target = new Date(CONFIG.weddingDate).getTime();
const units = {
  days: document.querySelector('[data-unit="days"]'),
  hours: document.querySelector('[data-unit="hours"]'),
  minutes: document.querySelector('[data-unit="minutes"]'),
  seconds: document.querySelector('[data-unit="seconds"]'),
};

function tick() {
  const diff = Math.max(0, target - Date.now());
  units.days.textContent = Math.floor(diff / 864e5);
  units.hours.textContent = Math.floor((diff / 36e5) % 24);
  units.minutes.textContent = Math.floor((diff / 6e4) % 60);
  units.seconds.textContent = Math.floor((diff / 1e3) % 60);
}
tick();
setInterval(tick, 1000);

// ---------- "Yes" answer + confetti ----------
document.querySelectorAll("[data-answer]").forEach((btn) =>
  btn.addEventListener("click", () => {
    document.getElementById("answer-buttons").hidden = true;
    document.getElementById("answer-hint").hidden = true;
    document.getElementById("thanks").hidden = false;
    celebrate();
    showDetails();
  })
);

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let pieces = [];
let raf = null;

function resize() {
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}
addEventListener("resize", resize);
resize();

const COLORS = ["#4f5a3a", "#9aa78a", "#c9d0bd", "#d8ccb3", "#ffffff", "#e8d6cc"];

function celebrate() {
  for (let i = 0; i < 160; i++) {
    pieces.push({
      x: innerWidth / 2 + (Math.random() - 0.5) * 80,
      y: innerHeight * 0.55,
      vx: (Math.random() - 0.5) * 14,
      vy: -8 - Math.random() * 12,
      size: 5 + Math.random() * 7,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      shape: Math.random() < 0.3 ? "heart" : Math.random() < 0.5 ? "petal" : "rect",
      life: 0,
    });
  }
  if (!raf) raf = requestAnimationFrame(draw);
}

function drawHeart(s) {
  ctx.beginPath();
  ctx.moveTo(0, s * 0.3);
  ctx.bezierCurveTo(-s, -s * 0.4, -s * 0.4, -s, 0, -s * 0.35);
  ctx.bezierCurveTo(s * 0.4, -s, s, -s * 0.4, 0, s * 0.3);
  ctx.fill();
}

function draw() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  pieces.forEach((p) => {
    p.vy += 0.28;
    p.vx *= 0.99;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.life++;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.max(0, 1 - p.life / 220);
    if (p.shape === "heart") drawHeart(p.size);
    else if (p.shape === "petal") { ctx.beginPath(); ctx.ellipse(0, 0, p.size * 0.5, p.size * 0.28, 0, 0, Math.PI * 2); ctx.fill(); }
    else ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    ctx.restore();
  });
  pieces = pieces.filter((p) => p.y < innerHeight + 40 && p.life < 220);
  raf = pieces.length ? requestAnimationFrame(draw) : null;
  if (!raf) ctx.clearRect(0, 0, innerWidth, innerHeight);
}

// ---------- Details unlock after "yes" ----------
function showDetails(instant) {
  const after = document.getElementById("after-yes");
  const question = document.getElementById("question");
  if (!after.hidden) return;
  try { localStorage.setItem("fm-said-yes", "1"); } catch (e) {}

  const swap = () => {
    question.hidden = true;
    after.hidden = false;
    if (instant) return;
    const top = after.getBoundingClientRect().top + scrollY;
    scrollTo({ top, behavior: "instant" });
    requestAnimationFrame(() =>
      after.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"))
    );
  };
  if (instant) return swap();

  // let the thank-you and confetti play, then fade the question card out
  // and put the details in its place
  setTimeout(() => {
    question.classList.add("is-leaving");
    setTimeout(swap, 600);
  }, 2200);
}

// she already said yes on this phone: skip the question next time
try {
  if (localStorage.getItem("fm-said-yes")) showDetails(true);
} catch (e) {}

// coming back via the browser's back button shows the cached page as it was;
// start it fresh instead so the envelope shows again
window.addEventListener("pageshow", (e) => { if (e.persisted) location.reload(); });
