<script lang="ts">
	import { clickOutside } from './clickOutside.js';
	import { babyDetails } from '$lib/stores/stores';

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
		<p class="py-4 text-2xl">
			{$babyDetails.parent1}
			{$babyDetails.parent2 ? ' and ' + $babyDetails.parent2 + ' are' : ' is'} super excited to introduce
			their new baby {$babyDetails.gender}, {$babyDetails.babyName}
			{$babyDetails.otherNames ?? ''}!
		</p>
		<p class="py-4 text-2xl">
			Born May 1, 2022 {$babyDetails.weight &&
				' and weighing ' + $babyDetails.lbs + ' lbs - ' + $babyDetails.oz + ' oz'}.
		</p>
		<!-- <div class="modal-action">
			<button class="btn btn-secondary">Yay!</button>
		</div> -->
	</div>
</div>
