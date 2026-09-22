/**
 * POKÉDEX ULTIME - Core Application Logic
 * Modern Vanilla JS with Top-Layer Native Dialog, 3D Card Tilt,
 * Realtime Hover Evolutions, Web Audio API Sound Effects & Multilingual Support.
 */

// ============================================================================
// Constants & Configuration
// ============================================================================

const TYPE_CONFIG = {
  Plante: { color: "#48d0b0", dark: "#2f9c82", bg: "rgba(72, 208, 176, 0.2)", glow: "rgba(72, 208, 176, 0.45)", icon: "🌿" },
  Feu: { color: "#fb6c6c", dark: "#e04e4e", bg: "rgba(251, 108, 108, 0.2)", glow: "rgba(251, 108, 108, 0.45)", icon: "🔥" },
  Eau: { color: "#60a5fa", dark: "#3b82f6", bg: "rgba(96, 165, 250, 0.2)", glow: "rgba(96, 165, 250, 0.45)", icon: "💧" },
  Électrik: { color: "#ffd86f", dark: "#f59e0b", bg: "rgba(255, 216, 111, 0.2)", glow: "rgba(255, 216, 111, 0.45)", icon: "⚡" },
  Poison: { color: "#b97fc9", dark: "#8b5cf6", bg: "rgba(185, 127, 201, 0.2)", glow: "rgba(185, 127, 201, 0.45)", icon: "☠️" },
  Insecte: { color: "#a8b820", dark: "#808c18", bg: "rgba(168, 184, 32, 0.2)", glow: "rgba(168, 184, 32, 0.45)", icon: "🐛" },
  Vol: { color: "#93c5fd", dark: "#60a5fa", bg: "rgba(147, 197, 253, 0.2)", glow: "rgba(147, 197, 253, 0.45)", icon: "🪶" },
  Normal: { color: "#a8a878", dark: "#8a8a59", bg: "rgba(168, 168, 120, 0.2)", glow: "rgba(168, 168, 120, 0.45)", icon: "🔘" },
  Combat: { color: "#e27d36", dark: "#b45309", bg: "rgba(226, 125, 54, 0.2)", glow: "rgba(226, 125, 54, 0.45)", icon: "🥊" },
  Sol: { color: "#e0c068", dark: "#c4a34b", bg: "rgba(224, 192, 104, 0.2)", glow: "rgba(224, 192, 104, 0.45)", icon: "🏜️" },
  Roche: { color: "#b8a038", dark: "#937c22", bg: "rgba(184, 160, 56, 0.2)", glow: "rgba(184, 160, 56, 0.45)", icon: "🪨" },
  Spectre: { color: "#7b62a3", dark: "#5d4486", bg: "rgba(123, 98, 163, 0.2)", glow: "rgba(123, 98, 163, 0.45)", icon: "👻" },
  Acier: { color: "#b8b8d0", dark: "#8f8fb0", bg: "rgba(184, 184, 208, 0.2)", glow: "rgba(184, 184, 208, 0.45)", icon: "⚙️" },
  Psy: { color: "#f472b6", dark: "#db2777", bg: "rgba(244, 114, 182, 0.2)", glow: "rgba(244, 114, 182, 0.45)", icon: "🔮" },
  Glace: { color: "#7dd3fc", dark: "#38bdf8", bg: "rgba(125, 211, 252, 0.2)", glow: "rgba(125, 211, 252, 0.45)", icon: "❄️" },
  Dragon: { color: "#818cf8", dark: "#4f46e5", bg: "rgba(129, 140, 248, 0.2)", glow: "rgba(129, 140, 248, 0.45)", icon: "🐉" },
  Ténèbres: { color: "#705848", dark: "#4c392c", bg: "rgba(112, 88, 72, 0.2)", glow: "rgba(112, 88, 72, 0.45)", icon: "🌑" },
  Fée: { color: "#f9a8d4", dark: "#ec4899", bg: "rgba(249, 168, 212, 0.2)", glow: "rgba(249, 168, 212, 0.45)", icon: "✨" }
};

const STAT_CONFIG = {
  hp: { fr: "PV", en: "HP", jp: "HP", color: "linear-gradient(90deg, #ef4444, #f87171)", glow: "rgba(239, 68, 68, 0.4)" },
  atk: { fr: "Attaque", en: "Attack", jp: "こうげき", color: "linear-gradient(90deg, #f97316, #fb923c)", glow: "rgba(249, 115, 22, 0.4)" },
  def: { fr: "Défense", en: "Defense", jp: "ぼうぎょ", color: "linear-gradient(90deg, #eab308, #facc15)", glow: "rgba(234, 179, 8, 0.4)" },
  spe_atk: { fr: "Attaque Spé.", en: "Sp. Atk", jp: "とくこう", color: "linear-gradient(90deg, #3b82f6, #60a5fa)", glow: "rgba(59, 130, 246, 0.4)" },
  spe_def: { fr: "Défense Spé.", en: "Sp. Def", jp: "とくぼう", color: "linear-gradient(90deg, #8b5cf6, #a78bfa)", glow: "rgba(139, 92, 246, 0.4)" },
  vit: { fr: "Vitesse", en: "Speed", jp: "すばやさ", color: "linear-gradient(90deg, #06b6d4, #22d3ee)", glow: "rgba(6, 182, 212, 0.4)" }
};

const UI_TEXT = {
  fr: {
    loading: "Chargement des Pokémon...",
    error: "Erreur lors du chargement des Pokémon.",
    noMatch: "Aucun Pokémon ne correspond à votre recherche.",
    resetFilter: "Réinitialiser les filtres",
    allTypes: "Tous les types",
    viewDetails: "Cliquer pour voir la fiche",
    baseStats: "Statistiques de combat",
    totalStats: "Total des statistiques",
    talents: "Talents & Capacités",
    hiddenTalent: "Talent Caché (TC)",
    height: "Taille",
    weight: "Poids",
    catchRate: "Taux de capture",
    gender: "Répartition de genre",
    genderless: "Asexué",
    weaknesses: "Faiblesses",
    resistances: "Résistances",
    immunities: "Immunités",
    evolutionChain: "Ligne Évolutive",
    baseForm: "Forme de base",
    currentForm: "Actuel",
    evolution: "Évolution",
    megaForm: "Méga-Évolution",
    shinyForm: "Chromatique",
    cryBtn: "🔊 Cri Pokédex",
    countSingular: "1 Pokémon affiché",
    countPlural: "Pokémon affichés"
  },
  en: {
    loading: "Loading Pokémon...",
    error: "Failed to load Pokémon data.",
    noMatch: "No Pokémon matches your search.",
    resetFilter: "Reset filters",
    allTypes: "All types",
    viewDetails: "Click to inspect",
    baseStats: "Base Battle Stats",
    totalStats: "Base Stat Total",
    talents: "Abilities",
    hiddenTalent: "Hidden Ability (HA)",
    height: "Height",
    weight: "Weight",
    catchRate: "Catch Rate",
    gender: "Gender Ratio",
    genderless: "Genderless",
    weaknesses: "Weaknesses",
    resistances: "Resistances",
    immunities: "Immunities",
    evolutionChain: "Evolutionary Family",
    baseForm: "Base Form",
    currentForm: "Current",
    evolution: "Evolution",
    megaForm: "Mega Evolution",
    shinyForm: "Shiny",
    cryBtn: "🔊 Pokédex Cry",
    countSingular: "1 Pokémon displayed",
    countPlural: "Pokémon displayed"
  },
  jp: {
    loading: "ポケモンを読み込み中...",
    error: "データの読み込みに失敗しました。",
    noMatch: "該当するポケモンが見つかりません。",
    resetFilter: "フィルターを解除",
    allTypes: "すべてのタイプ",
    viewDetails: "クリックで詳細を見る",
    baseStats: "種族値 (ステータス)",
    totalStats: "合計種族値",
    talents: "とくせい",
    hiddenTalent: "かくれとくせい",
    height: "たかさ",
    weight: "おもさ",
    catchRate: "ほかくりつ",
    gender: "せいべつ",
    genderless: "せいべつふめい",
    weaknesses: "ばつぐん (弱点)",
    resistances: "いまひとつ (耐性)",
    immunities: "こうかなし (無効)",
    evolutionChain: "進化の流れ",
    baseForm: "基本形",
    currentForm: "現在",
    evolution: "進化",
    megaForm: "メガシンカ",
    shinyForm: "色違い",
    cryBtn: "🔊 なきごえ",
    countSingular: "1匹 表示中",
    countPlural: "匹 表示中"
  }
};

// ============================================================================
// Sound Controller (Web Audio API Synthesizer)
// ============================================================================

