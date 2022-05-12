<script lang="ts">
	import BabyNameInput from '$lib/components/BabyNameInput/index.svelte';
</script>

<div class="layout">
	<BabyNameInput />
</div>

<style>
	:global(:root) {
		--boy-color: rgb(191, 243, 245);
		--girl-color: rgb(220, 36, 177);
	}
</style>
