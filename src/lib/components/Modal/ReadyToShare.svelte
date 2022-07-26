<script lang="ts">
	import ShareButtons from '$lib/components/ShareButtons/Share.svelte';
	import { babyDetails } from '$lib/stores/stores';
	import { page } from '$app/stores';

	export let url: string;
</script>

<div class="text-center">
	<h3 class="text-4xl bg-primary rounded-3xl py-4">Your game is ready to share!</h3>
	<p class="py-4 text-2xl">
		Send this link to your friends and family or use the share button below.
		<a href={url} class="link text-primary">{$page.url.origin + url}</a>
	</p>
	<div class="modal-action">
		<ShareButtons
			first_name={$babyDetails.first_name}
			partners_name={$babyDetails.partners_name}
			url={$page.url.origin + url}
		/>
	</div>
</div>
