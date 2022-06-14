<script lang="ts">
	import FaShareAlt from 'svelte-icons/fa/FaShareAlt.svelte';
	import MdErrorOutline from 'svelte-icons/md/MdErrorOutline.svelte';

	export let parent1 = '';
	export let parent2 = '';

	let text = parent2
		? `${parent1} and ${parent2}'s Babidle baby announcement`
		: `${parent1}'s Babidle baby announcement`;

	let errorMessage = false;

	const shareData = {
		title: 'Babidle, a fun way to announce your new baby!',
		text,
		url: window.location.href
	};

	const handleClick = async () => {
		errorMessage = false;
		try {
			await navigator.share(shareData);
		} catch (err) {
			errorMessage = true;
		}
	};
</script>

<button class="btn btn-primary gap-2 text-xl text-primary-content mb-2" on:click={handleClick}
	>Share
	<div class="w-6 h-6 text-primary-content stroke-current flex-shrink-0">
		<FaShareAlt />
	</div></button
>
{#if errorMessage}
	<div class="alert alert-error gap-2 text-error-content shadow-lg">
		<div>
			<div class="w-6 h-6 text-error-content stroke-current flex-shrink-0"><MdErrorOutline /></div>
			Error: Something went wrong when trying to share.
		</div>
	</div>
{/if}
