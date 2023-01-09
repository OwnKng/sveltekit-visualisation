<script>
    export let data

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    
    let selected
    let inputValue 
    let filteredValues = []

    function filterSelections() {
     
        let storageArr = []
	    if (inputValue) {
		    data.forEach(d => {
			    if (d.toLowerCase().startsWith(inputValue.toLowerCase())) {
				storageArr = [...storageArr, d]
			 }
		})
	} else {
        storageArr = data
    }

	filteredValues = storageArr
}

function onClick(val) {
        inputValue = val
        filteredValues = []
        dispatch('select', val);
    }

</script>

<form class='w-100 block'>
    <label class='block' for='country'>
        Select a country
    </label >
    <input id='country' class='w-[100%] outline outline-black ' bind:value={inputValue} on:input={filterSelections} placeholder='United Kingdom' />
    <div class='relative'>
        <ul class='absolute overflow-scroll w-[100%] z-10 outline outline-black ' >
            {#each filteredValues as filteredValue}
                <li class='outline w-[100%] bg-white' on:click={() => onClick(filteredValue)}>{filteredValue}</li>
            {/each}
        </ul>
    </div>
</form>