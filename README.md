<img src="./readme/title1.svg"/>

# VersusAI – Battle of the LLMs 🤺

[![License](https://img.shields.io/github/license/hassanaboukhalil/versusai)](LICENSE)

> **VersusAI** – pit today’s top LLMs against each other in real-time battles with live voting & analytics.
> <br><br>

## Quick Start

```bash
# Clone & bootstrap
git clone https://github.com/yourname/versusai.git && cd versusai
docker compose up -d        # spins up Laravel + MySQL + Next.js

# Browse the app
open http://localhost:3000  # or just click the link

# Backend
cd api && cp .env.example .env
composer install && php artisan key:generate && php artisan migrate --seed

# Frontend
cd ../web && pnpm install && pnpm dev

```

<br><br>

<!-- project overview -->
<img src="./readme/title2.svg"/>

> VersusAI is a project where users can create and explore battles between different AI models, vote on the best results, and see which AI performs better in different tasks.

<br><br>

<!-- System Design -->
<img src="./readme/title3.svg"/>

### ER diagram

<p align="center"> <img src="./readme/system-design/VersusAI-ER-diagram.png" width="75%" alt="VersusAI ER diagram" /> </p>

### Component diagram

<p align="center"> <img src="./readme/system-design/component-diagram_versusai.png" width="75%" alt="VersusAI component diagram" /> </p>
<br><br>

<!-- Project Highlights -->
<img src="./readme/title4.svg"/>

## ✨ Features

- ⚔️ **Create Battles** – Premium members can set up head-to-head contests between supported AI models.

- 🗳️ **Vote on Battles** – Cast your vote and watch results update instantly.

- 🔍 **Explore Battles** – Browse finished battles and highlights

- 📊 **See the Stats** – Analytics on model performance and response times.

- 💳 **Pay Securely** – Subscribe through Stripe; every transaction is quick and safe.

- ⏱️ **Real-Time** – All updates and analytics are live.

- 🖼️ **Rich Visuals** – Diagrams, charts, and GIFs for every step.

<br>

## 🛠️ Tech Stack

| Frontend | Backend | Database | Payments | Containerization |

<br>

![Landing](./readme/highlights/highlights.png)

<br><br>

<!-- Demo -->
<img src="./readme/title5.svg"/>

### Screens (Web)

<details open> <summary>30-second walkthrough (GIF)</summary>

| Hero section in the landing page screen     |
| ------------------------------------------- |
| ![Landing](./readme/demo/versusai_hero.gif) |

</details>

| Login screen                              | Register screen                        |
| ----------------------------------------- | -------------------------------------- |
| ![Landing](./readme/demo/signup-page.png) | ![fsdaf](./readme/demo/login-page.png) |

| Explore battles page                                | Create a battle                                    |
| --------------------------------------------------- | -------------------------------------------------- |
| ![Landing](./readme/demo/versusai_explore-page.gif) | ![fsdaf](./readme/demo/versusai_create-battle.gif) |

| First round of the Text Summarization battle           | Second round of the Text Summarization battle          |
| ------------------------------------------------------ | ------------------------------------------------------ |
| ![Landing](./readme/demo/versusai-_battle-details.gif) | ![fsdaf](./readme/demo/versusai_battle-details-v2.gif) |

| Real-time voting (updated directly in all pages) |
| ------------------------------------------------ |
| ![Landing](./readme/demo/versusai_analytics.gif) |

| Response time graph                         | Completion tokens graph                       |
| ------------------------------------------- | --------------------------------------------- |
| ![Landing](./readme/demo/response-time.png) | ![fsdaf](./readme/demo/completion-tokens.png) |

| Real-time voting (updated directly in all pages) |
| ------------------------------------------------ |
| ![Landing](./readme/demo/versusai_voting.gif)    |

<br><br>

<!-- Development & Testing -->
<img src="./readme/title6.svg"/>

| Service                                                   | Validation                                                 | Testing                                                 |
| --------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------- |
| ![Landing](./readme/development-and-testing/service1.png) | ![fsdaf](./readme/development-and-testing/validation1.png) | ![fsdaf](./readme/development-and-testing/testing1.png) |

<br><br>

<!-- AI Development -->
<img src="./readme/title7.svg"/>

### Prompts

| The prompt responsible for the code response    | The prompt responsible for the text translation response |
| ----------------------------------------------- | -------------------------------------------------------- |
| ![Landing](./readme/AI-development/prompt1.png) | ![fsdaf](./readme/AI-development/prompt2.png)            |

### Using Prism

![Landing](./readme/AI-development/prism.png)

<br><br>

<!-- Deployment -->
<img src="./readme/title8.svg"/>

### Some API calls from Postman

| API to summarize a text                      |
| -------------------------------------------- |
| ![Landing](./readme/deployment/postman1.png) |

| API to create AI battle                    |
| ------------------------------------------ |
| ![fsdaf](./readme/deployment/postman2.png) |

<br><br>
