# Document Request Portal 

A multi-step form application built with Gatsby, TypeScript, and Tailwind CSS.
---

## 📁 Project Structure

```
.
├── gatsby-config.ts
├── gatsby-browser.js
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── README.md
└── src
    ├── components
    │   ├── atoms
    │   │   ├── FileInput.tsx
    │   │   ├── FormError.tsx
    │   │   ├── index.ts
    │   │   ├── SelectInput.tsx
    │   │   ├── TextArea.tsx
    │   │   └── TextInput.tsx
    │   ├── Layout.tsx
    │   └── molecules
    │       ├── index.ts
    │       └── StepProgress.tsx
    ├── constants
    │   └── index.ts
    ├── gatsby-types.d.ts
    ├── images
    │   └── icon.png
    ├── pages
    │   ├── 404.tsx
    │   ├── index.tsx
    │   ├── request
    │   │   ├── review.tsx
    │   │   ├── step1.tsx
    │   │   ├── step2.tsx
    │   │   └── step3.tsx
    │   ├── status
    │   │   └── [id].tsx
    │   └── status.tsx
    ├── services
    │   ├── apiService.ts
    │   └── pdfService.ts
    ├── store
    │   └── requestStore.ts
    ├── styles
    │   └── global.css
    └── utils
        └── formDataUtil.ts
```

---

## 🚀 Getting Started

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/thebinij/document-request-portal
   cd document-request-portal
   ```

2. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

3. **Start the development server:**

   Using npm:

   ```bash
   npm run develop
   ```

   Or using Yarn:

   ```bash
   yarn develop
   ```

   The application will be available at `http://localhost:8000`.

---

## 📄 Available Scripts

* **`npm run develop` / `yarn develop`:** Starts the development server.
* **`npm run build` / `yarn build`:** Builds the application for production.
* **`npm run serve` / `yarn serve`:** Serves the production build locally.
* **`npm run clean` / `yarn clean`:** Cleans the `.cache` and `public` directories.

---

## 📚 Learn More

* [Gatsby Documentation](https://www.gatsbyjs.com/docs/)
* [React Documentation](https://reactjs.org/docs/getting-started.html)
* [TypeScript Documentation](https://www.typescriptlang.org/docs/)
* [Tailwind CSS Documentation](https://tailwindcss.com/docs)
* [Zustand Documentation](https://github.com/pmndrs/zustand)

