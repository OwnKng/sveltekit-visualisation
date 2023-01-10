/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				skin: {
					outline: 'var(--color-outline)'
				}
			},
			textColor: {
				skin: {
					heading: 'var(--color-text-heading)',
					paragraph: 'var(--color-text-paragraph)',
					input: 'var(--colors-text-input)'
				}
			},
			backgroundColor: {
				skin: {
					fill: 'var(--color-background)',
					foreground: 'var(--color-foreground)',
					'graph-primary': 'var(--color-graph-primary)'
				}
			}
		}
	},
	plugins: []
}
