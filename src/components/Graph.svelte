<script>
	import {scaleLinear} from 'd3-scale'
	import {extent, max} from 'd3-array'
	import {axisBottom, axisLeft} from 'd3-axis'
	import {select} from 'd3-selection'
	import {line} from 'd3-shape'
	import { draw, fade } from 'svelte/transition';
	import {onMount} from 'svelte'

	export let data
	export let width
	export let height

	const margin = {
		top: 10, 
		left: 40, 
		bottom: 20, 
		right: 20
	}



	$: innerWidth = width - margin.left - margin.right
	$: innerHeight = height - margin.top - margin.bottom	

	const getX = (d) => d["year"]
	const getY = (d) => d['gdpPerCap']

	$: xScale = scaleLinear().domain(extent(data, getX)).range([0, innerWidth]).nice()
	$: yScale = scaleLinear().domain([0, max(data, getY)]).range([innerHeight, 0]).nice()

	$: lineGenerator = line().x((d) => xScale(getX(d))).y((d) => yScale(getY(d)))

	let pinXAxis, pinYAxis
	$: select(pinXAxis).call(axisBottom(xScale).ticks(width / 60))
	$: select(pinYAxis).call(axisLeft(yScale).ticks(10))

	let tooltipData = {}; 

	function handleMouse(event) {
		const x = Math.round(xScale.invert(event.offsetX - margin.left))
		const y = getY(data.find((d) => d.year === x))

		tooltipData.x = xScale(x)
		tooltipData.y = yScale(y)
		tooltipData.data = yScale(y)
	}

	function handleMouseLeave() {
		tooltipData.data = null
	}

</script>

<figure width={width}>
	<svg width='100%' height={height}   >
		<g transform={`translate(${margin.left}, ${margin.top})`}>
			<g
			class="xAxis"
			bind:this={pinXAxis}
			transform="translate(0,{innerHeight})"
		  />
		  <g
		  class="xAxis"
		  bind:this={pinYAxis}
		  transform="translate(0,0)"
		/>
		{#key data}
			<path d={lineGenerator(data)} in:draw={{ duration: 1000}}  fill='none' stroke='black' />
		{/key}
		{#if tooltipData.data}
		<circle in:fade={{duration: 200}} out:fade={{duration:200}} cx={tooltipData.x} cy={tooltipData.y} r={8} />
		{/if}
		<rect width={innerWidth} height={innerHeight} fill='transparent' on:mousemove={handleMouse} on:mouseleave={handleMouseLeave} />
		</g>
	</svg>
</figure>