class SoundController {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem("pokedex_sound") !== "false";
  }

  init() {
    if (!this.ctx && typeof AudioContext !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem("pokedex_sound", this.enabled);
    if (this.enabled) {
      this.playChime();
    }
    return this.enabled;
  }

  playTone(freq, duration = 0.1, type = "sine", gainVal = 0.12) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy
    }
  }

  playChime() {
    if (!this.enabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 0.18, "sine", 0.08), idx * 60);
    });
  }

  playEvolutionHover() {
    if (!this.enabled) return;
    this.playTone(740, 0.07, "triangle", 0.05);
    setTimeout(() => this.playTone(1100, 0.1, "sine", 0.06), 55);
  }

  playShiny() {
    if (!this.enabled) return;
    const notes = [987.77, 1318.51, 1567.98, 2093.0];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 0.22, "sine", 0.07), idx * 75);
    });
  }

  playFavorite() {
    if (!this.enabled) return;
    this.playTone(659.25, 0.1, "sine", 0.08);
    setTimeout(() => this.playTone(987.77, 0.18, "triangle", 0.09), 80);
  }

  async playPokemonCry(pokedexId = 1, onStart, onEnd) {
    if (!this.enabled) return;
    try {
      if (onStart) onStart();
      const audio = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokedexId}.ogg`);
      audio.volume = 0.55;
      audio.onended = () => { if (onEnd) onEnd(); };
      audio.onerror = () => {
        if (onEnd) onEnd();
        this.playCry(pokedexId);
      };
      await audio.play();
    } catch (e) {
      if (onEnd) onEnd();
      this.playCry(pokedexId);
    }
  }

  playCry(pokedexId = 1) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Custom synthetic retro electronic cry calculated from ID
      const baseFreq = 220 + ((pokedexId * 37) % 600);
      const targetFreq = baseFreq * (pokedexId % 2 === 0 ? 1.6 : 0.65);

      osc.type = pokedexId % 3 === 0 ? "sawtooth" : pokedexId % 2 === 0 ? "square" : "triangle";
      osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(targetFreq, this.ctx.currentTime + 0.18);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.1, this.ctx.currentTime + 0.35);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2400, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.38);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch (e) {
      // Audio autoplay policy
    }
  }
}

// ============================================================================
// Application State
// ============================================================================

const sound = new SoundController();

// DOM Elements
const main = document.querySelector("#main") || document.querySelector("main");
const selectGen = document.querySelector("#select-generation");
const selectLang = document.querySelector("#select-language");
const typesContainer = document.querySelector("#types");
const searchInput = document.querySelector("#search-input");
const searchClear = document.querySelector("#search-clear");
const pokemonCount = document.querySelector("#pokemon-count");
const soundToggle = document.querySelector("#sound-toggle");
const resetTypesBtn = document.querySelector("#reset-types-btn");

// Toolbar & Additional Filters
const selectSort = document.querySelector("#select-sort");
const attributeChips = document.querySelectorAll(".attr-chip");
const favCounter = document.querySelector("#fav-counter");
const randomBtn = document.querySelector("#random-btn");
const teamToggleBtn = document.querySelector("#team-toggle-btn");
const teamBadge = document.querySelector("#team-badge");

// Team Drawer Elements
const teamDrawer = document.querySelector("#team-drawer");
const teamDrawerBackdrop = document.querySelector("#team-drawer-backdrop");
const teamDrawerCount = document.querySelector("#team-drawer-count");
const closeTeamBtn = document.querySelector("#close-team-btn");
const clearTeamBtn = document.querySelector("#clear-team-btn");
const teamSlots = document.querySelector("#team-slots");
const teamAnalysis = document.querySelector("#team-analysis");
const toastContainer = document.querySelector("#toast-container");

// Modal Elements
const modal = document.querySelector("#pokemon-modal");
const modalCard = document.querySelector("#modal-card");
const modalClose = document.querySelector("#modal-close");
const modalPrevBtn = document.querySelector("#modal-prev-btn");
const modalNextBtn = document.querySelector("#modal-next-btn");
const modalBody = document.querySelector("#modal-body");
const backToTopBtn = document.querySelector("#back-to-top");

// State
let currentPokemons = [];
let allTypes = [];
let selectedType = null;
let currentLang = selectLang ? selectLang.value : "fr";
let currentSearch = "";
let currentActivePokemonId = null;
let currentSort = "id_asc";
let currentAttrFilter = "all";

// LocalStorage Persistent State
let favorites = [];
try {
  favorites = JSON.parse(localStorage.getItem("pokedex_favorites") || "[]");
  if (!Array.isArray(favorites)) favorites = [];
} catch (e) {
  favorites = [];
}

let team = [];
try {
  team = JSON.parse(localStorage.getItem("pokedex_team") || "[]");
  if (!Array.isArray(team)) team = [];
} catch (e) {
  team = [];
}

// Caches
const pokemonDetailsCache = new Map();
const preloadedImages = new Set();

// ============================================================================
// Helper Utilities
// ============================================================================

function t(key) {
  const langDict = UI_TEXT[currentLang] || UI_TEXT.fr;
  return langDict[key] || UI_TEXT.fr[key] || "";
}

function getPokemonName(pokemon) {
  if (!pokemon) return "Inconnu";
  if (pokemon.name && pokemon.name[currentLang]) {
    return pokemon.name[currentLang];
  }
  return pokemon.name?.fr || pokemon.name?.en || "Inconnu";
}

function getPokemonAltName(pokemon) {
  if (!pokemon || !pokemon.name) return "";
  if (currentLang === "fr") {
    return pokemon.name.jp ? `${pokemon.name.jp} • ${pokemon.name.en}` : pokemon.name.en || "";
  }
  if (currentLang === "en") {
    return pokemon.name.jp ? `${pokemon.name.jp} • ${pokemon.name.fr}` : pokemon.name.fr || "";
  }
  return `${pokemon.name.fr} • ${pokemon.name.en}`;
}

function formatPokedexId(id) {
  return `#${String(id).padStart(3, "0")}`;
}

function getTypeColors(typeName) {
  return TYPE_CONFIG[typeName] || {
    color: "#64748b",
    dark: "#334155",
    bg: "rgba(100, 116, 139, 0.2)",
    glow: "rgba(100, 116, 139, 0.4)",
    icon: "🔘"
  };
}

function preloadImage(url) {
  if (!url || preloadedImages.has(url)) return;
  const img = new Image();
  img.src = url;
  preloadedImages.add(url);
}

// ============================================================================
// Toast Notifications
// ============================================================================

function showToast(message, type = "info") {
  if (!toastContainer) return;
  const toast = document.createElement("div");
  toast.className = `toast-message ${type}`;
  toast.innerHTML = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "toastOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards";
    setTimeout(() => toast.remove(), 320);
  }, 3200);
}

// ============================================================================
// Favorites Management
// ============================================================================

function isFavorite(id) {
  return favorites.includes(id);
}

function toggleFavorite(id, pokemonName = "") {
  const index = favorites.indexOf(id);
  if (index > -1) {
    favorites.splice(index, 1);
    showToast(`⭐ Retiré des favoris : <strong>${pokemonName || "#" + id}</strong>`, "info");
  } else {
    favorites.push(id);
    sound.playFavorite();
    showToast(`⭐ <strong>${pokemonName || "#" + id}</strong> ajouté à vos favoris !`, "success");
  }

  localStorage.setItem("pokedex_favorites", JSON.stringify(favorites));
  updateFavoriteUI();

  if (currentAttrFilter === "favorites") {
    displayPokemons();
  }
}

function updateFavoriteUI() {
  if (favCounter) {
    favCounter.textContent = favorites.length;
  }
  document.querySelectorAll(".fav-btn").forEach((btn) => {
    const pId = parseInt(btn.dataset.id, 10);
    const active = isFavorite(pId);
    btn.classList.toggle("active", active);
    btn.innerHTML = active ? "★" : "☆";
    btn.title = active ? "Retirer des favoris" : "Ajouter aux favoris";
  });

  const modalFavBtn = document.querySelector("#modal-fav-btn");
  if (modalFavBtn && currentActivePokemonId) {
    const active = isFavorite(currentActivePokemonId);
    modalFavBtn.classList.toggle("active-fav", active);
    modalFavBtn.innerHTML = `<span>${active ? "★" : "☆"}</span> <span>${active ? "Dans vos favoris" : "Ajouter aux favoris"}</span>`;
  }
}

// ============================================================================
// Team Builder Management (6 slots)
// ============================================================================

function isInTeam(id) {
  return team.some((m) => m.id === id);
}

function toggleTeam(pokemon) {
  if (!pokemon) return;
  const id = pokemon.pokedex_id;
  const idx = team.findIndex((m) => m.id === id);
  const name = getPokemonName(pokemon);

  if (idx > -1) {
    team.splice(idx, 1);
    showToast(`🎒 <strong>${name}</strong> retiré de votre équipe`, "info");
  } else {
    if (team.length >= 6) {
      sound.playTone(260, 0.25, "sawtooth");
      showToast(`⚠️ Votre équipe est au complet (6 Pokémon max) !`, "warning");
      return;
    }
    team.push({
      id: pokemon.pokedex_id,
      name: name,
      sprite: pokemon.sprites?.regular || `https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${id}/regular.png`,
      types: (pokemon.types || []).map((t) => ({ name: t.name, image: t.image })),
      stats: pokemon.stats || {},
      resistances: pokemon.resistances || []
    });
    sound.playChime();
    showToast(`🎒 <strong>${name}</strong> a rejoint votre équipe ! (${team.length}/6)`, "success");
  }

  localStorage.setItem("pokedex_team", JSON.stringify(team));
  updateTeamUI();
}

