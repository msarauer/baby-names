<script lang="ts">
	export let url: string;
</script>

<div class="flex flex-col m-auto items-center">
	<!-- can't access window on the server, so check if undefined -->
	{#if typeof window != 'undefined'}
		<p>Congrats on the new baby! Please share this link with your friends and family:</p>
		<a href={url} class="link">{window.location.origin}{url}</a>
	{/if}
</div>

<style>
</style>
