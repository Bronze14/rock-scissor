import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/Styles/Main.scss";`,
      },
    },
  },
};