function removeFromTeam(id) {
  const idx = team.findIndex((m) => m.id === id);
  if (idx > -1) {
    const removedName = team[idx].name;
    team.splice(idx, 1);
    localStorage.setItem("pokedex_team", JSON.stringify(team));
    updateTeamUI();
    showToast(`🎒 <strong>${removedName}</strong> retiré de l'équipe`, "info");
  }
}

function clearTeam() {
  if (!team.length) return;
  team = [];
  localStorage.setItem("pokedex_team", JSON.stringify(team));
  updateTeamUI();
  showToast("Votre équipe a été vidée", "info");
}

function updateTeamUI() {
  const count = team.length;
  if (teamBadge) teamBadge.textContent = `${count}/6`;
  if (teamDrawerCount) teamDrawerCount.textContent = count;

  document.querySelectorAll(".team-btn").forEach((btn) => {
    const pId = parseInt(btn.dataset.id, 10);
    const inTeam = isInTeam(pId);
    btn.classList.toggle("active", inTeam);
    btn.innerHTML = inTeam ? "✓" : "+";
    btn.title = inTeam ? "Dans votre équipe (Cliquer pour retirer)" : "Ajouter à votre équipe";
  });

  const modalTeamBtn = document.querySelector("#modal-team-btn");
  if (modalTeamBtn && currentActivePokemonId) {
    const inTeam = isInTeam(currentActivePokemonId);
    modalTeamBtn.classList.toggle("active-team", inTeam);
    modalTeamBtn.innerHTML = `<span>${inTeam ? "✓" : "+"}</span> <span>${inTeam ? "Dans votre équipe" : "Ajouter à l'équipe"}</span>`;
  }

  renderTeamSlots();
  renderTeamAnalysis();
}

function renderTeamSlots() {
  if (!teamSlots) return;
  teamSlots.innerHTML = "";

  for (let i = 0; i < 6; i++) {
    const member = team[i];
    const slotCard = document.createElement("div");

    if (member) {
      slotCard.className = "team-slot-card";
      const typesHtml = (member.types || [])
        .map((tp) => `<img src="${tp.image}" alt="${tp.name}" style="width: 18px; height: 18px;" title="${tp.name}" />`)
        .join("");

      slotCard.innerHTML = `
        <img class="team-slot-sprite" src="${member.sprite}" alt="${member.name}" title="Voir ${member.name}" />
        <div class="team-slot-info">
          <h4 class="team-slot-name" title="Voir ${member.name}">${member.name}</h4>
          <div class="team-slot-types">${typesHtml}</div>
        </div>
        <button class="team-slot-remove" data-id="${member.id}" title="Retirer de l'équipe">&times;</button>
      `;

      slotCard.querySelector(".team-slot-sprite").addEventListener("click", () => {
        const fullPoke = pokemonDetailsCache.get(member.id);
        if (fullPoke) {
          openPokemonModal(fullPoke);
        } else {
          fetchPokemonById(member.id).then((p) => p && openPokemonModal(p));
        }
      });

      slotCard.querySelector(".team-slot-name").addEventListener("click", () => {
        const fullPoke = pokemonDetailsCache.get(member.id);
        if (fullPoke) {
          openPokemonModal(fullPoke);
        } else {
          fetchPokemonById(member.id).then((p) => p && openPokemonModal(p));
        }
      });

      slotCard.querySelector(".team-slot-remove").addEventListener("click", (e) => {
        e.stopPropagation();
        removeFromTeam(member.id);
      });
    } else {
      slotCard.className = "team-slot-card empty-slot";
      slotCard.innerHTML = `
        <svg class="empty-pokeball-outline" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="6">
          <circle cx="50" cy="50" r="44"/>
          <line x1="6" y1="50" x2="94" y2="50"/>
          <circle cx="50" cy="50" r="14"/>
        </svg>
        <span class="empty-slot-text">Slot ${i + 1} libre</span>
      `;
    }

    teamSlots.appendChild(slotCard);
  }
}

