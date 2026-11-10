// doodle Tailwind preset. In tailwind.config.js: presets: [require('./brand/tokens/tailwind.preset.js')]
module.exports = {
  theme: {
    extend: {
      colors: {
        paper: '#FFFFFF',
        mist: '#EEF0F8',
        periwinkle: '#4F57D6',
        navy: '#1E2366',
        blush: '#FFB8CD',
        butter: '#FFE066',
        lilac: '#CFC6FF',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        roast: ['42px', { lineHeight: '1' }],
        small: ['13px', { lineHeight: '20px' }],
      },
      borderRadius: {
        sm: '10px',
        md: '16px',
      },
    },
  },
};
