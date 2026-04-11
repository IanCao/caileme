# Caileme - Workers' Rights Protection Station

<div align="center">

![Logo](public/logo.png)

**A free tool platform helping workers cope with layoffs**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38b2ac)](https://tailwindcss.com/)
[![GitHub Stars](https://img.shields.io/github/stars/IanCao/caileme?style=social)](https://github.com/IanCao/caileme)
[![GitHub Forks](https://img.shields.io/github/forks/IanCao/caileme?style=social)](https://github.com/IanCao/caileme)

[中文](./README.md) | English

</div>

---

## 💔 When Layoffs Hit, You're Not Alone

2024-2026, the wave of tech layoffs continues. Behind every number is a family's anxiety, an uncertain future.

**We believe:** Workers are not just "headcounts" — they're people. Every piece of labor deserves respect, every contract deserves to be honored.

**Caileme** started with a simple thought: **What if there was a tool that could help every laid-off worker know how much they should get paid, how to negotiate, and how to protect their rights... would that make a difference?**

---

## 💡 Our Story

We're a group of ordinary tech workers who have witnessed:

- A friend laid off without knowing what "N+1" even means
- A colleague signed the termination agreement only to realize they were owed 6 months' salary
- Ourselves going to arbitration without knowing what evidence to prepare

These things shouldn't happen. Labor law protects you — but you need to know what it protects.

That's why we built **Caileme** — turning professional knowledge about workers' rights into tools everyone can use.

**We don't charge, don't require registration, don't collect data.**
**Because this is what you're entitled to.**

---

## ✨ Features

### 🧮 Rights Calculator Tools

| Tool | Description |
|------|-------------|
| **Severance Calculator** | Input income details to accurately calculate N, N+1, and 2N layoff compensation, automatically comparing against social average wage limits |
| **Unemployment Benefits Calculator** | Covers 30+ cities nationwide with latest standards, estimating monthly benefits and duration |
| **Social Insurance Impact** | Check how insurance gaps affect medical insurance, housing fund, and home purchase eligibility |

### 📖 Rights Protection Encyclopedia

- **What to Do on Layoff Day** - Complete action checklist after receiving layoff notice
- **Layoff Negotiation Tips** - How to negotiate better compensation with HR
- **Labor Arbitration Process** - Complete guide from application to hearing
- **Evidence Collection Handbook** - Is recording legal? Which evidence is accepted in arbitration?
- **Post-Departure Social Insurance** - Complete guide to the five insurances and housing fund
- **Career Restart Guide** - Complete path from setback to fresh start

### 📋 Rights Progress Tracker

Full-process checklist management, protecting your rights step by step from receiving notice to arbitration.

### 🤖 AI Layoff Simulation

Using Cloudflare AI to simulate real HR layoff conversation scenarios. Practice your responses in advance — know yourself and the enemy, negotiate with confidence.

### 🏛️ Community Articles

Community experiences and stories, helping workers learn from each other and grow together.

---

## 🌱 Together We Protect Workers' Rights

**Caileme** is an open-source community project belonging to all workers. Your every contribution helps the next person in need.

### 🤝 Ways to Contribute

| Way | What You Can Do | Perfect For |
|-----|-----------------|------------|
| **📝 Share Your Story** | Submit your layoff/rights-protection experience to help others avoid pitfalls | Those who've been through it |
| **🔧 Improve Tools** | Add new city insurance data, optimize calculation logic | Developers |
| **📖 Improve Guides** | Add local policies, update labor law interpretations | Legal enthusiasts |
| **🌐 Translate & Spread** | Translate to other languages, share with more workers | Polyglots |
| **⭐ Show Support** | Give the project a Star to help more people discover it | Everyone |

### 💬 Community Stories

> "Your calculator helped me realize the company owed me 3 months' salary. I went back to negotiate the next day and got it back." — @Anonymous User
>
> "I followed your layoff day guide step by step and won my arbitration. Thank you!" — @Xiao Ming

*Your story could be here too*

### 🔥 Join Now

[![Star](https://img.shields.io/github/stars/IanCao/caileme?style=for-the-badge)](https://github.com/IanCao/caileme)
[![Fork](https://img.shields.io/github/forks/IanCao/caileme?style=for-the-badge)](https://github.com/IanCao/caileme/fork)

**Or simply**: Share **Caileme** with friends who are worrying about layoffs.

Sometimes, one share is the biggest help of all.

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| **Next.js 14** | React framework with SSR/SSG support |
| **TypeScript** | Type safety for better code quality |
| **Tailwind CSS** | Atomic CSS for rapid beautiful UI development |
| **Framer Motion** | Page animations and interactive effects |
| **AI** | AI-powered layoff simulation |
| **Vercel / Cloudflare** | Deployment and hosting |

---

## 🚀 Getting Started

### Requirements

- Node.js >= 18
- npm / yarn / pnpm

### Install Dependencies

```bash
npm install
```

### Development Mode

```bash
npm run dev
```

Visit http://localhost:3000 to view the app.

### Build for Production

```bash
npm run build
npm run start
```

### AI Feature Configuration (Optional)

The AI layoff simulation requires AI service configuration:

1. Get an API Token from your AI service provider
2. Copy `.env.example` to `.env.local` and fill in:

```bash
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token
CLOUDFLARE_AI_MODEL=@cf/qwen/qwen2.5-7b-instruct
```

> 💡 Without AI configuration, the simulation will use built-in preset responses for demo purposes.

---

## 📁 Project Structure

```
caileme/
├── app/                      # Next.js App Router
│   ├── src/
│   │   ├── app/             # Page files
│   │   │   ├── page.tsx     # Home page
│   │   │   ├── tools/       # Tool pages
│   │   │   ├── guides/      # Guide pages
│   │   │   ├── community/   # Community pages
│   │   │   └── ...
│   │   ├── components/      # React components
│   │   ├── data/            # Static data
│   │   └── hooks/           # Custom hooks
│   └── public/              # Static assets
├── package.json
└── README.md
```

---

## 🤝 Contributing

We welcome all workers to join! Whether you contribute code, improve documentation, or share your story — you're helping make this project better.

### Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/IanCao/caileme.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature-name`
5. Make your changes
6. Submit a pull request

### Contribution Areas

- 🐛 Fix bugs
- ✨ Add new features or tools
- 📝 Improve documentation and guides
- 🗺️ Add or update city insurance data
- 🌐 Multilingual translations
- 💡 Suggest improvements

---

## 🎨 Design Principles

1. **Simplicity First** - Remove all unnecessary decorations, focus on core functionality
2. **Data-Driven** - Let real data speak, calculation results have evidence to support
3. **Mobile-First** - Responsive design, smooth experience on mobile devices
4. **Privacy Protection** - No user privacy collected, no registration or login required

---

## 📄 License

This project is open source under the [MIT License](LICENSE). You are free to use, modify, and distribute this project's code.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - Excellent React framework
- [Tailwind CSS](https://tailwindcss.com/) - Practical CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Smooth animation library
- All contributors
- All workers who share their experiences and help spread the word

---

## 📮 Contact & Feedback

If you encounter problems or have improvement suggestions:

- Submit [GitHub Issue](https://github.com/IanCao/caileme/issues)
- Send email to contact@caileme.team

---

<div align="center">

---

### 🛡️ Your Rights Should Not Be Buried in Silence

**Caileme · Workers' Rights Protection Station**

*Built by workers, for workers.*

[![GitHub Stars](https://img.shields.io/github/stars/IanCao/caileme?style=for-the-badge)](https://github.com/IanCao/caileme)
[![Twitter](https://img.shields.io/twitter/url?url=https%3A%2F%2Fcaileme.com&style=for-the-badge)](https://twitter.com/intent/tweet?text=Check%20out%20this%20free%20tool%20for%20workers%20facing%20layoffs!)

---

**Today you help a worker, tomorrow you might be the one helped.**

**May every worker be treated with respect.**

</div>