function renderTeamAnalysis() {
  if (!teamAnalysis) return;
  if (team.length === 0) {
    teamAnalysis.innerHTML = `
      <h4 class="team-analysis-title">📊 Analyse de l'équipe</h4>
      <p style="font-size: 0.82rem; color: var(--text-dim); margin: 0;">Ajoutez des Pokémon avec le bouton <strong>+</strong> pour analyser les forces, statistiques et vulnérabilités de votre équipe !</p>
    `;
    return;
  }

  // Calculate Average BST
  let totalBst = 0;
  team.forEach((m) => {
    const s = m.stats || {};
    totalBst += Object.values(s).reduce((a, b) => a + (typeof b === "number" ? b : 0), 0);
  });
  const avgBst = Math.round(totalBst / team.length);

  // Analyze Weaknesses across team
  const weaknessCount = {};
  team.forEach((m) => {
    (m.resistances || []).forEach((r) => {
      if (r.multiplier > 1) {
        weaknessCount[r.name] = (weaknessCount[r.name] || 0) + 1;
      }
    });
  });

  const sharedWeaknesses = Object.entries(weaknessCount)
    .filter(([_, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1]);

  let weaknessHtml = "";
  if (sharedWeaknesses.length > 0) {
    weaknessHtml = sharedWeaknesses
      .map(([type, count]) => {
        const c = getTypeColors(type);
        return `
          <span class="matchup-chip" style="--match-color: ${c.dark}; font-size: 0.75rem; padding: 3px 8px;">
            ${c.icon} ${type} <strong style="color: #f87171;">(${count} vulnérables)</strong>
          </span>
        `;
      })
      .join("");
  } else {
    weaknessHtml = `<span style="font-size: 0.8rem; color: #4ade80;">Excellente couverture ! Aucune faiblesse critique partagée.</span>`;
  }

  // Unique types represented
  const teamTypes = new Set();
  team.forEach((m) => {
    (m.types || []).forEach((t) => teamTypes.add(t.name));
  });

  teamAnalysis.innerHTML = `
    <h4 class="team-analysis-title">📊 Profil Stratégique</h4>
    <div class="team-metrics-row">
      <div class="team-metric-item">
        <div class="team-metric-val">${avgBst}</div>
        <div class="team-metric-label">BST Moyen</div>
      </div>
      <div class="team-metric-item">
        <div class="team-metric-val">${teamTypes.size}</div>
        <div class="team-metric-label">Types Actifs</div>
      </div>
      <div class="team-metric-item">
        <div class="team-metric-val">${team.length}/6</div>
        <div class="team-metric-label">Membres</div>
      </div>
    </div>

    <div>
      <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">
        ⚠️ Faiblesses partagées :
      </div>
      <div class="team-coverage-list">
        ${weaknessHtml}
      </div>
    </div>
  `;
}

// ============================================================================
// Pokémon Classification & Stats Helpers
// ============================================================================

function isLegendary(pokemon) {
  if (!pokemon) return false;
  const rareIds = [
    144, 145, 146, 150, 151,
    243, 244, 245, 249, 250, 251,
    377, 378, 379, 380, 381, 382, 383, 384, 385, 386,
    480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494,
    638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649,
    716, 717, 718, 719, 720, 721,
    785, 786, 787, 788, 789, 790, 791, 792, 800, 801, 802, 807, 808, 809,
    888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898,
    1001, 1002, 1003, 1004, 1007, 1008, 1014, 1015, 1016, 1017, 1024, 1025
  ];
  if (rareIds.includes(pokemon.pokedex_id)) return true;
  if (pokemon.catch_rate !== undefined && pokemon.catch_rate <= 5) return true;
  const bst = pokemon.stats ? Object.values(pokemon.stats).reduce((a, b) => a + (typeof b === "number" ? b : 0), 0) : 0;
  if (bst >= 580 && (!pokemon.evolution || (!pokemon.evolution.pre && !pokemon.evolution.next))) return true;
  return false;
}

function getCombatRole(pokemon) {
  const stats = pokemon.stats || {};
  const atk = stats.atk || 0;
  const speAtk = stats.spe_atk || 0;
  const def = stats.def || 0;
  const speDef = stats.spe_def || 0;
  const vit = stats.vit || 0;
  const hp = stats.hp || 0;

  if (vit >= 115) return "⚡ Sprinter Ultra-Rapide";
  if (atk >= 120 && atk >= speAtk) return "⚔️ Attaquant Physique";
  if (speAtk >= 120) return "🔮 Attaquant Spécial";
  if (def >= 115 || speDef >= 115 || hp >= 110) return "🛡️ Tank Colosse";
  return "⚖️ Combattant Polyvalent";
}

function pickRandomPokemon() {
  if (!currentPokemons || currentPokemons.length === 0) return;
  const randIdx = Math.floor(Math.random() * currentPokemons.length);
  const randPoke = currentPokemons[randIdx];
  sound.playChime();
  openPokemonModal(randPoke);
}

// ============================================================================
// Evolution & Form Extraction
// ============================================================================

/**
 * Extracts preview stages for card hover animation:
 * Stage 0: Current Base Form
 * Stage 1+: Next Evolutions (if any)
 * Mega: Mega Evolution (if any)
 * Fallback: Shiny form (if no evolutions) so every single card has dynamic hover!
 */
function getHoverStages(pokemon) {
  const currentName = getPokemonName(pokemon);
  const baseSprite = pokemon.sprites?.regular || `https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${pokemon.pokedex_id}/regular.png`;

  const stages = [
    {
      id: pokemon.pokedex_id,
      name: currentName,
      label: t("baseForm"),
      sprite: baseSprite,
      condition: ""
    }
  ];

  const evo = pokemon.evolution;

  // Next Evolutions
  if (evo && Array.isArray(evo.next) && evo.next.length > 0) {
    evo.next.forEach((nxt) => {
      if (nxt.pokedex_id && nxt.pokedex_id !== pokemon.pokedex_id) {
        stages.push({
          id: nxt.pokedex_id,
          name: nxt.name,
          label: t("evolution"),
          sprite: `https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${nxt.pokedex_id}/regular.png`,
          condition: nxt.condition || ""
        });
      }
    });
  }

  // Mega Evolution
  if (evo && Array.isArray(evo.mega) && evo.mega.length > 0) {
    evo.mega.forEach((m) => {
      stages.push({
        id: `${pokemon.pokedex_id}-mega`,
        name: `Méga ${currentName}`,
        label: t("megaForm"),
        sprite: m.sprites?.regular,
        condition: m.orbe || "Méga-Évolution"
      });
    });
  }

  // Fallback: If only 1 stage (no next evo and no mega), show Shiny form!
  if (stages.length === 1 && pokemon.sprites?.shiny) {
    stages.push({
      id: `${pokemon.pokedex_id}-shiny`,
      name: `${currentName} ✨`,
      label: `✨ ${t("shinyForm")}`,
      sprite: pokemon.sprites.shiny,
      condition: t("shinyForm")
    });
  }

  return stages;
}

/**
 * Builds the complete family evolutionary chain for the Detail Modal
 */
function getFullEvolutionChain(pokemon) {
  const evo = pokemon.evolution || {};
  const currentId = pokemon.pokedex_id;

  const preList = (evo.pre || []).filter((p) => p.pokedex_id && p.pokedex_id !== currentId);
  const nextList = (evo.next || []).filter((p) => p.pokedex_id && p.pokedex_id !== currentId);
  const megaList = evo.mega || [];

  const chain = [];

  // Previous stages
  preList.forEach((p) => {
    chain.push({
      id: p.pokedex_id,
      name: p.name,
      sprite: `https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${p.pokedex_id}/regular.png`,
      condition: p.condition || "",
      isCurrent: false,
      role: "pre"
    });
  });

  // Current stage
  chain.push({
    id: currentId,
    name: getPokemonName(pokemon),
    sprite: pokemon.sprites?.regular || `https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${currentId}/regular.png`,
    condition: "",
    isCurrent: true,
    role: "current"
  });

  // Next stages
  nextList.forEach((p) => {
    chain.push({
      id: p.pokedex_id,
      name: p.name,
      sprite: `https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${p.pokedex_id}/regular.png`,
      condition: p.condition || "",
      isCurrent: false,
      role: "next"
    });
  });

  // Mega stages
  megaList.forEach((m) => {
    chain.push({
      id: `${currentId}-mega`,
      name: `Méga ${getPokemonName(pokemon)}`,
      sprite: m.sprites?.regular,
      condition: m.orbe || "Méga",
      isCurrent: false,
      role: "mega"
    });
  });

  return chain;
}

// ============================================================================
// 3D Card Tilt & Holographic Foil Effect
// ============================================================================

function setupCardTilt(card) {
  // Respect prefers-reduced-motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  let isInside = false;

  card.addEventListener("mouseenter", () => {
    isInside = true;
  });

  card.addEventListener("mousemove", (e) => {
    if (!isInside) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPct = Math.round((x / rect.width) * 100);
    const yPct = Math.round((y / rect.height) * 100);

    const rotY = (((x / rect.width) - 0.5) * 16).toFixed(2);
    const rotX = (-((y / rect.height) - 0.5) * 16).toFixed(2);

    card.style.setProperty("--mouse-x", `${xPct}%`);
    card.style.setProperty("--mouse-y", `${yPct}%`);
    card.style.setProperty("--rotate-x", `${rotX}deg`);
    card.style.setProperty("--rotate-y", `${rotY}deg`);
  });

  card.addEventListener("mouseleave", () => {
    isInside = false;
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
  });
}

// ============================================================================
// Card Hover Evolution Animation Controller
// ============================================================================

function setupCardEvolution(card, pokemon, stages) {
  if (!stages || stages.length <= 1) return;

  // Preload sprites for zero latency
  stages.forEach((s) => preloadImage(s.sprite));

  const primaryImg = card.querySelector(".primary-sprite");
  const altImg = card.querySelector(".alt-sprite");
  const evoBadge = card.querySelector(".card-evo-badge");
  const evoNameEl = card.querySelector(".evo-badge-name");
  const evoCondEl = card.querySelector(".evo-badge-cond");
  const dotsContainer = card.querySelector(".evo-dots-container");
  const dots = card.querySelectorAll(".evo-dot");

  let cycleTimer = null;
  let currentStageIndex = 0;

  function setStage(index, playSoundEffect = true) {
    if (index === currentStageIndex) return;
    currentStageIndex = index;

    // Update dots
    dots.forEach((d, i) => {
      d.classList.toggle("active", i === currentStageIndex);
    });

    if (currentStageIndex === 0) {
      card.classList.remove("showing-evolution");
      if (evoBadge) evoBadge.classList.remove("visible");
    } else {
      const stage = stages[currentStageIndex];
      altImg.src = stage.sprite;
      card.classList.add("showing-evolution");

      if (evoBadge && evoNameEl) {
        evoNameEl.textContent = `${stage.label} : ${stage.name}`;
        if (evoCondEl) {
          evoCondEl.textContent = stage.condition ? `(${stage.condition})` : "";
        }
        evoBadge.classList.add("visible");
      }

      if (playSoundEffect) {
        sound.playEvolutionHover();
      }
    }
  }

  function startCycling() {
    stopCycling();
    // Advance to next stage after short pause, then keep cycling
    cycleTimer = setInterval(() => {
      const nextIndex = (currentStageIndex + 1) % stages.length;
      setStage(nextIndex, true);
    }, 1250);
  }

  function stopCycling() {
    if (cycleTimer) {
      clearInterval(cycleTimer);
      cycleTimer = null;
    }
  }

  let isCardHovered = false;
  let hoverIntentTimer = null;

  card.addEventListener("mouseenter", () => {
    isCardHovered = true;
    // If not reduced motion, trigger preview
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      hoverIntentTimer = setTimeout(() => {
        if (isCardHovered) {
          setStage(1, true);
          startCycling();
        }
      }, 160);
    }
  });

  card.addEventListener("mouseleave", () => {
    isCardHovered = false;
    if (hoverIntentTimer) {
      clearTimeout(hoverIntentTimer);
      hoverIntentTimer = null;
    }
    stopCycling();
    setStage(0, false);
  });

  // Interactive dots on card
  dots.forEach((dot) => {
    dot.addEventListener("mouseenter", (e) => {
      e.stopPropagation();
      stopCycling();
      const targetIndex = parseInt(dot.dataset.stage, 10);
      setStage(targetIndex, true);
    });

    dot.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent modal opening
      stopCycling();
      const targetIndex = parseInt(dot.dataset.stage, 10);
      setStage(targetIndex, true);
    });
  });
}

// ============================================================================
// Display & Render Pokémon Cards
// ============================================================================

