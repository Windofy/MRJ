/* ============================================================
   MRJ4.15 — Mr. Jealousy Interior Intelligence Tool
   Application Logic
   ============================================================ */

'use strict';

// ── CATALOG (mirrors core.py — single source of truth on server,
//    duplicated here so the flyout can render without an extra API call)
const MR_JEALOUSY_CATALOG = {
  'Aluminium Jaloezieën': [
    { name: 'Like RAL9002',      hex: '#E9E5CE', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Like-RAL9002%20A.png',          textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/LOOKS%20LIKE%209002/ALU0590LooksLike9002MAT.png' },
    { name: 'Like RAL9010',      hex: '#F7F9EF', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Like-RAL9010%20A.png',          textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/LOOKS%20LIKE%209010/ALULooksLike9010SILKGLOSS.png' },
    { name: 'Moody Munt',        hex: '#98FF98', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Moody-Munt%20A.png',            textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/MOODY%20MUNT/ALU3790MoodyMunt.png' },
    { name: 'Naughty Aubergine', hex: '#472C4C', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Naughty-Aubergine%20A.png',    textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/NAUGHTY/ALU8222NaughtyAubergine.png' },
    { name: 'Oud Green',         hex: '#8F9779', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Oud-Green%20A.png',             textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/OLD%20GROEN/ALU1229OudGreen.png' },
    { name: 'Peachy Pink',       hex: '#FFDAB9', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Peachy-Pink%20A.png',          textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/PEACHY%20PINK/ALU8238PeachyPink.png' },
    { name: 'Poolside Blue',     hex: '#00BFFF', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Poolside-Blue%20A.png',        textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/POOLSIDE%20BLUE/ALU8234PoolsideBlue.png' },
    { name: 'Purple Grey',       hex: '#6D6875', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Purple-Grey%20A.png',          textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/PURPLE%20GRIJS/ALU2095PurpleGrey.png' },
    { name: 'Rocky Rood',        hex: '#8B0000', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Rocky-Rood%20A.png',           textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/ROCKY%20ROOD/ALU5699RockyRood.png' },
    { name: 'Rusty Retro',       hex: '#B7410E', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Rusty-Retro%20A.png',          textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/RUSTY%20RETRO/ALU7919RustyRetro.png' },
    { name: 'Silk Zwart',        hex: '#050505', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Silk-Zwart%20A.png',           textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/SILK%20ZWART/ALU9020SilkZwart.png' },
    { name: 'Skinny Dip',        hex: '#F4C2C2', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Skinny-Dip%20A.png',           textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/SKINNY%20DIP/ALU8266SkinnyDip.png' },
    { name: 'Smokey Grey',       hex: '#708090', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Smokey-Grey%20A.png',          textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/SMOKEY%20GRIJS/ALU9018SmokeyGrey.png' },
    { name: 'Soft Naakt',        hex: '#E3BC9A', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Soft-Naakt%20A.png',           textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/POEDEL%20NUDE/ALU9015SoftNaakt.png' },
    { name: 'Soft Terra',        hex: '#E2725B', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Soft-Terra%20A.png',           textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/ZACHT%20TERRA/ALU9019SoftTerra.png' },
    { name: 'Stevig Taupe',      hex: '#483C32', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Stevig-Taupe%20A.png',         textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/STEVIG%20TAUPE/ALU4544StevigTaupe.png' },
    { name: 'Stormy Taupe',      hex: '#5C5552', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Stormy-Taupe%20A.png',         textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/STORMY%20TAUPE/ALU_8236_Stormy-Taupe_.jpeg' },
    { name: 'Twijfel Taupe',     hex: '#876C5E', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Twijfel-Taupe%20A.png',        textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/TWIJFEL%20TAUPE/ALU9014TwijfelTaupe.png' },
    { name: 'Velvet Brown',      hex: '#4B3621', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Velvet-Brown%20A.png',         textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/VELVET%20BRUIN/ALU9017VelvetBrown.png' },
    { name: 'Bold Bruin',        hex: '#654321', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Bold-Bruin%20A.png',           textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/BOLD%20BRUIN/ALU4798BoldBruin.png' },
    { name: 'Butter Geel',       hex: '#F3E5AB', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Butter-Geel%20A.png',          textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/BUTTER%20GEEL/ALU4315ButterGeel.png' },
    { name: 'Cherry Pop',        hex: '#D2042D', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Cherry-Pop%20A.png',           textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/CHERRY%20POP/ALU8261CherryPop.png' },
    { name: 'Cool Grey',         hex: '#A9A9A9', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Cool-Grey%20A.png',            textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/COOL%20GRIJS/ALU9011CoolGrey.png' },
    { name: 'Cosmic Blauw',      hex: '#000080', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Cosmic-Blauw%20A.png',         textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/COSMIC%20BLAUW/ALU8235CosmicBlauw.png' },
    { name: 'Crazy Karamel',     hex: '#C68E17', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Crazy-Karamel%20A.png',        textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/CRAZY%20KARAMEL/ALU4394CrazyKaramel.png' },
    { name: 'Drop Zwart',        hex: '#1A1A1A', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Drop-Zwart%20A.png',           textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/DROP%20ZWART/ALU1861DropZwart.png' },
    { name: 'Fluffy Naakt',      hex: '#F5DEB3', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Fluffy-Naakt%20A.png',         textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/FLUFFY%20NAAKT/ALU9021FluffyNaakt.png' },
    { name: 'Brushed Nikkel',    hex: '#B0C4DE', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Geborsteld-Nikkel%20A.png',    textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/BRUSHED%20NIKKEL/ALU7325GeborsteldNikkel.png' },
    { name: 'Koffie Koper',      hex: '#B87333', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Koffie-Koper%20A.png',         textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/COFFEE%20KOPER/ALU7380GebrandKoper.png' },
    { name: 'Glitter Gold',      hex: '#FFD700', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Glitter-Gold%20A.png',         textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/GLITTER%20GOUD/ALU7529GlitterGold.png' },
    { name: 'Goed Grijs',        hex: '#808080', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Goed-Grijs%20A.png',            textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/GOED%20GRIJS/ALU_1510_Goed-Grijs_6.jpeg' },
    { name: 'Jet Black',         hex: '#050505', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Jet-Black%20A.png',             textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/JET%20BLACK/ALU_8228_Jet-Black_1.jpeg' },
    { name: 'Juicy Olive',       hex: '#808000', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Juicy-Olive%20A.png',          textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/JUICY%20OLIVE/ALU8268JuicyOlive.png' },
    { name: 'Koel Blue',         hex: '#AEC6CF', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Koel-Blue%20A.png',            textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/KOEL%20BLUE/ALU0990KoelBlueMAT.png' },
    { name: 'Like RAL9001',      hex: '#FDF4E3', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Like-RAL9001%20A.png',         textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/LOOKS%20LIKE%209001/ALU4491LooksLike9001.png' },
    { name: 'Like RAL9016',      hex: '#F0F8FF', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Like-RAL9016%20A.png',         textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/LOOKS%20LIKE%209016/ALU0192LooksLike9016MAT.png' },
    { name: 'Aubergine',         hex: '#5D0A6D', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Naughty-Aubergine%20A.png',    textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/AUBERGINE/ALU5082Aubergine.png' },
    { name: 'Cowboy Koper',      hex: '#8B4513', material: 'Aluminium', sampleUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/COWBOY%20KOPER/ALU_7381_Cowboy-Koper_BRUSHED_DA.jpeg', textureUrl: 'https://storage.googleapis.com/mrjealousy/ALUMINIUM%20JALOEZIE/COWBOY%20KOPER/ALU_7381_Cowboy-Koper_BRUSHED_UD.jpeg' },
  ],
  'Houten Jaloezieën': [
    { name: 'Like RAL9016',    hex: '#F0F8FF', material: 'Hout', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Like-RAL9016%20A.png' },
    { name: 'Mister Sandman',  hex: '#C2B280', material: 'Hout', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Mister-Sandman.png',        textureUrl: 'https://storage.googleapis.com/mrjealousy/HOUTEN%20JALOEZIE/MISTER%20SANDMAN/HOUTENJALOEZIESAND.png' },
    { name: 'Misty Bamboo',    hex: '#DCC098', material: 'Hout', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Misty-Bamboo.png',           textureUrl: 'https://storage.googleapis.com/mrjealousy/HOUTEN%20JALOEZIE/MISTY%20BAMBOO/BAMBOEJALOEZIEMISTYBAMBOO.png' },
    { name: 'Oak Mooi',        hex: '#C3A376', material: 'Hout', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Oak-Mooi.png',               textureUrl: 'https://storage.googleapis.com/mrjealousy/HOUTEN%20JALOEZIE/OAK%20MOOI/HOUTENJALOEZIEOAKMOOIMRJEALOUSY.png' },
    { name: 'Parel White',     hex: '#F5F5F5', material: 'Hout', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Parel-White.png',            textureUrl: 'https://storage.googleapis.com/mrjealousy/HOUTEN%20JALOEZIE/PAREL%20WHITE/BAMBOEJALOEZIE5080WHITE.png' },
    { name: 'Shades of Grey',  hex: '#808080', material: 'Hout', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Shades-of-Grey.png',         textureUrl: 'https://storage.googleapis.com/mrjealousy/HOUTEN%20JALOEZIE/SHADE%20OF%20GREY/HOUTENJALOEZIEGREY.png' },
    { name: 'Smokey Taupe',    hex: '#9E958C', material: 'Hout', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Smokey-Taupe.png',           textureUrl: 'https://storage.googleapis.com/mrjealousy/HOUTEN%20JALOEZIE/SMOKEY%20TAUPE/BAMBOEJALOEZIESMOKEYTAUPEMRJEALOUSY07.png' },
    { name: 'Teder Taupe',     hex: '#D8CCBB', material: 'Hout', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Teder-Taupe.png',            textureUrl: 'https://storage.googleapis.com/mrjealousy/HOUTEN%20JALOEZIE/TEDER%20TAUPE/HOUTENJALOEZIETEDERTAUPE.png' },
    { name: 'Tiki Taupe',      hex: '#A69686', material: 'Hout', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Tiki-Taupe.png',             textureUrl: 'https://storage.googleapis.com/mrjealousy/HOUTEN%20JALOEZIE/TIKI%20TAUPE/BAMBOEJALOEZIETIKITAUPE.png' },
    { name: 'BBQ Black',       hex: '#111111', material: 'Hout', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/BBQ-Black.png',              textureUrl: 'https://storage.googleapis.com/mrjealousy/HOUTEN%20JALOEZIE/BBQ%20BLACK/BAMBOEJALOEZIE5081BBQBLACK.png' },
    { name: 'Behoorlijk Black',hex: '#222222', material: 'Hout', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Behoorlijk-Black.png',       textureUrl: 'https://storage.googleapis.com/mrjealousy/HOUTEN%20JALOEZIE/BEHOORLIJK%20BLACK/BAMBOEJALOEZIE5079BLACK.png' },
    { name: 'Bonsai Bamboo',   hex: '#6B8E23', material: 'Hout', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Bonsai_Bamboo.png',          textureUrl: 'https://storage.googleapis.com/mrjealousy/HOUTEN%20JALOEZIE/BONZAI%20BAMBOO/BAMBOEJALOEZIEBONZAI.png' },
    { name: 'Bourbon Bamboo',  hex: '#654321', material: 'Hout', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Bourbon-Bamboo.png',         textureUrl: 'https://storage.googleapis.com/mrjealousy/HOUTEN%20JALOEZIE/BOURBON%20BAMBOO/BAMBOEJALOEZIEBOURBON.png' },
    { name: 'De Naturist',     hex: '#D2B48C', material: 'Hout', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/De-Naturist.png',            textureUrl: 'https://storage.googleapis.com/mrjealousy/HOUTEN%20JALOEZIE/DE%20NATURIST/BAMBOEJALOEZIE5071NATURAL.png' },
    { name: 'Donker Brown',    hex: '#3B2F2F', material: 'Hout', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Donker-Brown.png',           textureUrl: 'https://storage.googleapis.com/mrjealousy/HOUTEN%20JALOEZIE/DONKER%20BROWN/BAMBOEJALOEZIE5078DARKBROWNMRJEALOUSY07.png' },
    { name: 'Eigenlijk Eiken', hex: '#A0785A', material: 'Hout', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Eigenlijk-Eiken.png',        textureUrl: 'https://storage.googleapis.com/mrjealousy/HOUTEN%20JALOEZIE/EIGENLIJK%20EIKEN/BAMBOEJALOEZIE5072OAK.png' },
    { name: 'Flat White',      hex: '#FFFAF0', material: 'Hout', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Flat-White.png',             textureUrl: 'https://storage.googleapis.com/mrjealousy/HOUTEN%20JALOEZIE/FLAT%20WHITE/HOUTENJALOEZIEWHITE.png' },
    { name: 'Gebroken White',  hex: '#FDF5E6', material: 'Hout', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Gebroken-White.png',         textureUrl: 'https://storage.googleapis.com/mrjealousy/HOUTEN%20JALOEZIE/GEBROKEN%20WHITE/HOUTENJALOEZIEGEBROKENWHITE.png' },
    { name: 'Haver Milk',      hex: '#EFEBD8', material: 'Hout', sampleUrl: 'https://storage.googleapis.com/mrjealousy/COLOR%20SAMPLES/Haver-Milk.png',             textureUrl: 'https://storage.googleapis.com/mrjealousy/HOUTEN%20JALOEZIE/HAVER%20MILK/BAMBOEJALOEZIEHAVERMILKMRJEALOUSY.png' },
    { name: 'Smokey Bamboo',   hex: '#4A4A4A', material: 'Hout', sampleUrl: 'https://storage.googleapis.com/mrjealousy/HOUTEN%20JALOEZIE/SMOKEY%20BAMBOO/BAMBOE-JALOEZIE_5077_GRANITE_0fc56d7f-.jpeg' },
    { name: 'Deep Zwart',      hex: '#080808', material: 'Hout', sampleUrl: 'https://storage.googleapis.com/mrjealousy/HOUTEN%20JALOEZIE/DEEP%20ZWART/HOUTEN-JALOEZIE_BLACK_04686c36-330d-4935-.jpeg', textureUrl: 'https://storage.googleapis.com/mrjealousy/HOUTEN%20JALOEZIE/DEEP%20ZWART/HOUTENJALOEZIEBLACK.png' },
  ],
};

// ── APPLICATION STATE ──────────────────────────────────────────

const APP = {
  currentPage: 'landing',   // 'landing' | 'loading' | 'result'
  uploadedImageBase64: null,
  analysisResult: null,
  selectedColor: null,       // { name, hex, material, sampleUrl, productType }
  flyoutMaterial: 'Aluminium Jaloezieën',
  progressInterval: null,
  renderBusy: false,
  previewBusy: false,        // true while generating preview
  previewAbortController: null,  // for cancelling preview requests
};

// ── DOM REFS ───────────────────────────────────────────────────

const pages = {
  landing: document.getElementById('page-landing'),
  loading: document.getElementById('page-loading'),
  result:  document.getElementById('page-result'),
};

// ── PAGE NAVIGATION ────────────────────────────────────────────

function showPage(name) {
  Object.values(pages).forEach(p => p.classList.remove('active'));
  pages[name].classList.add('active');
  APP.currentPage = name;
  if (name === 'landing') stopCarousel();
}

// ── TEXT CAROUSEL (loading page) ───────────────────────────────

let carouselTimer = null;
let carouselCurrent = 0;

function startCarousel() {
  const items = document.querySelectorAll('.carousel-item');
  if (!items.length) return;

  carouselCurrent = 0;
  items.forEach(el => el.classList.remove('active', 'leaving'));
  items[0].classList.add('active');

  carouselTimer = setInterval(() => {
    const next = (carouselCurrent + 1) % items.length;
    const leaving = items[carouselCurrent];

    leaving.classList.add('leaving');
    leaving.classList.remove('active');
    setTimeout(() => leaving.classList.remove('leaving'), 1300);

    items[next].classList.add('active');
    carouselCurrent = next;
  }, 3000);
}

function stopCarousel() {
  clearInterval(carouselTimer);
  carouselTimer = null;
  document.querySelectorAll('.carousel-item')
    .forEach(el => el.classList.remove('active', 'leaving'));
}

// ── PROGRESS BAR ───────────────────────────────────────────────

// Time-based progress: de /analyze call duurt gemiddeld ~50-55 seconden.
// De balk loopt in ~55s van 0% naar 95%, dan springt completeProgress naar 100%.
const EXPECTED_ANALYSIS_MS = 55000;

function startProgress() {
  const fill = document.getElementById('progress-fill');
  fill.style.width = '0%';
  APP.progressStart = Date.now();

  // Vloeiende CSS-transitie voor een levende balk
  fill.style.transition = 'width 0.6s ease-out';

  APP.progressInterval = setInterval(() => {
    const elapsed = Date.now() - APP.progressStart;
    // Easing: loopt snel op tot 70%, dan vertraagt richting 95%
    const linear = Math.min(elapsed / EXPECTED_ANALYSIS_MS, 1);
    const eased  = 1 - Math.pow(1 - linear, 2.5); // ease-out cubic
    const pct    = Math.min(eased * 95, 95);
    fill.style.width = pct.toFixed(1) + '%';
  }, 300);
}

function completeProgress() {
  clearInterval(APP.progressInterval);
  const fill = document.getElementById('progress-fill');
  fill.style.transition = 'width 0.4s ease-in-out';
  fill.style.width = '100%';
}

// ── IMAGE RESIZE (client-side, reduceert payload 60-80%) ──────

/**
 * Resize afbeelding client-side naar max 1280px aan de langste zijde.
 * Teruggeven als base64 JPEG (quality 88) — zelfde formaat als FileReader.
 */
async function resizeImage(file, maxSide = 1280, quality = 0.88) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width: w, height: h } = img;
      if (w > maxSide || h > maxSide) {
        if (w > h) { h = Math.round(h * maxSide / w); w = maxSide; }
        else       { w = Math.round(w * maxSide / h); h = maxSide; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = reject;
    img.src = url;
  });
}

async function handleFile(file) {
  if (!file || !file.type.match(/image\/(png|jpeg|webp)/)) {
    alert('Gebruik een PNG, JPG of WEBP afbeelding.');
    return;
  }
  if (file.size > 4 * 1024 * 1024) {
    alert('De afbeelding is te groot. Maximaal 4MB toegestaan.');
    return;
  }

  // Resize client-side vóór upload (reduceert payload 60-80%)
  const base64 = await resizeImage(file);
  APP.uploadedImageBase64 = base64;

  showPage('loading');
  startProgress();
  startCarousel();

  try {
    const result = await analyzeImage(base64);
    completeProgress();
    await sleep(400);
    populateResult(result);
    showPage('result');
  } catch (err) {
    completeProgress();
    await sleep(300);
    showPage('result');
    showError(err.message || 'Er is iets misgegaan. Probeer een andere foto.');
  }
}

// ── API CALLS ──────────────────────────────────────────────────

async function analyzeImage(base64) {
  const resp = await fetch('/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: base64 }),
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.error || `Server fout: ${resp.status}`);
  }
  return resp.json();
}

async function renderVisualization() {
  if (APP.renderBusy || !APP.uploadedImageBase64 || !APP.selectedColor) return;
  APP.renderBusy = true;

  showRenderLoader();
  const btn = document.getElementById('btn-visualiseer');
  btn.disabled = true;

  const config = {
    productType:  APP.selectedColor.productType,
    material:     APP.selectedColor.material,
    colorName:    APP.selectedColor.name,
    colorHex:     APP.selectedColor.hex,
    sampleUrl:    APP.selectedColor.sampleUrl || '',
  };

  const extraOptions = {
    lighting:   getSelected('rg-dagdeel') || 'Zonsondergang (Warm)',
    ladderTape: getSelected('rg-ladder') === 'Ladderband',
    slatWidth:  getSelected('rg-lamel'),
    slatAngle:  getSelected('rg-kantel') || 'Privacy',
  };

  const mounting = APP.analysisResult?.windowCheck?.recommendation || 'in de dag';
  // Jaloezie altijd volledig neergelaten — kantelstand regelt alleen de lamelhoek
  const state = 'Geheel uitgerold';

  try {
    const resp = await fetch('/render', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image:    APP.uploadedImageBase64,
        config,
        mounting,
        state,
        extraOptions,
        analysis: APP.analysisResult,
      }),
    });
    if (!resp.ok) throw new Error(`Render fout: ${resp.status}`);
    const data = await resp.json();
    if (data.image) {
      document.getElementById('ba-after').src = data.image;
      setSliderPosition(50);
      hideRenderLoader();
      scrollToResult();
    }
  } catch (err) {
    hideRenderLoader();
    alert('Visualisatie mislukt: ' + err.message);
  } finally {
    APP.renderBusy = false;
    btn.disabled = false;
  }
}

// ── LOADER VISIBILITY ──────────────────────────────────────────

function showRenderLoader() {
  const loader = document.getElementById('render-loader');
  if (loader) loader.style.display = 'flex';
}

function hideRenderLoader() {
  const loader = document.getElementById('render-loader');
  if (loader) loader.style.display = 'none';
}

// ── AUTO SCROLL ────────────────────────────────────────────────

function scrollToResult() {
  const baContainer = document.getElementById('ba-container');
  if (baContainer) {
    baContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// ── DEBOUNCE UTILITY ───────────────────────────────────────────

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// ── POPULATE RESULT ────────────────────────────────────────────

function populateResult(result) {
  APP.analysisResult = result;
  hideError();

  // Before image
  document.getElementById('ba-before').src = APP.uploadedImageBase64;
  document.getElementById('ba-after').src  = APP.uploadedImageBase64;

  // Quality check gate
  if (result.qualityFailed) {
    showError(result.qualityFeedback || 'De foto voldoet niet aan de kwaliteitseisen.');
    return;
  }

  // Suggestions (top 3)
  const suggestions = (result.suggestions || []).slice(0, 3);
  renderSuggestions(suggestions);

  // Select first suggestion as default
  if (suggestions.length > 0) {
    selectColor({
      ...findCatalogColor(suggestions[0].colorName, suggestions[0].productType),
      productType: suggestions[0].productType,
    });
  }

  // Technical check
  const wc = result.windowCheck || {};
  document.getElementById('tc-type').textContent     = wc.windowType    || '—';
  document.getElementById('tc-plaatsing').textContent = wc.recommendation || '—';
  document.getElementById('tc-aantal').textContent   = wc.detectedWindowCount ?? '—';

  // Special considerations
  document.getElementById('sp-obstakels').textContent     = wc.obstacles ? 'Ja' : 'Nee';
  document.getElementById('sp-bijzonderheden').textContent = wc.specialConsiderations || '—';


  // Reset slider
  setSliderPosition(50);

  // Generate initial preview
  generatePreview();
}

function renderSuggestions(suggestions) {
  const list = document.getElementById('suggestion-list');
  list.innerHTML = '';

  suggestions.forEach((s, i) => {
    const color = findCatalogColor(s.colorName, s.productType) || {
      name: s.colorName, material: s.material || s.productType, sampleUrl: '', hex: s.colorHex,
    };
    const card = document.createElement('div');
    card.className = 'suggestion-card' + (i === 0 ? ' selected' : '');
    card.dataset.index = i;
    card.innerHTML = `
      <img class="suggestion-thumb"
           src="${escHtml(color.sampleUrl)}"
           alt="${escHtml(color.name)}"
           onerror="this.style.background='transparent'"
      />
      <div class="suggestion-info">
        <div class="suggestion-name">${escHtml(color.name)}</div>
        <div class="suggestion-material">${escHtml(color.material)}</div>
      </div>
      <svg class="suggestion-chevron" viewBox="0 0 24 24" fill="none">
        <polyline points="6 9 12 15 18 9" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    card.addEventListener('click', () => {
      document.querySelectorAll('.suggestion-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectColor({ ...color, productType: s.productType });
    });
    list.appendChild(card);
  });
}

// Debounce: max 1 preview-request per 600ms — voorkomt rapid-fire bij kleurklikken
let _previewDebounceTimer = null;
function schedulePreview() {
  clearTimeout(_previewDebounceTimer);
  _previewDebounceTimer = setTimeout(() => generatePreview(), 600);
}

function selectColor(color) {

  APP.selectedColor = color;
  const heroImg = document.getElementById('color-hero-img');
  const imgSrc = color.textureUrl || color.sampleUrl || '';
  heroImg.src = imgSrc;
  document.getElementById('color-hero-name').textContent = color.name || '—';
  document.getElementById('color-hero-material').textContent = color.material || '—';

  // Detect full-product photo (JPEG from JALOEZIE folders)
  // These need zoom + repositioning to hide the black background
  const isProductPhoto = /JALOEZIE.*\.(jpe?g)$/i.test(imgSrc);
  heroImg.classList.toggle('hero-img--product', isProductPhoto);

  schedulePreview();
}

function findCatalogColor(name, productType) {
  const list = productType ? MR_JEALOUSY_CATALOG[productType] : null;
  if (list) {
    const found = list.find(c => c.name === name);
    if (found) return found;
  }
  // Fallback: search all
  for (const [pt, colors] of Object.entries(MR_JEALOUSY_CATALOG)) {
    const found = colors.find(c => c.name === name);
    if (found) return { ...found, productType: pt };
  }
  return null;
}

// ── ERROR DISPLAY ──────────────────────────────────────────────

function showError(msg) {
  const banner = document.getElementById('error-banner');
  banner.textContent = msg;
  banner.classList.add('visible');
}

function hideError() {
  document.getElementById('error-banner').classList.remove('visible');
}

// ── BEFORE / AFTER SLIDER ──────────────────────────────────────

let isDraggingSlider = false;

function setSliderPosition(pct) {
  const divider = document.getElementById('ba-divider');
  const handle  = document.getElementById('ba-handle');
  const after   = document.getElementById('ba-after');
  const clipped = Math.max(0, Math.min(100, pct));
  divider.style.left   = clipped + '%';
  handle.style.left    = clipped + '%';
  after.style.clipPath = `inset(0 ${100 - clipped}% 0 0)`;
}

function initSlider() {
  const container = document.getElementById('ba-container');

  function getPos(e) {
    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    return ((clientX - rect.left) / rect.width) * 100;
  }

  container.addEventListener('mousedown', e => {
    isDraggingSlider = true;
    setSliderPosition(getPos(e));
    e.preventDefault();
  });

  container.addEventListener('touchstart', e => {
    isDraggingSlider = true;
    setSliderPosition(getPos(e));
  }, { passive: true });

  window.addEventListener('mousemove', e => {
    if (isDraggingSlider) setSliderPosition(getPos(e));
  });

  window.addEventListener('touchmove', e => {
    if (isDraggingSlider) setSliderPosition(getPos(e));
  }, { passive: true });

  window.addEventListener('mouseup',   () => { isDraggingSlider = false; });
  window.addEventListener('touchend',  () => { isDraggingSlider = false; });
}

// ── RADIO GROUPS ───────────────────────────────────────────────

function initRadioGroup(groupId) {
  const group = document.getElementById(groupId);
  if (!group) return;
  group.querySelectorAll('.radio-item').forEach(item => {
    item.addEventListener('click', () => {
      group.querySelectorAll('.radio-item').forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
    });
  });
}

function getSelected(groupId) {
  const group = document.getElementById(groupId);
  if (!group) return null;
  const selected = group.querySelector('.radio-item.selected');
  return selected ? selected.dataset.value : null;
}

// ── FLYOUT ─────────────────────────────────────────────────────

function openFlyout() {
  const overlay = document.getElementById('flyout-overlay');
  overlay.classList.add('open');
  renderFlyoutList();
}

function closeFlyout() {
  document.getElementById('flyout-overlay').classList.remove('open');
}

function renderFlyoutList() {
  const list    = document.getElementById('flyout-list');
  const colors  = MR_JEALOUSY_CATALOG[APP.flyoutMaterial] || [];
  list.innerHTML = '';

  colors.forEach(color => {
    const item = document.createElement('div');
    const isSelected = APP.selectedColor && APP.selectedColor.name === color.name;
    item.className = 'flyout-item' + (isSelected ? ' selected' : '');
    item.innerHTML = `
      <img class="flyout-thumb"
           src="${escHtml(color.sampleUrl)}"
           alt="${escHtml(color.name)}"
           onerror="this.style.background='transparent'"
      />
      <div>
        <div class="flyout-name">${escHtml(color.name)}</div>
        <div class="flyout-material">${escHtml(color.material)}</div>
      </div>
    `;
    item.addEventListener('click', () => {
      selectColor({ ...color, productType: APP.flyoutMaterial });
      closeFlyout();
      // Also update suggestion cards to deselect
      document.querySelectorAll('.suggestion-card').forEach(c => c.classList.remove('selected'));
    });
    list.appendChild(item);
  });
}

function initFlyoutMaterialToggle() {
  const toggle = document.getElementById('mat-toggle');
  toggle.querySelectorAll('.radio-item').forEach(item => {
    item.addEventListener('click', () => {
      toggle.querySelectorAll('.radio-item').forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
      APP.flyoutMaterial = item.dataset.value;
      renderFlyoutList();
    });
  });
}

// ── DRAG & DROP ON UPLOAD ZONE ─────────────────────────────────

function initUploadZone() {
  const zone  = document.getElementById('upload-zone');
  const input = document.getElementById('file-input');

  input.addEventListener('change', e => {
    if (e.target.files[0]) handleFile(e.target.files[0]);
  });

  zone.addEventListener('dragover', e => {
    e.preventDefault();
    zone.classList.add('drag-over');
  });

  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));

  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  });
}

// ── SAVE / DOWNLOAD ────────────────────────────────────────────

function saveResult() {
  const afterSrc = document.getElementById('ba-after').src;
  if (!afterSrc || afterSrc === APP.uploadedImageBase64) return;
  const a = document.createElement('a');
  a.href     = afterSrc;
  a.download = 'mr-jealousy-visualisatie.jpg';
  a.click();
}

// ── PREVIEW GENERATION ─────────────────────────────────────────

async function generatePreview() {
  if (!APP.uploadedImageBase64 || !APP.selectedColor || APP.previewBusy || APP.renderBusy) return;
  APP.previewBusy = true;

  // Cancel previous preview request if any
  if (APP.previewAbortController) {
    APP.previewAbortController.abort();
  }
  APP.previewAbortController = new AbortController();

  // Preview is een stille achtergrondoperatie — geen zichtbare loader.

  const config = {
    productType:  APP.selectedColor.productType,
    material:     APP.selectedColor.material,
    colorName:    APP.selectedColor.name,
    colorHex:     APP.selectedColor.hex,
    sampleUrl:    APP.selectedColor.sampleUrl || '',
  };

  const extraOptions = {
    lighting:   getSelected('rg-dagdeel') || 'Zonsondergang (Warm)',
    ladderTape: getSelected('rg-ladder') === 'Ladderband',
    slatWidth:  getSelected('rg-lamel'),
    slatAngle:  getSelected('rg-kantel') || 'Privacy',
  };

  const mounting = APP.analysisResult?.windowCheck?.recommendation || 'in de dag';
  // Jaloezie altijd volledig neergelaten — kantelstand regelt alleen de lamelhoek
  const state = 'Geheel uitgerold';

  try {
    const resp = await fetch('/preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image:    APP.uploadedImageBase64,
        config,
        mounting,
        state,
        extraOptions,
        analysis: APP.analysisResult,
      }),
      signal: APP.previewAbortController.signal,
    });

    if (!resp.ok) {
      // Preview tijdelijk niet beschikbaar — stil afhandelen, voor-beeld blijft zichtbaar
      console.warn(`[Visualisatie] Preview niet beschikbaar (${resp.status})`);
      return;
    }

    const data = await resp.json();
    if (data.image) {
      document.getElementById('ba-after').src = data.image;
    }
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.warn('Preview generation failed (non-critical):', err.message);
      // Geen zichtbare fout — het voor-beeld blijft als fallback
    }
  } finally {
    APP.previewBusy = false;
    // Loader is niet getoond voor preview, maar zeker stellen dat hij verborgen is
    hideRenderLoader();
  }
}

// ── UTILITY ────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function escHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── INIT ───────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  // Upload zone
  initUploadZone();

  // Slider
  initSlider();

  // Radio groups
  ['rg-ladder', 'rg-lamel', 'rg-kantel', 'rg-dagdeel'].forEach(initRadioGroup);

  // Live preview update on option change (ladder, slat width, tilt) with debounce
  const debouncedPreview = debounce(generatePreview, 400);
  ['rg-ladder', 'rg-lamel', 'rg-kantel'].forEach(groupId => {
    document.getElementById(groupId)
      ?.querySelectorAll('.radio-item')
      .forEach(item => item.addEventListener('click', debouncedPreview));
  });

  // Flyout material toggle
  initFlyoutMaterialToggle();

  // Close buttons → back to landing
  // Always reset the file input so the same file can be re-uploaded.
  function goToLanding() {
    document.getElementById('file-input').value = '';
    showPage('landing');
  }

  document.getElementById('btn-sluiten-landing').addEventListener('click',
    () => window.location.reload());
  document.getElementById('btn-afsluiten-loading').addEventListener('click',
    () => { clearInterval(APP.progressInterval); goToLanding(); });
  document.getElementById('btn-afsluiten-result').addEventListener('click', goToLanding);

  // Kleuren flyout
  document.getElementById('btn-kleuren').addEventListener('click', openFlyout);
  document.getElementById('btn-flyout-sluiten').addEventListener('click', closeFlyout);
  document.getElementById('flyout-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('flyout-overlay')) closeFlyout();
  });

  // Visualiseer button (single button)
  document.getElementById('btn-visualiseer').addEventListener('click', renderVisualization);

  // Opnieuw & Opslaan
  document.getElementById('btn-opnieuw').addEventListener('click', goToLanding);
  document.getElementById('btn-opslaan').addEventListener('click', saveResult);

  // Keyboard: Escape closes flyout
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeFlyout();
  });

  // Initialize slider at center
  setSliderPosition(50);
});
