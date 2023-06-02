/** @type {import('tailwindcss').Config} */
module.exports = { 
	content: [ "./src/**/*.{js,ts,jsx,tsx}" ], 
	theme: {
		screens: {
		  'sm': '640px',
		  'md': '800px',
		  'lg': '1024px',
		  'xl': '1280px',
		  '2xl': '1536px',
		},
		container: {
		  padding: {
			DEFAULT: '1rem',
			sm: '2rem',
			md: "5rem",
			lg: '4rem',
			xl: '5rem',
			'2xl': '6rem',
		  },
		  center: true,
		},
		extend: {
		  fontSize: {
			h1: "4.375rem", //70px
			h2: "3rem", // 48px
			h3: "2.25rem",// 36px
			h4:"1.5rem",//24px
			p: "1rem", // 16px
			ex: "0.875rem",//14px
			para: "1.125rem",  // 18px
			sub: "0.625rem" // 10px
		  },
		  colors: {
			"primary-black": "#1F1F1F",
			"primary-blue": "#0E5686",
			"primary-brown": "#804C36"
		  },
		},
	  },
	plugins: [], 
}