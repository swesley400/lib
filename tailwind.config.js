/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "./src/components/ImageUpload.tsx", // Inclui todos os arquivos JS, JSX, TS e TSX
    "./src/components/imagePreviewUpload.tsx"
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
