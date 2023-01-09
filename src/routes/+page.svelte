<script>
	import Graph from '@components/Graph.svelte'
    import {gdpPerCapData} from '../data'
    import Dropdown from '@components/Dropdown.svelte'

 

    const countries = ["United Kingdom", "Japan", "China", "United States", "India"]

    let w = 0
    let h = 0


    let selected = 'United Kingdom'

    function setSelected(e) {
        selected = e.detail
    }
</script>

<h1>Welcome to SvelteKit</h1>
<Dropdown data={countries} on:select={setSelected} />
<div class='w-full h-[400px]' bind:clientWidth={w} bind:clientHeight={h} >
    <Graph data={gdpPerCapData.filter((d) => d.country === selected)} width={w} height={h} />
</div>