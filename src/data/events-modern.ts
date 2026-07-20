import type { AtlasEvent } from "./schema.ts";

// Denmark 1849–2026. Sources: danmarkshistorien.lex.dk (Aarhus University),
// retrieved 2026-07-20, except where a figure comes from Danmarks Statistik.
//
// Referendum results are given as SHARE OF VOTES CAST. The encyclopaedia's
// master table publishes them as a share of the whole electorate; where the two
// differ the basis is stated on the figure. Mixing the denominators silently
// would be the same class of error as charting two territories as one series.
//
// Three items the research surfaced are deliberately ABSENT because they could
// not be verified against a page that was actually retrieved: Niels Bohr's 1922
// Nobel Prize, the 1915 women's suffrage amendment (the dedicated article 404s),
// and the 2015 asylum-applicant count. They are real events; they are not here
// because an unverified citation is worse than a gap.

export const modernEvents: AtlasEvent[] = [
  {
    id: "grundlov1849", year: 1849, theme: "power", confidence: "contested",
    title: { en: "The June Constitution", da: "Junigrundloven" },
    summary: {
      en: "Signed 5 June 1849, replacing the Royal Law of 1665 with a bicameral Rigsdag and freedom of speech, religion and assembly. How democratic it actually was is argued: it enfranchised roughly 15% of the adult population.",
      da: "Underskrevet 5. juni 1849 og erstatter Kongeloven af 1665 med en tokammer-rigsdag samt tros-, tale- og forsamlingsfrihed. Hvor demokratisk den egentlig var, diskuteres: den gav omkring 15% af den voksne befolkning stemmeret."
    },
    readings: [
      { side: { en: "A democratic breakthrough", da: "Et demokratisk gennembrud" }, text: { en: "It ended 184 years of absolutism and established the freedoms and representative institutions Denmark still runs on.", da: "Den afsluttede 184 års enevælde og indførte de frihedsrettigheder og repræsentative institutioner, Danmark stadig hviler på." }, source: "danmarkshistorien.lex.dk, 'Grundloven 1849'" },
      { side: { en: "A narrow franchise", da: "En snæver valgret" }, text: { en: "Analysis on the same site challenges the traditional reading of it as notably democratic — around 15% of adults could vote, and women none.", da: "Analyser samme sted udfordrer den traditionelle læsning af den som særligt demokratisk — omkring 15% af de voksne kunne stemme, og ingen kvinder." }, source: "danmarkshistorien.lex.dk, 'Grundloven 1849'" }
    ],
    figures: [{ label: { en: "Enfranchised", da: "Stemmeberettigede" }, value: { en: "c. 15% of the adult population", da: "ca. 15% af den voksne befolkning" }, source: "danmarkshistorien.lex.dk, 'Grundloven 1849'" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Grundloven, vedtagelsen af Danmarks første grundlov i 1849", url: "https://danmarkshistorien.lex.dk/Grundloven_-_vedtagelsen_af_Danmarks_f%C3%B8rste_grundlov_i_1849" }]
  },
  {
    id: "dybbol1864", year: 1864, theme: "war", confidence: "established",
    title: { en: "Dybbøl", da: "Dybbøl" },
    summary: {
      en: "A Prussian force of over 35,000 assaults poorly maintained Danish fortifications held by about 10,000 men. Six hours of bombardment from 4 AM; the position falls by 2 PM. The source calls it plainly a catastrophic defeat.",
      da: "En preussisk styrke på over 35.000 stormer dårligt vedligeholdte danske skanser forsvaret af omkring 10.000 mand. Seks timers bombardement fra klokken fire om morgenen; stillingen falder ved totiden. Kilden kalder det ligeud et katastrofalt nederlag."
    },
    figures: [{ label: { en: "Losses", da: "Tab" }, value: { en: "Danish c. 5,000 · Prussian c. 1,200", da: "Danske ca. 5.000 · preussiske ca. 1.200" }, source: "danmarkshistorien.lex.dk, 'Slaget ved Dybbøl 18. april 1864'" }],
    lat: 54.914, lon: 9.760, place: "Dybbøl",
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Slaget ved Dybbøl, 18. april 1864", url: "https://danmarkshistorien.lex.dk/Slaget_ved_Dybb%C3%B8l_18._april_1864" }]
  },
  {
    id: "vienna1864", year: 1864, theme: "borders", confidence: "established",
    title: { en: "The duchies lost", da: "Hertugdømmerne tabt" },
    summary: {
      en: "Denmark cedes Schleswig, Holstein and Lauenburg to Prussia and Austria, plus Jutlandic territory south of Ribe and the islands Amrum, Föhr and Sylt. It is the defining national trauma of the century.",
      da: "Danmark afstår Slesvig, Holsten og Lauenborg til Preussen og Østrig, dertil jysk område syd for Ribe samt øerne Amrum, Føhr og Sild. Det er århundredets afgørende nationale traume."
    },
    figures: [{ label: { en: "Debt apportioned", da: "Gældsfordeling" }, value: { en: "Duchies' share of the national debt: 29 million rigsdaler", da: "Hertugdømmernes andel af statsgælden: 29 millioner rigsdaler" }, source: "danmarkshistorien.lex.dk, 'Wienertraktaten'" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Wienertraktaten, 30. oktober 1864", url: "https://danmarkshistorien.lex.dk/Wienertraktaten,_30._oktober_1864" }]
  },
  {
    id: "hedeopdyrkning", year: 1866, endYear: 1950, theme: "economy", confidence: "established",
    title: { en: "What is lost abroad must be gained at home", da: "Hvad udad tabes, skal indad vindes" },
    summary: {
      en: "Hedeselskabet is founded in 1866 with Enrico Dalgas driving it, on heavy state support. Marl, irrigated meadows and shelter belts convert Jutland heath into farmland — framed explicitly as compensation for 1864.",
      da: "Hedeselskabet stiftes i 1866 med Enrico Dalgas i spidsen og betydelig statsstøtte. Mergling, engvanding og læhegn forvandler jysk hede til agerland — udtrykkeligt fremstillet som erstatning for 1864."
    },
    figures: [{ label: { en: "Farmland, Ringkøbing Amt", da: "Agerland, Ringkøbing Amt" }, value: { en: "41.5% (1866) → 61% (1896) → 63.5% (1929)", da: "41,5% (1866) → 61% (1896) → 63,5% (1929)" }, source: "danmarkshistorien.lex.dk, 'Hedeopdyrkning'" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Hedeopdyrkning, ca. 1750-1950", url: "https://danmarkshistorien.lex.dk/Hedeopdyrkning,_ca._1750-1950" }]
  },
  {
    id: "andelsmejeri", year: 1882, theme: "economy", confidence: "established",
    title: { en: "One member, one vote", da: "Én mand, én stemme" },
    summary: {
      en: "Hjedding Andelsmejeri opens in 1882. Members are bound to deliver milk and subject to quality control, profits shared by volume — but each member has one vote regardless of herd size. That rule shaped Danish civic life far beyond dairying.",
      da: "Hjedding Andelsmejeri åbner i 1882. Medlemmerne er forpligtet til at levere mælk og underlagt kvalitetskontrol, overskuddet fordeles efter mængde — men hvert medlem har én stemme uanset besætningens størrelse. Den regel formede dansk foreningsliv langt ud over mejeridriften."
    },
    figures: [{ label: { en: "Dairies", da: "Mejerier" }, value: { en: "907 (1894) → 1,163 (1909)", da: "907 (1894) → 1.163 (1909)" }, source: "danmarkshistorien.lex.dk, 'Andelsmejerier'" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Andelsmejerier, 1882-", url: "https://danmarkshistorien.lex.dk/Andelsmejerier,_1882-" }]
  },
  {
    id: "andelsslagteri", year: 1887, theme: "economy", confidence: "established",
    title: { en: "The bacon economy", da: "Baconøkonomien" },
    summary: {
      en: "500 farmers near Horsens found the first cooperative slaughterhouse in 1887. Skimmed milk returned by the dairies feeds the pig sector, and Britain absorbs the output — an export economy built on a by-product.",
      da: "500 landmænd ved Horsens grundlægger det første andelsslagteri i 1887. Skummetmælken retur fra mejerierne fodrer svineproduktionen, og Storbritannien aftager produktionen — en eksportøkonomi bygget på et restprodukt."
    },
    figures: [
      { label: { en: "Scale by 1914", da: "Omfang i 1914" }, value: { en: "44 slaughterhouses · 85% of pig slaughter · 140,000 members", da: "44 slagterier · 85% af svineslagtningen · 140.000 medlemmer" }, source: "danmarkshistorien.lex.dk, 'Fra andelsslagterier til Danish Crown'" },
      { label: { en: "Export market", da: "Eksportmarked" }, value: { en: "Britain took over 90% of exports", da: "Storbritannien aftog over 90% af eksporten" }, source: "danmarkshistorien.lex.dk, 'Fra andelsslagterier til Danish Crown'" }
    ],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Fra andelsslagterier til Danish Crown, 1887-", url: "https://danmarkshistorien.lex.dk/Fra_andelsslagterier_til_Danish_Crown,_1887-" }]
  },
  {
    id: "systemskiftet", year: 1901, theme: "power", confidence: "established",
    title: { en: "Systemskiftet: parliamentary rule", da: "Systemskiftet: parlamentarismen" },
    summary: {
      en: "On 24 July 1901 the king appoints the first Venstre government, conceding that a government cannot survive against a Folketing majority. Ole Hansen becomes 'the first farmer in the king's council' — the end of two decades of constitutional deadlock.",
      da: "Den 24. juli 1901 udnævner kongen den første Venstre-regering og indrømmer, at en regering ikke kan sidde mod et folketingsflertal. Ole Hansen bliver 'den første bonde i kongens råd' — enden på to årtiers forfatningskamp."
    },
    figures: [{ label: { en: "April 1901 election", da: "Valget i april 1901" }, value: { en: "Venstrereformpartiet 76 seats · Moderates 16 · Right 8", da: "Venstrereformpartiet 76 mandater · Moderate 16 · Højre 8" }, source: "danmarkshistorien.lex.dk, 'Systemskiftet 1901'" }],
    sources: [
      { label: "danmarkshistorien.lex.dk (Aarhus University) — Systemskiftet 1901", url: "https://danmarkshistorien.lex.dk/Systemskiftet_1901" },
      { label: "danmarkshistorien.lex.dk (Aarhus University) — Forfatningskampen 1866-1901", url: "https://danmarkshistorien.lex.dk/Forfatningskampen_1866-1901" }
    ]
  },
  {
    id: "westindiessold", year: 1917, theme: "colonies", confidence: "contested",
    title: { en: "The West Indies sold", da: "Vestindien sælges" },
    summary: {
      en: "Denmark's first national referendum, 14 December 1916, approves selling St Thomas, St John and St Croix to the USA. The islands' own population was never asked. The deal included US recognition of Danish claims to Greenland.",
      da: "Danmarks første folkeafstemning, 14. december 1916, godkender salget af Sankt Thomas, Sankt Jan og Sankt Croix til USA. Øernes egen befolkning blev aldrig spurgt. Aftalen omfattede amerikansk anerkendelse af danske krav på Grønland."
    },
    readings: [
      { side: { en: "A democratic decision", da: "En demokratisk beslutning" }, text: { en: "The sale was put to the Danish electorate — the first time a Danish government submitted a question to a national vote.", da: "Salget blev forelagt de danske vælgere — første gang en dansk regering sendte et spørgsmål til folkeafstemning." }, source: "danmarkshistorien.lex.dk, 'De Vestindiske Øer, 1672-1917'" },
      { side: { en: "About people who had no vote", da: "Om mennesker uden stemme" }, text: { en: "The population of the islands was not consulted at any point about being transferred between states.", da: "Øernes befolkning blev på intet tidspunkt spurgt om at blive overdraget mellem stater." }, source: "danmarkshistorien.lex.dk, 'De Vestindiske Øer, 1672-1917'" }
    ],
    figures: [
      { label: { en: "Price", da: "Pris" }, value: { en: "c. 100m kr / 25m dollars · transferred 31 March 1917", da: "ca. 100 mio. kr. / 25 mio. dollars · overdraget 31. marts 1917" }, source: "danmarkshistorien.lex.dk, 'De Vestindiske Øer'" },
      { label: { en: "Enslaved population, 1797", da: "Slavegjorte, 1797" }, value: { en: "32,213 enslaved / 4,480 free", da: "32.213 slavegjorte / 4.480 frie" }, source: "danmarkshistorien.lex.dk, 'De Vestindiske Øer'" }
    ],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — De Vestindiske Øer, 1672-1917", url: "https://danmarkshistorien.lex.dk/De_Vestindiske_%C3%98er,_1672-1917" }]
  },
  {
    id: "genforening1920", year: 1920, theme: "borders", confidence: "established",
    title: { en: "The reunification of South Jutland", da: "Genforeningen" },
    summary: {
      en: "Under Versailles article 109, Schleswig votes in zones. Zone 1 goes Danish, Zone 2 goes German — no Zone 2 district had a Danish majority, including Flensburg. The zone boundary becomes the border, and it has held ever since.",
      da: "I henhold til Versaillestraktatens artikel 109 stemmer Slesvig i zoner. Zone 1 stemmer dansk, zone 2 tysk — ingen kommune i zone 2 havde dansk flertal, heller ikke Flensborg. Zonegrænsen bliver grænsen, og den har holdt lige siden."
    },
    figures: [{ label: { en: "The votes", da: "Afstemningerne" }, value: { en: "Zone 1 c. 75% Danish · Zone 2 c. 80% German · Flensburg c. 25% Danish", da: "Zone 1 ca. 75% dansk · zone 2 ca. 80% tysk · Flensborg ca. 25% dansk" }, source: "danmarkshistorien.lex.dk, 'Genforeningen 1920'" }],
    lat: 55.049, lon: 9.417, place: "Sønderjylland",
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Genforeningen 1920", url: "https://danmarkshistorien.lex.dk/Genforeningen_1920" }]
  },
  {
    id: "paaskekrisen", year: 1920, theme: "power", confidence: "established",
    title: { en: "The Easter Crisis", da: "Påskekrisen" },
    summary: {
      en: "Christian X dismisses the Zahle government on 29 March 1920 for refusing to overturn the referendum result that put the border north of Flensburg. The backlash forces him to restore parliamentary rules — and the monarchy has not intervened since.",
      da: "Christian 10. afskediger regeringen Zahle den 29. marts 1920, fordi den nægtede at omgøre afstemningsresultatet, der lagde grænsen nord for Flensborg. Modreaktionen tvinger ham til at genindføre parlamentarismen — og kongehuset har ikke grebet ind siden."
    },
    figures: [{ label: { en: "Duration", da: "Varighed" }, value: { en: "29 March – 4 April 1920", da: "29. marts – 4. april 1920" }, source: "danmarkshistorien.lex.dk" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Verdenskrigen og påskekrisen 1915-1920", url: "https://danmarkshistorien.lex.dk/Valgtema_Verdenskrigen_og_p%C3%A5skekrisen_1915-1920" }]
  },
  {
    id: "ninabang", year: 1924, theme: "power", confidence: "established",
    title: { en: "Denmark's first woman minister", da: "Danmarks første kvindelige minister" },
    summary: {
      en: "Thorvald Stauning forms a minority Social Democratic government. Nina Bang, a Marxist historian, becomes education minister and Denmark's first female minister — the only woman in the cabinet.",
      da: "Thorvald Stauning danner en socialdemokratisk mindretalsregering. Nina Bang, marxistisk historiker, bliver undervisningsminister og Danmarks første kvindelige minister — den eneste kvinde i regeringen."
    },
    figures: [{ label: { en: "In office", da: "Regeringsperiode" }, value: { en: "April 1924 – December 1926", da: "April 1924 – december 1926" }, source: "danmarkshistorien.lex.dk, 'Nina Bang'" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Nina Bang, 1866-1928", url: "https://danmarkshistorien.lex.dk/Nina_Bang,_1866-1928" }]
  },
  {
    id: "kanslergade", year: 1933, theme: "welfare", confidence: "established",
    title: { en: "Kanslergadeforliget", da: "Kanslergadeforliget" },
    summary: {
      en: "Negotiated overnight on 29–30 January 1933 in Stauning's own flat: devaluation, public works, farm subsidies, a strike and lockout ban, and a major social reform. It was concluded the same day Hitler took power in Germany.",
      da: "Forhandlet natten mellem 29. og 30. januar 1933 i Staunings egen lejlighed: devaluering, offentlige arbejder, landbrugsstøtte, forbud mod strejke og lockout samt en stor socialreform. Det blev indgået samme dag, Hitler kom til magten i Tyskland."
    },
    figures: [{ label: { en: "The crisis it answered", da: "Krisen det svarede på" }, value: { en: "Unemployment over 30% · threatened lockout of 100,000 workers · c. 10% devaluation", da: "Arbejdsløshed over 30% · truende lockout af 100.000 arbejdere · ca. 10% devaluering" }, source: "danmarkshistorien.lex.dk, 'Kanslergadeforliget 1933'" }],
    lat: 55.688, lon: 12.585, place: "København",
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Kanslergadeforliget 1933", url: "https://danmarkshistorien.lex.dk/Kanslergadeforliget_1933" }]
  },
  {
    id: "socialreform1933", year: 1933, theme: "welfare", confidence: "established",
    title: { en: "From charity to entitlement", da: "Fra fattighjælp til rettighed" },
    summary: {
      en: "K.K. Steincke consolidates a patchwork of laws into four. The decisive shift is from charity to a rights principle: meeting the criteria gives an entitlement, without the loss of civic rights that poor relief had carried.",
      da: "K.K. Steincke samler et kludetæppe af love til fire. Det afgørende skift er fra almisse til retsprincip: opfylder man kriterierne, har man krav — uden det tab af borgerlige rettigheder, fattighjælpen havde medført."
    },
    figures: [{ label: { en: "Consolidation", da: "Sammenlægning" }, value: { en: "4 laws replacing the 1891 Poor Law and its successors", da: "4 love, der erstattede fattigloven af 1891 og dens efterfølgere" }, source: "danmarkshistorien.lex.dk, 'Socialreformen af 1933'" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Socialreformen af 1933", url: "https://danmarkshistorien.lex.dk/Socialreformen_af_1933" }]
  },
  {
    id: "occupation1940", year: 1940, theme: "war", confidence: "established",
    title: { en: "9 April: the occupation", da: "9. april: besættelsen" },
    summary: {
      en: "Germany attacks by land, sea and air in the early morning. Danish resistance is scattered; on the government's and Christian X's orders, fighting stops after a few hours. The German memorandum promises not to violate Denmark's political independence.",
      da: "Tyskland angriber til lands, til vands og i luften tidligt om morgenen. Den danske modstand er spredt; efter regeringens og Christian 10.s ordre indstilles kampen efter få timer. Det tyske memorandum lover ikke at krænke Danmarks politiske selvstændighed."
    },
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Besættelsen, 9. april 1940", url: "https://danmarkshistorien.lex.dk/Bes%C3%A6ttelsen,_9._april_1940" }]
  },
  {
    id: "samarbejde", year: 1940, endYear: 1943, theme: "power", confidence: "contested",
    title: { en: "The cooperation policy", da: "Samarbejdspolitikken" },
    summary: {
      en: "Denmark's police function until 1944, parliament legislates until 1943, and the army is not dissolved until 1943 — unprecedented in occupied Europe. Whether this was prudent protection or indefensible collaboration is still argued at the highest political level.",
      da: "Dansk politi fungerer til 1944, Rigsdagen lovgiver til 1943, og hæren opløses først i 1943 — enestående i det besatte Europa. Om det var klog beskyttelse eller uforsvarligt samarbejde, diskuteres stadig på højeste politiske niveau."
    },
    readings: [
      { side: { en: "Protection of the population", da: "Beskyttelse af befolkningen" }, text: { en: "Denmark was the occupied country in Europe that felt the war least; the policy shielded civilians and preserved institutions.", da: "Danmark var det besatte land i Europa, der mærkede krigen mindst; politikken skærmede civile og bevarede institutionerne." }, source: "danmarkshistorien.lex.dk, 'Samarbejdspolitikken under besættelsen 1940-45'" },
      { side: { en: "Morally indefensible", da: "Moralsk uforsvarlig" }, text: { en: "The resistance opposed it from the start, and Prime Minister Anders Fogh Rasmussen sharply condemned it in 2003 — to which historian Hans Kirchhoff replied that he lacked understanding of occupation history. The same government banned communism and interned Communist leaders.", da: "Modstandsbevægelsen var imod fra begyndelsen, og statsminister Anders Fogh Rasmussen fordømte den skarpt i 2003 — hvortil historikeren Hans Kirchhoff svarede, at han manglede forståelse for besættelseshistorien. Samme regering forbød kommunismen og internerede kommunistiske ledere." }, source: "danmarkshistorien.lex.dk, 'Samarbejdspolitikken under besættelsen 1940-45'" }
    ],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Samarbejdspolitikken under besættelsen 1940-45", url: "https://danmarkshistorien.lex.dk/Samarbejdspolitikken_under_bes%C3%A6ttelsen_1940-45" }]
  },
  {
    id: "august1943", year: 1943, theme: "resistance", confidence: "established",
    title: { en: "The August rupture", da: "Augustoprøret" },
    summary: {
      en: "Werner Best demands martial law, a strike ban and the death penalty for sabotage. The coalition parties refuse; Germany imposes military martial law and disarms the Danish forces. Parts of the navy are scuttled by their own crews.",
      da: "Werner Best kræver undtagelsestilstand, strejkeforbud og dødsstraf for sabotage. Samlingspartierne nægter; Tyskland indfører militær undtagelsestilstand og afvæbner de danske styrker. Dele af flåden sænkes af deres egne besætninger."
    },
    figures: [{ label: { en: "Killed", da: "Dræbte" }, value: { en: "23 Danish and 5 German soldiers", da: "23 danske og 5 tyske soldater" }, source: "danmarkshistorien.lex.dk, 'Augustoprøret 29. august 1943'" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Augustoprøret, 29. august 1943", url: "https://danmarkshistorien.lex.dk/Augustopr%C3%B8ret_29._august_1943" }]
  },
  {
    id: "joedeaktion", year: 1943, theme: "people", confidence: "contested",
    title: { en: "The rescue of the Danish Jews", da: "Redningen af de danske jøder" },
    summary: {
      en: "Warned by Georg Duckwitz, some 7,000 people — about 95% of Denmark's Jews — are brought to Sweden on the nights around 1–2 October 1943. The heroic version of the story and the documented details do not sit entirely comfortably together.",
      da: "Advaret af Georg Duckwitz bringes omkring 7.000 mennesker — cirka 95% af Danmarks jøder — til Sverige i nætterne omkring 1.-2. oktober 1943. Den heroiske fortælling og de dokumenterede detaljer passer ikke helt gnidningsfrit sammen."
    },
    detail: {
      en: "The source states outright that attempts to complicate the heroic version 'are often met with criticism'. The historiographical fight is itself part of the event.",
      da: "Kilden siger direkte, at forsøg på at nuancere den heroiske version 'ofte mødes med kritik'. Historiografistriden er selv en del af begivenheden."
    },
    readings: [
      { side: { en: "A national moral achievement", da: "En national moralsk bedrift" }, text: { en: "Ordinary Danes acted to save their neighbours, and almost the entire Jewish population survived — the outcome is not in dispute.", da: "Almindelige danskere handlede for at redde deres naboer, og næsten hele den jødiske befolkning overlevede — resultatet er ikke omstridt." }, source: "danmarkshistorien.lex.dk, 'Jødeaktionen og evakueringen af danske jøder i oktober 1943'" },
      { side: { en: "Coordinated, and paid for", da: "Koordineret — og betalt" }, text: { en: "Fishermen charged 1,300–1,500 kr per person, over three months' wages, falling to 500 kr by November. Resistance groups coordinated routes, and Werner Best's double-dealing suggests calculated pragmatism on the German side rather than pure grassroots heroism.", da: "Fiskerne tog 1.300-1.500 kr. pr. person, mere end tre måneders løn, faldende til 500 kr. i november. Modstandsgrupper koordinerede ruterne, og Werner Bests dobbeltspil peger på beregnende pragmatisme fra tysk side snarere end ren folkelig heltemodighed." }, source: "danmarkshistorien.lex.dk, 'Jødeaktionen og evakueringen af danske jøder i oktober 1943'" }
    ],
    figures: [{ label: { en: "Outcome", da: "Udfald" }, value: { en: "c. 7,000 escaped (c. 95%) · c. 500 arrested · 52 died at Theresienstadt", da: "ca. 7.000 undslap (ca. 95%) · ca. 500 anholdt · 52 døde i Theresienstadt" }, source: "danmarkshistorien.lex.dk" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Jødeaktionen og evakueringen af danske jøder i oktober 1943", url: "https://danmarkshistorien.lex.dk/J%C3%B8deaktionen_og_evakueringen_af_danske_j%C3%B8der_i_oktober_1943" }]
  },
  {
    id: "sabotage", year: 1940, endYear: 1945, theme: "resistance", confidence: "established",
    title: { en: "Sabotage", da: "Sabotagen" },
    summary: {
      en: "Sabotage overwhelmingly characterises the final phase of the occupation — only 73 industrial and 2 railway actions in all of 1940–42. Saboteurs deliberately avoided civilian and German casualties: little blood was spilled.",
      da: "Sabotagen præger især besættelsens sidste fase — kun 73 industri- og 2 jernbaneaktioner i hele 1940-42. Sabotørerne undgik bevidst civile og tyske tab: der blev udgydt lidt blod."
    },
    figures: [{ label: { en: "Total actions", da: "Aktioner i alt" }, value: { en: "2,801 industrial and 1,526 railway", da: "2.801 mod industrien og 1.526 mod jernbanen" }, source: "danmarkshistorien.lex.dk, 'Sabotage, 1940-1945'" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Sabotage, 1940-1945", url: "https://danmarkshistorien.lex.dk/Sabotage,_1940-1945" }]
  },
  {
    id: "iceland1944", year: 1944, theme: "borders", confidence: "established",
    title: { en: "Iceland leaves the union", da: "Island forlader unionen" },
    summary: {
      en: "Under wartime separation — Denmark occupied, Iceland under British then American control — the Althing dissolves the union and the republic is proclaimed at Þingvellir on 17 June 1944. Denmark recognises it in 1950.",
      da: "Under krigens adskillelse — Danmark besat, Island under britisk og siden amerikansk kontrol — opløser Altinget unionen, og republikken udråbes på Þingvellir den 17. juni 1944. Danmark anerkender den i 1950."
    },
    figures: [{ label: { en: "Referendum", da: "Folkeafstemning" }, value: { en: "98% turnout · 99.5% for separation · 95.04% for a republic", da: "98% valgdeltagelse · 99,5% for løsrivelse · 95,04% for republik" }, source: "danmarkshistorien.lex.dk, 'Islands historie'" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Islands historie, ca. 870-", url: "https://danmarkshistorien.lex.dk/Islands_historie,_ca._870-" }]
  },
  {
    id: "liberation1945", year: 1945, theme: "war", confidence: "established",
    title: { en: "Liberation, 5 May", da: "Befrielsen, 5. maj" },
    summary: {
      en: "Announced via the BBC on 4 May and effective 5 May at 8 AM, following capitulation to Montgomery on Lüneburg Heath — before Allied troops had reached Danish soil. Bornholm was a different story: Soviet aircraft bombed Rønne and Nexø, and the island stayed under Soviet control until April 1946.",
      da: "Meddelt over BBC den 4. maj og gældende fra 5. maj klokken otte efter kapitulationen til Montgomery på Lüneburg Hede — før allierede tropper havde nået dansk jord. Bornholm var en anden historie: sovjetiske fly bombede Rønne og Nexø, og øen forblev under sovjetisk kontrol til april 1946."
    },
    figures: [{ label: { en: "Bornholm", da: "Bornholm" }, value: { en: "Bombed 7–8 May, c. 10 residents killed · Soviet control until 5 April 1946", da: "Bombet 7.–8. maj, ca. 10 beboere dræbt · sovjetisk kontrol indtil 5. april 1946" }, source: "danmarkshistorien.lex.dk, 'Befrielsen i maj 1945'" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Befrielsen i maj 1945", url: "https://danmarkshistorien.lex.dk/Befrielsen_i_maj_1945" }]
  },
  {
    id: "retsopgoer", year: 1945, endYear: 1955, theme: "law", confidence: "contested",
    title: { en: "The reckoning", da: "Retsopgøret" },
    summary: {
      en: "Retroactive legislation reintroduces capital punishment for collaboration. It was attacked from both directions at once — as too lenient and as arbitrary and excessive.",
      da: "Lovgivning med tilbagevirkende kraft genindfører dødsstraf for landsforræderi. Den blev angrebet fra begge sider på én gang — som for mild og som vilkårlig og for hård."
    },
    readings: [
      { side: { en: "Too lenient", da: "For mild" }, text: { en: "Communists protested that large-scale war profiteers escaped while small collaborators were punished. Penalties were revised downward from 1946 and all convicts released by 1960.", da: "Kommunisterne protesterede over, at de store krigsprofitører slap, mens de små blev straffet. Straffene blev nedsat fra 1946, og alle dømte var løsladt i 1960." }, source: "danmarkshistorien.lex.dk, 'Retsopgøret efter besættelsen, 1945-1955'" },
      { side: { en: "Arbitrary and excessive", da: "Vilkårligt og for hårdt" }, text: { en: "Retroactive criminal law and reinstated capital punishment breached basic legal principle; a prominent Jewish lawyer called it 'a juridical madhouse'.", da: "Straffelov med tilbagevirkende kraft og genindført dødsstraf brød med grundlæggende retsprincipper; en fremtrædende jødisk advokat kaldte det 'et juridisk galehus'." }, source: "danmarkshistorien.lex.dk, 'Retsopgøret efter besættelsen, 1945-1955'" }
    ],
    figures: [{ label: { en: "Scale", da: "Omfang" }, value: { en: "30,000+ interned · 13,000 convicted · 46 executed", da: "30.000+ interneret · 13.000 dømt · 46 henrettet" }, source: "danmarkshistorien.lex.dk" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Retsopgøret efter besættelsen, 1945-1955", url: "https://danmarkshistorien.lex.dk/Retsopg%C3%B8ret_efter_bes%C3%A6ttelsen,_1945-1955" }]
  },
  {
    id: "faroe1948", year: 1948, theme: "borders", confidence: "established",
    title: { en: "Faroese home rule", da: "Færøsk hjemmestyre" },
    summary: {
      en: "A referendum in September 1946 shows a narrow majority for independence but is not implemented. Negotiations instead produce the Home Rule Act of 1 April 1948, giving the Lagting legislative and taxation authority while defence and foreign affairs stay Danish.",
      da: "En folkeafstemning i september 1946 viser et snævert flertal for løsrivelse, men gennemføres ikke. I stedet fører forhandlinger til hjemmestyreloven af 1. april 1948, der giver Lagtinget lovgivnings- og skatteret, mens forsvar og udenrigspolitik forbliver danske."
    },
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Færøerne og Danmark, 1814-", url: "https://danmarkshistorien.lex.dk/F%C3%A6r%C3%B8erne_og_Danmark,_1814-" }]
  },
  {
    id: "nato1949", year: 1949, theme: "war", confidence: "established",
    title: { en: "NATO ends two centuries of neutrality", da: "NATO afslutter to århundreders neutralitet" },
    summary: {
      en: "Gustav Rasmussen signs in Washington on 4 April 1949, after the Scandinavian defence union fails and Norway accepts membership. Hans Hedtoft's slogan captured it: never again a 9 April.",
      da: "Gustav Rasmussen underskriver i Washington den 4. april 1949, efter at det skandinaviske forsvarsforbund er faldet, og Norge har accepteret medlemskab. Hans Hedtofts slogan sagde det hele: aldrig mere en 9. april."
    },
    figures: [{ label: { en: "Rigsdag vote", da: "Rigsdagens afstemning" }, value: { en: "119 to 23", da: "119 mod 23" }, source: "Gyldendal og Politikens Danmarkshistorie, 'Atlanterhavspagten'" }],
    sources: [{ label: "Gyldendal og Politikens Danmarkshistorie (lex.dk) — Atlanterhavspagten", url: "https://gyldendalogpolitikensdanmarkshistorie.lex.dk/Atlanterhavspagten" }]
  },
  {
    id: "grundlov1953", year: 1953, theme: "power", confidence: "established",
    title: { en: "The 1953 Constitution", da: "Grundloven af 1953" },
    summary: {
      en: "Abolishes the Landsting, introduces female succession — Frederik IX had three daughters — upgrades Greenland from colony to county, and lets one-third of parliament force a referendum. Section 20 sets a five-sixths threshold for transferring sovereignty, which is why EU questions keep going to the people.",
      da: "Afskaffer Landstinget, indfører kvindelig arvefølge — Frederik 9. havde tre døtre — ophøjer Grønland fra koloni til amt og lader en tredjedel af Folketinget kræve folkeafstemning. §20 kræver fem sjettedeles flertal for suverænitetsafgivelse, og derfor havner EU-spørgsmål igen og igen hos befolkningen."
    },
    figures: [{ label: { en: "Section 42", da: "§42" }, value: { en: "A bill falls only if a majority AND at least 30% of all eligible voters vote against", da: "Et lovforslag falder kun, hvis et flertal OG mindst 30% af alle stemmeberettigede stemmer imod" }, source: "danmarkshistorien.lex.dk, 'Danmarks Riges Grundlov af 5. juni 1953'" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Danmarks Riges Grundlov af 5. juni 1953", url: "https://danmarkshistorien.lex.dk/Danmarks_Riges_Grundlov_af_5._juni_1953" }]
  },
  {
    id: "greenland1953", year: 1953, theme: "colonies", confidence: "contested",
    title: { en: "Greenland stops being a colony", da: "Grønland ophører med at være koloni" },
    summary: {
      en: "The 1953 constitution integrates Greenland into Denmark proper as a county with two Folketing seats. No referendum was held in Greenland about it.",
      da: "Grundloven af 1953 integrerer Grønland i Danmark som et amt med to folketingsmandater. Der blev ikke afholdt folkeafstemning i Grønland om det."
    },
    readings: [
      { side: { en: "Equality of status", da: "Ligestilling" }, text: { en: "Integration ended colonial status and gave Greenlanders Danish citizenship and parliamentary representation.", da: "Integrationen afsluttede kolonistatus og gav grønlændere dansk statsborgerskab og repræsentation i Folketinget." }, source: "danmarkshistorien.lex.dk, 'Grønlands historie'" },
      { side: { en: "Decided in Copenhagen", da: "Besluttet i København" }, text: { en: "Greenland was not asked. The modernisation that followed put infrastructure ahead of economic results, and relocation policy reshaped settlement without local consent.", da: "Grønland blev ikke spurgt. Den efterfølgende modernisering satte infrastruktur før økonomiske resultater, og flyttepolitikken omformede bosætningen uden lokalt samtykke." }, source: "danmarkshistorien.lex.dk, 'Grønlands historie'" }
    ],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Grønlands historie", url: "https://danmarkshistorien.lex.dk/Gr%C3%B8nlands_historie" }]
  },
  {
    id: "folkepension", year: 1956, theme: "welfare", confidence: "established",
    title: { en: "Folkepension: the first universal benefit", da: "Folkepensionen: den første universelle ydelse" },
    summary: {
      en: "Adopted October 1956 and in force April 1957, replacing the means-tested aldersrente. Pensions become a right of citizenship and age rather than a moral judgement on the poor — the founding move of the universalist welfare state.",
      da: "Vedtaget i oktober 1956 og i kraft april 1957 som afløser for den behovsbestemte aldersrente. Pension bliver en ret knyttet til statsborgerskab og alder frem for en moralsk vurdering af de fattige — den universelle velfærdsstats grundlæggende træk."
    },
    figures: [{ label: { en: "At introduction", da: "Ved indførelsen" }, value: { en: "Age 67 (62 for single women) · 684 kr/yr single, 1,020 kr couples", da: "Alder 67 (62 for enlige kvinder) · 684 kr./år for enlige, 1.020 kr. for par" }, source: "danmarkshistorien.lex.dk, 'Folkepension, 1956-'" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Folkepension, 1956-", url: "https://danmarkshistorien.lex.dk/Folkepension,_1956-" }]
  },
  {
    id: "kvinderarbejde", year: 1965, endYear: 1974, theme: "people", confidence: "established",
    title: { en: "Women enter the labour market", da: "Kvinderne ind på arbejdsmarkedet" },
    summary: {
      en: "The Commission on Women's Status documents rising participation, but married women lag: only about a third work outside the home and only a sixth full-time. Formal equal pay under ILO conventions is undercut by occupational segregation.",
      da: "Kvindekommissionen dokumenterer stigende erhvervsdeltagelse, men gifte kvinder halter bagefter: kun omkring en tredjedel arbejder uden for hjemmet og kun en sjettedel på fuld tid. Formel ligeløn efter ILO-konventionerne undermineres af kønsopdelingen på arbejdsmarkedet."
    },
    figures: [{ label: { en: "Representation gap", da: "Repræsentationskløft" }, value: { en: "Women c. 40% of the workforce but only 20–25% of union members", da: "Kvinder ca. 40% af arbejdsstyrken, men kun 20–25% af fagforeningsmedlemmerne" }, source: "danmarkshistorien.lex.dk, 'Kvinders stilling i erhvervslivet 1965-1974'" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Kvinders stilling i erhvervslivet 1965-1974", url: "https://danmarkshistorien.lex.dk/Kvinders_stilling_i_erhvervslivet_1965-1974" }]
  },
  {
    id: "christiania", year: 1971, theme: "culture", confidence: "established",
    title: { en: "Christiania", da: "Christiania" },
    summary: {
      en: "In September 1971 a mixed group of squatters, artists, homeless people and drug users move into the abandoned Bådsmandsstræde barracks on Christianshavn, proclaiming the Free Town on 26 September.",
      da: "I september 1971 flytter en blandet gruppe af husbesættere, kunstnere, hjemløse og stofbrugere ind i den forladte Bådsmandsstræde Kaserne på Christianshavn og udråber Fristaden den 26. september."
    },
    figures: [{ label: { en: "Growth", da: "Vækst" }, value: { en: "c. 150 initial residents → c. 900 by 2012 · c. 500,000 visitors/year", da: "ca. 150 første beboere → ca. 900 i 2012 · ca. 500.000 besøgende om året" }, source: "danmarkshistorien.lex.dk, 'Fristaden Christiania'" }],
    lat: 55.674, lon: 12.598, place: "København",
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Fristaden Christiania 1971-", url: "https://danmarkshistorien.lex.dk/Fristaden_Christiania_1971-" }]
  },
  {
    id: "eec1972", year: 1972, theme: "borders", confidence: "established",
    title: { en: "Denmark votes to join the EEC", da: "Danmark stemmer sig ind i EF" },
    summary: {
      en: "Denmark votes on 2 October 1972 and joins on 1 January 1973. Prime Minister Krag announces his resignation the day after the vote.",
      da: "Danmark stemmer den 2. oktober 1972 og træder ind 1. januar 1973. Statsminister Krag meddeler sin afgang dagen efter afstemningen."
    },
    figures: [{ label: { en: "Result", da: "Resultat" }, value: { en: "63.3% yes · turnout 89.6%", da: "63,3% ja · valgdeltagelse 89,6%" }, basis: { en: "Share of votes cast; the source's master table publishes share of the whole electorate (56.7% yes)", da: "Andel af afgivne stemmer; kildens hovedtabel opgør andel af vælgerkorpset (56,7% ja)" }, source: "danmarkshistorien.lex.dk, 'Folkeafstemninger siden 1916'" }],
    sources: [
      { label: "danmarkshistorien.lex.dk (Aarhus University) — Danmarks medlemskab af EF og EU, efter 1972", url: "https://danmarkshistorien.lex.dk/Danmarks_medlemskab_af_EF_og_EU,_efter_1972" },
      { label: "danmarkshistorien.lex.dk (Aarhus University) — Folkeafstemninger siden 1916", url: "https://danmarkshistorien.lex.dk/Folkeafstemninger_siden_1916" }
    ]
  },
  {
    id: "greenlandeec", year: 1972, theme: "colonies", confidence: "established",
    title: { en: "Greenland taken into the EEC against its vote", da: "Grønland ind i EF mod sin stemme" },
    summary: {
      en: "Greenland votes heavily against EEC membership in 1972 but is compelled to follow Denmark in. The grievance becomes a central engine of Greenlandic politics toward home rule — and Greenland leaves the EC again in 1985.",
      da: "Grønland stemmer massivt nej til EF i 1972, men tvinges med ind sammen med Danmark. Utilfredsheden bliver en central drivkraft i grønlandsk politik frem mod hjemmestyret — og Grønland forlader EF igen i 1985."
    },
    figures: [{ label: { en: "Greenlandic vote", da: "Grønlandsk afstemning" }, value: { en: "c. 70% no", da: "ca. 70% nej" }, source: "danmarkshistorien.lex.dk, 'Grønlands historie'" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Grønlands historie", url: "https://danmarkshistorien.lex.dk/Gr%C3%B8nlands_historie" }]
  },
  {
    id: "jordskred1973", year: 1973, theme: "power", confidence: "established",
    title: { en: "The landslide election", da: "Jordskredsvalget" },
    summary: {
      en: "The election of 4 December 1973 doubles the number of parties in parliament and ends the dominance of the four old parties. Mogens Glistrup's Progress Party enters as the second-largest party in the Folketing.",
      da: "Valget den 4. december 1973 fordobler antallet af partier i Folketinget og afslutter de fire gamle partiers dominans. Mogens Glistrups Fremskridtsparti kommer ind som Folketingets næststørste parti."
    },
    figures: [{ label: { en: "The shift", da: "Skredet" }, value: { en: "44% of voters switched party — the largest in Danish history · parties 5 → 10 · Social Democrats 70 → 46 seats", da: "44% af vælgerne skiftede parti — det største i danmarkshistorien · partier 5 → 10 · Socialdemokratiet 70 → 46 mandater" }, source: "danmarkshistorien.lex.dk, 'Jordskredsvalget i 1973'" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Jordskredsvalget i 1973", url: "https://danmarkshistorien.lex.dk/Jordskredsvalget_i_1973" }]
  },
  {
    id: "oliekriser", year: 1973, endYear: 1991, theme: "economy", confidence: "established",
    title: { en: "The oil crises", da: "Oliekriserne" },
    summary: {
      en: "The 1973 embargo quadruples prices and hits a country running almost entirely on oil, prompting rationing, car-free Sundays and speed limits. The long response — North Sea extraction, a gas grid, wind and efficiency — is why Denmark's energy profile looks as it does today.",
      da: "Embargoen i 1973 firdobler priserne og rammer et land, der næsten udelukkende kører på olie, med rationering, bilfrie søndage og fartgrænser til følge. Det lange svar — Nordsøudvinding, gasnet, vindkraft og energieffektivisering — er grunden til, at Danmarks energiprofil ser ud, som den gør."
    },
    figures: [
      { label: { en: "Oil dependence", da: "Olieafhængighed" }, value: { en: "90% of Danish energy consumption in 1973", da: "90% af det danske energiforbrug i 1973" }, source: "danmarkshistorien.lex.dk, 'Oliekriserne'" },
      { label: { en: "State debt", da: "Statsgæld" }, value: { en: "10% → 50% of GDP in four years", da: "10% → 50% af BNP på fire år" }, source: "danmarkshistorien.lex.dk, 'Oliekriserne'" }
    ],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Oliekriserne og deres betydning for dansk økonomi, 1973-1991", url: "https://danmarkshistorien.lex.dk/Oliekriserne_og_deres_betydning_for_dansk_%C3%B8konomi,_1973-1991" }]
  },
  {
    id: "hjemmestyre1979", year: 1979, theme: "colonies", confidence: "established",
    title: { en: "Greenlandic home rule", da: "Grønlandsk hjemmestyre" },
    summary: {
      en: "Home rule takes effect 1 May 1979 after an advisory referendum. Greenland ceases to be a Danish county and becomes a distinct community within the Danish realm.",
      da: "Hjemmestyret træder i kraft 1. maj 1979 efter en vejledende folkeafstemning. Grønland ophører med at være et dansk amt og bliver et særligt samfund i det danske rige."
    },
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Grønlands historie", url: "https://danmarkshistorien.lex.dk/Gr%C3%B8nlands_historie" }]
  },
  {
    id: "udlaending1983", year: 1983, theme: "migration", confidence: "established",
    title: { en: "The most liberal aliens act in Europe", da: "Europas mest liberale udlændingelov" },
    summary: {
      en: "The law of 8 June 1983 creates de facto refugee status beyond the Geneva Convention, a legal right to family reunification, the right to remain during processing, and a Refugee Board with appeal rights.",
      da: "Loven af 8. juni 1983 indfører de facto-flygtningestatus ud over Genèvekonventionen, en retlig ret til familiesammenføring, ret til ophold under sagsbehandling og et Flygtningenævn med klageadgang."
    },
    figures: [{ label: { en: "Folketing vote", da: "Folketingets afstemning" }, value: { en: "155 to 12 — only the Progress Party against", da: "155 mod 12 — kun Fremskridtspartiet imod" }, source: "danmarkshistorien.lex.dk, 'Udlændingelove 1983-2002'" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Udlændingelove 1983-2002", url: "https://danmarkshistorien.lex.dk/Udl%C3%A6ndingelove_1983-2002" }]
  },
  {
    id: "partnerskab1989", year: 1989, theme: "people", confidence: "established",
    title: { en: "Registered partnership — a world first", da: "Registreret partnerskab — først i verden" },
    summary: {
      en: "Passed in May 1989 and in force 1 October, giving same-sex couples most rights of marriage though not joint adoption. Axel and Eigil Axgil become the first same-sex couple in the world to register, at Copenhagen City Hall.",
      da: "Vedtaget i maj 1989 og i kraft 1. oktober, med de fleste ægteskabsrettigheder til par af samme køn, dog ikke fælles adoption. Axel og Eigil Axgil bliver verdens første registrerede par af samme køn, på Københavns Rådhus."
    },
    detail: {
      en: "The law was repealed in 2012 — not as a retreat, but because marriage itself was made gender-neutral and the separate institution was no longer needed.",
      da: "Loven blev ophævet i 2012 — ikke som et tilbageskridt, men fordi ægteskabet selv blev kønsneutralt, så den særskilte ordning ikke længere var nødvendig."
    },
    figures: [{ label: { en: "Folketing vote", da: "Folketingets afstemning" }, value: { en: "71 for, 47 against, 5 abstentions", da: "71 for, 47 imod, 5 hverken for eller imod" }, source: "danmarkshistorien.lex.dk, 'Indførelsen af registreret partnerskab, 1989'" }],
    lat: 55.676, lon: 12.571, place: "København",
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Indførelsen af registreret partnerskab, 1989", url: "https://danmarkshistorien.lex.dk/Indf%C3%B8relsen_af_registreret_partnerskab,_1989" }]
  },
  {
    id: "maastricht1992", year: 1992, theme: "borders", confidence: "established",
    title: { en: "The Maastricht no", da: "Nejet til Maastricht" },
    summary: {
      en: "On 2 June 1992 Danish voters reject the treaty, which cannot enter force without Danish ratification — a Europe-wide crisis produced by a margin of well under one percentage point.",
      da: "Den 2. juni 1992 forkaster de danske vælgere traktaten, som ikke kan træde i kraft uden dansk ratifikation — en europæisk krise skabt af en margin på et godt stykke under ét procentpoint."
    },
    figures: [{ label: { en: "Result", da: "Resultat" }, value: { en: "50.7% no · turnout 82.2%", da: "50,7% nej · valgdeltagelse 82,2%" }, basis: { en: "Share of votes cast", da: "Andel af afgivne stemmer" }, source: "danmarkshistorien.lex.dk, 'Danmark i EF 1973-1993'" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Danmark i EF 1973-1993", url: "https://danmarkshistorien.lex.dk/Danmark_i_EF_1973-1993" }]
  },
  {
    id: "edinburgh1992", year: 1992, theme: "borders", confidence: "established",
    title: { en: "The four opt-outs", da: "De fire forbehold" },
    summary: {
      en: "In December 1992 the other member states accept four Danish exemptions: the euro, union citizenship, defence, and justice and home affairs. They can only be removed by parliament plus a referendum — which is why they outlived every government that followed.",
      da: "I december 1992 accepterer de øvrige medlemslande fire danske undtagelser: euroen, unionsborgerskabet, forsvaret samt retlige og indre anliggender. De kan kun fjernes ved folketingsbeslutning og folkeafstemning — derfor overlevede de enhver efterfølgende regering."
    },
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Danmarks medlemskab af EF og EU, efter 1972", url: "https://danmarkshistorien.lex.dk/Danmarks_medlemskab_af_EF_og_EU,_efter_1972" }]
  },
  {
    id: "maastricht1993", year: 1993, theme: "borders", confidence: "established",
    title: { en: "The second vote, and Nørrebro", da: "Den anden afstemning, og Nørrebro" },
    summary: {
      en: "With the four reservations attached, Danes approve the treaty on 18 May 1993. The result triggers riots on Nørrebro in Copenhagen, where police fire on demonstrators.",
      da: "Med de fire forbehold vedhæftet godkender danskerne traktaten den 18. maj 1993. Resultatet udløser uroligheder på Nørrebro i København, hvor politiet skyder mod demonstranter."
    },
    figures: [{ label: { en: "Result", da: "Resultat" }, value: { en: "56.8% yes · turnout 85.6%", da: "56,8% ja · valgdeltagelse 85,6%" }, basis: { en: "Share of votes cast", da: "Andel af afgivne stemmer" }, source: "danmarkshistorien.lex.dk, 'Danmark i EF 1973-1993'" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Danmark i EF 1973-1993", url: "https://danmarkshistorien.lex.dk/Danmark_i_EF_1973-1993" }]
  },
  {
    id: "storebaelt", year: 1998, theme: "everyday", confidence: "established",
    title: { en: "The Great Belt Fixed Link", da: "Storebæltsforbindelsen" },
    summary: {
      en: "Denmark's most expensive infrastructure project joins Funen and Zealand. The journey falls from about 50 minutes by ferry to 8 minutes — the country becomes physically one landmass in a way it never was before.",
      da: "Danmarks dyreste anlægsprojekt forbinder Fyn og Sjælland. Rejsetiden falder fra omkring 50 minutter med færge til 8 minutter — landet bliver fysisk ét sammenhængende hele på en måde, det aldrig har været før."
    },
    figures: [{ label: { en: "Scale", da: "Omfang" }, value: { en: "18 km · 21.4bn kr (1988 prices) · rail 1 June 1997, road 14 June 1998", da: "18 km · 21,4 mia. kr. (1988-priser) · jernbane 1. juni 1997, vej 14. juni 1998" }, source: "danmarkshistorien.lex.dk, 'Storebæltsforbindelsen'" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Storebæltsforbindelsen", url: "https://danmarkshistorien.lex.dk/Storeb%C3%A6ltsforbindelsen" }]
  },
  {
    id: "euro2000", year: 2000, theme: "economy", confidence: "established",
    title: { en: "The euro rejected", da: "Nejet til euroen" },
    summary: {
      en: "On 28 September 2000 Danes reject adopting the euro and keep the krone. The source frames the result as a chasm between public opinion and the political elite on European cooperation.",
      da: "Den 28. september 2000 forkaster danskerne euroen og beholder kronen. Kilden beskriver resultatet som en kløft mellem befolkningen og den politiske elite i synet på det europæiske samarbejde."
    },
    figures: [{ label: { en: "Result", da: "Resultat" }, value: { en: "53.2% no / 46.8% yes · turnout 86.6%", da: "53,2% nej / 46,8% ja · valgdeltagelse 86,6%" }, basis: { en: "Share of votes cast", da: "Andel af afgivne stemmer" }, source: "danmarkshistorien.lex.dk, 'Danmark i EU 1993-2012'" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Danmark i EU 1993-2012", url: "https://danmarkshistorien.lex.dk/Danmark_i_EU_1993-2012" }]
  },
  {
    id: "oeresund2000", year: 2000, theme: "everyday", confidence: "established",
    title: { en: "The Øresund Link", da: "Øresundsforbindelsen" },
    summary: {
      en: "The combined road and rail bridge from Amager to Scania opens 1 July 2000, binding the Øresund region together — and physically reconnecting Copenhagen to the province Denmark lost in 1658.",
      da: "Den kombinerede vej- og jernbaneforbindelse fra Amager til Skåne åbner 1. juli 2000 og binder Øresundsregionen sammen — og forbinder fysisk København med den landsdel, Danmark mistede i 1658."
    },
    lat: 55.571, lon: 12.828, place: "Øresund",
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — De politiske aftaler om de faste forbindelser over Storebælt og Øresund, 1972-2000", url: "https://danmarkshistorien.lex.dk/De_politiske_aftaler_om_de_faste_forbindelser_over_Storeb%C3%A6lt_og_%C3%98resund,_1972-2000" }]
  },
  {
    id: "valg2001", year: 2001, theme: "power", confidence: "established",
    title: { en: "The election that turned immigration policy", da: "Valget der vendte udlændingepolitikken" },
    summary: {
      en: "On 20 November 2001 Venstre overtakes the Social Democrats for the first time since 1920, forming a VK government on Dansk Folkeparti support. Immigration dominated the campaign from both sides.",
      da: "Den 20. november 2001 overhaler Venstre Socialdemokratiet for første gang siden 1920 og danner VK-regering med Dansk Folkepartis støtte. Udlændingepolitikken dominerede valgkampen fra begge sider."
    },
    figures: [{ label: { en: "Result", da: "Resultat" }, value: { en: "V 31.25% / 56 seats · S 29.08% / 52 · DF 12.00% / 22", da: "V 31,25% / 56 mandater · S 29,08% / 52 · DF 12,00% / 22" }, source: "danmarkshistorien.lex.dk, 'Folketingsvalget 2001'" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Folketingsvalget 2001", url: "https://danmarkshistorien.lex.dk/Folketingsvalget_2001" }]
  },
  {
    id: "24aarsregel", year: 2002, theme: "migration", confidence: "established",
    title: { en: "The 24-year rule", da: "24-årsreglen" },
    summary: {
      en: "The law of 6 June 2002 abolishes de facto refugee status, requires both spouses to be 24 for family reunification, imposes a bank guarantee and housing requirements, and extends permanent residency eligibility from 3 to 7 years — a reversal of the 1983 act.",
      da: "Loven af 6. juni 2002 afskaffer de facto-flygtningestatus, kræver at begge ægtefæller er fyldt 24 år ved familiesammenføring, indfører bankgaranti og boligkrav og forlænger kravet til permanent opholdstilladelse fra 3 til 7 år — en omvending af 1983-loven."
    },
    figures: [{ label: { en: "Terms", da: "Vilkår" }, value: { en: "Passed 59 to 48 · DKK 50,000 bank guarantee · residency 3 → 7 years", da: "Vedtaget 59 mod 48 · 50.000 kr. i bankgaranti · opholdskrav 3 → 7 år" }, source: "danmarkshistorien.lex.dk, 'Udlændingelove 1983-2002'" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Udlændingelove 1983-2002", url: "https://danmarkshistorien.lex.dk/Udl%C3%A6ndingelove_1983-2002" }]
  },
  {
    id: "irak2003", year: 2003, endYear: 2007, theme: "war", confidence: "contested",
    title: { en: "Denmark in the Iraq War", da: "Danmark i Irakkrigen" },
    summary: {
      en: "A narrow Folketing majority approves participation on 21 March 2003 — the first time in modern history Denmark joins offensive warfare against a declared enemy rather than a peacekeeping mission. A commission of inquiry was established in 2012.",
      da: "Et snævert folketingsflertal godkender deltagelse den 21. marts 2003 — første gang i nyere tid at Danmark går ind i offensiv krig mod en erklæret fjende frem for en fredsbevarende mission. En undersøgelseskommission blev nedsat i 2012."
    },
    readings: [
      { side: { en: "A necessary break with passivity", da: "Et nødvendigt brud med passiviteten" }, text: { en: "Advocates framed activism as Denmark taking responsibility rather than sheltering behind others, continuous with the Balkan deployments of the 1990s.", da: "Fortalerne fremstillede aktivismen som, at Danmark tog ansvar i stedet for at gemme sig bag andre, i forlængelse af Balkan-indsatserne i 1990'erne." }, source: "danmarkshistorien.lex.dk, 'Danmark i krig 1991-2011'" },
      { side: { en: "War on a false premise", da: "Krig på et falsk grundlag" }, text: { en: "Participation rested on claims about weapons of mass destruction that were not borne out, and a commission of inquiry was established in April 2012 to examine the decision.", da: "Deltagelsen hvilede på påstande om masseødelæggelsesvåben, som ikke holdt, og en undersøgelseskommission blev nedsat i april 2012 for at undersøge beslutningen." }, source: "danmarkshistorien.lex.dk, 'Den danske deltagelse i Irak-krigen, 2003-2007'" }
    ],
    figures: [{ label: { en: "Danish forces", da: "Danske styrker" }, value: { en: "c. 380 authorised, peaking c. 545 · 8 killed, 19 wounded · withdrawal Aug 2007", da: "ca. 380 udsendte, på det højeste ca. 545 · 8 dræbt, 19 såret · tilbagetrækning aug. 2007" }, source: "danmarkshistorien.lex.dk" }],
    sources: [
      { label: "danmarkshistorien.lex.dk (Aarhus University) — Den danske deltagelse i Irak-krigen, 2003-2007", url: "https://danmarkshistorien.lex.dk/Den_danske_deltagelse_i_Irak-krigen,_2003-2007" },
      { label: "danmarkshistorien.lex.dk (Aarhus University) — Danmark i krig 1991-2011", url: "https://danmarkshistorien.lex.dk/Danmark_i_krig_1991-2011" }
    ]
  },
  {
    id: "karikatur2005", year: 2005, endYear: 2006, theme: "religion", confidence: "contested",
    title: { en: "The Muhammad cartoon crisis", da: "Muhammedkrisen" },
    summary: {
      en: "Jyllands-Posten publishes 12 caricatures on 30 September 2005. Embassies burn in Damascus and Beirut in February 2006 and Danish goods are boycotted. Denmark's foreign minister called it the largest foreign policy crisis since the Second World War.",
      da: "Jyllands-Posten offentliggør 12 karikaturer den 30. september 2005. Ambassader brænder i Damaskus og Beirut i februar 2006, og danske varer boykottes. Udenrigsministeren kaldte det den største udenrigspolitiske krise siden Anden Verdenskrig."
    },
    readings: [
      { side: { en: "A question of free expression", da: "Et spørgsmål om ytringsfrihed" }, text: { en: "The publication was defended as a test of whether religious sensibility could be allowed to impose self-censorship on a free press.", da: "Offentliggørelsen blev forsvaret som en prøve på, om religiøse følelser kunne påtvinge en fri presse selvcensur." }, source: "danmarkshistorien.lex.dk, 'Karikaturkrisen og globalisering'" },
      { side: { en: "A question of power", da: "Et spørgsmål om magt" }, text: { en: "The source notes Danish leaders overlooked the power imbalance between Muslim-majority and Western states, and that grievances over colonialism and Western military intervention compounded the reaction.", da: "Kilden bemærker, at danske ledere overså magtforskellen mellem muslimske og vestlige lande, og at vrede over kolonialisme og vestlig militær indgriben forstærkede reaktionen." }, source: "danmarkshistorien.lex.dk, 'Karikaturkrisen og globalisering'" }
    ],
    figures: [{ label: { en: "Toll", da: "Konsekvenser" }, value: { en: "12 cartoons · 200 killed in clashes in Nigeria, 24 Feb 2006", da: "12 tegninger · 200 dræbt i sammenstød i Nigeria, 24. feb. 2006" }, source: "danmarkshistorien.lex.dk" }],
    sources: [
      { label: "danmarkshistorien.lex.dk (Aarhus University) — Karikaturkrisens kronologi 2005-2006", url: "https://danmarkshistorien.lex.dk/Karikaturkrisens_kronologi_2005-2006" },
      { label: "danmarkshistorien.lex.dk (Aarhus University) — Karikaturkrisen og globalisering", url: "https://danmarkshistorien.lex.dk/Karikaturkrisen_og_globalisering" }
    ]
  },
  {
    id: "selvstyre2009", year: 2009, theme: "colonies", confidence: "established",
    title: { en: "Greenlandic self-government", da: "Grønlandsk selvstyre" },
    summary: {
      en: "Approved in a November 2008 referendum and in force 21 June 2009, recognising Greenlanders as a people under international law with a right to independence, and transferring ownership of subsurface resources to the Self-Government.",
      da: "Godkendt ved folkeafstemning i november 2008 og i kraft 21. juni 2009. Grønlænderne anerkendes som et folk efter folkeretten med ret til selvstændighed, og ejendomsretten til undergrunden overgår til Selvstyret."
    },
    figures: [{ label: { en: "Referendum", da: "Folkeafstemning" }, value: { en: "c. 76% yes", da: "ca. 76% ja" }, source: "danmarkshistorien.lex.dk, 'Grønlands historie'" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Grønlands historie", url: "https://danmarkshistorien.lex.dk/Gr%C3%B8nlands_historie" }]
  },
  {
    id: "covid2020", year: 2020, endYear: 2022, theme: "everyday", confidence: "contested",
    title: { en: "Covid-19 and the mink cull", da: "Covid-19 og minkskandalen" },
    summary: {
      en: "Denmark locks down in March 2020 and is the first European country to lift all restrictions, on 1 February 2022. The decision to cull every Danish mink was taken without legal basis, and the Mink Commission reported severe criticism in June 2022.",
      da: "Danmark lukker ned i marts 2020 og bliver det første europæiske land, der ophæver alle restriktioner, den 1. februar 2022. Beslutningen om at aflive alle danske mink blev truffet uden lovhjemmel, og Minkkommissionen afgav skarp kritik i juni 2022."
    },
    readings: [
      { side: { en: "Decisive crisis management", da: "Handlekraftig krisestyring" }, text: { en: "Early lockdown and high vaccine uptake kept mortality comparatively low, and Denmark reopened before its neighbours.", da: "Tidlig nedlukning og høj vaccinetilslutning holdt dødeligheden forholdsvis lav, og Danmark genåbnede før nabolandene." }, source: "danmarkshistorien.lex.dk, 'Covid-19-epidemien i Danmark, 2020-2022'" },
      { side: { en: "Government without legal basis", da: "Magtudøvelse uden hjemmel" }, text: { en: "The order to cull all 15 million mink had no legal basis, and the Mink Commission's report of 30 June 2022 delivered severe criticism of the government.", da: "Ordren om at aflive alle 15 millioner mink savnede lovhjemmel, og Minkkommissionens beretning af 30. juni 2022 rettede skarp kritik mod regeringen." }, source: "danmarkshistorien.lex.dk, 'Covid-19-epidemien i Danmark, 2020-2022'" }
    ],
    figures: [{ label: { en: "Toll", da: "Omfang" }, value: { en: "c. 8,000 deaths · 15 million mink culled after c. 4,000 caught mink variants", da: "ca. 8.000 dødsfald · 15 millioner mink aflivet, efter at ca. 4.000 blev smittet med minkvarianter" }, source: "danmarkshistorien.lex.dk" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Covid-19-epidemien i Danmark, 2020-2022", url: "https://danmarkshistorien.lex.dk/Covid-19-epidemien_i_Danmark,_2020-2022" }]
  },
  {
    id: "forsvar2022", year: 2022, theme: "war", confidence: "established",
    title: { en: "The defence opt-out abolished", da: "Forsvarsforbeholdet afskaffes" },
    summary: {
      en: "Held on 1 June 2022 after Russia's invasion of Ukraine, this is the only one of the four Edinburgh opt-outs Danes have ever voted to remove — thirty years after they were granted.",
      da: "Afholdt den 1. juni 2022 efter Ruslands invasion af Ukraine. Det er det eneste af de fire Edinburgh-forbehold, danskerne nogensinde har stemt for at fjerne — tredive år efter de blev givet."
    },
    figures: [{ label: { en: "Result", da: "Resultat" }, value: { en: "66.9% yes / 33.1% no · turnout 65.77% of 4,260,944 eligible", da: "66,9% ja / 33,1% nej · valgdeltagelse 65,77% af 4.260.944 stemmeberettigede" }, basis: { en: "Turnout per Danmarks Statistik, the official calculating authority; the encyclopaedia gives 64.9%", da: "Stemmeprocent efter Danmarks Statistik, den officielle opgørende myndighed; opslagsværket angiver 64,9%" }, source: "Danmarks Statistik, folkeafstemninger; danmarkshistorien.lex.dk" }],
    sources: [
      { label: "danmarkshistorien.lex.dk (Aarhus University) — Folkeafstemninger siden 1916", url: "https://danmarkshistorien.lex.dk/Folkeafstemninger_siden_1916" },
      { label: "Danmarks Statistik — Folkeafstemninger", url: "https://www.dst.dk/da/Statistik/emner/borgere/demokrati/folkeafstemninger" }
    ]
  },

  // ---- Added 2026-07-20: coverage gaps in the people, belief and culture
  // columns, plus staples of the indfødsretsprøve (citizenship test). Every
  // source below was retrieved and read, not inferred from a search result.
  {
    id: "udvandring", year: 1868, endYear: 1930, theme: "migration", confidence: "established",
    title: { en: "The emigration to America", da: "Udvandringen til Amerika" },
    summary: {
      en: "Nearly 336,000 Danes left for the USA between 1820 and 1930 — most of them young, most of them men. By 1930 the Danish-American population equalled 15% of Denmark's own.",
      da: "Knap 336.000 danskere rejste til USA mellem 1820 og 1930 — de fleste unge, de fleste mænd. I 1930 svarede antallet af dansk-amerikanere til 15% af Danmarks egen befolkning."
    },
    detail: {
      en: "Between 1868 and 1900 more than four in ten Danish migrants were agricultural labourers, a quarter belonged to the urban working class, and nearly one in five was a craftsman. Three out of four were under 30.",
      da: "Mellem 1868 og 1900 var mere end fire ud af ti danske migranter landarbejdere, en fjerdedel tilhørte arbejderstanden i byerne, og næsten hver femte var håndværker. Tre ud af fire var under 30 år."
    },
    figures: [
      { label: { en: "Total emigration", da: "Samlet udvandring" }, value: { en: "c. 336,000 Danes, 1820–1930", da: "ca. 336.000 danskere, 1820–1930" }, source: "danmarkshistorien.lex.dk, 'Dansk udvandring til USA, 1820-1930'" },
      { label: { en: "Danish-Americans", da: "Dansk-amerikanere" }, value: { en: "529,000 in 1930 ≈ 15% of Denmark's population", da: "529.000 i 1930 ≈ 15% af Danmarks befolkning" }, basis: { en: "Danish-born plus their American-born children", da: "Danskfødte plus deres amerikanskfødte børn" }, source: "danmarkshistorien.lex.dk, 'Dansk udvandring til USA, 1820-1930'" },
      { label: { en: "Women's share", da: "Kvinders andel" }, value: { en: "c. one third", da: "ca. en tredjedel" }, source: "danmarkshistorien.lex.dk, 'Dansk udvandring til USA, 1820-1930'" }
    ],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Dansk udvandring til USA, 1820-1930", url: "https://danmarkshistorien.lex.dk/Dansk_udvandring_til_USA,_1820-1930" }]
  },
  {
    id: "kvindesamfund", year: 1871, theme: "people", confidence: "established",
    title: { en: "Dansk Kvindesamfund founded", da: "Dansk Kvindesamfund stiftes" },
    summary: {
      en: "Founded in 1871 by Matilde and Fredrik Bajer, it is Denmark's oldest women's organisation. Its stated aim was to make woman 'a more independent member of Family and State', above all by opening access to self-support.",
      da: "Stiftet i 1871 af Matilde og Fredrik Bajer og Danmarks ældste kvindeorganisation. Formålet var at gøre kvinden til 'et selvstændigere Medlem af Familie og Stat', først og fremmest ved at åbne adgang til selvforsørgelse."
    },
    detail: {
      en: "It opened a trade school for women in 1872, a Sunday school for working and serving women in 1874, and a drawing school in 1895 — today the Danish design school.",
      da: "Foreningen åbnede Handelsskolen for Kvinder i 1872, søndagsskolen for arbejder- og tjenestekvinder i 1874 og Tegneskolen for Kvinder i 1895 — i dag Danmarks Designskole."
    },
    figures: [{ label: { en: "Journal", da: "Tidsskrift" }, value: { en: "'Kvinden & Samfundet', published from 1885", da: "'Kvinden & Samfundet', udgivet fra 1885" }, source: "danmarkshistorien.lex.dk, 'Dansk Kvindesamfund 1871-'" }],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Dansk Kvindesamfund 1871-", url: "https://danmarkshistorien.lex.dk/Dansk_Kvindesamfund_1871-" }]
  },
  {
    id: "brandes1871", year: 1871, theme: "culture", confidence: "established",
    title: { en: "The Modern Breakthrough begins", da: "Det moderne gennembrud begynder" },
    summary: {
      en: "On 3 November 1871 Georg Brandes opened his lecture series at Copenhagen University by attacking Danish literature as stagnant and disconnected from its own society. Literature, he argued, is alive only when it puts problems up for debate.",
      da: "Den 3. november 1871 indledte Georg Brandes sin forelæsningsrække på Københavns Universitet med et angreb på dansk litteratur som stillestående og uden forbindelse til sit eget samfund. Litteratur lever kun, hævdede han, når den sætter problemer under debat."
    },
    detail: {
      en: "The lecture was deeply unpopular with the Copenhagen bourgeoisie whose cultural formation it attacked, and it effectively cost Brandes an academic appointment. He coined the term 'the Modern Breakthrough' himself in 1883.",
      da: "Forelæsningen var dybt upopulær hos det københavnske borgerskab, hvis dannelse den angreb, og den kostede reelt Brandes et professorat. Udtrykket 'det moderne gennembrud' opfandt han selv i 1883."
    },
    figures: [{ label: { en: "Opening lecture", da: "Åbningsforelæsning" }, value: { en: "3 November 1871, Copenhagen University", da: "3. november 1871, Københavns Universitet" }, source: "danmarkshistorien.lex.dk, 'Georg Brandes om hovedstrømninger i 1800-tallets litteratur, 1871'" }],
    lat: 55.680, lon: 12.573, place: "København",
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Georg Brandes om hovedstrømninger i 1800-tallets litteratur, 1871", url: "https://danmarkshistorien.lex.dk/Georg_Brandes_om_hovedstr%C3%B8mninger_i_1800-tallets_litteratur,_1871" }]
  },
  {
    id: "befolkning1901", year: 1901, theme: "people", confidence: "established",
    title: { en: "A population that tripled", da: "En befolkning der tredobledes" },
    summary: {
      en: "Denmark counted about 798,000 people at the first census in 1769 and roughly 2,450,000 by 1901 — despite losing a third of its territory in 1864 and sending hundreds of thousands abroad.",
      da: "Danmark talte omkring 798.000 mennesker ved den første folketælling i 1769 og cirka 2.450.000 i 1901 — på trods af tabet af en tredjedel af territoriet i 1864 og udvandringen af hundredtusinder."
    },
    figures: [
      { label: { en: "Population", da: "Folketal" }, value: { en: "798,000 (1769) → 929,000 (1801) → 2,450,000 (1901)", da: "798.000 (1769) → 929.000 (1801) → 2.450.000 (1901)" },
        basis: { en: "Figures up to 1921 count the territory Denmark held after the Peace of Vienna 1864; from 1921 they include reunified South Jutland. The series is NOT one continuous territory.", da: "Tal frem til 1921 gælder det område, Danmark havde efter Freden i Wien 1864; fra 1921 indgår det genforenede Sønderjylland. Rækken dækker IKKE ét og samme område." },
        source: "danmarkshistorien.lex.dk, 'Danmarks befolkningsudvikling 1769-2021'" },
      { label: { en: "Today", da: "I dag" }, value: { en: "5,840,045 (2021)", da: "5.840.045 (2021)" }, source: "danmarkshistorien.lex.dk, 'Danmarks befolkningsudvikling 1769-2021'" }
    ],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — Danmarks befolkningsudvikling 1769-2021", url: "https://danmarkshistorien.lex.dk/Danmarks_befolkningsudvikling_1769-2021" }]
  },
  {
    id: "valgret1915", year: 1915, theme: "power", confidence: "established",
    title: { en: "Women and servants get the vote", da: "Kvinder og tyende får valgret" },
    summary: {
      en: "The constitution of 5 June 1915 extended the vote to women and servants and abolished the Landsting's privileged franchise. Before it, roughly 15% of the population could vote.",
      da: "Grundloven af 5. juni 1915 gav valgret til kvinder og tyende og afskaffede den privilegerede valgret til Landstinget. Før den kunne omkring 15% af befolkningen stemme."
    },
    detail: {
      en: "Those previously shut out were known as 'de syv F'er' — Fruentimmere, Folkehold, Fattiglemmer, Fjolser, Forbrydere, Fallenter og Fremmede (women, servants, paupers, fools, criminals, bankrupts and foreigners). Recipients of poor relief stayed excluded. On the day itself women marched to Amalienborg with an address that pointedly omitted the word 'thanks': the vote was a right, not a gift.",
      da: "De hidtil udelukkede blev kaldt 'de syv F'er' — fruentimmere, folkehold, fattiglemmer, fjolser, forbrydere, fallenter og fremmede. Modtagere af fattighjælp forblev udelukket. På selve dagen gik kvinderne i optog til Amalienborg med en adresse, der bevidst undlod ordet 'tak': valgretten var en ret, ikke en gave."
    },
    figures: [
      { label: { en: "Before 1915", da: "Før 1915" }, value: { en: "c. 15% of the population — men over 30 with income or property", da: "ca. 15% af befolkningen — mænd over 30 med indkomst eller ejendom" }, source: "danmarkshistorien.lex.dk, '1915-Grundloven'" },
      { label: { en: "The procession", da: "Optoget" }, value: { en: "12,000–20,000 women, 5 June 1915 (contemporary estimates vary)", da: "12.000–20.000 kvinder, 5. juni 1915 (samtidige skøn varierer)" }, source: "danmarkshistorien.lex.dk, 'Kampen for kvinders valgret, 1871-1915'" }
    ],
    lat: 55.684, lon: 12.593, place: "København",
    sources: [
      { label: "danmarkshistorien.lex.dk (Aarhus University) — 1915-Grundloven", url: "https://danmarkshistorien.lex.dk/1915-Grundloven" },
      { label: "danmarkshistorien.lex.dk (Aarhus University) — Kampen for kvinders valgret, 1871-1915", url: "https://danmarkshistorien.lex.dk/Kampen_for_kvinders_valgret,_1871-1915" }
    ]
  },
  {
    id: "bohr1922", year: 1922, theme: "science", confidence: "established",
    title: { en: "Niels Bohr's Nobel Prize", da: "Niels Bohrs nobelpris" },
    summary: {
      en: "Bohr (1885–1962) received the 1922 Nobel Prize in Physics for his work on the structure of atoms and the radiation emitted from them. His institute on Blegdamsvej had opened the year before.",
      da: "Bohr (1885-1962) modtog nobelprisen i fysik i 1922 for sit arbejde med atomernes struktur og den stråling, der udgår fra dem. Hans institut på Blegdamsvej var indviet året før."
    },
    detail: {
      en: "Warned in late September 1943 that he was to be arrested and taken to Germany, Bohr fled to Sweden, and from there to England and the United States.",
      da: "Advaret i slutningen af september 1943 om at han ville blive anholdt og ført til Tyskland, flygtede Bohr til Sverige og derfra videre til England og USA."
    },
    figures: [
      { label: { en: "Nobel Prize", da: "Nobelprisen" }, value: { en: "Physics, 1922", da: "Fysik, 1922" }, source: "biografiskleksikon.lex.dk, 'Niels Bohr'" },
      { label: { en: "The institute", da: "Instituttet" }, value: { en: "Opened March 1921, Blegdamsvej, Copenhagen", da: "Indviet marts 1921, Blegdamsvej, København" }, source: "biografiskleksikon.lex.dk, 'Niels Bohr'" }
    ],
    lat: 55.697, lon: 12.571, place: "København",
    sources: [{ label: "Dansk Biografisk Leksikon (lex.dk) — Niels Bohr", url: "https://biografiskleksikon.lex.dk/Niels_Bohr" }]
  },
  {
    id: "em1992", year: 1992, theme: "everyday", confidence: "established",
    title: { en: "European champions by accident", da: "Europamestre ved et tilfælde" },
    summary: {
      en: "Denmark had not qualified for the 1992 European Championship. Yugoslavia was excluded because of its civil war and Denmark was called up ten days before the tournament — then beat Germany 2–0 in the final.",
      da: "Danmark havde ikke kvalificeret sig til EM i 1992. Jugoslavien blev udelukket på grund af borgerkrigen, og Danmark blev kaldt ind ti dage før turneringen — og slog så Tyskland 2-0 i finalen."
    },
    figures: [
      { label: { en: "The final", da: "Finalen" }, value: { en: "Denmark 2–0 Germany, 26 June 1992, Ullevi · Jensen and Vilfort scored", da: "Danmark 2-0 Tyskland, 26. juni 1992, Ullevi · Jensen og Vilfort scorede" }, source: "danmarkshistorien.lex.dk, 'EM-finalen i fodbold 26. juni 1992'" },
      { label: { en: "Notice given", da: "Varsel" }, value: { en: "10 days before the tournament", da: "10 dage før turneringen" }, source: "danmarkshistorien.lex.dk, 'EM-finalen i fodbold 26. juni 1992'" }
    ],
    sources: [{ label: "danmarkshistorien.lex.dk (Aarhus University) — EM-finalen i fodbold 26. juni 1992", url: "https://danmarkshistorien.lex.dk/EM-finalen_i_fodbold_26._juni_1992" }]
  }
];

export const modernLinks = [
  { from: "march1848", to: "grundlov1849", relation: { en: "produced", da: "førte til" } },
  { from: "grundlov1849", to: "valgret1915", relation: { en: "extended by", da: "udvidet ved" } },
  { from: "kvindesamfund", to: "valgret1915", relation: { en: "campaigned for", da: "kæmpede for" } },
  { from: "udvandring", to: "befolkning1901", relation: { en: "drew from", da: "trak fra" } },
  { from: "jodiskfrihedsbrev", to: "grundlov1849", relation: { en: "completed by", da: "fuldendt ved" } },
  { from: "brandes1871", to: "kvindesamfund", relation: { en: "contemporary with", da: "samtidig med" } },
  { from: "christian1", to: "dybbol1864", relation: { en: "set up", da: "lagde grunden til" } },
  { from: "dybbol1864", to: "vienna1864", relation: { en: "settled by", da: "afgjort ved" } },
  { from: "vienna1864", to: "hedeopdyrkning", relation: { en: "answered by", da: "besvaret med" } },
  { from: "vienna1864", to: "genforening1920", relation: { en: "partly reversed by", da: "delvist omgjort ved" } },
  { from: "genforening1920", to: "paaskekrisen", relation: { en: "triggered", da: "udløste" } },
  { from: "andelsmejeri", to: "andelsslagteri", relation: { en: "enabled", da: "muliggjorde" } },
  { from: "kanslergade", to: "socialreform1933", relation: { en: "included", da: "omfattede" } },
  { from: "socialreform1933", to: "folkepension", relation: { en: "extended by", da: "udbygget ved" } },
  { from: "occupation1940", to: "samarbejde", relation: { en: "produced", da: "førte til" } },
  { from: "samarbejde", to: "august1943", relation: { en: "ended by", da: "afsluttet ved" } },
  { from: "august1943", to: "joedeaktion", relation: { en: "preceded", da: "gik forud for" } },
  { from: "liberation1945", to: "retsopgoer", relation: { en: "followed by", da: "efterfulgt af" } },
  { from: "occupation1940", to: "nato1949", relation: { en: "led to", da: "førte til" } },
  { from: "grundlov1953", to: "greenland1953", relation: { en: "enacted", da: "gennemførte" } },
  { from: "eec1972", to: "greenlandeec", relation: { en: "forced", da: "tvang" } },
  { from: "greenlandeec", to: "hjemmestyre1979", relation: { en: "drove", da: "drev" } },
  { from: "hjemmestyre1979", to: "selvstyre2009", relation: { en: "extended by", da: "udvidet ved" } },
  { from: "maastricht1992", to: "edinburgh1992", relation: { en: "answered by", da: "besvaret med" } },
  { from: "edinburgh1992", to: "maastricht1993", relation: { en: "enabled", da: "muliggjorde" } },
  { from: "edinburgh1992", to: "euro2000", relation: { en: "tested at", da: "prøvet ved" } },
  { from: "edinburgh1992", to: "forsvar2022", relation: { en: "partly undone by", da: "delvist ophævet ved" } },
  { from: "udlaending1983", to: "valg2001", relation: { en: "contested at", da: "til debat ved" } },
  { from: "valg2001", to: "24aarsregel", relation: { en: "produced", da: "førte til" } },
  { from: "roskilde1658", to: "oeresund2000", relation: { en: "reconnected by", da: "genforbundet ved" } }
];
