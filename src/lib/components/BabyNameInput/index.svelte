<script lang="ts">
	import { supabase } from '../../../supabase';

	let babyName: string = '';
	let submitted: boolean = false;
	let url: string;

	const handleSubmit = async () => {
		let slug = (Math.random() + 1).toString(36).substring(7);
		let name = babyName.toLowerCase();
		const { data, error } = await supabase.from('babies').insert([{ name, slug }]);
		if (error) {
			return console.error(error);
		}
		submitted = true;
		url = `/${slug}`;
	};
</script>

<form class="name-input" on:submit|preventDefault={handleSubmit}>
	{#if submitted}
		<div class="congrats">
			<p>Congrats on the new baby! Please share this link with your friends and family:</p>
			<a href={url}>{window.location.origin}{url}</a>
		</div>
	{:else}
		<input bind:value={babyName} />
		<button type="submit">Submit</button>
	{/if}
</form>

<style>
	.congrats {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 2em;
	}
	.name-input {
		display: flex;
		justify-content: center;
		margin-bottom: 3em;
	}
</style>
