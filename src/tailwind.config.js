export default {
    darkMode: 'class',
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            light: 'oklch(25.79% 0.101 265.57)', // #0A2463
            dark: 'oklch(10.79% 0.101 265.57)'   // #050A30
          },
          accent: {
            light: 'oklch(64.8% 0.169 231.57)',  // #3E92CC
            dark: 'oklch(77.8% 0.134 191.1)'     // #4ECDC4
          }
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-out',
          'slide-up': 'slideUp 0.5s ease-out'
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' }
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' }
          }
        }
      }
    },
    plugins: []
  };