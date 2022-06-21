<script lang="ts">
	import { babyDetails } from '$lib/stores/stores';
	import ShareButtons from '$lib/components/ShareButtons/index.svelte';
	import { Confetti } from 'svelte-confetti';
</script>

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
<div class="text-center">
	<h3 class="text-4xl bg-primary rounded-3xl py-4">You got it!</h3>
	<p class="py-4 text-2xl">
		<span class="text-4xl text-accent capitalize">{$babyDetails.parent1}</span>
		{#if $babyDetails.parent2}
			and <span class="text-4xl text-accent">{$babyDetails.parent2}</span> are
		{:else}
			is
		{/if}
		super excited to introduce their new baby
		<span class="lowercase"> {$babyDetails.gender},</span>
		<span class="text-4xl capitalize text-primary underline">
			{$babyDetails.babyName}
			{$babyDetails.babyMiddle}
			{$babyDetails.babyLast}!
		</span>
	</p>
	<p class="py-4 text-2xl">
		Born May 1, 2022{$babyDetails.weight
			? ' and weighing ' + $babyDetails.lbs + ' lbs - ' + $babyDetails.oz + ' oz'
			: ''}.
	</p>

	<div class="modal-action">
		<ShareButtons parent1={$babyDetails.parent1} parent2={$babyDetails.parent2} />
	</div>
</div>
