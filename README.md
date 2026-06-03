# Kokkonda Harshavardhan — Developer Portfolio

A modern, high-performance personal portfolio website built to showcase projects, skills, and professional experience. Designed with a sleek dark theme, emerald accents, and smooth scroll animations.

![Portfolio Preview](./public/favicon.svg) <!-- Replace with an actual screenshot once deployed -->

## 🚀 Live Demo
**[Insert your Vercel Link Here]**

## ✨ Features
- **Responsive Design:** Fully optimized for desktop, tablet, and mobile devices.
- **Framer Motion Animations:** Smooth scroll-triggered fade-ins and dynamic elements.
- **Interactive Navigation:** Blur-effect sticky navbar with an active section highlight that tracks your scroll position.
- **Real-Time Contact Form:** Fully functional form integrated with Web3Forms (no backend required, messages go straight to email).
- **Fast Performance:** Built on Vite for lightning-fast HMR and highly optimized production builds.

## 🛠️ Tech Stack
- **Frontend Framework:** React 19 + Vite
- **Styling:** Vanilla CSS + Tailwind CSS (for utility layouts)
- **Animations:** Framer Motion
- **Icons:** Custom inline SVGs
- **Form API:** Web3Forms
- **Deployment:** Vercel

## 💻 Running Locally

To run this project on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Harshavardhan2006/My-Portfolio.git
   cd My-Portfolio/portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`.

## 📬 Contact Form Setup
If you fork this repo, you need to configure your own Web3Forms access key:
1. Get a free key at [Web3Forms](https://web3forms.com/).
2. Open `src/App.jsx`.
3. Locate the `handleFormSubmit` function and replace the `access_key` value with your own.

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
