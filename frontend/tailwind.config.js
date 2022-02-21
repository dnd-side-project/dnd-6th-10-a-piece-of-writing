module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'sm': '360px',
      'md': '768px',
      'xl': '1280px',
    },
    fontSize: {
      h1: ['48px'],
      h2: ['32px'],
      h3: ['24px'],
      h4: ['21px'],
      subtitle: ['24px'],
      button: ['16px'],
      link: ['16px'],
      overline: ['14px'],
      t24: ['24px'],
      t21: ['21px'],
      t16: ['16px'],
      t14: ['14px'],
      t12: ['12px'],
      t10: ['10px'],
    },
    borderWidth: { DEFAULT: '1px', 0: '0', 1: '1px', 2: '2px', 3: '3px', 4: '4px', 6: '6px', 8: '8px' },
  },
  plugins: [],
}