function displayPokemons() {
  main.innerHTML = "";

  // 1. Filter by Type
  let filtered = selectedType
    ? currentPokemons.filter((p) =>
        p.types &&
        p.types.some((t) => t.name.toLowerCase() === selectedType.toLowerCase())
      )
    : [...currentPokemons];

  // 2. Filter by Attribute / Category
  if (currentAttrFilter === "favorites") {
    filtered = filtered.filter((p) => isFavorite(p.pokedex_id));
  } else if (currentAttrFilter === "evolution") {
    filtered = filtered.filter((p) => p.evolution && Array.isArray(p.evolution.next) && p.evolution.next.length > 0);
  } else if (currentAttrFilter === "final") {
    filtered = filtered.filter((p) => !p.evolution || !Array.isArray(p.evolution.next) || p.evolution.next.length === 0);
  } else if (currentAttrFilter === "legendary") {
    filtered = filtered.filter((p) => isLegendary(p));
  } else if (currentAttrFilter === "mega") {
    filtered = filtered.filter((p) => p.evolution && Array.isArray(p.evolution.mega) && p.evolution.mega.length > 0);
  } else if (currentAttrFilter === "gmax") {
    filtered = filtered.filter((p) => Boolean(p.sprites?.gmax));
  } else if (currentAttrFilter === "monotype") {
    filtered = filtered.filter((p) => p.types && p.types.length === 1);
  } else if (currentAttrFilter === "dualtype") {
    filtered = filtered.filter((p) => p.types && p.types.length >= 2);
  }

  // 3. Filter by Search Query
  if (currentSearch.trim()) {
    const q = currentSearch.trim().toLowerCase();
    filtered = filtered.filter((p) => {
      const idMatch = String(p.pokedex_id) === q || `#${p.pokedex_id}` === q || formatPokedexId(p.pokedex_id).toLowerCase() === q;
      const frMatch = p.name?.fr?.toLowerCase().includes(q);
      const enMatch = p.name?.en?.toLowerCase().includes(q);
      const jpMatch = p.name?.jp?.toLowerCase().includes(q);
      const typeMatch = p.types && p.types.some((tp) => tp.name.toLowerCase().includes(q));
      const talentMatch = p.talents && p.talents.some((tal) => tal.name.toLowerCase().includes(q));
      return idMatch || frMatch || enMatch || jpMatch || typeMatch || talentMatch;
    });
  }

  // 4. Sorting
  const getBst = (p) => (p.stats ? Object.values(p.stats).reduce((a, b) => a + (typeof b === "number" ? b : 0), 0) : 0);
  const parseNum = (str) => {
    if (!str) return 0;
    const match = String(str).replace(",", ".").match(/[0-9.]+/);
    return match ? parseFloat(match[0]) : 0;
  };

  filtered.sort((a, b) => {
    switch (currentSort) {
      case "id_desc":
        return b.pokedex_id - a.pokedex_id;
      case "name_asc":
        return getPokemonName(a).localeCompare(getPokemonName(b));
      case "name_desc":
        return getPokemonName(b).localeCompare(getPokemonName(a));
      case "bst_desc":
        return getBst(b) - getBst(a);
      case "bst_asc":
        return getBst(a) - getBst(b);
      case "atk_desc":
        return (b.stats?.atk || 0) - (a.stats?.atk || 0);
      case "def_desc":
        return (b.stats?.def || 0) - (a.stats?.def || 0);
      case "vit_desc":
        return (b.stats?.vit || 0) - (a.stats?.vit || 0);
      case "hp_desc":
        return (b.stats?.hp || 0) - (a.stats?.hp || 0);
      case "weight_desc":
        return parseNum(b.weight) - parseNum(a.weight);
      case "height_desc":
        return parseNum(b.height) - parseNum(a.height);
      case "id_asc":
      default:
        return a.pokedex_id - b.pokedex_id;
    }
  });

  // Update Count Badge
  if (pokemonCount) {
    const count = filtered.length;
    pokemonCount.textContent =
      count === 1
        ? t("countSingular")
        : `${count} ${t("countPlural")}`;
  }

  // Empty State
  if (filtered.length === 0) {
    main.innerHTML = `
      <div class="state-container">
        <div class="loader-pokeball" style="animation: none; opacity: 0.6;"></div>
        <h2 class="state-title">${t("noMatch")}</h2>
        <p class="state-desc">Essayez de modifier votre recherche ou sélectionnez un autre filtre.</p>
        <button id="empty-reset-btn" class="reset-filter-btn" style="padding: 10px 20px; font-size: 0.9rem;">
          ${t("resetFilter")}
        </button>
      </div>
    `;

    const emptyResetBtn = document.querySelector("#empty-reset-btn");
    if (emptyResetBtn) {
      emptyResetBtn.addEventListener("click", () => {
        if (searchInput) searchInput.value = "";
        currentSearch = "";
        if (searchClear) searchClear.hidden = true;
        selectedType = null;
        currentAttrFilter = "all";
        if (attributeChips) {
          attributeChips.forEach((c) => c.classList.toggle("active", c.dataset.filter === "all"));
        }
        document.querySelectorAll(".type-chip").forEach((c) => c.classList.remove("active"));
        displayPokemons();
      });
    }
    return;
  }

  // Render cards
  const fragment = document.createDocumentFragment();

  filtered.forEach((pokemon, index) => {
    const article = document.createElement("article");
    article.className = "pokemon-card";
    article.setAttribute("tabindex", "0");
    article.setAttribute("role", "button");
    article.setAttribute("aria-label", `Voir la fiche de ${getPokemonName(pokemon)}`);
    article.dataset.id = pokemon.pokedex_id;
    article.style.setProperty("--stagger-index", Math.min(index, 30));

    // Primary & Secondary type colors
    const primaryType = pokemon.types?.[0]?.name || "Normal";
    const typeMeta = getTypeColors(primaryType);
    article.style.setProperty("--card-color", typeMeta.color);
    article.style.setProperty("--card-glow", typeMeta.glow);

    const nom = getPokemonName(pokemon);
    const altNom = getPokemonAltName(pokemon);
    const formattedId = formatPokedexId(pokemon.pokedex_id);
    const mainSprite = pokemon.sprites?.regular || `https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${pokemon.pokedex_id}/regular.png`;

    // Evolution stages for hover
    const stages = getHoverStages(pokemon);
    const hasEvolutions = stages.length > 1;

    // Type pills HTML
    const typesHtml = (pokemon.types || [])
      .map((tp) => {
        const c = getTypeColors(tp.name);
        return `
          <span class="type-pill" style="--type-bg: ${c.bg}; border-color: ${c.color}40;">
            <img src="${tp.image}" alt="${tp.name}" loading="lazy" />
            ${tp.name}
          </span>
        `;
      })
      .join("");

    // Quick Stats preview
    const hp = pokemon.stats?.hp ?? 0;
    const atk = pokemon.stats?.atk ?? 0;
    const def = pokemon.stats?.def ?? 0;
    const vit = pokemon.stats?.vit ?? 0;

    const hpPct = Math.min(Math.round((hp / 255) * 100), 100);
    const atkPct = Math.min(Math.round((atk / 255) * 100), 100);
    const defPct = Math.min(Math.round((def / 255) * 100), 100);
    const vitPct = Math.min(Math.round((vit / 255) * 100), 100);

    // Dots HTML
    const dotsHtml = hasEvolutions
      ? `
      <div class="evo-dots-container">
        ${stages
          .map(
            (st, sIdx) =>
              `<button class="evo-dot ${sIdx === 0 ? "active" : ""}" data-stage="${sIdx}" title="${st.label}: ${st.name}"></button>`
          )
          .join("")}
      </div>`
      : "";

    const isFav = isFavorite(pokemon.pokedex_id);
    const inTeam = isInTeam(pokemon.pokedex_id);

    article.innerHTML = `
      <div class="card-ambient-glow"></div>
      <div class="card-foil"></div>

      <div class="card-top">
        <span class="pokemon-id-tag">${formattedId}</span>
        <div class="card-actions-top">
          <span class="pokemon-category-tag">${pokemon.category || "Pokémon"}</span>
          <button class="card-action-btn fav-btn ${isFav ? "active" : ""}" data-id="${pokemon.pokedex_id}" title="${isFav ? "Retirer des favoris" : "Ajouter aux favoris"}" aria-label="Favori">
            ${isFav ? "★" : "☆"}
          </button>
          <button class="card-action-btn team-btn ${inTeam ? "active" : ""}" data-id="${pokemon.pokedex_id}" title="${inTeam ? "Dans votre équipe" : "Ajouter à l'équipe"}" aria-label="Ajouter à l'équipe">
            ${inTeam ? "✓" : "+"}
          </button>
        </div>
      </div>

      <div class="card-sprite-area">
        <div class="card-evo-badge">
          <span class="evo-badge-icon">⚡</span>
          <span class="evo-badge-name"></span>
          <span class="evo-badge-cond"></span>
        </div>

        <div class="sprite-wrapper">
          <img class="sprite-img primary-sprite" src="${mainSprite}" alt="${nom}" loading="lazy" />
          <img class="sprite-img alt-sprite" src="" alt="Évolution" loading="lazy" />
        </div>

        ${dotsHtml}
      </div>

      <div class="card-content">
        <div class="card-name-row">
          <h3 class="pokemon-name">${nom}</h3>
          ${altNom ? `<span class="pokemon-subname">${altNom}</span>` : ""}
        </div>

        <div class="card-types-list">
          ${typesHtml}
        </div>

        <div class="card-stats-preview">
          <div class="stat-preview-item">
            <div class="stat-meta">
              <span>PV</span>
              <span class="stat-val">${hp}</span>
            </div>
            <div class="stat-bar-track">
              <div class="stat-bar-fill" style="width: ${hpPct}%; --stat-color: #ef4444;"></div>
            </div>
          </div>
          <div class="stat-preview-item">
            <div class="stat-meta">
              <span>ATK</span>
              <span class="stat-val">${atk}</span>
            </div>
            <div class="stat-bar-track">
              <div class="stat-bar-fill" style="width: ${atkPct}%; --stat-color: #f97316;"></div>
            </div>
          </div>
          <div class="stat-preview-item">
            <div class="stat-meta">
              <span>DEF</span>
              <span class="stat-val">${def}</span>
            </div>
            <div class="stat-bar-track">
              <div class="stat-bar-fill" style="width: ${defPct}%; --stat-color: #eab308;"></div>
            </div>
          </div>
          <div class="stat-preview-item">
            <div class="stat-meta">
              <span>VIT</span>
              <span class="stat-val">${vit}</span>
            </div>
            <div class="stat-bar-track">
              <div class="stat-bar-fill" style="width: ${vitPct}%; --stat-color: #06b6d4;"></div>
            </div>
          </div>
        </div>

        <div class="card-footer-hint">
          <span>${t("viewDetails")}</span>
          <span class="card-arrow">→</span>
        </div>
      </div>
    `;

    // Interactive 3D tilt
    setupCardTilt(article);

    // Interactive hover evolution
    setupCardEvolution(article, pokemon, stages);

    // Favorite Button Action
    const favBtn = article.querySelector(".fav-btn");
    if (favBtn) {
      favBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleFavorite(pokemon.pokedex_id, nom);
      });
    }

    // Team Button Action
    const teamBtn = article.querySelector(".team-btn");
    if (teamBtn) {
      teamBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleTeam(pokemon);
      });
    }

    // Click & Keyboard to open modal
    article.addEventListener("click", () => {
      openPokemonModal(pokemon);
    });

    article.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openPokemonModal(pokemon);
      }
    });

    fragment.appendChild(article);
  });

  main.appendChild(fragment);
}

