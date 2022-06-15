<script lang="ts">
	import { clickOutside } from './clickOutside.js';
	import { Confetti } from 'svelte-confetti';

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
		{#if content === 'Success'}
			<div
				style="
					position: fixed;
					top: -50px;
					left: 0;
					height: 100%;
					width: 100%;
					display: flex;
					justify-content: center;
					overflow: hidden;
					pointer-events: none;"
			>
				<Confetti
					x={[-5, 5]}
					y={[0, 0.1]}
					delay={[500, 2000]}
					duration="5000"
					amount="300"
					fallDistance="100vh"
					infinite
				/>
			</div>
		{/if}
		<button
			for="my-modal-3"
			class="btn btn-secondary btn-sm btn-circle absolute right-2 top-2"
			on:click={() => {
				isOpen = false;
			}}>✕</button
		>
		<svelte:component this={components[content]} />
		<!-- <div class="modal-action">
			<button class="btn btn-secondary">Yay!</button>
		</div> -->
	</div>
</div>
