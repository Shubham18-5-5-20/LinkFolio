# LinkFolio - A Real-Time "Link-in-Bio" Page Creator

<!-- Add a link to your live deployed application here later. This is the most important part! -->
[**View Live Demo**](https://your-live-demo-url.netlify.app)

<!-- Add a screenshot of your finished application. A GIF showing the live editing is even better! -->
![LinkFolio Screenshot](https://via.placeholder.com/1200x675.png?text=Add+A+Screenshot+Of+Your+App+Here)

## About The Project

LinkFolio is a dynamic front-end application that empowers users to build and customize their own "link-in-bio" page from scratch. It serves as a powerful alternative to services like Linktree, with a key focus on a best-in-class, real-time customization experience.

This project was built to demonstrate a mastery of modern front-end development concepts, including complex state management in React, component-based architecture, and building a fluid, interactive user interface. All user data is saved directly in the browser via `localStorage`, making the application entirely client-side.

---

### Key Features

*   **Live Customization:** A dedicated control panel allows for real-time editing of every element on the page, with changes reflected instantly in the live preview.
*   **Advanced Background Control:** Set a solid color, a two-color linear gradient, or upload a custom background image.
*   **Pattern Overlays:** Add beautiful, subtle patterns (dots, stripes, zigzags) on top of any background and control their opacity.
*   **Complete Text Styling:** For each text element (name, profession, description), users can control:
    *   Font Family
    *   Font Size (with a slider)
    *   Font Color
    *   Font Weight (Bold/Normal)
    *   Font Style (Italic/Normal)
    *   Text Alignment (Left/Center/Right)
*   **Interactive Social Links:**
    *   Add links for all major social platforms.
    *   Icons only appear if a link is provided.
    *   **Drag-to-Reposition:** The entire icon group can be moved anywhere on the screen.
    *   **Scroll-to-Resize:** Hover over the icon group and use the mouse wheel to change the icon size.
*   **Persistent State:** All design and content choices are automatically saved to `localStorage`, so the user's unique page is perfectly restored on every visit.

---

### Built With

This project showcases a modern front-end technology stack:

*   **[React.js](https://reactjs.org/)** - The core JavaScript library for building the user interface.
*   **[Vite](https://vitejs.dev/)** - Next-generation tooling for a fast and efficient development environment.
*   **[Tailwind CSS](https://tailwindcss.com/)** - A utility-first CSS framework for rapid and custom styling.
*   **[React Icons](https://react-icons.github.io/react-icons/)** - For high-quality, lightweight SVG icons.

---

### Getting Started

To get a local copy up and running, follow these simple steps.

#### Prerequisites

*   Node.js (v16 or later)
*   npm

#### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/YourUsername/LinkFolio.git
    ```
    <!-- Replace "YourUsername" with your actual GitHub username! -->

2.  **Navigate into the project directory:**
    ```sh
    cd LinkFolio
    ```

3.  **Install NPM packages:**
    ```sh
    npm install
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the next available port).
