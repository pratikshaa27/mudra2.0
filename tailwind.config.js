/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			/* Overrides Tailwind's default `blue` scale so every existing
  			   blue-* utility class across the app (bg-blue-600, text-blue-700,
  			   border-blue-200, ...) resolves to SIDBI's own palette instead —
  			   sourced from sidbi.in's stylesheet (--darkblue/--bluecolor).
  			   No component files needed touching to pick this up. */
  			blue: {
  				50: '#eaf9fe',
  				100: '#d2f0fc',
  				200: '#a8e4fa',
  				300: '#6cd3f5',
  				400: '#23ace1',
  				500: '#00b6f0',
  				600: '#0090c2',
  				700: '#004265',
  				800: '#032840',
  				900: '#021731',
  				950: '#011a39'
  			},
  			/* Same treatment for green/emerald — sourced from sidbi.in's
  			   --greencolor (#3fa253 bright / #1c6331 dark). Both scales share
  			   one ramp so green- and emerald- utilities stay consistent. */
  			green: {
  				50: '#eefaf0',
  				100: '#d6f2db',
  				200: '#ade6ba',
  				300: '#7dd598',
  				400: '#55c07a',
  				500: '#3fa253',
  				600: '#2f8a45',
  				700: '#1c6331',
  				800: '#164f27',
  				900: '#123f20',
  				950: '#0a2412'
  			},
		emerald: {
			'50': '#eefaf0',
			'100': '#d6f2db',
			'200': '#ade6ba',
			'300': '#7dd598',
			'400': '#55c07a',
			'500': '#3fa253',
			'600': '#2f8a45',
			'700': '#1c6331',
			'800': '#164f27',
			'900': '#123f20',
			'950': '#0a2412'
		},
		/* Saffron and gold — sourced from sidbi.in --yellowcolor / brand
		   saffron. Used for accent text, badges, and highlights across pages. */
		orange: {
			'50': '#fff7ed',
			'100': '#ffedd5',
			'200': '#fed7aa',
			'300': '#fdba74',
			'400': '#fb923c',
			'500': '#ff6800',
			'600': '#ea580c',
			'700': '#c2410c',
			'800': '#9a3412',
			'900': '#7c2d12',
			'950': '#431407'
		},
		yellow: {
			'50': '#fefce8',
			'100': '#fef9c3',
			'200': '#fef08a',
			'300': '#fde047',
			'400': '#facc15',
			'500': '#d2df43',
			'600': '#b8c234',
			'700': '#98a42b',
			'800': '#7c8525',
			'900': '#657021',
			'950': '#3d4012'
		},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}