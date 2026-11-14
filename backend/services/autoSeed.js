const Project = require('../models/Project');

const DEFAULT_PROJECTS = [
  {
    full_name: "facebook/react",
    description: "The library for web and native user interfaces.",
    language: "JavaScript",
    stargazers_count: 228000,
    forks_count: 46000,
    watchers_count: 6600,
    open_issues_count: 850,
    size: 320000,
    avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4",
    domainTags: ["Web", "Frontend"],
    countryTags: ["Global", "USA"],
    history: [
      { date: new Date(Date.now() - 30 * 86400000), stars: 224000 },
      { date: new Date(Date.now() - 15 * 86400000), stars: 226000 },
      { date: new Date(), stars: 228000 }
    ],
    demographics: [
      { country: "United States", count: 45 },
      { country: "France", count: 18 },
      { country: "Morocco", count: 12 },
      { country: "Germany", count: 15 }
    ]
  },
  {
    full_name: "vuejs/core",
    description: "Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.",
    language: "TypeScript",
    stargazers_count: 45000,
    forks_count: 8200,
    watchers_count: 1200,
    open_issues_count: 320,
    size: 150000,
    avatar_url: "https://avatars.githubusercontent.com/u/6128107?v=4",
    domainTags: ["Web", "Frontend"],
    countryTags: ["Global", "China"],
    history: [
      { date: new Date(Date.now() - 30 * 86400000), stars: 43000 },
      { date: new Date(Date.now() - 15 * 86400000), stars: 44200 },
      { date: new Date(), stars: 45000 }
    ],
    demographics: [
      { country: "China", count: 35 },
      { country: "United States", count: 20 },
      { country: "France", count: 15 }
    ]
  },
  {
    full_name: "flutter/flutter",
    description: "Flutter makes it easy and fast to build beautiful apps for mobile and beyond.",
    language: "Dart",
    stargazers_count: 165000,
    forks_count: 27000,
    watchers_count: 3600,
    open_issues_count: 5100,
    size: 240000,
    avatar_url: "https://avatars.githubusercontent.com/u/14101776?v=4",
    domainTags: ["Mobile", "Cross-Platform"],
    countryTags: ["Global"],
    history: [
      { date: new Date(Date.now() - 30 * 86400000), stars: 161000 },
      { date: new Date(Date.now() - 15 * 86400000), stars: 163000 },
      { date: new Date(), stars: 165000 }
    ],
    demographics: [
      { country: "United States", count: 30 },
      { country: "India", count: 40 },
      { country: "Morocco", count: 14 }
    ]
  },
  {
    full_name: "facebook/react-native",
    description: "A framework for building native applications using React.",
    language: "JavaScript",
    stargazers_count: 118000,
    forks_count: 24000,
    watchers_count: 3500,
    open_issues_count: 1400,
    size: 420000,
    avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4",
    domainTags: ["Mobile", "Frontend"],
    countryTags: ["Maroc", "Global"],
    history: [
      { date: new Date(Date.now() - 30 * 86400000), stars: 115000 },
      { date: new Date(Date.now() - 15 * 86400000), stars: 116800 },
      { date: new Date(), stars: 118000 }
    ],
    demographics: [
      { country: "United States", count: 35 },
      { country: "Morocco", count: 15 },
      { country: "France", count: 20 }
    ]
  },
  {
    full_name: "tensorflow/tensorflow",
    description: "An Open Source Machine Learning Framework for Everyone.",
    language: "C++",
    stargazers_count: 185000,
    forks_count: 89000,
    watchers_count: 7800,
    open_issues_count: 2300,
    size: 890000,
    avatar_url: "https://avatars.githubusercontent.com/u/15658638?v=4",
    domainTags: ["AI", "Machine Learning"],
    countryTags: ["Global", "USA"],
    history: [
      { date: new Date(Date.now() - 30 * 86400000), stars: 183000 },
      { date: new Date(Date.now() - 15 * 86400000), stars: 184000 },
      { date: new Date(), stars: 185000 }
    ],
    demographics: [
      { country: "United States", count: 50 },
      { country: "China", count: 30 },
      { country: "Germany", count: 10 }
    ]
  },
  {
    full_name: "meta-llama/llama3",
    description: "The official Meta Llama 3 repository.",
    language: "Python",
    stargazers_count: 42000,
    forks_count: 4500,
    watchers_count: 980,
    open_issues_count: 120,
    size: 85000,
    avatar_url: "https://avatars.githubusercontent.com/u/140040514?v=4",
    domainTags: ["AI", "LLM"],
    countryTags: ["Global"],
    history: [
      { date: new Date(Date.now() - 30 * 86400000), stars: 36000 },
      { date: new Date(Date.now() - 15 * 86400000), stars: 39500 },
      { date: new Date(), stars: 42000 }
    ],
    demographics: [
      { country: "United States", count: 40 },
      { country: "France", count: 18 },
      { country: "United Kingdom", count: 12 }
    ]
  },
  {
    full_name: "mongodb/mongo",
    description: "The MongoDB Database source code.",
    language: "C++",
    stargazers_count: 26000,
    forks_count: 9500,
    watchers_count: 1400,
    open_issues_count: 480,
    size: 670000,
    avatar_url: "https://avatars.githubusercontent.com/u/45120?v=4",
    domainTags: ["Database", "NoSQL"],
    countryTags: ["France", "Global"],
    history: [
      { date: new Date(Date.now() - 30 * 86400000), stars: 25200 },
      { date: new Date(Date.now() - 15 * 86400000), stars: 25600 },
      { date: new Date(), stars: 26000 }
    ],
    demographics: [
      { country: "United States", count: 30 },
      { country: "France", count: 20 },
      { country: "Ireland", count: 15 }
    ]
  },
  {
    full_name: "redis/redis",
    description: "Redis is an in-memory database that persists on disk.",
    language: "C",
    stargazers_count: 65000,
    forks_count: 23000,
    watchers_count: 2200,
    open_issues_count: 1800,
    size: 210000,
    avatar_url: "https://avatars.githubusercontent.com/u/1529926?v=4",
    domainTags: ["Database", "NoSQL", "Cache"],
    countryTags: ["Global", "Italy"],
    history: [
      { date: new Date(Date.now() - 30 * 86400000), stars: 63500 },
      { date: new Date(Date.now() - 15 * 86400000), stars: 64200 },
      { date: new Date(), stars: 65000 }
    ],
    demographics: [
      { country: "Italy", count: 25 },
      { country: "United States", count: 35 },
      { country: "Morocco", count: 10 }
    ]
  },
  {
    full_name: "vercel/next.js",
    description: "The React Framework for the Web.",
    language: "JavaScript",
    stargazers_count: 128000,
    forks_count: 27000,
    watchers_count: 2400,
    open_issues_count: 2500,
    size: 530000,
    avatar_url: "https://avatars.githubusercontent.com/u/14985020?v=4",
    domainTags: ["Web", "Fullstack", "Frontend"],
    countryTags: ["Global", "USA"],
    history: [
      { date: new Date(Date.now() - 30 * 86400000), stars: 124000 },
      { date: new Date(Date.now() - 15 * 86400000), stars: 126500 },
      { date: new Date(), stars: 128000 }
    ],
    demographics: [
      { country: "United States", count: 45 },
      { country: "France", count: 22 },
      { country: "Morocco", count: 18 }
    ]
  },
  {
    full_name: "kubernetes/kubernetes",
    description: "Production-Grade Container Scheduling and Management.",
    language: "Go",
    stargazers_count: 112000,
    forks_count: 39000,
    watchers_count: 3900,
    open_issues_count: 2100,
    size: 1200000,
    avatar_url: "https://avatars.githubusercontent.com/u/13629408?v=4",
    domainTags: ["DevOps", "Cloud"],
    countryTags: ["France", "Global"],
    history: [
      { date: new Date(Date.now() - 30 * 86400000), stars: 109000 },
      { date: new Date(Date.now() - 15 * 86400000), stars: 110500 },
      { date: new Date(), stars: 112000 }
    ],
    demographics: [
      { country: "United States", count: 40 },
      { country: "France", count: 25 },
      { country: "Germany", count: 15 }
    ]
  }
];

async function autoSeedIfEmpty() {
  try {
    const count = await Project.countDocuments();
    if (count === 0) {
      console.log("🌱 [Auto-Seed] La base de données est vide. Insertion automatique des dépôts essentiels...");
      await Project.insertMany(DEFAULT_PROJECTS);
      console.log(`✅ [Auto-Seed] ${DEFAULT_PROJECTS.length} dépôts par défaut ont été insérés avec succès !`);
    } else {
      console.log(`ℹ️ [Auto-Seed] Base de données déjà alimentée (${count} projets détectés).`);
    }
  } catch (err) {
    console.error("⚠️ [Auto-Seed] Erreur lors du peuplement automatique :", err.message);
  }
}

module.exports = { autoSeedIfEmpty, DEFAULT_PROJECTS };
