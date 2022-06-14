<script lang="ts">
	import { babyDetails } from '$lib/stores/stores';
	import ShareButtons from '$lib/components/ShareButtons/index.svelte';
</script>

<div class="text-center">
	<h3 class="text-4xl text-center">You got it!</h3>
	<p class="py-4 text-2xl">
		<span class="text-4xl text-accent capitalize">{$babyDetails.parent1}</span>
		{#if $babyDetails.parent2}
			and <span class="text-4xl text-accent">{$babyDetails.parent2}</span> are
		{:else}
			is
		{/if}
		super excited to introduce their new baby
		<span class="lowercase">
			{$babyDetails.gender},
			<span class="text-4xl capitalize text-primary underline">{$babyDetails.babyName}</span>
			{$babyDetails.otherNames ?? 'Dale Sarauer'}
		</span>!
	</p>
	<p class="py-4 text-2xl">
		Born May 1, 2022{$babyDetails.weight
			? ' and weighing ' + $babyDetails.lbs + ' lbs - ' + $babyDetails.oz + ' oz'
			: ''}.
	</p>
	<div class="modal-action">
		<ShareButtons />
	</div>
</div>
