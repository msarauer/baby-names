<script lang="ts">
	import Header from '$lib/components/Header/index.svelte';
	import '../styles/app.css';
</script>

<Header />
<div class="container">
	<slot />
</div>

<style>
	.container {
		max-width: 90%;
		margin: auto;
	}
</style>
