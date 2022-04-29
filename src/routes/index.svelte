<script lang="ts">
	import GuessGrid from '$lib/components/GuessGrid/index.svelte';
	import Keyboard from '$lib/components/Keyboard/index.svelte';
	import BabyNameInput from '$lib/components/BabyNameInput/index.svelte';
</script>

<div class="layout">
	<BabyNameInput />
	<GuessGrid />
	<Keyboard />
</div>

<style>
	.layout {
	}
</style>
