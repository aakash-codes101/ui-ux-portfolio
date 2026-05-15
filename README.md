# Clanza Inn - Student Hostel Finder 🏡✨

> **A modern, user-centric web application designed to simplify the hostel discovery process for students in Greater Noida.**

This project was built with a strong emphasis on **UI/UX design principles, seamless interactions, and mobile-first accessibility**. It serves as a portfolio piece demonstrating my ability to translate user needs into intuitive, beautiful digital experiences using modern frontend technologies.

---

## 🎨 UI/UX Highlights & Design Philosophy

### 1. Solving a Real User Problem (UX)
Finding a good hostel is a major pain point for students moving to a new city. The UX of this application is designed to reduce cognitive load:
- **Intuitive Discovery:** Clear, structured property cards with essential information (pricing, amenities, distance) visible upfront.
- **Frictionless Lead Generation:** An unobtrusive, easy-to-use inquiry form that doesn't overwhelm the user.
- **Progressive Web App (PWA):** Installable directly to the user's home screen for native-like access, catering to the primary mobile demographic.

### 2. Visual Hierarchy & Aesthetic (UI)
- **Modern Clean UI:** Utilizing a minimalist design approach with ample whitespace to keep the focus on high-quality property imagery.
- **Consistent Design System:** Built with a cohesive color palette, modern typography, and reusable UI components to maintain visual consistency across all pages.
- **Clear Call-to-Actions (CTAs):** Strategically placed, high-contrast buttons guide the user journey naturally towards booking or inquiry.

### 3. Fluid Micro-Interactions
*Because static pages are boring.* I integrated **Framer Motion** to bring the interface to life:
- Smooth page transitions.
- Subtle hover effects on interactive elements to provide immediate user feedback.
- Staggered entrance animations for property listings to create a premium, polished feel.

### 4. Responsive & Mobile-First Design
Students primarily browse on their phones. The entire layout is built mobile-first using **Tailwind CSS**:
- Fluid grid systems that adapt perfectly from small mobile screens to large desktop monitors.
- Optimized touch targets for mobile users.
- Conditional rendering of navigation elements (e.g., hiding complex sidebars on smaller screens in favor of accessible bottom or hamburger menus).

---

## 🛠 Tech Stack

This project leverages cutting-edge web technologies to deliver a fast, reliable experience:

- **Framework:** Next.js 16 (App Router) & React 19
- **Styling:** Tailwind CSS v4 for rapid, utility-first styling.
- **Animations:** Framer Motion for complex, physics-based UI interactions.
- **Icons:** Lucide React for crisp, consistent, and scalable vector iconography.
- **Backend/Database:** Supabase for secure authentication and data management.
- **Architecture:** Progressive Web App (PWA) configured with custom `manifest.json` and Service Workers for offline resilience.

---

## 📁 Project Structure

```text
├── public/
│   ├── manifest.json       # PWA Configuration
│   ├── sw.js               # Service Worker for offline capabilities
│   └── ...                 # Static assets & images
├── src/
│   ├── app/                # Next.js App Router (Pages & Routing)
│   │   ├── auth/           # Authentication flows
│   │   └── page.tsx        # Landing Page
│   ├── components/         # Reusable UI Components
│   │   ├── Footer.tsx      # Global Footer & Admin Access
│   │   ├── RoomsSection.tsx# Interactive property listings
│   │   └── ...
│   └── lib/                # Utilities and API clients
└── package.json            # Dependencies
```

---

## 🚀 Running the Project Locally

If you'd like to review the code and interact with the UI locally:

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hostel_website-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Experience the UI**
   Open [http://localhost:3000](http://localhost:3000) in your browser. For the best experience, try viewing it in Chrome's mobile emulator!

---

*Designed and developed with a passion for creating interfaces that users love.*
