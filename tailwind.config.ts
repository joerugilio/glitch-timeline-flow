
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '1rem',
			screens: {
				'2xl': '87.5rem' // 1400px
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
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
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 0.125rem)',
				sm: 'calc(var(--radius) - 0.25rem)'
			},
			fontSize: {
				xs: ['clamp(0.625rem, 0.5rem + 0.5vw, 0.75rem)', { lineHeight: '1.4' }],
				sm: ['clamp(0.75rem, 0.625rem + 0.5vw, 0.875rem)', { lineHeight: '1.4' }],
				base: ['clamp(0.875rem, 0.75rem + 0.5vw, 1rem)', { lineHeight: '1.5' }],
				lg: ['clamp(1rem, 0.875rem + 0.5vw, 1.125rem)', { lineHeight: '1.5' }],
				xl: ['clamp(1.125rem, 1rem + 0.5vw, 1.25rem)', { lineHeight: '1.4' }],
				'2xl': ['clamp(1.25rem, 1.125rem + 0.5vw, 1.5rem)', { lineHeight: '1.3' }],
				'3xl': ['clamp(1.5rem, 1.25rem + 1vw, 1.875rem)', { lineHeight: '1.2' }],
				'4xl': ['clamp(1.875rem, 1.5rem + 1.5vw, 2.25rem)', { lineHeight: '1.1' }],
			},
			spacing: {
				'fluid-xs': 'clamp(0.25rem, 0.125rem + 0.5vw, 0.5rem)',
				'fluid-sm': 'clamp(0.5rem, 0.25rem + 1vw, 1rem)',
				'fluid-md': 'clamp(1rem, 0.5rem + 2vw, 2rem)',
				'fluid-lg': 'clamp(1.5rem, 1rem + 2vw, 3rem)',
				'fluid-xl': 'clamp(2rem, 1.5rem + 2vw, 4rem)',
				'fluid-2xl': 'clamp(3rem, 2rem + 4vw, 6rem)',
				'gantt-bar': 'clamp(4rem, 3rem + 4vw, 8rem)',
				'gantt-spacing': 'clamp(0.5rem, 0.25rem + 1vw, 1.5rem)',
				'logo-width': 'clamp(8rem, 6rem + 8vw, 16rem)',
				'logo-height': 'clamp(2.5rem, 2rem + 2vw, 5rem)',
			},
			height: {
				'fluid-xs': 'clamp(0.25rem, 0.125rem + 0.5vw, 0.5rem)',
				'fluid-sm': 'clamp(0.5rem, 0.25rem + 1vw, 1rem)',
				'fluid-md': 'clamp(1rem, 0.5rem + 2vw, 2rem)',
				'fluid-lg': 'clamp(1.5rem, 1rem + 2vw, 3rem)',
				'fluid-xl': 'clamp(2rem, 1.5rem + 2vw, 4rem)',
				'gantt-bar': 'clamp(4rem, 3rem + 4vw, 8rem)',
				'gantt-timeline': 'clamp(1.5rem, 1rem + 2vw, 3rem)',
			},
			width: {
				'fluid-xs': 'clamp(0.25rem, 0.125rem + 0.5vw, 0.5rem)',
				'fluid-sm': 'clamp(0.5rem, 0.25rem + 1vw, 1rem)',
				'fluid-md': 'clamp(1rem, 0.5rem + 2vw, 2rem)',
				'fluid-lg': 'clamp(1.5rem, 1rem + 2vw, 3rem)',
				'fluid-xl': 'clamp(2rem, 1.5rem + 2vw, 4rem)',
				'logo-width': 'clamp(8rem, 6rem + 8vw, 16rem)',
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
} satisfies Config;
