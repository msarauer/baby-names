<script lang="ts">
	import Header from '$lib/components/Header/Header.svelte';
	import '../styles/app.css';
</script>

<Header />
<div class="container mx-auto px-4">
	<slot />
</div>

<style>
	:global(:root) {
		--boy-color: rgb(191, 243, 245);
		--girl-color: rgb(220, 36, 177);
	}
</style>
