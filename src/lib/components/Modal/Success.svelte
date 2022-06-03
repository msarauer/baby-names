<script lang="ts">
	import { clickOutside } from './clickOutside.js';

	export let isSuccessOpen = true;
</script>

<div class="modal" class:modal-open={isSuccessOpen}>
	<div
		class="modal-box"
		use:clickOutside
		on:click_outside={() => {
			isSuccessOpen = false;
		}}
	>
		<button
			for="my-modal-3"
			class="btn btn-secondary btn-sm btn-circle absolute right-2 top-2"
			on:click={() => {
				isSuccessOpen = false;
			}}>✕</button
		>
		<h3 class="font-bold text-3xl">You figured it out!</h3>
		<p class="py-4">
			Dale and Denise are super excited to introduce their new baby boy, Mitchel Alexander Sarauer!
		</p>
		<p class="py-4">Born May 1, 2022 and weighing 11 lb 12 oz.</p>
		<!-- <div class="modal-action">
			<button class="btn btn-secondary">Yay!</button>
		</div> -->
	</div>
</div>
