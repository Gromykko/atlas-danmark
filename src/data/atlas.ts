import type { Atlas } from "./schema.ts";
import { modernEvents, modernLinks } from "./events-modern.ts";

// Atlas Danmark — dataset.
//
// Sourcing: every event below comes from danmarkshistorien.lex.dk, the
// encyclopaedia edited at Aarhus University, retrieved 2026-07-20. No event in
// this file rests on Wikipedia.
//
// Note on URLs: danmarkshistorien.dk/vis/materiale/... now 302-redirects to
// danmarkshistorien.lex.dk. The .lex.dk form is used throughout so the links
// do not depend on a redirect that may not outlive the site migration.
//
// Where the source itself flags a claim as mythologised, disputed, or inferred
// rather than recorded, that is carried through as `contested`/`legendary` with
// both readings — not silently resolved into one national story.

export const atlas: Atlas = {
  meta: { minYear: 690, maxYear: 2026, built: "2026-07-20" },

  columns: [
    { id: "power",    name: { en: "POWER & LAW",        da: "MAGT & LOV" } },
    { id: "land",     name: { en: "BORDERS & EMPIRE",   da: "GRÆNSER & RIGE" } },
    { id: "people",   name: { en: "PEOPLE",             da: "BEFOLKNING" } },
    { id: "conflict", name: { en: "WAR",                da: "KRIG" } },
    { id: "belief",   name: { en: "FAITH & IDEAS",      da: "TRO & IDEER" } },
    { id: "economy",  name: { en: "ECONOMY",            da: "ØKONOMI" } },
    { id: "culture",  name: { en: "CULTURE & SCIENCE",  da: "KULTUR & VIDENSKAB" } }
  ],

  themes: [
    { id: "power",      column: "power",    color: "#b5442d", name: { en: "Power & rulers",  da: "Magt og konger" } },
    { id: "law",        column: "power",    color: "#8f5b3f", name: { en: "Law",             da: "Lov og ret" } },
    { id: "borders",    column: "land",     color: "#7d5a3c", name: { en: "Borders",         da: "Grænser" } },
    { id: "colonies",   column: "land",     color: "#9a6a1f", name: { en: "Colonies",        da: "Kolonier" } },
    { id: "people",     column: "people",   color: "#c2882c", name: { en: "Population",      da: "Befolkning" } },
    { id: "migration",  column: "people",   color: "#a8762b", name: { en: "Migration",       da: "Migration" } },
    // Enslavement is filed with people, not with borders. The trade, its ban and
    // its abolition were themed `colonies` and therefore drawn in the BORDERS &
    // EMPIRE column, which frames the enslaved as a question of territory. The
    // transfers of territory themselves — Estonia, the sale of the West Indies,
    // Greenland's changing status — stay under colonies, because that is what
    // those records are about.
    { id: "enslavement", column: "people",  color: "#6d4534", name: { en: "Enslavement",     da: "Slaveri" } },
    { id: "war",        column: "conflict", color: "#8c2f39", name: { en: "War",             da: "Krig" } },
    { id: "resistance", column: "conflict", color: "#5e3040", name: { en: "Resistance",      da: "Modstand" } },
    { id: "religion",   column: "belief",   color: "#4a5d7e", name: { en: "Religion",        da: "Religion" } },
    { id: "ideas",      column: "belief",   color: "#3d3a4a", name: { en: "Ideas",           da: "Idéer" } },
    { id: "economy",    column: "economy",  color: "#5c8a3a", name: { en: "Economy & trade", da: "Økonomi og handel" } },
    { id: "welfare",    column: "economy",  color: "#2d6a4f", name: { en: "Welfare",         da: "Velfærd" } },
    { id: "culture",    column: "culture",  color: "#7b4b94", name: { en: "Culture",         da: "Kultur" } },
    { id: "science",    column: "culture",  color: "#1f6f8b", name: { en: "Science",         da: "Videnskab" } },
    { id: "everyday",   column: "culture",  color: "#4a7a8c", name: { en: "Everyday life",   da: "Hverdagsliv" } }
  ],

  eras: [
    { id: "viking",    from: 690,  to: 1050, name: { en: "Viking Age",           da: "Vikingetiden" } },
    { id: "medieval",  from: 1050, to: 1397, name: { en: "Medieval kingdom",     da: "Middelalderen" } },
    { id: "union",     from: 1397, to: 1536, name: { en: "Kalmar Union",         da: "Kalmarunionen" } },
    { id: "reform",    from: 1536, to: 1660, name: { en: "Reformation & wars",   da: "Reformation og krige" } },
    { id: "absolute",  from: 1660, to: 1849, name: { en: "Absolutism",           da: "Enevælden" } },
    { id: "constit",   from: 1849, to: 1940, name: { en: "Constitutional era",   da: "Det konstitutionelle Danmark" } },
    { id: "modern",    from: 1940, to: 2026, name: { en: "Occupation & after",   da: "Besættelsen og efter" } }
  ],

  events: [
    // ============ VIKING AGE ============
    {
      id: "ribe", year: 700, yearApproximate: true, theme: "economy", confidence: "sourced",
      title: { en: "Ribe: the first town", da: "Ribe: den første by" },
      summary: {
        en: "Ribe emerges around 700 as one of Scandinavia's first true trading towns — the shift from a farmstead economy to organised long-distance trade. Hedeby follows around 800 and becomes the largest Viking town in Scandinavia.",
        da: "Ribe opstår omkring år 700 som en af Skandinaviens første egentlige handelsbyer — skiftet fra gårdøkonomi til organiseret fjernhandel. Hedeby følger omkring år 800 og bliver den største vikingeby i Skandinavien."
      },
      figures: [{ label: { en: "Founded", da: "Grundlagt" }, value: { en: "Ribe c. 700 · Hedeby c. 800 · Aarhus 800s", da: "Ribe ca. 700 · Hedeby ca. 800 · Aarhus 800-tallet" }, source: "danmarkshistorien.lex.dk, 'Vikingetiden, ca. 800-1050'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Vikingetiden, ca. 800-1050", url: "https://danmarkshistorien.lex.dk/Vikingetiden,_ca._800-1050" }]
    },
    {
      id: "dannevirke", year: 737, theme: "borders", confidence: "sourced",
      title: { en: "Dannevirke closes the peninsula", da: "Dannevirke lukker halvøen" },
      summary: {
        en: "A defensive earthwork thrown across the neck of Jutland, rebuilt repeatedly, defining Denmark's southern border against Frankish and later German power. It stays strategically central until the late 1100s.",
        da: "Et forsvarsværk tværs over det jyske næs, ombygget gentagne gange, som definerer Danmarks sydgrænse mod frankisk og senere tysk magt. Det forbliver strategisk centralt til slutningen af 1100-tallet."
      },
      figures: [{ label: { en: "Building phases", da: "Byggefaser" }, value: { en: "Palisade dated 737 · stone wall c. 800 · expanded 968", da: "Palisade dateret 737 · stenmur ca. 800 · udvidet 968" }, source: "danmarkshistorien.lex.dk, 'Vikingetiden'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Vikingetiden, ca. 800-1050", url: "https://danmarkshistorien.lex.dk/Vikingetiden,_ca._800-1050" }]
    },
    {
      id: "lindisfarne", year: 793, theme: "war", confidence: "contested",
      title: { en: "The raids begin", da: "Togterne begynder" },
      summary: {
        en: "The sack of Lindisfarne conventionally opens the Viking Age; Paris is plundered in 845 and Rollo settles Normandy around 900. The label itself is contested — 'Viking Age' is a 19th-century coinage, not a term anyone alive then used.",
        da: "Plyndringen af Lindisfarne indleder efter traditionen vikingetiden; Paris plyndres i 845, og Rollo bosætter sig i Normandiet omkring år 900. Selve betegnelsen er omstridt — 'vikingetiden' er et begreb fra 1800-tallet, ikke et ord datidens mennesker brugte."
      },
      readings: [
        { side: { en: "The conventional periodisation", da: "Den traditionelle periodisering" }, text: { en: "793 to 1050 is the standard span, anchored on Lindisfarne at one end and the consolidation of Christian kingship at the other.", da: "793 til 1050 er den gængse periode, forankret i Lindisfarne i den ene ende og kongemagtens kristne konsolidering i den anden." }, source: "danmarkshistorien.lex.dk, 'Vikingetiden, ca. 800-1050'" },
        { side: { en: "A 19th-century construction", da: "En konstruktion fra 1800-tallet" }, text: { en: "'Viking Age' is a national-romantic rebranding drawn from the Icelandic sagas — a later frame imposed on the period, not a contemporary self-description.", da: "'Vikingetiden' er en nationalromantisk omdøbning hentet fra de islandske sagaer — en senere ramme lagt ned over perioden, ikke datidens egen selvforståelse." }, source: "danmarkshistorien.lex.dk, 'Vikingetiden, ca. 800-1050'" }
      ],
      figures: [{ label: { en: "Marker raids", da: "Markante togter" }, value: { en: "793 Lindisfarne · 845 Paris · c. 900 Normandy", da: "793 Lindisfarne · 845 Paris · ca. 900 Normandiet" }, source: "danmarkshistorien.lex.dk" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Vikingetiden, ca. 800-1050", url: "https://danmarkshistorien.lex.dk/Vikingetiden,_ca._800-1050" }]
    },
    {
      id: "gudfred", year: 804, endYear: 810, theme: "power", confidence: "sourced",
      title: { en: "Gudfred faces Charlemagne", da: "Gudfred mod Karl den Store" },
      summary: {
        en: "King Gudfred masses fleet and cavalry at Schleswig in 804, attacks the Abodrites in 808, forcibly moves the merchants of Reric to Schleswig and strengthens Dannevirke. He raids and taxes Frisia in 810 and is murdered the same year by one of his own retainers.",
        da: "Kong Gudfred samler flåde og rytteri ved Slesvig i 804, angriber abodritterne i 808, tvangsflytter købmændene fra Reric til Slesvig og forstærker Dannevirke. Han hærger og beskatter Frisland i 810 og myrdes samme år af en af sine egne mænd."
      },
      figures: [{ label: { en: "Reign", da: "Regeringstid" }, value: { en: "First mentioned 804 · killed 810 · sons ruled 813–854", da: "Først nævnt 804 · dræbt 810 · sønnerne regerede 813–854" }, source: "danmarkshistorien.lex.dk, 'Gudfred, død 810'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Gudfred, død 810", url: "https://danmarkshistorien.lex.dk/Gudfred,_d%C3%B8d_810" }]
    },
    {
      id: "jellingsmall", year: 950, yearApproximate: true, theme: "culture", confidence: "contested",
      title: { en: "The small Jelling stone names Denmark", da: "Den lille Jellingsten nævner Danmark" },
      summary: {
        en: "Gorm the Old raises a runestone for his wife Thyra — the first Danish royal monument to name 'Denmark'. The inscription's final word is disputed and changes what the stone says about her.",
        da: "Gorm den Gamle rejser en runesten for sin kone Thyra — det første danske kongelige monument, der nævner 'Danmark'. Indskriftens sidste ord er omstridt og ændrer, hvad stenen siger om hende."
      },
      readings: [
        { side: { en: "'Denmark's pride'", da: "'Danmarks pryd'" }, text: { en: "One reading of the final word makes Thyra an ornament of the realm — a formula of praise.", da: "Den ene læsning af det sidste ord gør Thyra til rigets pryd — en hyldestformel." }, source: "danmarkshistorien.lex.dk, 'Jellingstenene, ca. 950-965'" },
        { side: { en: "'Denmark's remedy'", da: "'Danmarks bod'" }, text: { en: "The competing reading makes her Denmark's remedy or salvation, implying a political role rather than decorative praise.", da: "Den konkurrerende læsning gør hende til Danmarks bod eller redning og antyder en politisk rolle frem for pryd." }, source: "danmarkshistorien.lex.dk, 'Jellingstenene, ca. 950-965'" }
      ],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Jellingstenene, ca. 950-965", url: "https://danmarkshistorien.lex.dk/Jellingstenene,_ca._950-965" }]
    },
    {
      id: "jellinglarge", year: 965, yearApproximate: true, theme: "religion", confidence: "contested",
      title: { en: "Denmark's baptismal certificate", da: "Danmarks dåbsattest" },
      summary: {
        en: "Harald Bluetooth's stone claims he 'won for himself all of Denmark and Norway and made the Danes Christian', carrying a crucified Christ and runes set in horizontal, book-like lines. It is a royal boast carved in stone, not a neutral record.",
        da: "Harald Blåtands sten hævder, at han 'vandt sig hele Danmark og Norge og gjorde danerne kristne', med en korsfæstet Kristus og runer sat i vandrette, boglignende linjer. Det er en kongelig pralen hugget i sten, ikke en neutral kilde."
      },
      readings: [
        { side: { en: "As the stone says it", da: "Som stenen siger det" }, text: { en: "Harald unified the realm and Christianised the Danes — the founding statement of the Danish kingdom.", da: "Harald samlede riget og kristnede danerne — det danske riges grundlæggelseserklæring." }, source: "danmarkshistorien.lex.dk, 'Jellingstenene, ca. 950-965'" },
        { side: { en: "As historians read it", da: "Som historikere læser det" }, text: { en: "The translation of 'hele' — all, or whole — Denmark is disputed, and the claim over Norway ran indirectly through jarl Håkon Sigurdsson. It is a monument making a case, not reporting one.", da: "Oversættelsen af 'hele' Danmark er omstridt, og kravet på Norge gik indirekte gennem jarl Håkon Sigurdsson. Det er et monument, der fremfører en sag, ikke refererer den." }, source: "danmarkshistorien.lex.dk, 'Harald Blåtand, ca. 958-987'" }
      ],
      sources: [
        { label: "danmarkshistorien.lex.dk (Aarhus University) — Jellingstenene, ca. 950-965", url: "https://danmarkshistorien.lex.dk/Jellingstenene,_ca._950-965" },
        { label: "danmarkshistorien.lex.dk (Aarhus University) — Harald Blåtand, ca. 958-987", url: "https://danmarkshistorien.lex.dk/Harald_Bl%C3%A5tand,_ca._958-987" }
      ]
    },
    {
      id: "harald", year: 958, endYear: 987, theme: "power", confidence: "sourced",
      title: { en: "Harald Bluetooth's reign", da: "Harald Blåtands regeringstid" },
      summary: {
        en: "Harald co-rules with his father Gorm, then alone, converting around 965 — reportedly after the missionary Poppo's iron ordeal recorded by Widukind of Corvey. He is driven out by his own son Svend Forkbeard and dies in Wendland.",
        da: "Harald regerer først sammen med sin far Gorm, siden alene, og omvender sig omkring 965 — efter sigende efter missionæren Poppos jernbyrd, som Widukind af Corvey beretter om. Han fordrives af sin egen søn Svend Tveskæg og dør i Venden."
      },
      detail: {
        en: "The byname 'Bluetooth' does not appear until around 1140, in the Roskilde Chronicle — roughly 150 years after his death.",
        da: "Tilnavnet 'Blåtand' optræder først omkring 1140 i Roskildekrøniken — cirka 150 år efter hans død."
      },
      figures: [{ label: { en: "Reign", da: "Regeringstid" }, value: { en: "c. 958–987 · conversion c. 965 · building programme 979–981", da: "ca. 958–987 · omvendelse ca. 965 · byggeprogram 979–981" }, source: "danmarkshistorien.lex.dk, 'Harald Blåtand'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Harald Blåtand, ca. 958-987", url: "https://danmarkshistorien.lex.dk/Harald_Bl%C3%A5tand,_ca._958-987" }]
    },
    {
      id: "ringforts", year: 975, yearApproximate: true, theme: "power", confidence: "sourced",
      title: { en: "The ring fortresses", da: "Trelleborgene" },
      summary: {
        en: "Trelleborg, Fyrkat and Aggersborg are built to a precise geometric circular plan, alongside a monumental timber bridge at Ravning Enge. They demonstrate a royal power able to coordinate large-scale construction across the realm.",
        da: "Trelleborg, Fyrkat og Aggersborg bygges efter en præcis geometrisk cirkelplan, sammen med en monumental træbro ved Ravning Enge. De viser en kongemagt, der kunne koordinere storbyggeri på tværs af riget."
      },
      figures: [{ label: { en: "Ravning bridge", da: "Ravningbroen" }, value: { en: "760 m, built after 980", da: "760 m, bygget efter 980" }, source: "danmarkshistorien.lex.dk, 'Vikingetiden'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Vikingetiden, ca. 800-1050", url: "https://danmarkshistorien.lex.dk/Vikingetiden,_ca._800-1050" }]
    },
    {
      id: "svend1013", year: 1013, theme: "war", confidence: "sourced",
      title: { en: "Svend Forkbeard takes England", da: "Svend Tveskæg erobrer England" },
      summary: {
        en: "Svend sweeps away the last English resistance in December 1013, having already extorted large danegeld payments from Æthelred II. He dies at Gainsborough barely two months later.",
        da: "Svend fejer den sidste engelske modstand væk i december 1013 efter allerede at have afkrævet Ethelred 2. store danegældsbetalinger. Han dør i Gainsborough knap to måneder senere."
      },
      figures: [{ label: { en: "Reign in England", da: "Regeringstid i England" }, value: { en: "Conquest Dec 1013 → died Feb 1014 (c. 2 months)", da: "Erobring dec. 1013 → død feb. 1014 (ca. 2 måneder)" }, source: "danmarkshistorien.lex.dk, 'Svend Tveskæg'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Svend Tveskæg, ca. 987-1014", url: "https://danmarkshistorien.lex.dk/Svend_Tvesk%C3%A6g,_ca._987-1014" }]
    },
    {
      id: "cnut", year: 1016, endYear: 1035, theme: "power", confidence: "sourced",
      title: { en: "Cnut's North Sea empire", da: "Knud den Stores Nordsøimperium" },
      summary: {
        en: "Cnut wins the decisive Battle of Assandun in 1016 and becomes king of all England, succeeding to Denmark around 1019. The Scots recognise him as overlord in 1027 and he takes Norway in 1028 — and the empire fragments within a generation of his death.",
        da: "Knud vinder det afgørende slag ved Assandun i 1016 og bliver konge over hele England, arver Danmark omkring 1019. Skotterne anerkender ham som overherre i 1027, og han tager Norge i 1028 — og imperiet falder fra hinanden inden for en generation efter hans død."
      },
      figures: [{ label: { en: "The empire assembled", da: "Imperiet samles" }, value: { en: "England 1016 · Denmark c. 1019 · Scotland 1027 · Norway 1028", da: "England 1016 · Danmark ca. 1019 · Skotland 1027 · Norge 1028" }, source: "danmarkshistorien.lex.dk, 'Knud den Store'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Knud den Store, ca. 995-1035", url: "https://danmarkshistorien.lex.dk/Knud_den_Store,_ca._995-1035" }]
    },

    // ============ MEDIEVAL KINGDOM ============
    {
      id: "knudhellige", year: 1086, theme: "religion", confidence: "sourced",
      title: { en: "A king murdered at the altar", da: "En konge myrdet ved alteret" },
      summary: {
        en: "Knud the Holy builds the first securely documented Danish royal administration — officials, taxes, fines — and provokes a revolt by the levy fleet. He is killed in St Alban's Church in Odense and canonised around 1100 after crop failures are read as divine punishment.",
        da: "Knud den Hellige opbygger den første sikkert dokumenterede danske kongelige administration — embedsmænd, skatter, bøder — og fremprovokerer et oprør fra ledingsflåden. Han dræbes i Sankt Albani Kirke i Odense og helgenkåres omkring 1100, da misvækst tolkes som Guds straf."
      },
      figures: [{ label: { en: "The killing", da: "Drabet" }, value: { en: "10 July 1086 · with his brother Benedict and 17 retainers", da: "10. juli 1086 · med sin bror Benedikt og 17 hirdmænd" }, source: "danmarkshistorien.lex.dk, 'Knud den Hellige'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Knud den Hellige, ca. 1042-1086", url: "https://danmarkshistorien.lex.dk/Knud_den_Hellige,_ca._1042-1086" }]
    },
    {
      id: "valdemar1157", year: 1157, theme: "power", confidence: "sourced",
      title: { en: "Valdemar ends the civil wars", da: "Valdemar afslutter borgerkrigene" },
      summary: {
        en: "Victory at Grathe Heath over Svend Grathe makes Valdemar sole king and closes the turbulence running since 1131. Crowning his son Knud VI as co-king establishes hereditary succession in practice.",
        da: "Sejren på Grathe Hede over Svend Grathe gør Valdemar til enekonge og afslutter urolighederne siden 1131. Kroningen af sønnen Knud 6. som medkonge indfører arvefølge i praksis."
      },
      figures: [{ label: { en: "Key dates", da: "Nøgleårstal" }, value: { en: "Sole king 1157 · Rügen conquered 1169 · Knud VI co-crowned 1170", da: "Enekonge 1157 · Rügen erobret 1169 · Knud 6. kronet som medkonge 1170" }, source: "danmarkshistorien.lex.dk, 'Valdemar den Store'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Valdemar den Store, 1131-1182", url: "https://danmarkshistorien.lex.dk/Valdemar_den_Store,_1131-1182" }]
    },
    {
      id: "absalon", year: 1167, theme: "borders", confidence: "contested",
      title: { en: "Absalon's castle at Havn", da: "Absalons borg ved Havn" },
      summary: {
        en: "Bishop Absalon is granted the settlement of Havn by Valdemar the Great and builds a castle there as coastal defence against the Wends. Whether that makes him Copenhagen's founder is a separate, later claim.",
        da: "Biskop Absalon får bebyggelsen Havn af Valdemar den Store og bygger en borg der som kystforsvar mod venderne. Om det gør ham til Københavns grundlægger, er en anden og senere påstand."
      },
      readings: [
        { side: { en: "Founder of Copenhagen", da: "Københavns grundlægger" }, text: { en: "The inscription on his statue at Højbro Plads names him the city's founder — the version in public memory.", da: "Indskriften på hans statue på Højbro Plads kalder ham byens grundlægger — den version, der lever i offentligheden." }, source: "danmarkshistorien.lex.dk, 'Absalon, ca. 1128-1201'" },
        { side: { en: "Builder, not founder", da: "Bygherre, ikke grundlægger" }, text: { en: "The settlement of Havn already existed; Absalon built a castle at a place that was there before him. The encyclopaedia treats him as builder rather than founder.", da: "Bebyggelsen Havn fandtes allerede; Absalon byggede en borg på et sted, der lå der før ham. Opslagsværket behandler ham som bygherre, ikke grundlægger." }, source: "danmarkshistorien.lex.dk, 'Absalon, ca. 1128-1201'" }
      ],
      lat: 55.676, lon: 12.578, place: "København",
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Absalon, ca. 1128-1201", url: "https://danmarkshistorien.lex.dk/Absalon,_ca._1128-1201" }]
    },
    {
      id: "dannebrog", year: 1219, theme: "culture", confidence: "legendary",
      title: { en: "The flag that fell from the sky", da: "Flaget der faldt ned fra himlen" },
      summary: {
        en: "A Danish fleet lands in Estonia in June 1219 and defeats the Estonians near Lyndanise. The legend that Dannebrog fell from the sky to win the battle is exactly that — a legend, first written down three centuries later.",
        da: "En dansk flåde lander i Estland i juni 1219 og besejrer esterne ved Lyndanise. Sagnet om, at Dannebrog faldt ned fra himlen og afgjorde slaget, er netop det — et sagn, først nedskrevet tre århundreder senere."
      },
      detail: {
        en: "The story first appears in Christiern Pedersen's Danske Krønike of 1520–23, which was itself unsure whether the event belonged to Fellin in 1208 or Lyndanise in 1219. The oldest secure depiction of Dannebrog is in the Dutch Armorial Gelre of around 1380.",
        da: "Historien optræder først i Christiern Pedersens Danske Krønike fra 1520-23, som selv var i tvivl om, hvorvidt begivenheden hørte til Fellin i 1208 eller Lyndanise i 1219. Den ældste sikre afbildning af Dannebrog findes i det nederlandske våbenskjoldsværk Armorial Gelre fra omkring 1380."
      },
      figures: [{ label: { en: "Battle vs legend vs first image", da: "Slag, sagn og første afbildning" }, value: { en: "Battle 15 June 1219 · legend written 1520–23 · oldest flag image c. 1380", da: "Slaget 15. juni 1219 · legenden nedskrevet 1520–23 · ældste billede af flaget ca. 1380" }, source: "danmarkshistorien.lex.dk, 'Dannebrog'" }],
      sources: [
        { label: "danmarkshistorien.lex.dk (Aarhus University) — Dannebrog", url: "https://danmarkshistorien.lex.dk/Dannebrog" },
        { label: "danmarkshistorien.lex.dk (Aarhus University) — Danmark og Estland, ca. 1200-1645", url: "https://danmarkshistorien.lex.dk/Danmark_og_Estland,_ca._1200-1645" }
      ]
    },
    {
      id: "jyskelov", year: 1241, theme: "law", confidence: "established",
      title: { en: "With law shall land be built", da: "Med lov skal land bygges" },
      summary: {
        en: "Jyske Lov is issued at Vordingborg in March 1241, opening with the line every Dane knows. It covers family and inheritance, procedure and evidence, military service and the village community — a rare window onto ordinary medieval society.",
        da: "Jyske Lov udstedes i Vordingborg i marts 1241 og indledes med den sætning, enhver dansker kender. Den dækker familie og arv, retspleje og bevis, ledingspligt og landsbyfællesskab — et sjældent vindue til det almindelige middelaldersamfund."
      },
      detail: {
        en: "The oldest surviving manuscript is from the 1270s, not 1241 — the text we read is a copy some thirty years younger than the law itself.",
        da: "Det ældste bevarede håndskrift er fra 1270'erne, ikke 1241 — den tekst vi læser, er en afskrift omkring tredive år yngre end selve loven."
      },
      figures: [{ label: { en: "In force", da: "I kraft" }, value: { en: "1241 → Danske Lov 1683 (c. 440 years)", da: "1241 → Danske Lov 1683 (ca. 440 år)" }, source: "danmarkshistorien.lex.dk, 'Jyske Lov 1241'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Jyske Lov 1241", url: "https://danmarkshistorien.lex.dk/Jyske_Lov_1241" }]
    },
    {
      id: "kbhprivileges", year: 1254, theme: "economy", confidence: "sourced",
      title: { en: "Copenhagen becomes a town", da: "København bliver købstad" },
      summary: {
        en: "Havn receives formal merchant-town status and stays under the Bishop of Roskilde for roughly the next 250 years. Erik of Pomerania makes it the permanent royal residence in the early 1400s.",
        da: "Havn får formelle købstadsrettigheder og forbliver under Roskildebispen i omtrent de næste 250 år. Erik af Pommern gør byen til fast kongeligt residensby i begyndelsen af 1400-tallet."
      },
      figures: [{ label: { en: "Population", da: "Indbyggertal" }, value: { en: "c. 42,000 (1672) → c. 100,000 (c. 1800)", da: "ca. 42.000 (1672) → ca. 100.000 (ca. 1800)" },
        basis: { en: "The fortified city inside the ramparts, which stood until the 1850s. Neither count includes the settlements outside them, so the pair shares a boundary — but it is a boundary, not the modern municipality.", da: "Den befæstede by inden for voldene, som stod til 1850'erne. Ingen af tallene medregner bebyggelsen uden for dem, så de to deler afgrænsning — men det er en afgrænsning, ikke den nuværende kommune." },
        source: "danmarkshistorien.lex.dk, 'København'" }],
      lat: 55.676, lon: 12.568, place: "København",
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — København", url: "https://danmarkshistorien.lex.dk/K%C3%B8benhavn" }]
    },
    {
      id: "handfaestning", year: 1282, theme: "law", confidence: "established",
      title: { en: "The first håndfæstning", da: "Den første håndfæstning" },
      summary: {
        en: "Erik Klipping is forced to accept a written charter limiting royal power, after using the royal court to execute opponents and seize their property. It binds the king to the law and requires the Danehof to meet annually — the exact constraint absolutism would abolish in 1660.",
        da: "Erik Klipping tvinges til at underskrive en håndfæstning, der begrænser kongemagten, efter at have brugt kongens retterting til at henrette modstandere og inddrage deres gods. Den binder kongen til loven og kræver årligt danehof — netop den begrænsning, enevælden afskaffede i 1660."
      },
      figures: [{ label: { en: "The system", da: "Systemet" }, value: { en: "First 29 July 1282 · ≥7 major charters 1320–1648 · ended 1660", da: "Første 29. juli 1282 · ≥7 store håndfæstninger 1320–1648 · ophørte 1660" }, source: "danmarkshistorien.lex.dk, 'Håndfæstning, 1282-1660'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Håndfæstning, 1282-1660", url: "https://danmarkshistorien.lex.dk/H%C3%A5ndf%C3%A6stning,_1282-1660" }]
    },
    {
      id: "estoniasold", year: 1346, theme: "colonies", confidence: "sourced",
      title: { en: "Estonia sold for silver", da: "Estland sælges for sølv" },
      summary: {
        en: "Valdemar Atterdag sells Danish Estonia to the Teutonic Order to raise cash for redeeming pawned Danish territory, ending 127 years of Danish rule in the eastern Baltic. The sale is driven by finance, not military defeat.",
        da: "Valdemar Atterdag sælger det danske Estland til Den Tyske Orden for at skaffe penge til at indløse pantsat dansk land og afslutter dermed 127 års dansk styre i det østlige Baltikum. Salget skyldes finanser, ikke militært nederlag."
      },
      figures: [{ label: { en: "Price", da: "Pris" }, value: { en: "19,000 silver marks (6,000 to Brandenburg, 13,000 to Valdemar)", da: "19.000 sølvmark (6.000 til Brandenburg, 13.000 til Valdemar)" }, source: "danmarkshistorien.lex.dk, 'Danmark og Estland'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Danmark og Estland, ca. 1200-1645", url: "https://danmarkshistorien.lex.dk/Danmark_og_Estland,_ca._1200-1645" }]
    },
    {
      id: "blackdeath", year: 1349, endYear: 1350, theme: "people", confidence: "contested",
      title: { en: "The Black Death", da: "Den sorte død" },
      summary: {
        en: "Plague reaches Denmark in 1349–50 and leaves deserted farms across the late 1300s and early 1400s. How many died is inferred rather than recorded — direct Danish evidence is thin.",
        da: "Pesten når Danmark i 1349-50 og efterlader ødegårde gennem slutningen af 1300-tallet og begyndelsen af 1400-tallet. Hvor mange der døde, er sluttet frem, ikke registreret — de direkte danske kilder er få."
      },
      readings: [
        { side: { en: "The high estimate", da: "Det høje skøn" }, text: { en: "Up to about half the population in some places, with abandoned rural churches and visible depopulation in Copenhagen, Roskilde and Ribe.", da: "Op mod halvdelen af befolkningen nogle steder, med forladte landsbykirker og synlig affolkning i København, Roskilde og Ribe." }, source: "danmarkshistorien.lex.dk, 'Den sorte død i 1350'" },
        { side: { en: "The evidential caveat", da: "Kildeforbeholdet" }, text: { en: "Danish mortality is inferred chiefly from soul-mass records — at Ribe Cathedral these rose from about one a year to seventeen. That is an indirect proxy, not a death count.", da: "Den danske dødelighed sluttes hovedsageligt af sjælemesser — ved Ribe Domkirke steg de fra omkring én om året til sytten. Det er en indirekte indikator, ikke en opgørelse over døde." }, source: "danmarkshistorien.lex.dk, 'Pest i middelalderen'" }
      ],
      figures: [{ label: { en: "Later outbreaks", da: "Senere udbrud" }, value: { en: "≥5 more in the 1300s · c. 9 in the 1400s · last epidemic 1711", da: "≥5 flere i 1300-tallet · ca. 9 i 1400-tallet · sidste epidemi 1711" }, source: "danmarkshistorien.lex.dk, 'Pest i middelalderen'" }],
      sources: [
        { label: "danmarkshistorien.lex.dk (Aarhus University) — Pest i middelalderen", url: "https://danmarkshistorien.lex.dk/Pest_i_middelalderen" },
        { label: "danmarkshistorien.lex.dk (Aarhus University) — Den sorte død i 1350", url: "https://danmarkshistorien.lex.dk/Den_sorte_d%C3%B8d_i_1350" }
      ]
    },
    {
      id: "margrete", year: 1375, endYear: 1412, theme: "power", confidence: "established",
      title: { en: "Margrete I rules three kingdoms", da: "Margrete 1. regerer tre riger" },
      summary: {
        en: "Margrete takes power in Denmark after her son Oluf's election, adds Norway on her husband's death and Sweden after backing the nobles against Albrecht of Mecklenburg. She rules through hand-picked councillors and keeps real control even after Erik comes of age in 1401.",
        da: "Margrete får magten i Danmark efter sønnen Olufs valg, tilføjer Norge ved sin mands død og Sverige efter at have støttet stormændene mod Albrecht af Mecklenburg. Hun regerer gennem håndplukkede rådgivere og bevarer den reelle magt, også efter Erik bliver myndig i 1401."
      },
      figures: [{ label: { en: "The three realms", da: "De tre riger" }, value: { en: "Denmark 1376 · Norway 1380/81 · Sweden from 1389", da: "Danmark 1376 · Norge 1380/81 · Sverige fra 1389" }, source: "danmarkshistorien.lex.dk, 'Margrete 1.'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Margrete 1., 1353-1412", url: "https://danmarkshistorien.lex.dk/Margrete_1.,_1353-1412" }]
    },
    {
      id: "kalmar", year: 1397, theme: "power", confidence: "established",
      title: { en: "The Kalmar Union", da: "Kalmarunionen" },
      summary: {
        en: "Erik of Pomerania is crowned king of all three realms at Kalmar, creating a personal union whose power centre is Denmark while each kingdom keeps its own laws. It effectively fragments from 1448, though the Danish-Norwegian union runs to 1814.",
        da: "Erik af Pommern krones til konge over alle tre riger i Kalmar og skaber en personalunion med magtcentrum i Danmark, mens hvert rige beholder sine egne love. Den går reelt i opløsning fra 1448, men den dansk-norske union varer til 1814."
      },
      figures: [{ label: { en: "Union span", da: "Unionens forløb" }, value: { en: "Crowned 17 June 1397 · fragmenting from 1448 · Sweden leaves 1523", da: "Kronet 17. juni 1397 · under opløsning fra 1448 · Sverige forlader unionen 1523" }, source: "danmarkshistorien.lex.dk, 'Kalmarunionen'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Kalmarunionen, 1397-1523", url: "https://danmarkshistorien.lex.dk/Kalmarunionen,_1397-1523" }]
    },
    {
      id: "soundtoll", year: 1429, endYear: 1857, theme: "economy", confidence: "established",
      title: { en: "The Sound Toll", da: "Øresundstolden" },
      summary: {
        en: "Erik of Pomerania puts a transit toll on every ship passing through the Øresund, collected at Helsingør. It becomes a pillar of Crown finances for four centuries — and is wound up only after the USA refuses to pay in 1855.",
        da: "Erik af Pommern indfører en transittold på hvert skib gennem Øresund, opkrævet i Helsingør. Den bliver en af kronens økonomiske søjler i fire århundreder — og afvikles først, efter at USA nægter at betale i 1855."
      },
      figures: [
        { label: { en: "Revenue", da: "Indtægt" }, value: { en: "c. 4,700 daler (1497) → 620,000 rdl. (1639) → c. 500,000 rdl. ≈ 10% of state revenue (1800)", da: "ca. 4.700 daler (1497) → 620.000 rdl. (1639) → ca. 500.000 rdl. ≈ 10% af statens indtægter (1800)" }, source: "danmarkshistorien.lex.dk, 'Øresundstolden'" },
        { label: { en: "Ships per year", da: "Skibe om året" }, value: { en: "c. 2,500 (1720) → 12,000+ (c. 1800)", da: "ca. 2.500 (1720) → 12.000+ (ca. 1800)" }, source: "danmarkshistorien.lex.dk, 'Øresundstolden'" }
      ],
      lat: 56.036, lon: 12.613, place: "Helsingør",
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Øresundstolden, ca. 1429-1857", url: "https://danmarkshistorien.lex.dk/%C3%98resundstolden,_ca._1429-1857" }]
    },
    {
      id: "christian1", year: 1448, endYear: 1460, theme: "borders", confidence: "established",
      title: { en: "Schleswig and Holstein join the crown", da: "Slesvig og Holsten under kronen" },
      summary: {
        en: "Christian I is elected in 1448 and founds the dynasty that still reigns. In 1460 he becomes Duke of Schleswig and Count of Holstein — the personal union that produces the Schleswig question, and the catastrophe of 1864, four centuries later.",
        da: "Christian 1. vælges i 1448 og grundlægger det dynasti, der stadig regerer. I 1460 bliver han hertug af Slesvig og greve af Holsten — den personalunion, der fire århundreder senere føder det slesvigske spørgsmål og katastrofen i 1864."
      },
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Christian 1., 1426-1481", url: "https://danmarkshistorien.lex.dk/Christian_1.,_1426-1481" }]
    },
    {
      id: "university", year: 1479, theme: "science", confidence: "contested",
      title: { en: "The University of Copenhagen", da: "Københavns Universitet" },
      summary: {
        en: "Founded on a papal bull permitting Christian I to establish a Danish university, initially a Catholic institution for training priests. Theology dominates for centuries; the 1788 statute turns it into a civil-service academy.",
        da: "Grundlagt på en pavelig bulle, der gav Christian 1. lov til at oprette et dansk universitet, oprindeligt en katolsk institution til præsteuddannelse. Teologien dominerer i århundreder; statutten fra 1788 gør det til et embedsmandsakademi."
      },
      readings: [
        { side: { en: "1479 — the founding", da: "1479 — grundlæggelsen" }, text: { en: "The university's own article dates the papal bull from Sixtus IV and the founding to 1479.", da: "Universitetets egen artikel daterer den pavelige bulle fra Sixtus 4. og grundlæggelsen til 1479." }, source: "danmarkshistorien.lex.dk, 'Københavns Universitet indtil 1849'" },
        { side: { en: "1474 — the permission", da: "1474 — tilladelsen" }, text: { en: "The article on Christian I dates the papal permission to 1474. Two pages of the same encyclopaedia give different years; neither is obviously wrong.", da: "Artiklen om Christian 1. daterer den pavelige tilladelse til 1474. To sider i samme opslagsværk angiver forskellige årstal; ingen af dem er åbenlyst forkert." }, source: "danmarkshistorien.lex.dk, 'Christian 1., 1426-1481'" }
      ],
      lat: 55.680, lon: 12.572, place: "København",
      sources: [
        { label: "danmarkshistorien.lex.dk (Aarhus University) — Københavns Universitet indtil 1849", url: "https://danmarkshistorien.lex.dk/K%C3%B8benhavns_Universitet_indtil_1849" },
        { label: "danmarkshistorien.lex.dk (Aarhus University) — Christian 1., 1426-1481", url: "https://danmarkshistorien.lex.dk/Christian_1.,_1426-1481" }
      ]
    },
    {
      id: "bloodbath", year: 1520, theme: "war", confidence: "established",
      title: { en: "The Stockholm Bloodbath", da: "Det Stockholmske Blodbad" },
      summary: {
        en: "Days after being crowned king of Sweden, Christian II executes the Swedish elite on heresy charges, breaking the amnesty promised at Stockholm's surrender. It backfires completely: it becomes propaganda fuel, ends his Swedish rule within a year and accelerates the union's collapse.",
        da: "Få dage efter at være kronet til konge af Sverige henretter Christian 2. den svenske elite under anklage for kætteri og bryder dermed det amnestiløfte, der blev givet ved Stockholms overgivelse. Det slår fuldstændig fejl: det bliver propagandastof, ender hans svenske styre inden for et år og fremskynder unionens sammenbrud."
      },
      figures: [{ label: { en: "Executed", da: "Henrettede" }, value: { en: "82 people, 8–9 Nov 1520 (chief executioner's count)", da: "82 mennesker, 8.–9. nov. 1520 (bøddelens optælling)" }, source: "danmarkshistorien.lex.dk, 'Det Stockholmske Blodbad 1520'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Det Stockholmske Blodbad 1520", url: "https://danmarkshistorien.lex.dk/Det_Stockholmske_Blodbad_1520" }]
    },
    {
      id: "grevensfejde", year: 1534, endYear: 1536, theme: "war", confidence: "established",
      title: { en: "The Count's Feud", da: "Grevens Fejde" },
      summary: {
        en: "Denmark's last civil war to date: nobility and Christian III's forces under Johan Rantzau against burghers, peasants and Lübeck fighting for the deposed Christian II. Skipper Clement raises the Jutland peasants; Copenhagen is blockaded for roughly a year before surrendering.",
        da: "Danmarks hidtil sidste borgerkrig: adelen og Christian 3.s hær under Johan Rantzau mod borgere, bønder og Lübeck, der kæmpede for den afsatte Christian 2. Skipper Clement rejser de jyske bønder; København blokeres i omtrent et år, før byen overgiver sig."
      },
      figures: [{ label: { en: "Outcome", da: "Udfald" }, value: { en: "Copenhagen surrendered 29 July 1536 · noble dominance secured for 124 years", da: "København overgav sig 29. juli 1536 · adelsvældet sikret i 124 år" }, source: "danmarkshistorien.lex.dk, 'Grevens Fejde 1534-1536'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Grevens Fejde 1534-1536", url: "https://danmarkshistorien.lex.dk/Grevens_Fejde_1534-1536" }]
    },
    {
      id: "reformation", year: 1536, theme: "religion", confidence: "established",
      title: { en: "The Reformation", da: "Reformationen" },
      summary: {
        en: "Christian III deposes every Catholic bishop, blaming them for the civil war, and transfers their estates, castles and lands permanently to the Crown. Lutheran superintendents replace them and tithes are re-routed — the largest single transfer of wealth in Danish history.",
        da: "Christian 3. afsætter alle katolske bisper, giver dem skylden for borgerkrigen og overfører deres godser, borge og jorder permanent til kronen. Lutherske superintendenter erstatter dem, og tienden omlægges — den største enkeltstående formueoverførsel i danmarkshistorien."
      },
      figures: [{ label: { en: "The recess", da: "Recessen" }, value: { en: "30 Oct 1536 · tithe split three ways: priests / churches / Crown", da: "30. okt. 1536 · tienden delt i tre: præster / kirker / kronen" }, source: "danmarkshistorien.lex.dk, 'Recessen om reformationen'" }],
      sources: [
        { label: "danmarkshistorien.lex.dk (Aarhus University) — Recessen om reformationen, 30. oktober 1536", url: "https://danmarkshistorien.lex.dk/Recessen_om_reformationen,_30._oktober_1536" },
        { label: "danmarkshistorien.lex.dk (Aarhus University) — Reformationen i Danmark, ca. 1520-1539", url: "https://danmarkshistorien.lex.dk/Reformationen_i_Danmark,_ca._1520-1539" }
      ]
    },
    {
      id: "brahe", year: 1572, endYear: 1601, theme: "science", confidence: "established",
      title: { en: "Tycho Brahe breaks the unchanging sky", da: "Tycho Brahe bryder den uforanderlige himmel" },
      summary: {
        en: "Brahe's observation of a new star in Cassiopeia overturns the doctrine of an unchanging heaven, and Frederik II grants him the island of Hven where he builds Uraniborg. He leaves Denmark in 1597 after falling out with the future Christian IV; his data underpins Kepler's planetary laws.",
        da: "Brahes iagttagelse af en ny stjerne i Cassiopeia vælter læren om den uforanderlige himmel, og Frederik 2. giver ham øen Hven, hvor han bygger Uraniborg. Han forlader Danmark i 1597 efter et opgør med den kommende Christian 4.; hans data ligger til grund for Keplers planetlove."
      },
      detail: {
        en: "Research published in 2010 concluded he died of kidney failure, not the mercury poisoning of long-standing rumour.",
        da: "Forskning offentliggjort i 2010 konkluderede, at han døde af nyresvigt, ikke af den kviksølvforgiftning, rygtet længe har hævdet."
      },
      figures: [{ label: { en: "Key dates", da: "Nøgleårstal" }, value: { en: "Nova 11 Nov 1572 · Hven granted 1576 · exile 1597 · died 24 Oct 1601", da: "Nova 11. nov. 1572 · Hven forlenet 1576 · landflygtighed 1597 · død 24. okt. 1601" }, source: "danmarkshistorien.lex.dk, 'Tycho Brahe'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Tycho Brahe, 1546-1601", url: "https://danmarkshistorien.lex.dk/Tycho_Brahe,_1546-1601" }]
    },
    {
      id: "christian4", year: 1596, endYear: 1648, theme: "power", confidence: "established",
      title: { en: "Christian IV builds and overreaches", da: "Christian 4. bygger og forløfter sig" },
      summary: {
        en: "The longest-reigning Danish monarch, made one of Europe's richest princes by Sound Toll revenue and Swedish ransom payments, and a prolific builder: Børsen, Rosenborg, Rundetårn, Frederiksborg, Christianshavn. His foreign policy destroys that advantage entirely.",
        da: "Danmarks længst regerende monark, gjort til en af Europas rigeste fyrster af øresundstold og svenske løsepenge, og en produktiv bygherre: Børsen, Rosenborg, Rundetårn, Frederiksborg, Christianshavn. Hans udenrigspolitik ødelægger den fordel fuldstændigt."
      },
      figures: [{ label: { en: "Reign", da: "Regeringstid" }, value: { en: "1596–1648 (52 years)", da: "1596–1648 (52 år)" }, source: "danmarkshistorien.lex.dk, 'Christian 4.'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Christian 4., 1577-1648", url: "https://danmarkshistorien.lex.dk/Christian_4.,_1577-1648" }]
    },
    {
      id: "thirtyyears", year: 1625, endYear: 1629, theme: "war", confidence: "established",
      title: { en: "Disaster in Germany", da: "Katastrofen i Tyskland" },
      summary: {
        en: "Christian IV enters the Thirty Years' War as Duke of Holstein — the rigsråd refused to commit Denmark — hoping to lead the Protestant cause before Sweden does. Defeat at Lutter am Barenberge and the Peace of Lübeck end Danish ambitions in Germany and hand Protestant leadership to Sweden.",
        da: "Christian 4. går ind i Trediveårskrigen som hertug af Holsten — rigsrådet nægtede at forpligte Danmark — i håb om at føre den protestantiske sag før Sverige. Nederlaget ved Lutter am Barenberge og freden i Lübeck ender de danske ambitioner i Tyskland og overlader den protestantiske førertrøje til Sverige."
      },
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Christian 4., 1577-1648", url: "https://danmarkshistorien.lex.dk/Christian_4.,_1577-1648" }]
    },
    {
      id: "roskilde1658", year: 1658, theme: "borders", confidence: "established",
      title: { en: "The Peace of Roskilde", da: "Roskildefreden" },
      summary: {
        en: "After Karl X Gustav marches his army across the frozen belts, Denmark cedes Skåne, Halland, Blekinge and Bornholm plus Norwegian Bohuslän and Trøndelag — provinces Danish since the 1000s. Denmark loses control of the Sound.",
        da: "Efter at Karl 10. Gustav har ført sin hær over de tilfrosne bælter, afstår Danmark Skåne, Halland, Blekinge og Bornholm samt norske Bohuslen og Trøndelag — landsdele, der havde været danske siden 1000-tallet. Danmark mister kontrollen med Øresund."
      },
      figures: [{ label: { en: "Signed", da: "Underskrevet" }, value: { en: "26 February 1658", da: "26. februar 1658" }, source: "danmarkshistorien.lex.dk, 'Roskildefreden'" }],
      lat: 55.642, lon: 12.080, place: "Roskilde",
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Roskildefreden, 26. februar 1658", url: "https://danmarkshistorien.lex.dk/Roskildefreden,_26._februar_1658" }]
    },
    {
      id: "skaanelost", year: 1658, endYear: 1660, theme: "borders", confidence: "established",
      title: { en: "A third of the realm gone", da: "En tredjedel af riget tabt" },
      summary: {
        en: "Across the Roskilde treaty and the 1660 Peace of Copenhagen, Denmark loses roughly a third of its territory. The Swedish storm on Copenhagen in February 1659 is repelled with staggeringly lopsided casualties, which saves the capital and eventually returns Bornholm.",
        da: "Med Roskildefreden og Københavnsfreden i 1660 mister Danmark omtrent en tredjedel af sit territorium. Den svenske storm på København i februar 1659 slås tilbage med voldsomt skæve tabstal, hvilket redder hovedstaden og i sidste ende giver Bornholm tilbage."
      },
      figures: [
        { label: { en: "Territory lost", da: "Tabt territorium" }, value: { en: "c. 19,000 km² ≈ one third of the realm", da: "ca. 19.000 km² ≈ en tredjedel af riget" }, source: "danmarkshistorien.lex.dk, 'Tabet af Skåne i 1658-1660'" },
        { label: { en: "Storm on Copenhagen, Feb 1659", da: "Stormen på København, feb. 1659" }, value: { en: "c. 1,500 Swedish dead and wounded vs 12 defenders killed", da: "ca. 1.500 svenske døde og sårede mod 12 dræbte forsvarere" }, source: "danmarkshistorien.lex.dk, 'Tabet af Skåne i 1658-1660'" }
      ],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Tabet af Skåne i 1658-1660", url: "https://danmarkshistorien.lex.dk/Tabet_af_Sk%C3%A5ne_i_1658-1660" }]
    },

    // ============ ABSOLUTISM ============
    {
      id: "absolutism", year: 1660, endYear: 1661, theme: "power", confidence: "established",
      title: { en: "Absolutism introduced", da: "Enevælden indføres" },
      summary: {
        en: "Frederik III convenes the estates in September 1660 over taxes and military costs; Bishop Hans Svane offers him the realms as hereditary, and all four estates swear loyalty at Copenhagen Castle. A committee then decides the king alone will write the constitution.",
        da: "Frederik 3. indkalder stænderne i september 1660 om skatter og militærudgifter; biskop Hans Svane tilbyder ham rigerne som arvelige, og alle fire stænder hylder ham på Københavns Slot. Et udvalg beslutter derefter, at kongen alene skal skrive forfatningen."
      },
      figures: [{ label: { en: "Sequence", da: "Forløb" }, value: { en: "Estates 10 Sept · hereditary offer 13 Oct · homage 18 Oct 1660 · act signed 10 Jan 1661", da: "Stænderne 10. sept. · arvetilbud 13. okt. · hyldning 18. okt. 1660 · akten underskrevet 10. jan. 1661" }, source: "danmarkshistorien.lex.dk, 'Enevældens indførelse 1660-1661'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Enevældens indførelse 1660-1661", url: "https://danmarkshistorien.lex.dk/Enev%C3%A6ldens_indf%C3%B8relse_1660-1661" }]
    },
    {
      id: "kongeloven", year: 1665, theme: "law", confidence: "established",
      title: { en: "Kongeloven: absolutism in writing", da: "Kongeloven: enevælden på skrift" },
      summary: {
        en: "Signed on Frederik III's birthday, the Royal Law gives the monarch legislative, executive and judicial power, limited only by the Lutheran faith, the realm's indivisibility and the law itself. It is described as the only written constitution ever to legitimise near-total absolutism.",
        da: "Underskrevet på Frederik 3.s fødselsdag giver Kongeloven monarken lovgivende, udøvende og dømmende magt, begrænset alene af den lutherske tro, rigets udelelighed og loven selv. Den beskrives som den eneste skrevne forfatning, der nogensinde har legitimeret en nærmest total enevælde."
      },
      figures: [{ label: { en: "In force", da: "I kraft" }, value: { en: "14 Nov 1665 → 5 June 1849 (184 years) · 40 paragraphs · first printed 1709", da: "14. nov. 1665 → 5. juni 1849 (184 år) · 40 paragraffer · først trykt 1709" }, source: "danmarkshistorien.lex.dk, 'Kongeloven af 1665'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Kongeloven af 1665", url: "https://danmarkshistorien.lex.dk/Kongeloven_af_1665" }]
    },
    {
      id: "roemer", year: 1676, theme: "science", confidence: "established",
      title: { en: "Ole Rømer measures light", da: "Ole Rømer måler lyset" },
      summary: {
        en: "Observing eclipses of Jupiter's moon Io with Cassini in Paris, Rømer finds that light 'hesitates' — establishing for the first time that its speed is finite. He later standardises Danish weights and measures and rebuilds Copenhagen's water, roads and street lighting.",
        da: "Ved at iagttage formørkelser af Jupiters måne Io sammen med Cassini i Paris finder Rømer, at lyset 'tøver' — og fastslår dermed for første gang, at dets hastighed er endelig. Senere standardiserer han danske mål og vægt og fornyer Københavns vandforsyning, veje og gadebelysning."
      },
      figures: [{ label: { en: "Other work", da: "Andet virke" }, value: { en: "Weights and measures ordinance 1 May 1683 · Gregorian calendar 1700", da: "Forordning om mål og vægt 1. maj 1683 · gregoriansk kalender 1700" }, source: "danmarkshistorien.lex.dk, 'Ole Rømer'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Ole Rømer, 1644-1710", url: "https://danmarkshistorien.lex.dk/Ole_R%C3%B8mer,_1644-1710" }]
    },
    {
      id: "danskelov", year: 1683, theme: "law", confidence: "established",
      title: { en: "Danske Lov: one code for the kingdom", da: "Danske Lov: én lov for riget" },
      summary: {
        en: "The first law code for the whole kingdom replaces the three medieval regional systems — Scanian, Jutlandic and Zealandic — with a single text. Fragments of it, such as employer's liability, still apply today.",
        da: "Den første lovbog for hele riget erstatter de tre middelalderlige landskabslove — skånske, jyske og sjællandske — med én tekst. Dele af den, blandt andet husbondansvaret, gælder den dag i dag."
      },
      figures: [{ label: { en: "In force", da: "I kraft" }, value: { en: "15 April 1683 · 6 books · drafting ordered 1669", da: "15. april 1683 · 6 bøger · udarbejdelsen befalet 1669" }, source: "danmarkshistorien.lex.dk, 'Danske Lov 1683'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Danske Lov 1683", url: "https://danmarkshistorien.lex.dk/Danske_Lov_1683" }]
    },
    {
      id: "greatnorthern", year: 1700, endYear: 1720, theme: "war", confidence: "established",
      title: { en: "The last try for Skåne", da: "Det sidste forsøg på Skåne" },
      summary: {
        en: "Denmark fights in 1700 and again from 1709, Frederik IV seeing Charles XII's defeat by Russia as the chance to recover the Scanian provinces. The attempt fails, and the Peace of Frederiksborg ends centuries of Danish-Swedish warfare along with any hope of getting Skåne back.",
        da: "Danmark deltager i 1700 og igen fra 1709, hvor Frederik 4. ser Karl 12.s nederlag til Rusland som chancen for at generobre de skånske landsdele. Forsøget mislykkes, og freden i Frederiksborg afslutter århundreders dansk-svenske krige og ethvert håb om at få Skåne tilbage."
      },
      figures: [{ label: { en: "Peace terms", da: "Fredsvilkår" }, value: { en: "Sweden paid 600,000 rdl. and lost its Sound Toll exemption · signed 3 June 1720", da: "Sverige betalte 600.000 rdl. og mistede sin fritagelse for Øresundstolden · underskrevet 3. juni 1720" }, source: "danmarkshistorien.lex.dk, 'Frederiksborgfreden'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Frederiksborgfreden, 3. juni 1720", url: "https://danmarkshistorien.lex.dk/Frederiksborgfreden,_3._juni_1720" }]
    },
    {
      id: "slavetrade", year: 1660, endYear: 1848, theme: "enslavement", confidence: "established",
      title: { en: "The Danish slave trade", da: "Den danske slavehandel" },
      summary: {
        en: "Danish ships carry enslaved Africans from the Gold Coast to St Thomas, St John and St Croix on an 18-month triangular route. Mortality on the crossing is severe, and many more die in their first year in the colonies.",
        da: "Danske skibe fragter slavegjorte afrikanere fra Guldkysten til Sankt Thomas, Sankt Jan og Sankt Croix på en 18 måneder lang trekantrute. Dødeligheden på overfarten er høj, og endnu flere dør i deres første år i kolonierne."
      },
      figures: [
        { label: { en: "People trafficked", da: "Mennesker fragtet" }, value: { en: "c. 111,000 on c. 430 ships ≈ 2.3% of the whole trade to the West Indies", da: "ca. 111.000 på ca. 430 skibe ≈ 2,3% af hele handelen til Vestindien" }, source: "danmarkshistorien.lex.dk, 'Den danske slavehandel'" },
        { label: { en: "Died in transit", da: "Døde undervejs" }, value: { en: "16–20% of those aboard", da: "16–20% af de ombordværende" }, source: "danmarkshistorien.lex.dk, 'Den danske slavehandel'" }
      ],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Den danske slavehandel, ca. 1660-1848", url: "https://danmarkshistorien.lex.dk/Den_danske_slavehandel,_ca._1660-1848" }]
    },
    {
      id: "stavnsbaand", year: 1733, endYear: 1788, theme: "everyday", confidence: "established",
      title: { en: "Stavnsbånd ties men to the estate", da: "Stavnsbåndet binder mænd til godset" },
      summary: {
        en: "Introduced during the agricultural crisis of the 1730s, the stavnsbånd ties male rural youth to the estate where they were born, serving landowners' labour needs and military conscription at once. Its scope widens over time; women and townsmen are exempt.",
        da: "Indført under landbrugskrisen i 1730'erne binder stavnsbåndet unge mænd på landet til det gods, hvor de er født, og tjener på én gang godsejernes behov for arbejdskraft og hærens udskrivning. Dets omfang udvides med tiden; kvinder og byboere er undtaget."
      },
      figures: [{ label: { en: "Ages bound", da: "Bundne aldre" }, value: { en: "14–36 at first, later extended to 4–40 · abolition decreed 1788, fully effective 1800", da: "14–36 i begyndelsen, senere udvidet til 4–40 · ophævelse påbudt 1788, fuldt gennemført 1800" }, source: "danmarkshistorien.lex.dk, 'Stavnsbånd og landboreformer'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Stavnsbånd og landboreformer, 1733-1800", url: "https://danmarkshistorien.lex.dk/Stavnsb%C3%A5nd_og_landboreformer,_1733-1800" }]
    },
    {
      id: "landreforms", year: 1758, endYear: 1810, theme: "economy", confidence: "established",
      title: { en: "The agrarian reforms", da: "Landboreformerne" },
      summary: {
        en: "Three parallel reform tracks dismantle the open-field village, regulate tenant labour obligations and move peasants toward freehold ownership, driven by rising grain prices after 1750 and Enlightenment ideas. Enclosure of Danish villages is largely finished by around 1810.",
        da: "Tre parallelle reformspor opløser landsbyfællesskabet, regulerer hoveriet og fører bønderne mod selveje, drevet af stigende kornpriser efter 1750 og oplysningstidens idéer. Udskiftningen af de danske landsbyer er stort set fuldført omkring 1810."
      },
      figures: [{ label: { en: "Scale", da: "Omfang" }, value: { en: "Enclosure 1758–1781, comprehensive law 1781 · c. 90% of Danish farmland worked as peasant farms", da: "Udskiftningen 1758–1781, samlet lov 1781 · ca. 90% af Danmarks landbrugsjord drevet som bondegårde" }, source: "danmarkshistorien.lex.dk, 'Landboreformer'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Landboreformer i slutningen af 1700-tallet", url: "https://danmarkshistorien.lex.dk/Landboreformer_i_slutningen_af_1700-tallet" }]
    },
    {
      id: "struensee", year: 1770, endYear: 1772, theme: "power", confidence: "established",
      title: { en: "The Struensee episode", da: "Struensee-tiden" },
      summary: {
        en: "Christian VII's German physician rules in the king's name alongside Queen Caroline Mathilde, issuing a torrent of Enlightenment decrees including the abolition of censorship and of torture. He is arrested in a night coup and beheaded; nearly all his reforms are reversed.",
        da: "Christian 7.s tyske livlæge regerer i kongens navn sammen med dronning Caroline Mathilde og udsteder en strøm af oplysningsforordninger, blandt andet ophævelsen af censuren og af torturen. Han arresteres ved et natligt kup og halshugges; næsten alle hans reformer rulles tilbage."
      },
      figures: [{ label: { en: "In power", da: "Ved magten" }, value: { en: "May 1770 – Jan 1772 · 1,800+ orders issued · executed 28 April 1772", da: "Maj 1770 – jan. 1772 · 1.800+ forordninger udstedt · henrettet 28. april 1772" }, source: "danmarkshistorien.lex.dk, 'Johann Friedrich Struensee'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Johann Friedrich Struensee, 1737-1772", url: "https://danmarkshistorien.lex.dk/Johann_Friedrich_Struensee,_1737-1772" }]
    },
    {
      id: "slavetradeban", year: 1792, theme: "enslavement", confidence: "established",
      title: { en: "The ban that increased the trade", da: "Forbuddet der øgede handelen" },
      summary: {
        en: "Denmark becomes the first state to legislate a ban on transatlantic slave trading under its flag — but with a ten-year delay, during which the state actively subsidises imports so planters can build a self-reproducing enslaved population. More people were trafficked in that decade than any other.",
        da: "Danmark bliver den første stat, der lovgiver om forbud mod transatlantisk slavehandel under sit flag — men med ti års udsættelse, hvor staten aktivt støtter indførsel, så plantageejerne kan opbygge en selvreproducerende slavebefolkning. Der blev fragtet flere mennesker i det årti end i noget andet."
      },
      figures: [
        { label: { en: "Delay", da: "Udsættelse" }, value: { en: "Decreed 16 Mar 1792, effective 1 Jan 1803", da: "Påbudt 16. marts 1792, gældende fra 1. jan. 1803" }, source: "danmarkshistorien.lex.dk, 'Forordning om negerhandelen'" },
        { label: { en: "Peak decade", da: "Rekordårtiet" }, value: { en: "24,900 people on 125 voyages, 1793–1802", da: "24.900 mennesker på 125 rejser, 1793–1802" }, source: "danmarkshistorien.lex.dk, 'Den danske slavehandel'" }
      ],
      sources: [
        { label: "danmarkshistorien.lex.dk (Aarhus University) — Forordning om negerhandelen, 16. marts 1792", url: "https://danmarkshistorien.lex.dk/Forordning_om_negerhandelen,_16._marts_1792" },
        { label: "danmarkshistorien.lex.dk (Aarhus University) — Den danske slavehandel, ca. 1660-1848", url: "https://danmarkshistorien.lex.dk/Den_danske_slavehandel,_ca._1660-1848" }
      ]
    },
    {
      id: "reden1801", year: 1801, theme: "war", confidence: "established",
      title: { en: "The Battle of Copenhagen", da: "Slaget på Reden" },
      summary: {
        en: "Britain attacks to break the League of Armed Neutrality before the Baltic ice melts; Nelson's outgunned opponents hold out for about four hours before a truce. It is Denmark's first major war after roughly 80 years of peace.",
        da: "Storbritannien angriber for at bryde det væbnede neutralitetsforbund, før isen i Østersøen smelter; Nelsons undertallige modstandere holder stand i omkring fire timer, før der sluttes våbenhvile. Det er Danmarks første store krig efter omtrent 80 års fred."
      },
      figures: [{ label: { en: "Forces and losses", da: "Styrker og tab" }, value: { en: "1,058 British cannon vs 630 Danish · 2,000+ dead and wounded · c. 4 hours", da: "1.058 britiske kanoner mod 630 danske · 2.000+ døde og sårede · ca. 4 timer" }, source: "danmarkshistorien.lex.dk, 'Slaget på Reden'" }],
      lat: 55.690, lon: 12.610, place: "København",
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Slaget på Reden, 2. april 1801", url: "https://danmarkshistorien.lex.dk/Slaget_p%C3%A5_Reden,_2._april_1801" }]
    },
    {
      id: "bombardment1807", year: 1807, theme: "war", confidence: "established",
      title: { en: "Copenhagen bombarded", da: "Københavns bombardement" },
      summary: {
        en: "A British fleet shells the civilian city for three nights to force the surrender of the Danish navy, and the whole royal fleet is handed over. It has been called the world's first terror bombardment, because civilians were the primary target rather than collateral.",
        da: "En britisk flåde bombarderer den civile by i tre nætter for at tvinge den danske flåde til overgivelse, og hele orlogsflåden udleveres. Det er blevet kaldt verdens første terrorbombardement, fordi civile var det primære mål og ikke utilsigtede tab."
      },
      figures: [{ label: { en: "Destruction", da: "Ødelæggelser" }, value: { en: "c. 6,000 shells and rockets · several hundred killed · c. 1,000 houses destroyed", da: "ca. 6.000 granater og raketter · flere hundrede dræbte · ca. 1.000 huse ødelagt" }, source: "danmarkshistorien.lex.dk, 'Kapitulationen efter Københavns bombardement'" }],
      lat: 55.676, lon: 12.568, place: "København",
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Kapitulationen efter Københavns bombardement, 7. september 1807", url: "https://danmarkshistorien.lex.dk/Kapitulationen_efter_K%C3%B8benhavns_bombardement_7._september_1807" }]
    },
    {
      id: "bankruptcy1813", year: 1813, theme: "economy", confidence: "contested",
      title: { en: "The state bankruptcy", da: "Statsbankerotten" },
      summary: {
        en: "Running the printing press from 1807 to fund the war produces uncontrollable inflation, and in January 1813 the currency is reformed and radically devalued. Whether 'bankruptcy' is the right word for it has been argued ever since.",
        da: "Seddelpressen kørte fra 1807 for at finansiere krigen og skabte ukontrollabel inflation, og i januar 1813 omlægges og devalueres møntfoden radikalt. Om 'bankerot' er det rigtige ord, har man diskuteret lige siden."
      },
      readings: [
        { side: { en: "A bankruptcy", da: "En bankerot" }, text: { en: "Liberals named it the state bankruptcy: savings were destroyed and the currency written down to a fraction of its nominal silver value.", da: "De liberale kaldte det statsbankerotten: opsparinger blev udslettet, og møntfoden skrevet ned til en brøkdel af sin nominelle sølvværdi." }, source: "danmarkshistorien.lex.dk, 'Statsbankerotten 1813'" },
        { side: { en: "Not technically", da: "Ikke teknisk set" }, text: { en: "Payments were never formally suspended and creditors' claims were not erased — by the strict definition the state did not default.", da: "Betalingerne blev aldrig formelt indstillet, og kreditorernes krav blev ikke slettet — efter den strenge definition misligholdt staten ikke." }, source: "danmarkshistorien.lex.dk, 'Statsbankerotten 1813'" }
      ],
      figures: [{ label: { en: "Devaluation", da: "Devaluering" }, value: { en: "Kurantdaler had fallen to 6% of nominal silver value · 6 kurantdaler = 1 rigsbankdaler", da: "Kurantdaleren var faldet til 6% af den nominelle sølvværdi · 6 kurantdaler = 1 rigsbankdaler" }, source: "danmarkshistorien.lex.dk, 'Statsbankerotten 1813'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Statsbankerotten 1813", url: "https://danmarkshistorien.lex.dk/Statsbankerotten_1813" }]
    },
    {
      id: "kiel1814", year: 1814, theme: "borders", confidence: "established",
      title: { en: "Norway lost at Kiel", da: "Norge tabt i Kiel" },
      summary: {
        en: "Denmark cedes Norway to the King of Sweden, ending a union of 434 years, while the Danish negotiator secures Greenland, the Faroes and Iceland by an explicit exclusion clause. Denmark is the Napoleonic Wars' largest territorial loser by area.",
        da: "Danmark afstår Norge til Sveriges konge og afslutter en union på 434 år, mens den danske forhandler sikrer Grønland, Færøerne og Island ved en udtrykkelig undtagelsesklausul. Danmark er Napoleonskrigenes største territoriale taber målt i areal."
      },
      figures: [{ label: { en: "The loss", da: "Tabet" }, value: { en: "Union 1380–1814 (434 years) · c. two-thirds of territory lost", da: "Union 1380–1814 (434 år) · ca. to tredjedele af territoriet tabt" }, source: "danmarkshistorien.lex.dk, 'Freden i Kiel'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Freden i Kiel, 14. januar 1814", url: "https://danmarkshistorien.lex.dk/Freden_i_Kiel_14._januar_1814" }]
    },
    {
      id: "goldenage", year: 1814, endYear: 1849, theme: "culture", confidence: "established",
      title: { en: "The Golden Age", da: "Guldalderen" },
      summary: {
        en: "Cultural life flourishes immediately after the military and territorial catastrophe, with nationalism the organising theme across literature, painting, ballet and music. It feeds indirectly into the democratisation that produces the 1849 constitution.",
        da: "Kulturlivet blomstrer umiddelbart efter den militære og territoriale katastrofe, med nationalismen som det bærende tema i litteratur, maleri, ballet og musik. Det føder indirekte ind i den demokratisering, der munder ud i grundloven af 1849."
      },
      figures: [{ label: { en: "The generation", da: "Generationen" }, value: { en: "Eckersberg 1783–1853 · Købke 1810–48 · Bournonville 1805–79 · Gade 1817–90 · Grundtvig 1783–1872", da: "Eckersberg 1783–1853 · Købke 1810–48 · Bournonville 1805–79 · Gade 1817–90 · Grundtvig 1783–1872" }, source: "danmarkshistorien.lex.dk, 'Kulturlivet i Danmark 1814-1849'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Kulturlivet i Danmark 1814-1849", url: "https://danmarkshistorien.lex.dk/Kulturlivet_i_Danmark_1814-1849" }]
    },
    {
      id: "folkehojskole", year: 1844, theme: "ideas", confidence: "sourced",
      title: { en: "The first folk high school", da: "Den første folkehøjskole" },
      summary: {
        en: "Rødding Folkehøjskole opens in Schleswig, founded by Christian Flor — not by Grundtvig himself, though the movement carries his name. The model explodes after the 1864 defeat and becomes a defining Danish institution.",
        da: "Rødding Folkehøjskole åbner i Slesvig, grundlagt af Christian Flor — ikke af Grundtvig selv, selv om bevægelsen bærer hans navn. Modellen eksploderer efter nederlaget i 1864 og bliver en institution, der definerer Danmark."
      },
      figures: [{ label: { en: "Growth", da: "Vækst" }, value: { en: "Opened 7 Nov 1844 · c. 60 schools founded 1864–1872", da: "Åbnet 7. nov. 1844 · ca. 60 skoler grundlagt 1864–1872" }, source: "danmarkshistorien.lex.dk, 'Den grundtvigske folkehøjskole'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Den grundtvigske folkehøjskole, ca. 1830-1920", url: "https://danmarkshistorien.lex.dk/Den_grundtvigske_folkeh%C3%B8jskole,_ca._1830-1920" }]
    },
    {
      id: "abolition1848", year: 1848, theme: "enslavement", confidence: "contested",
      title: { en: "Slavery abolished in the West Indies", da: "Slaveriet ophæves i Vestindien" },
      summary: {
        en: "Governor Peter von Scholten declares the enslaved free with immediate effect, after a rebellion at Frederiksted. The often-repeated claim that Denmark was first to abolish slavery is treated by the source as a myth.",
        da: "Guvernør Peter von Scholten erklærer de slavegjorte frie med øjeblikkelig virkning efter et oprør i Frederiksted. Den ofte gentagne påstand om, at Danmark var først til at afskaffe slaveriet, behandles af kilden som en myte."
      },
      readings: [
        { side: { en: "The popular claim", da: "Den udbredte påstand" }, text: { en: "Denmark is widely said to have been the first country to abolish slavery, on the strength of the 1792 ordinance.", da: "Danmark siges bredt at have været det første land, der afskaffede slaveriet, med henvisning til forordningen af 1792." }, source: "danmarkshistorien.lex.dk, 'MYTE: Var Danmark det første land, der ophævede slaveriet?'" },
        { side: { en: "What actually happened", da: "Hvad der faktisk skete" }, text: { en: "1792 banned the trade, not slavery. Several US states, France in 1794 and Britain in 1834 abolished slavery itself earlier than Denmark's 1848.", da: "1792 forbød handelen, ikke slaveriet. Flere amerikanske stater, Frankrig i 1794 og Storbritannien i 1834 afskaffede selve slaveriet før Danmarks 1848." }, source: "danmarkshistorien.lex.dk, 'MYTE: Var Danmark det første land, der ophævede slaveriet?'" }
      ],
      figures: [{ label: { en: "Emancipation", da: "Frigivelsen" }, value: { en: "3 July 1848 · France 1794 · Britain 1834", da: "3. juli 1848 · Frankrig 1794 · Storbritannien 1834" }, source: "danmarkshistorien.lex.dk" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — MYTE: Var Danmark det første land, der ophævede slaveriet?", url: "https://danmarkshistorien.lex.dk/MYTE_Var_Danmark_det_f%C3%B8rste_land,_der_oph%C3%A6vede_slaveriet%3F" }]
    },
    {
      id: "march1848", year: 1848, theme: "power", confidence: "contested",
      title: { en: "The end of absolutism", da: "Enevældens fald" },
      summary: {
        en: "A mass procession marches on Christiansborg on 21 March only to learn Frederik VII has already conceded and dismissed his ministry. Whether to call 1848 a revolution is genuinely argued among historians.",
        da: "Et stort optog går mod Christiansborg den 21. marts blot for at få at vide, at Frederik 7. allerede har givet efter og afskediget sit ministerium. Om 1848 skal kaldes en revolution, diskuteres reelt blandt historikere."
      },
      readings: [
        { side: { en: "A revolution", da: "En revolution" }, text: { en: "Scholars increasingly call 1848 a genuine revolution — the constitutional order was overthrown, and the Three Years' War that followed reads to some as a civil war.", da: "Forskere kalder i stigende grad 1848 en egentlig revolution — den forfatningsmæssige orden blev væltet, og Treårskrigen der fulgte, læses af nogle som en borgerkrig." }, source: "danmarkshistorien.lex.dk, 'Året 1848 og overgangen fra enevælde til indskrænket monarki'" },
        { side: { en: "A peaceful transition", da: "En fredelig overgang" }, text: { en: "It was bloodless in Copenhagen, unlike Paris, Berlin or Vienna — the king conceded before the crowd arrived, which is not how revolutions usually go.", da: "Den forløb ublodigt i København, i modsætning til Paris, Berlin og Wien — kongen gav efter, før mængden nåede frem, hvilket ikke er sådan revolutioner plejer at gå." }, source: "danmarkshistorien.lex.dk, 'Året 1848 og overgangen fra enevælde til indskrænket monarki'" }
      ],
      figures: [{ label: { en: "The procession", da: "Optoget" }, value: { en: "12,000–15,000 people, 21 March 1848", da: "12.000–15.000 mennesker, 21. marts 1848" }, source: "danmarkshistorien.lex.dk" }],
      lat: 55.676, lon: 12.579, place: "København",
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Året 1848 og overgangen fra enevælde til indskrænket monarki", url: "https://danmarkshistorien.lex.dk/%C3%85ret_1848_og_overgangen_fra_enev%C3%A6lde_til_indskr%C3%A6nket_monarki" }]
    },

    // ---- Added 2026-07-20: the belief and culture columns were thin before
    // 1849. Both sources retrieved and read.
    {
      id: "jodiskfrihedsbrev", year: 1814, theme: "religion", confidence: "established",
      title: { en: "The Jewish charter", da: "Det jødiske frihedsbrev" },
      summary: {
        en: "The royal order of 29 March 1814 gave Jews born in the realm equal access to earn a living in any lawful trade, and placed them under Danish civil law. It was emancipation with conditions attached, not equality.",
        da: "Kongelig anordning af 29. marts 1814 gav jøder født i riget lige adgang til at ernære sig ved ethvert lovligt erhverv og lagde dem ind under dansk borgerlig ret. Det var frigørelse på betingelser, ikke ligestilling."
      },
      detail: {
        en: "Synagogues still required special royal permission, records had to be kept in Danish or German, and a religious examination was made compulsory before a young Jew could marry, enter a guild or trade. Full equality came only with the 1849 constitution.",
        da: "Synagoger krævede fortsat særlig kongelig tilladelse, protokoller skulle føres på dansk eller tysk, og en religiøs prøve blev gjort obligatorisk, før en ung jøde kunne gifte sig, optages i et lav eller drive næring. Fuld ligestilling kom først med grundloven af 1849."
      },
      figures: [{ label: { en: "Issued", da: "Udstedt" }, value: { en: "29 March 1814 · full equality only in 1849", da: "29. marts 1814 · fuld ligestilling først i 1849" }, source: "danmarkshistorien.lex.dk, 'Det jødiske frihedsbrev, 29. marts 1814'" }],
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Det jødiske frihedsbrev, 29. marts 1814", url: "https://danmarkshistorien.lex.dk/Det_j%C3%B8diske_frihedsbrev,_29._marts_1814" }]
    },
    {
      id: "hcandersen", year: 1835, theme: "culture", confidence: "established",
      title: { en: "H.C. Andersen's first fairy tales", da: "H.C. Andersens første eventyr" },
      summary: {
        en: "In spring 1835 Andersen (1805–1875) published his first booklet of 'fairy tales told for children' — The Tinderbox, Little Claus and Big Claus, The Princess and the Pea, and Little Ida's Flowers. He wrote roughly 200 in all.",
        da: "I foråret 1835 udgav Andersen (1805-1875) sit første hæfte 'eventyr, fortalte for børn' — Fyrtøjet, Lille Claus og store Claus, Prinsessen på ærten og Den lille Idas blomster. I alt skrev han omkring 200."
      },
      detail: {
        en: "Born in Odense on 2 April 1805, he arrived in Copenhagen on 6 September 1819 with almost nothing. His burial in 1875 was treated as a national occasion.",
        da: "Født i Odense den 2. april 1805 ankom han til København den 6. september 1819 med næsten intet. Hans begravelse i 1875 blev holdt som en national begivenhed."
      },
      figures: [{ label: { en: "Fairy tales", da: "Eventyr" }, value: { en: "c. 200 · first booklet spring 1835", da: "ca. 200 · første hæfte foråret 1835" }, source: "danmarkshistorien.lex.dk, 'Hans Christian Andersen, 1805-1875'" }],
      lat: 55.396, lon: 10.388, place: "Odense",
      sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Hans Christian Andersen, 1805-1875", url: "https://danmarkshistorien.lex.dk/Hans_Christian_Andersen,_1805-1875" }]
    },
    ...modernEvents
  ],

  links: [
    ...modernLinks,
    { from: "christian1", to: "roskilde1658", relation: { en: "set up", da: "lagde grunden til" } },
    { from: "roskilde1658", to: "skaanelost", relation: { en: "followed by", da: "efterfulgt af" } },
    { from: "skaanelost", to: "absolutism", relation: { en: "preceded", da: "gik forud for" } },
    { from: "absolutism", to: "kongeloven", relation: { en: "formalised by", da: "formaliseret ved" } },
    { from: "handfaestning", to: "absolutism", relation: { en: "abolished by", da: "afskaffet ved" } },
    { from: "jyskelov", to: "danskelov", relation: { en: "replaced by", da: "afløst af" } },
    { from: "bombardment1807", to: "bankruptcy1813", relation: { en: "followed by", da: "efterfulgt af" } },
    { from: "bankruptcy1813", to: "kiel1814", relation: { en: "followed by", da: "efterfulgt af" } },
    { from: "kiel1814", to: "goldenage", relation: { en: "followed by", da: "efterfulgt af" } },
    { from: "slavetrade", to: "slavetradeban", relation: { en: "restricted by", da: "begrænset ved" } },
    { from: "slavetradeban", to: "abolition1848", relation: { en: "preceded", da: "gik forud for" } },
    { from: "kalmar", to: "bloodbath", relation: { en: "broken by", da: "brudt ved" } },
    { from: "bloodbath", to: "grevensfejde", relation: { en: "followed by", da: "efterfulgt af" } },
    { from: "grevensfejde", to: "reformation", relation: { en: "settled by", da: "afgjort ved" } },
    { from: "soundtoll", to: "christian4", relation: { en: "funded", da: "finansierede" } },
    { from: "christian4", to: "thirtyyears", relation: { en: "led to", da: "førte til" } },
    { from: "march1848", to: "folkehojskole", relation: { en: "echoed by", da: "genlyd i" } }
  ]
};