// ============================================================================
// Load Data & Types from TyraDex API
// ============================================================================

async function loadData(generation = 1) {
  main.innerHTML = `
    <div class="state-container">
      <div class="loader-pokeball"></div>
      <h2 class="state-title">${t("loading")}</h2>
      <p class="state-desc">Génération ${generation} en cours de synchronisation avec le Pokédex...</p>
    </div>
  `;

  try {
    const res = await fetch(`https://tyradex.app/api/v1/gen/${generation}`);
    if (!res.ok) throw new Error("API Network response was not ok");
    currentPokemons = await res.json();

    // Cache each pokemon in map
    currentPokemons.forEach((p) => {
      pokemonDetailsCache.set(p.pokedex_id, p);
    });

    displayPokemons();
  } catch (error) {
    console.error("Error loading Pokémon data:", error);
    main.innerHTML = `
      <div class="state-container">
        <div class="loader-pokeball" style="animation: none; filter: grayscale(1);"></div>
        <h2 class="state-title">${t("error")}</h2>
        <p class="state-desc">Impossible de se connecter au serveur TyraDex. Vérifiez votre connexion internet.</p>
        <button id="retry-btn" class="reset-filter-btn" style="padding: 10px 20px; font-size: 0.9rem;">
          Réessayer
        </button>
      </div>
    `;
    const retryBtn = document.querySelector("#retry-btn");
    if (retryBtn) {
      retryBtn.addEventListener("click", () => loadData(generation));
    }
  }
}

async function loadTypes() {
  try {
    const res = await fetch("https://tyradex.app/api/v1/types");
    if (!res.ok) throw new Error("Failed to load types");
    allTypes = await res.json();

    renderTypeChips();
  } catch (error) {
    console.error("Error loading types:", error);
  }
}

