<script>
	import FaShareAlt from 'svelte-icons/fa/FaShareAlt.svelte';
	import MdErrorOutline from 'svelte-icons/md/MdErrorOutline.svelte';

	let errorMessage = false;

	const shareData = {
		title: 'MDN',
		text: 'Learn web development on MDN!',
		url: 'https://developer.mozilla.org'
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
