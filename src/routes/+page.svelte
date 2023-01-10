<script lang="ts">
	import Graph from '@components/Graph.svelte'
	import Dropdown from '@components/Dropdown.svelte'
	import { fetchData } from '../util/fetch'
	import { countries } from '../countries'

	let w = 0
	let h = 0

	let selected = 'GBR'
	let promise = fetchData(selected)

	const getSelectedData = (e: CustomEvent) => {
		const code = countries.find((d) => d.name === e.detail)?.code
		if (code) promise = fetchData(code)
	}
</script>

<div class="w-[100%] m-auto max-w-[720px]">
	<h1 class="text-skin-heading">GDP per capita tracker</h1>
	<Dropdown
		placeholder="United Kingdom"
		label="Select a country"
		data={countries.map((d) => d.name)}
		on:select={getSelectedData}
	/>
</div>
<div class="flex place-content-center bg-skin-foreground p-5 min-h-[400px]">
	{#await promise then data}
		<div class="w-full max-w-[720px]">
			<h2 class="text-skin-heading">GDP per capita (current US$), {data[0].country}</h2>
			<div class="h-[400px]" bind:clientWidth={w} bind:clientHeight={h}>
				{#if w > 0}
					<Graph {data} x="date" y="value" width={w} height={h} />
				{/if}
			</div>
			<span class="text-skin-paragraph text-xs"
				>Source: <a href="https://worldbank.org">World Bank</a></span
			>
		</div>
	{:catch error}
		<div class="flex w-full place-items-center justify-center text-skin-paragraph text-s">
			<p>We were unable to fetch the requested data. Please try again later</p>
		</div>
	{/await}
</div>