function renderTypeChips() {
  if (!typesContainer) return;
  typesContainer.innerHTML = "";

  allTypes.forEach((type) => {
    const nomType = type.name?.[currentLang] || type.name?.fr || "Type";
    const typeKey = type.name?.fr || "Normal";
    const colors = getTypeColors(typeKey);

    const chip = document.createElement("button");
    chip.className = "type-chip";
    chip.style.setProperty("--chip-color", colors.color);
    chip.style.setProperty("--chip-glow", colors.glow);
    if (selectedType && selectedType.toLowerCase() === typeKey.toLowerCase()) {
      chip.classList.add("active");
    }

    chip.innerHTML = `
      <img src="${type.sprites}" alt="${nomType}" loading="lazy" />
      <span>${nomType}</span>
    `;

    chip.addEventListener("click", () => {
      sound.playTone(600, 0.05, "sine", 0.05);

      if (selectedType && selectedType.toLowerCase() === typeKey.toLowerCase()) {
        selectedType = null;
        chip.classList.remove("active");
      } else {
        selectedType = typeKey;
        document.querySelectorAll(".type-chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
      }
      displayPokemons();
    });

    typesContainer.appendChild(chip);
  });
}

// ============================================================================
// Detail Modal Controller (Native <dialog> with @starting-style)
// ============================================================================

async function fetchPokemonById(id) {
  if (pokemonDetailsCache.has(id)) {
    return pokemonDetailsCache.get(id);
  }
  try {
    const res = await fetch(`https://tyradex.app/api/v1/pokemon/${id}`);
    if (!res.ok) throw new Error("Pokemon not found");
    const data = await res.json();
    pokemonDetailsCache.set(id, data);
    return data;
  } catch (err) {
    console.error("Error fetching single Pokémon:", err);
    return null;
  }
}

async function openPokemonModal(pokemon) {
  if (!modal || !modalBody) return;

  currentActivePokemonId = pokemon.pokedex_id;

  // Play official cry
  sound.playPokemonCry(pokemon.pokedex_id);

  // Sync URL parameter for sharing on subdomain (without reload)
  try {
    const url = new URL(window.location);
    url.searchParams.set("pokemon", pokemon.pokedex_id);
    window.history.replaceState({}, "", url);
  } catch (e) {}

  // Primary type colors
  const primaryType = pokemon.types?.[0]?.name || "Normal";
  const typeMeta = getTypeColors(primaryType);
  modal.style.setProperty("--modal-type-color", typeMeta.color);
  modal.style.setProperty("--modal-type-glow", typeMeta.glow);

  // Render modal content
  renderModalBody(pokemon);

  // Open modal using native top-layer API
  if (typeof modal.showModal === "function") {
    if (!modal.open) {
      modal.showModal();
    }
  } else {
    modal.setAttribute("open", "");
  }

  // Update nav arrows disabled state
  updateModalNavButtons();
}

function updateModalNavButtons() {
  if (!modalPrevBtn || !modalNextBtn || !currentPokemons.length) return;
  const currentIndex = currentPokemons.findIndex((p) => p.pokedex_id === currentActivePokemonId);

  modalPrevBtn.disabled = currentIndex <= 0;
  modalNextBtn.disabled = currentIndex === -1 || currentIndex >= currentPokemons.length - 1;
}

function renderModalBody(pokemon) {
  const nom = getPokemonName(pokemon);
  const altNom = getPokemonAltName(pokemon);
  const formattedId = formatPokedexId(pokemon.pokedex_id);
  const primaryType = pokemon.types?.[0]?.name || "Normal";
  const typeMeta = getTypeColors(primaryType);

  // Available Form Sprites
  const regularSprite = pokemon.sprites?.regular || `https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${pokemon.pokedex_id}/regular.png`;
  const shinySprite = pokemon.sprites?.shiny || null;
  const gmaxSprite = pokemon.sprites?.gmax?.regular || null;
  const megaForms = pokemon.evolution?.mega || [];

  // Form Switcher Tabs HTML
  let formTabsHtml = `<button class="form-tab-btn active" data-form="regular">Normal</button>`;
  if (shinySprite) {
    formTabsHtml += `<button class="form-tab-btn shiny-tab" data-form="shiny">✨ ${t("shinyForm")}</button>`;
  }
  if (megaForms.length > 0) {
    megaForms.forEach((m, i) => {
      formTabsHtml += `<button class="form-tab-btn" data-form="mega-${i}">${m.orbe || "Méga"}</button>`;
    });
  }
  if (gmaxSprite) {
    formTabsHtml += `<button class="form-tab-btn" data-form="gmax">Gigamax</button>`;
  }

  // Type Badges
  const typesHtml = (pokemon.types || [])
    .map((tp) => {
      const c = getTypeColors(tp.name);
      return `
        <span class="type-pill" style="--type-bg: ${c.bg}; border-color: ${c.color}60; font-size: 0.85rem; padding: 6px 14px;">
          <img src="${tp.image}" alt="${tp.name}" />
          ${tp.name}
        </span>
      `;
    })
    .join("");

  // Physical stats
  const height = pokemon.height || "-";
  const weight = pokemon.weight || "-";
  const catchRate = pokemon.catch_rate ?? "-";

  // Gender Ratio
  let genderHtml = `<span class="spec-value">${t("genderless")}</span>`;
  if (pokemon.sexe && (pokemon.sexe.male !== null || pokemon.sexe.female !== null)) {
    const m = pokemon.sexe.male || 0;
    const f = pokemon.sexe.female || 0;
    genderHtml = `
      <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700;">
        <span style="color: #60a5fa;">♂ ${m}%</span>
        <span style="color: #f472b6;">♀ ${f}%</span>
      </div>
      <div class="gender-bar">
        <div class="gender-male" style="width: ${m}%;"></div>
        <div class="gender-female" style="width: ${f}%;"></div>
      </div>
    `;
  }

  // Talents / Abilities
  const talentsHtml = (pokemon.talents || [])
    .map((tal) => {
      return `
        <div class="talent-pill ${tal.tc ? "hidden-talent" : ""}">
          <span>${tal.tc ? "✨" : "⚡"}</span>
          <span>${tal.name}</span>
          ${tal.tc ? `<span style="font-size: 0.68rem; opacity: 0.8;">(${t("hiddenTalent")})</span>` : ""}
        </div>
      `;
    })
    .join("");

  // Base Stats & Total (BST)
  const stats = pokemon.stats || {};
  const totalBst = Object.values(stats).reduce((acc, v) => acc + (typeof v === "number" ? v : 0), 0);

  const statsHtml = Object.entries(STAT_CONFIG)
    .map(([key, cfg]) => {
      const statVal = stats[key] ?? 0;
      const statPct = Math.min(Math.round((statVal / 255) * 100), 100);
      const label = cfg[currentLang] || cfg.fr;
      return `
        <div class="stat-row">
          <span class="stat-name">${label}</span>
          <span class="stat-number">${statVal}</span>
          <div class="stat-track">
            <div class="stat-fill" data-pct="${statPct}" style="--bar-gradient: ${cfg.color}; --bar-glow: ${cfg.glow};"></div>
          </div>
        </div>
      `;
    })
    .join("");

  // Resistances (Weaknesses, Resistances, Immunities)
  const resistances = pokemon.resistances || [];
  const weaknesses = resistances.filter((r) => r.multiplier > 1);
  const resists = resistances.filter((r) => r.multiplier > 0 && r.multiplier < 1);
  const immunities = resistances.filter((r) => r.multiplier === 0);

  function renderMatchupChips(list) {
    if (!list.length) return `<span style="font-size: 0.78rem; color: var(--text-dim);">-</span>`;
    return list
      .map((item) => {
        const c = getTypeColors(item.name);
        return `
          <div class="matchup-chip" style="--match-color: ${c.dark};">
            <span>${c.icon} ${item.name}</span>
            <span class="multiplier">x${item.multiplier}</span>
          </div>
        `;
      })
      .join("");
  }

  // Full Evolution Chain
  const evoChain = getFullEvolutionChain(pokemon);
  const evoChainHtml = evoChain
    .map((node, i) => {
      const isCurrent = node.isCurrent;
      const conditionHtml = node.condition
        ? `<div class="evo-chain-arrow">
             <span class="evo-condition-tag">${node.condition}</span>
             <span class="evo-arrow-symbol">➔</span>
           </div>`
        : "";

      return `
        ${i > 0 && node.condition ? conditionHtml : ""}
        <div class="evo-chain-node ${isCurrent ? "current" : ""}" data-pokemon-id="${node.id}">
          <img class="evo-node-img" src="${node.sprite}" alt="${node.name}" loading="lazy" />
          <p class="evo-node-name">${node.name}</p>
          <span class="evo-node-id">${typeof node.id === "number" ? formatPokedexId(node.id) : ""}</span>
        </div>
      `;
    })
    .join("");

  modalBody.innerHTML = `
    <!-- Top Header -->
    <div class="modal-header-info">
      <div class="modal-title-group">
        <span class="modal-id-badge">${formattedId}</span>
        <h2 class="modal-pokemon-name" id="modal-pokemon-name">
          ${nom}
          <div class="modal-badges-row">
            ${typesHtml}
            <span class="gen-pill">Génération ${pokemon.generation || 1}</span>
            <span class="cat-pill">${pokemon.category || "Pokémon"}</span>
          </div>
        </h2>
        ${altNom ? `<span class="modal-foreign-names">${altNom}</span>` : ""}
      </div>

      <!-- Action Bar: Role, Favorite, Team, Share -->
      <div class="modal-action-bar">
        <span class="role-badge">${getCombatRole(pokemon)}</span>
        <button id="modal-fav-btn" class="modal-btn-pill ${isFavorite(pokemon.pokedex_id) ? "active-fav" : ""}">
          <span>${isFavorite(pokemon.pokedex_id) ? "★" : "☆"}</span>
          <span>${isFavorite(pokemon.pokedex_id) ? "Dans vos favoris" : "Ajouter aux favoris"}</span>
        </button>
        <button id="modal-team-btn" class="modal-btn-pill ${isInTeam(pokemon.pokedex_id) ? "active-team" : ""}">
          <span>${isInTeam(pokemon.pokedex_id) ? "✓" : "+"}</span>
          <span>${isInTeam(pokemon.pokedex_id) ? "Dans votre équipe" : "Ajouter à l'équipe"}</span>
        </button>
        <button id="modal-share-btn" class="modal-btn-pill" title="Copier le lien direct vers ce Pokémon">
          <span>🔗</span>
          <span>Partager</span>
        </button>
      </div>
    </div>

    <!-- Main Grid: Left Visual, Right Specs -->
    <div class="modal-main-grid">
      <!-- Left Column -->
      <div class="modal-visual-column">
        <div class="modal-artwork-stage">
          <div class="modal-artwork-glow"></div>
          <img id="modal-focal-sprite" class="modal-big-sprite" src="${regularSprite}" alt="${nom}" />
        </div>

        <!-- Form Switcher -->
        <div class="form-switcher-tabs" id="form-switcher">
          ${formTabsHtml}
        </div>

        <!-- Sound Cry Button -->
        <button id="modal-cry-btn" class="cry-btn" title="Écouter le cri de ce Pokémon">
          ${t("cryBtn")}
        </button>

        <!-- Physical Specs -->
        <div class="profile-specs-grid">
          <div class="spec-box">
            <span class="spec-title">📏 ${t("height")}</span>
            <span class="spec-value">${height}</span>
          </div>
          <div class="spec-box">
            <span class="spec-title">⚖️ ${t("weight")}</span>
            <span class="spec-value">${weight}</span>
          </div>
          <div class="spec-box">
            <span class="spec-title">🎯 ${t("catchRate")}</span>
            <span class="spec-value">${catchRate}</span>
          </div>
          <div class="spec-box">
            <span class="spec-title">⚧️ ${t("gender")}</span>
            ${genderHtml}
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="modal-details-column">
        <!-- Talents -->
        <div>
          <h3 class="details-section-title">${t("talents")}</h3>
          <div class="talents-container">
            ${talentsHtml}
          </div>
        </div>

        <!-- Combat Stats -->
        <div>
          <div class="details-section-title">
            <span>${t("baseStats")}</span>
            <span class="total-bst-badge">${t("totalStats")}: ${totalBst}</span>
          </div>
          <div class="stats-bars-container">
            ${statsHtml}
          </div>
        </div>

        <!-- Resistances & Matchups -->
        <div class="resistances-block">
          <h3 class="details-section-title">${t("weaknesses")} & ${t("resistances")}</h3>
          <div class="matchup-group">
            <span class="matchup-label">💥 ${t("weaknesses")} (x2, x4)</span>
            <div class="matchup-chips">
              ${renderMatchupChips(weaknesses)}
            </div>
          </div>
          <div class="matchup-group">
            <span class="matchup-label">🛡️ ${t("resistances")} (x0.5, x0.25)</span>
            <div class="matchup-chips">
              ${renderMatchupChips(resists)}
            </div>
          </div>
          ${
            immunities.length > 0
              ? `
            <div class="matchup-group">
              <span class="matchup-label">⛔ ${t("immunities")} (x0)</span>
              <div class="matchup-chips">
                ${renderMatchupChips(immunities)}
              </div>
            </div>`
              : ""
          }
        </div>
      </div>
    </div>

    <!-- Bottom Full Width Evolution Chain -->
    <div class="modal-evolution-section">
      <h3 class="details-section-title" style="text-align: center; justify-content: center;">
        🧬 ${t("evolutionChain")}
      </h3>
      <div class="evolution-chain-flow">
        ${evoChainHtml}
      </div>
    </div>
  `;

  // Animate stats bars with smooth entrance
  requestAnimationFrame(() => {
    setTimeout(() => {
      modalBody.querySelectorAll(".stat-fill").forEach((fill) => {
        const pct = fill.dataset.pct || "0";
        fill.style.width = `${pct}%`;
      });
    }, 60);
  });

  // Setup Form Switcher (Normal, Shiny, Mega, Gmax)
  const focalSprite = modalBody.querySelector("#modal-focal-sprite");
  const formSwitcher = modalBody.querySelector("#form-switcher");
  if (formSwitcher && focalSprite) {
    formSwitcher.querySelectorAll(".form-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        formSwitcher.querySelectorAll(".form-tab-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const formType = btn.dataset.form;
        focalSprite.style.transform = "scale(0.85)";
        focalSprite.style.opacity = "0.4";

        setTimeout(() => {
          if (formType === "regular") {
            focalSprite.src = regularSprite;
            sound.playTone(550, 0.08);
          } else if (formType === "shiny") {
            focalSprite.src = shinySprite || regularSprite;
            sound.playShiny();
          } else if (formType.startsWith("mega-")) {
            const mIdx = parseInt(formType.replace("mega-", ""), 10);
            focalSprite.src = megaForms[mIdx]?.sprites?.regular || regularSprite;
            sound.playTone(880, 0.12, "triangle");
          } else if (formType === "gmax") {
            focalSprite.src = gmaxSprite || regularSprite;
            sound.playTone(440, 0.15, "sawtooth");
          }

          focalSprite.style.transform = "scale(1)";
          focalSprite.style.opacity = "1";
        }, 150);
      });
    });
  }

  // Modal Action Buttons
  const modalFavBtn = modalBody.querySelector("#modal-fav-btn");
  if (modalFavBtn) {
    modalFavBtn.addEventListener("click", () => {
      toggleFavorite(pokemon.pokedex_id, nom);
    });
  }

  const modalTeamBtn = modalBody.querySelector("#modal-team-btn");
  if (modalTeamBtn) {
    modalTeamBtn.addEventListener("click", () => {
      toggleTeam(pokemon);
    });
  }

  const shareBtn = modalBody.querySelector("#modal-share-btn");
  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      const shareUrl = `${window.location.origin}${window.location.pathname}?pokemon=${pokemon.pokedex_id}`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl).then(() => {
          sound.playChime();
          showToast(`🔗 Lien copié : <code>?pokemon=${pokemon.pokedex_id}</code>`, "success");
        }).catch(() => {
          showToast(`Lien direct : ${shareUrl}`, "info");
        });
      } else {
        showToast(`Lien direct : ${shareUrl}`, "info");
      }
    });
  }

  // Cry button with authentic cry + wave animation
  const cryBtn = modalBody.querySelector("#modal-cry-btn");
  if (cryBtn) {
    cryBtn.addEventListener("click", () => {
      cryBtn.classList.add("playing");
      sound.playPokemonCry(pokemon.pokedex_id, null, () => {
        cryBtn.classList.remove("playing");
      });
      setTimeout(() => cryBtn.classList.remove("playing"), 1500);
    });
  }

  // Interactive Evolution Nodes: Clicking switches the modal directly!
  modalBody.querySelectorAll(".evo-chain-node").forEach((node) => {
    node.addEventListener("click", async () => {
      const targetId = node.dataset.pokemonId;
      if (!targetId || targetId === String(pokemon.pokedex_id)) return;

      const numId = parseInt(targetId, 10);
      if (isNaN(numId)) return;

      // Loading state on artwork
      if (focalSprite) {
        focalSprite.style.opacity = "0.3";
      }

      const nextPokemon = await fetchPokemonById(numId);
      if (nextPokemon) {
        openPokemonModal(nextPokemon);
      }
    });
  });
}

