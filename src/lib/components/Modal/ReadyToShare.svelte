<script lang="ts">
	import ShareButtons from '$lib/components/ShareButtons/index.svelte';
	import { babyDetails } from '$lib/stores/stores';
	export let url: string;
</script>

<div class="text-center">
	<h3 class="text-4xl bg-primary rounded-3xl py-4">Your game is ready to share!</h3>
	<p class="py-4 text-2xl">
		Send this link to your friends and family or use the share button below.
		{#if typeof window != 'undefined'}
			<a href={url} class="link text-primary">{window.location.origin}{url}</a>
		{/if}
	</p>
	<div class="modal-action">
		<ShareButtons parent1={$babyDetails.parent1} parent2={$babyDetails.parent2} />
	</div>
</div>
