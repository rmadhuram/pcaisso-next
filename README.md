


# Pcaisso: AI Art + Code Generator 🎨

Pcaisso is a full-stack web application that leverages **Large Language Models (LLMs)** to generate various types of visuals, including **2D graphics (Canvas/SVG)**, **3D scenes (Three.js)**, and **data visualizations (D3.js)**, based on a user's natural language prompt. It provides a studio environment for creation, a gallery of results, user authentication, and admin tools for monitoring usage.

I was curious to see how LLMs can generate code for drawing things, and hence this project was born!

<img src="docs/screen0.png" alt="Pcaisso" />

<img src="docs/screen1.png" alt="Pcaisso" />

-----

## 🚀 Features

  * **AI-Powered Code Generation:** Generate visual code (HTML/Canvas, SVG, Three.js, D3.js) from text prompts using integrated LLMs from providers like **OpenAI** and **Anthropic**.
  * **Multi-Model Support:** Choose from several available LLMs, including various versions of `gpt-` and `claude-` models.
  * **Drawing Studio:** A dedicated interface (`/draw`) for submitting prompts, viewing the rendered output, inspecting the generated code, and seeing performance statistics.
  * **Interactive Results:** View rendered graphics and interact with dynamic creations directly in the output panel.
  * **User Authentication:** Secure sign-in using **NextAuth.js** with **Google Provider** to personalize the experience and track user history.
  * **Prompt History:** Logged-in users can view and re-load their past creations.
  * **Liking System:** Users can "like" their favorite creations, which are displayed in a public gallery.
  * **Admin Dashboard:** Restricted access panel for administrators to monitor key performance indicators (KPIs) like total creations, users, token usage, cost breakdown by model provider, and a searchable table of all results.
  * **Database Persistence:** Results, user information, and like statuses are stored in a MySQL database.

-----

## 🛠️ Dependencies and Requirements

### Development Environment

  * **Node.js** (v18.x or later recommended)
  * **npm** or **yarn** (npm is used in `package.json` scripts)
  * **TypeScript**

### Services and APIs

  * **LLM API Keys:** API keys for **OpenAI** and **Anthropic** (and potentially DeepSeek/Ollama) must be configured in your environment variables (`.env`).
  * **Database:** A **MySQL** database instance for storing application data.
  * **Google Auth:** Google Client ID and Secret are required for NextAuth.js (Google Provider).

### Project Dependencies (from `package.json`)

The project is built on the **Next.js** framework and includes the following key packages:

| Category | Key Packages | Purpose |
| :--- | :--- | :--- |
| **Frontend** | `react`, `react-dom`, `next` | Core application framework. |
| **UI/Components** | `primereact`, `primeicons`, `@fortawesome/*` | Rich component library and icon sets. |
| **Styling/Animation** | `sass`, `animate.css` | Styling and visual effects. |
| **Auth** | `next-auth` | User session management and Google login. |
| **LLM Integration** | `@anthropic-ai/sdk`, `openai` | APIs for interacting with AI models. |
| **Database** | `mysql2` | MySQL driver. |
| **Utilities** | `dayjs`, `numeral`, `uuid`, `dotenv`, `node-cache` | Date/time manipulation, number formatting, unique IDs, environment variables, caching. |
| **Code Display** | `react-syntax-highlighter` | Displaying generated code with syntax highlighting and line numbers. |

-----

## 📦 Installation

To get a local copy up and running, follow these steps.

### 1\. Clone the repository

```bash
git clone [repository-url]
cd pcaisso-next
```

### 2\. Install dependencies

```bash
npm install
```

### 3\. Environment Configuration

Create a file named **`.env.local`** in the root directory and populate it with your environment variables.

```
# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=YOUR_RANDOM_SECRET
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

# MySQL Database Configuration
MYSQL_HOST=your_db_host
MYSQL_PORT=3306
MYSQL_USER=your_db_user
MYSQL_PASSWORD=your_db_password
MYSQL_DATABASE=pcaisso_db

# LLM API Keys
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
ANTHROPIC_API_KEY=YOUR_ANTHROPIC_API_KEY
DEEPSEEK_API_KEY=YOUR_DEEPSEEK_API_KEY
OLLAMA_API_KEY=YOUR_OLLAMA_API_KEY # Used for local Microsoft/Ollama endpoint
```

### 4\. Database Setup

The project uses a MySQL database. You will need to execute the schema setup (not provided in the source code but assumed to exist in the `sql` directory).

Ensure your database is running and accessible using the credentials in your `.env.local` file.

### 5\. Run the Application

Start the development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

-----

## 👩‍💻 Usage Guide

### Getting Started

1.  Open the application in your browser.
2.  Click **Sign In** and authenticate using your **Google account**. This enables the core generation features and saves your history.
3.  Navigate to the **Create** page (or `/draw/new`).

### Creating a New Visual

1.  **Select Drawing Category:** In the left input panel, choose a drawing type:
      * **2D Canvas**: For basic, animated, or interactive 2D graphics using HTML Canvas.
      * **SVG**: For scalable vector graphics.
      * **3D**: For three-dimensional scenes using Three.js.
      * **d3**: For data visualizations using D3.js.
2.  **Select Model:** Choose an LLM from the dropdown (e.g., `gpt-4o-mini`, `claude-3-5-sonnet-20240620`).
3.  **Enter Prompt:** Type your descriptive prompt in the text area (e.g., "Draw a beautiful sunset over a calm ocean using a 2D canvas").
4.  **Generate:** Click the **Generate** button. The application will transition to a loading state and then display the results.

### Viewing Results

The results panel contains three tabs:

  * **Output:** Displays the rendered visual (e.g., the 2D image, 3D scene, or visualization).
  * **Code:** Shows the raw HTML/JavaScript code generated by the LLM, complete with line numbers. Use the **"Copy to Clipboard"** button to copy the code.
  * **Stats:** Provides technical details about the generation, including creation time, time taken by the LLM, and token usage statistics.

### Managing Your Creations

  * **History:** The **History** tab in the input panel displays a paginated list of your past prompts. Click any item to load its corresponding result.
  * **Like/Delete:** On the results page, you can:
      * Toggle the **Like button** to add/remove the result from the "All Liked Results" page.
      * Click the **Delete button** to logically delete the entry from your history.

-----

## 🤝 Contribution Guidelines

We welcome contributions from the community\!

1.  **Fork** the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a **Pull Request**.

Please ensure your code adheres to the existing style and is accompanied by necessary tests or documentation updates.

Contact me at [@rmadhuram](https://www.linkedin.com/in/rmadhuram/) for more information.

-----

## 📜 License

This project is licensed under the **[Placeholder License Name]** - see the `LICENSE.md` file (if available) for details. (Assuming an Open Source license will be added).

