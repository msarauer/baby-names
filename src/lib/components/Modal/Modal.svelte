<script lang="ts">
	import { clickOutside } from './clickOutside.js';

	import Success from './Success.svelte';
	import Fail from './Fail.svelte';

	interface obj {
		[key: string]: any;
	}

	export let isOpen: boolean;
	export let content: string;

	const components: obj = {
		Success,
		Fail
	};
</script>

<div class="modal" class:modal-open={isOpen}>
	<div
		class="modal-box"
		use:clickOutside
		on:click_outside={() => {
			isOpen = false;
		}}
	>
		<svelte:component this={components[content]} />
		<button
			for="my-modal-3"
			class="btn btn-secondary btn-sm btn-circle absolute right-2 top-2"
			on:click={() => {
				isOpen = false;
			}}>✕</button
		>
	</div>
</div>
