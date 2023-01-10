<script lang="ts">
	import '../app.css'
	let selectedTheme = 'theme-dark'

	const themes = [
		{
			name: 'theme-light',
			color: '#fffffe'
		},
		{
			name: 'theme-dark',
			color: '#12182b'
		},

		{
			name: 'theme-fun',
			color: '#ffa69e'
		}
	]

	function updateTheme(themeName: string) {
		selectedTheme = themeName
	}
</script>

<main class={`${selectedTheme} absolute top-0 left-0 h-full w-full bg-skin-fill`}>
	<div class="flex w-full align-items-center place-content-center">
		<div class="w-full pr-4">
			<div class="flex justify-end h-[80px]">
				{#each themes as theme}
					<button
						aria-label={`set theme to ${theme.name}`}
						class="shadow"
						style={`background: ${theme.color};
						width: 40px; 
						height: ${selectedTheme === theme.name ? '80px' : '40px'};
						`}
						on:click={() => updateTheme(theme.name)}
					/>
				{/each}
			</div>
			<article class="flex flex-col align-items-center">
				<slot />
			</article>
		</div>
	</div>
</main>

<style>
	button {
		transition: height 0.5s;
	}

	button:hover {
		height: 80px !important;
	}
</style>