function closeModal() {
  if (!modal) return;
  try {
    const url = new URL(window.location);
    url.searchParams.delete("pokemon");
    window.history.replaceState({}, "", url);
  } catch (e) {}

  if (typeof modal.close === "function") {
    modal.close();
  } else {
    modal.removeAttribute("open");
  }
}

// ============================================================================
// Event Listeners & Initialization
// ============================================================================

// Generation select
if (selectGen) {
  selectGen.addEventListener("change", (e) => {
    sound.playTone(500, 0.08);
    const url = new URL(window.location);
    url.searchParams.set("gen", e.target.value);
    window.history.replaceState({}, "", url);
    loadData(e.target.value);
  });
}

// Language select
if (selectLang) {
  selectLang.addEventListener("change", (e) => {
    currentLang = e.target.value;
    sound.playTone(650, 0.08);
    renderTypeChips();
    displayPokemons();

    // If modal is currently open, refresh it in the new language
    if (modal && modal.open && currentActivePokemonId) {
      const currentPoke = pokemonDetailsCache.get(currentActivePokemonId);
      if (currentPoke) renderModalBody(currentPoke);
    }
  });
}

// Sort select
if (selectSort) {
  selectSort.addEventListener("change", (e) => {
    currentSort = e.target.value;
    sound.playTone(550, 0.06);
    displayPokemons();
  });
}

// Attribute Filter Chips
if (attributeChips) {
  attributeChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      attributeChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      currentAttrFilter = chip.dataset.filter;
      sound.playTone(600, 0.06);
      displayPokemons();
    });
  });
}

// Random Pokémon Button
if (randomBtn) {
  randomBtn.addEventListener("click", () => {
    pickRandomPokemon();
  });
}

// Team Drawer Controls
if (teamToggleBtn && teamDrawer) {
  teamToggleBtn.addEventListener("click", () => {
    sound.playTone(600, 0.08);
    teamDrawer.removeAttribute("hidden");
    updateTeamUI();
  });
}

if (closeTeamBtn && teamDrawer) {
  closeTeamBtn.addEventListener("click", () => {
    teamDrawer.setAttribute("hidden", "");
  });
}

if (teamDrawerBackdrop && teamDrawer) {
  teamDrawerBackdrop.addEventListener("click", () => {
    teamDrawer.setAttribute("hidden", "");
  });
}

if (clearTeamBtn) {
  clearTeamBtn.addEventListener("click", () => {
    clearTeam();
  });
}

// Live Search with Instant Debounce
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    if (searchClear) {
      searchClear.hidden = currentSearch.length === 0;
    }
    displayPokemons();
  });
}

if (searchClear) {
  searchClear.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    currentSearch = "";
    searchClear.hidden = true;
    displayPokemons();
    if (searchInput) searchInput.focus();
  });
}

// Reset Type Filters
if (resetTypesBtn) {
  resetTypesBtn.addEventListener("click", () => {
    selectedType = null;
    document.querySelectorAll(".type-chip").forEach((c) => c.classList.remove("active"));
    sound.playTone(500, 0.08);
    displayPokemons();
  });
}

// Sound toggle
if (soundToggle) {
  const updateSoundIcon = (enabled) => {
    soundToggle.innerHTML = `<span class="sound-icon">${enabled ? "🔊" : "🔇"}</span>`;
    soundToggle.setAttribute("title", enabled ? "Son activé (Cliquer pour couper)" : "Son coupé (Cliquer pour activer)");
  };

  updateSoundIcon(sound.enabled);

  soundToggle.addEventListener("click", () => {
    const isEnabled = sound.toggle();
    updateSoundIcon(isEnabled);
  });
}

// Modal Close Button
if (modalClose) {
  modalClose.addEventListener("click", () => {
    closeModal();
  });
}

// Light dismiss: Close modal on backdrop click
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

// Modal Next & Prev Navigation
if (modalPrevBtn) {
  modalPrevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!currentPokemons.length || !currentActivePokemonId) return;
    const idx = currentPokemons.findIndex((p) => p.pokedex_id === currentActivePokemonId);
    if (idx > 0) {
      openPokemonModal(currentPokemons[idx - 1]);
    }
  });
}

if (modalNextBtn) {
  modalNextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!currentPokemons.length || !currentActivePokemonId) return;
    const idx = currentPokemons.findIndex((p) => p.pokedex_id === currentActivePokemonId);
    if (idx !== -1 && idx < currentPokemons.length - 1) {
      openPokemonModal(currentPokemons[idx + 1]);
    }
  });
}

// Global Keyboard Navigation
window.addEventListener("keydown", (e) => {
  const isInputActive = ["INPUT", "SELECT", "TEXTAREA"].includes(document.activeElement?.tagName);

  if (modal && modal.open) {
    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft" && modalPrevBtn && !modalPrevBtn.disabled) {
      modalPrevBtn.click();
    } else if (e.key === "ArrowRight" && modalNextBtn && !modalNextBtn.disabled) {
      modalNextBtn.click();
    }
    return;
  }

  // If team drawer is open, escape closes it
  if (teamDrawer && !teamDrawer.hasAttribute("hidden") && e.key === "Escape") {
    teamDrawer.setAttribute("hidden", "");
    return;
  }

  // Global shortcuts when not in an input
  if (!isInputActive) {
    if (e.key === "/" || (e.ctrlKey && e.key === "k")) {
      e.preventDefault();
      if (searchInput) searchInput.focus();
    } else if (e.key === "r" || e.key === "R") {
      pickRandomPokemon();
    } else if (e.key === "f" || e.key === "F") {
      const favChip = document.querySelector(".attr-chip.fav-chip");
      if (favChip) favChip.click();
    } else if (e.key === "t" || e.key === "T") {
      if (teamToggleBtn) teamToggleBtn.click();
    }
  }
});

// Back to top button
if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Check for URL query parameters (Deep Linking on subdomain)
const urlParams = new URLSearchParams(window.location.search);
const openPokeParam = urlParams.get("pokemon") || urlParams.get("open");
const genParam = urlParams.get("gen");
const typeParam = urlParams.get("type");
const filterParam = urlParams.get("filter");
const searchParam = urlParams.get("search");
const sortParam = urlParams.get("sort");

if (genParam && selectGen) {
  selectGen.value = genParam;
}
if (typeParam) {
  selectedType = typeParam;
}
if (searchParam && searchInput) {
  searchInput.value = searchParam;
  currentSearch = searchParam;
  if (searchClear) searchClear.hidden = false;
}
if (sortParam && selectSort) {
  selectSort.value = sortParam;
  currentSort = sortParam;
}
if (filterParam && attributeChips) {
  currentAttrFilter = filterParam;
  attributeChips.forEach((c) => c.classList.toggle("active", c.dataset.filter === filterParam));
}

// Initialize UI States
updateFavoriteUI();
updateTeamUI();

// Initialize Application
loadTypes();
const initialGen = selectGen ? parseInt(selectGen.value, 10) || 1 : 1;
loadData(initialGen).then(() => {
  if (openPokeParam) {
    const targetId = parseInt(openPokeParam, 10);
    const found = currentPokemons.find((p) => p.pokedex_id === targetId);
    if (found) {
      setTimeout(() => openPokemonModal(found), 300);
    } else {
      // Direct lookup in case the Pokémon belongs to another generation
      fetchPokemonById(targetId).then((p) => {
        if (p) setTimeout(() => openPokemonModal(p), 300);
      });
    }
  }
});
