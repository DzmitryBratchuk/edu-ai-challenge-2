const EMPLOYEES = [
  // ── Savanna Division ──────────────────────────────────────────────────────
  {
    id: 1, name: "Leo Panthera", title: "Senior Apex Predator",
    department: "Savanna Division", avatar: "🦁",
    activities: [
      { id: 1,  name: "[LAB] Savanna Summit Keynote",       category: "Public Speaking",       date: "2025-02-10", points: 96 },
      { id: 2,  name: "[EDU] Mentoring Young Cubs",         category: "Education",             date: "2025-03-15", points: 64 },
      { id: 3,  name: "[UNI] Academic Partnership Forum",   category: "University Partnership", date: "2024-11-05", points: 48 },
      { id: 4,  name: "[EDU] Pride Leadership Workshop",    category: "Education",             date: "2024-07-20", points: 32 },
      { id: 5,  name: "[LAB] Wildlife Conference Talk",     category: "Public Speaking",       date: "2023-09-12", points: 16 },
    ]
  },
  {
    id: 2, name: "Zara Zebra", title: "Stripe Analytics Lead",
    department: "Savanna Division", avatar: "🦓",
    activities: [
      { id: 6,  name: "[EDU] Stripe Pattern Analysis",      category: "Education",             date: "2025-04-08", points: 64 },
      { id: 7,  name: "[LAB] Herd Data Podcast",            category: "Public Speaking",       date: "2025-01-19", points: 48 },
      { id: 8,  name: "[UNI] Campus Biodiversity Talk",     category: "University Partnership", date: "2024-08-14", points: 32 },
      { id: 9,  name: "[EDU] Predator Avoidance 101",       category: "Education",             date: "2024-03-22", points: 16 },
      { id: 10, name: "[LAB] Grassland Symposium",          category: "Public Speaking",       date: "2023-06-30", points: 16 },
    ]
  },
  {
    id: 3, name: "Ella Elephant", title: "Chief Memory Officer",
    department: "Savanna Division", avatar: "🐘",
    activities: [
      { id: 11, name: "[EDU] Long-Term Memory Workshop",    category: "Education",             date: "2025-05-22", points: 80 },
      { id: 12, name: "[LAB] Elephant Walk Conference",     category: "Public Speaking",       date: "2025-02-17", points: 64 },
      { id: 13, name: "[UNI] Cognitive Science Seminar",    category: "University Partnership", date: "2024-10-09", points: 48 },
      { id: 14, name: "[EDU] Herd Navigation Masterclass",  category: "Education",             date: "2024-04-03", points: 32 },
      { id: 15, name: "[LAB] Savanna Water Summit",         category: "Public Speaking",       date: "2024-01-28", points: 32 },
      { id: 16, name: "[EDU] Calf Mentorship Program",      category: "Education",             date: "2023-11-15", points: 16 },
    ]
  },
  {
    id: 4, name: "Gigi Giraffe", title: "Head of Tall Data",
    department: "Savanna Division", avatar: "🦒",
    activities: [
      { id: 17, name: "[EDU] Treetop Data Access",          category: "Education",             date: "2025-08-11", points: 64 },
      { id: 18, name: "[LAB] Height Advantage Workshop",    category: "Public Speaking",       date: "2024-05-20", points: 48 },
      { id: 19, name: "[UNI] Savanna Ecology Lecture",      category: "University Partnership", date: "2023-10-07", points: 32 },
      { id: 20, name: "[EDU] Long-Neck Leadership",         category: "Education",             date: "2023-02-14", points: 16 },
    ]
  },
  {
    id: 5, name: "Henry Hippo", title: "Infrastructure Warden",
    department: "Savanna Division", avatar: "🦛",
    activities: [
      { id: 21, name: "[LAB] Waterhole Tech Talk",          category: "Public Speaking",       date: "2025-07-03", points: 64 },
      { id: 22, name: "[EDU] River Safety Workshop",        category: "Education",             date: "2024-12-19", points: 32 },
      { id: 23, name: "[UNI] Infrastructure Expo",          category: "University Partnership", date: "2024-06-08", points: 16 },
      { id: 24, name: "[LAB] Mud Architecture Panel",       category: "Public Speaking",       date: "2023-04-25", points: 16 },
    ]
  },

  // ── Arctic Team ───────────────────────────────────────────────────────────
  {
    id: 6, name: "Polly Penguin", title: "Ice Flow Engineer",
    department: "Arctic Team", avatar: "🐧",
    activities: [
      { id: 25, name: "[EDU] Ice Sheet Dynamics",           category: "Education",             date: "2025-01-14", points: 64 },
      { id: 26, name: "[LAB] Antarctic Tech Summit",        category: "Public Speaking",       date: "2025-03-08", points: 48 },
      { id: 27, name: "[UNI] Polar Science Seminar",        category: "University Partnership", date: "2024-09-22", points: 32 },
      { id: 28, name: "[EDU] Waddle Leadership Series",     category: "Education",             date: "2024-06-17", points: 16 },
      { id: 29, name: "[LAB] Sub-Zero Ops Podcast",         category: "Public Speaking",       date: "2023-11-30", points: 16 },
    ]
  },
  {
    id: 7, name: "Bella Bear", title: "Permafrost Architect",
    department: "Arctic Team", avatar: "🐻",
    activities: [
      { id: 30, name: "[EDU] Hibernation Productivity",     category: "Education",             date: "2025-02-28", points: 80 },
      { id: 31, name: "[LAB] Arctic Innovation Forum",      category: "Public Speaking",       date: "2025-01-10", points: 64 },
      { id: 32, name: "[UNI] Glacier Research Partnership", category: "University Partnership", date: "2024-11-18", points: 48 },
      { id: 33, name: "[EDU] Foraging Optimisation",        category: "Education",             date: "2024-08-05", points: 32 },
      { id: 34, name: "[LAB] Snowfield Strategy Session",   category: "Public Speaking",       date: "2024-03-12", points: 16 },
      { id: 35, name: "[UNI] Wildlife Studies Partnership", category: "University Partnership", date: "2023-07-24", points: 16 },
      { id: 36, name: "[EDU] Den Design Workshop",          category: "Education",             date: "2023-01-09", points: 16 },
    ]
  },
  {
    id: 8, name: "Wally Walrus", title: "Senior Tusk Analyst",
    department: "Arctic Team", avatar: "🦭",
    activities: [
      { id: 37, name: "[LAB] Tusk Tech Conference",         category: "Public Speaking",       date: "2025-06-04", points: 64 },
      { id: 38, name: "[EDU] Arctic Survival Masterclass",  category: "Education",             date: "2024-10-16", points: 32 },
      { id: 39, name: "[UNI] Marine Biology Seminar",       category: "University Partnership", date: "2024-02-21", points: 16 },
      { id: 40, name: "[LAB] Ice Floe Keynote",             category: "Public Speaking",       date: "2023-08-13", points: 16 },
    ]
  },
  {
    id: 9, name: "Felix Fox", title: "Arctic Data Scout",
    department: "Arctic Team", avatar: "🦊",
    activities: [
      { id: 41, name: "[EDU] Tracking Algorithms 101",      category: "Education",             date: "2025-09-09", points: 64 },
      { id: 42, name: "[LAB] Tundra Data Expo",             category: "Public Speaking",       date: "2025-04-25", points: 48 },
      { id: 43, name: "[UNI] Ecosystems Research Talk",     category: "University Partnership", date: "2024-12-03", points: 32 },
      { id: 44, name: "[EDU] Night Vision Analytics",       category: "Education",             date: "2024-07-11", points: 16 },
      { id: 45, name: "[LAB] Arctic Cunning Workshop",      category: "Public Speaking",       date: "2023-05-18", points: 16 },
    ]
  },
  {
    id: 10, name: "Owen Orca", title: "Deep Ocean Strategist",
    department: "Arctic Team", avatar: "🐋",
    activities: [
      { id: 46, name: "[LAB] Pod Communication Summit",     category: "Public Speaking",       date: "2025-08-20", points: 64 },
      { id: 47, name: "[EDU] Echolocation Engineering",     category: "Education",             date: "2024-05-14", points: 48 },
      { id: 48, name: "[UNI] Marine Mammal Research",       category: "University Partnership", date: "2023-12-07", points: 32 },
    ]
  },

  // ── Forest Guild ──────────────────────────────────────────────────────────
  {
    id: 11, name: "Ollie Owl", title: "Wisdom Systems Lead",
    department: "Forest Guild", avatar: "🦉",
    activities: [
      { id: 49, name: "[EDU] Nocturnal Leadership Series",  category: "Education",             date: "2025-10-15", points: 80 },
      { id: 50, name: "[LAB] Woodland Wisdom Conference",   category: "Public Speaking",       date: "2025-06-28", points: 64 },
      { id: 51, name: "[UNI] Forest Ecology Partnership",   category: "University Partnership", date: "2025-02-12", points: 48 },
      { id: 52, name: "[EDU] Head Rotation Analytics",      category: "Education",             date: "2024-09-30", points: 32 },
      { id: 53, name: "[LAB] Dusk Data Podcast",            category: "Public Speaking",       date: "2024-04-16", points: 16 },
      { id: 54, name: "[EDU] Silent Flight Workshop",       category: "Education",             date: "2023-11-05", points: 16 },
    ]
  },
  {
    id: 12, name: "Barry Badger", title: "Tunnel Operations Manager",
    department: "Forest Guild", avatar: "🦡",
    activities: [
      { id: 55, name: "[LAB] Underground Infrastructure Talk", category: "Public Speaking",    date: "2025-03-22", points: 64 },
      { id: 56, name: "[EDU] Sett Architecture Workshop",   category: "Education",             date: "2024-11-27", points: 32 },
      { id: 57, name: "[UNI] Burrowing Science Seminar",    category: "University Partnership", date: "2024-06-03", points: 16 },
      { id: 58, name: "[EDU] Nocturnal Ops Masterclass",    category: "Education",             date: "2023-08-19", points: 16 },
    ]
  },
  {
    id: 13, name: "Wendy Wolf", title: "Pack Coordination Lead",
    department: "Forest Guild", avatar: "🐺",
    activities: [
      { id: 59, name: "[EDU] Pack Dynamics Workshop",       category: "Education",             date: "2025-07-19", points: 80 },
      { id: 60, name: "[LAB] Howl Tech Keynote",            category: "Public Speaking",       date: "2025-04-03", points: 64 },
      { id: 61, name: "[UNI] Territory Research Seminar",   category: "University Partnership", date: "2024-12-14", points: 48 },
      { id: 62, name: "[EDU] Leadership in the Wild",       category: "Education",             date: "2024-08-21", points: 32 },
      { id: 63, name: "[LAB] Forest Strategy Summit",       category: "Public Speaking",       date: "2024-02-09", points: 32 },
      { id: 64, name: "[UNI] Apex Ecology Partnership",     category: "University Partnership", date: "2023-06-17", points: 16 },
    ]
  },
  {
    id: 14, name: "Dave Deer", title: "Woodland UX Designer",
    department: "Forest Guild", avatar: "🦌",
    activities: [
      { id: 65, name: "[LAB] Antler Design Panel",          category: "Public Speaking",       date: "2025-11-04", points: 64 },
      { id: 66, name: "[EDU] Woodland Wayfinding",          category: "Education",             date: "2025-08-17", points: 48 },
      { id: 67, name: "[UNI] Forest Sciences Partnership",  category: "University Partnership", date: "2024-10-28", points: 32 },
      { id: 68, name: "[EDU] Grazing Optimisation 101",     category: "Education",             date: "2024-05-09", points: 16 },
      { id: 69, name: "[LAB] Dappled Light Conference",     category: "Public Speaking",       date: "2023-03-23", points: 16 },
    ]
  },
  {
    id: 15, name: "Rex Raccoon", title: "Night Shift Engineer",
    department: "Forest Guild", avatar: "🦝",
    activities: [
      { id: 70, name: "[EDU] Dumpster Data Analytics",      category: "Education",             date: "2025-09-30", points: 64 },
      { id: 71, name: "[LAB] Urban Survival Talk",          category: "Public Speaking",       date: "2024-07-06", points: 32 },
      { id: 72, name: "[UNI] Foraging Science Seminar",     category: "University Partnership", date: "2023-10-12", points: 16 },
    ]
  },

  // ── Sky Corps ─────────────────────────────────────────────────────────────
  {
    id: 16, name: "Eva Eagle", title: "Chief Aerial Officer",
    department: "Sky Corps", avatar: "🦅",
    activities: [
      { id: 73, name: "[EDU] Thermal Dynamics Workshop",    category: "Education",             date: "2025-06-17", points: 80 },
      { id: 74, name: "[LAB] Sky Corps Leadership Summit",  category: "Public Speaking",       date: "2025-05-12", points: 64 },
      { id: 75, name: "[UNI] Aviation Ecology Research",    category: "University Partnership", date: "2025-01-08", points: 48 },
      { id: 76, name: "[EDU] Nest Architecture 101",        category: "Education",             date: "2024-11-23", points: 48 },
      { id: 77, name: "[LAB] High Altitude Keynote",        category: "Public Speaking",       date: "2024-07-14", points: 32 },
      { id: 78, name: "[UNI] Bird Migration Study",         category: "University Partnership", date: "2024-03-29", points: 32 },
      { id: 79, name: "[EDU] Sharp Vision Analytics",       category: "Education",             date: "2023-09-01", points: 16 },
    ]
  },
  {
    id: 17, name: "Perry Parrot", title: "Communications Director",
    department: "Sky Corps", avatar: "🦜",
    activities: [
      { id: 80, name: "[LAB] Multicolour Data Expo",        category: "Public Speaking",       date: "2025-10-11", points: 64 },
      { id: 81, name: "[EDU] Mimicry & Communication",      category: "Education",             date: "2025-07-26", points: 48 },
      { id: 82, name: "[UNI] Language Science Seminar",     category: "University Partnership", date: "2025-03-14", points: 32 },
      { id: 83, name: "[LAB] Sky Corps Podcast",            category: "Public Speaking",       date: "2024-09-05", points: 16 },
      { id: 84, name: "[EDU] Feather Display Masterclass",  category: "Education",             date: "2023-12-28", points: 16 },
    ]
  },
  {
    id: 18, name: "Fiona Flamingo", title: "Head of Graceful Systems",
    department: "Sky Corps", avatar: "🦩",
    activities: [
      { id: 85, name: "[EDU] Balance & Precision Workshop", category: "Education",             date: "2025-05-07", points: 64 },
      { id: 86, name: "[LAB] Wetland Strategy Conference",  category: "Public Speaking",       date: "2024-11-15", points: 48 },
      { id: 87, name: "[UNI] Biodiversity Research Talk",   category: "University Partnership", date: "2024-08-26", points: 32 },
      { id: 88, name: "[EDU] One-Leg Leadership",           category: "Education",             date: "2024-02-18", points: 16 },
      { id: 89, name: "[LAB] Pink Data Panel",              category: "Public Speaking",       date: "2023-07-04", points: 16 },
    ]
  },
  {
    id: 19, name: "Harry Hawk", title: "Speed & Agility Lead",
    department: "Sky Corps", avatar: "🐦",
    activities: [
      { id: 90, name: "[LAB] Dive Velocity Conference",     category: "Public Speaking",       date: "2025-04-14", points: 64 },
      { id: 91, name: "[EDU] Precision Targeting 101",      category: "Education",             date: "2024-10-01", points: 48 },
      { id: 92, name: "[UNI] Raptor Science Seminar",       category: "University Partnership", date: "2024-05-23", points: 32 },
      { id: 93, name: "[EDU] Wind Reading Workshop",        category: "Education",             date: "2023-02-06", points: 16 },
    ]
  },
  {
    id: 20, name: "Pam Peacock", title: "Visual Design Lead",
    department: "Sky Corps", avatar: "🦚",
    activities: [
      { id: 94, name: "[EDU] Display Plumage Analytics",    category: "Education",             date: "2025-12-01", points: 64 },
      { id: 95, name: "[LAB] Colour Theory Conference",     category: "Public Speaking",       date: "2025-09-16", points: 48 },
      { id: 96, name: "[UNI] Art & Science Partnership",    category: "University Partnership", date: "2024-06-30", points: 32 },
      { id: 97, name: "[EDU] Feather Pattern Workshop",     category: "Education",             date: "2023-04-10", points: 16 },
    ]
  },
];

if (typeof module !== "undefined") module.exports = { EMPLOYEES };
