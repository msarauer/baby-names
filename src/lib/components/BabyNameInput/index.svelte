<script lang="ts">
	import { createAnswerKey } from '$lib/functions/createAnswerKey';
	import { answerKey } from '../../stores/stores';

	let babyName: string = '';
	let result = null;

	const handleSubmit = async () => {
		let slug = (Math.random() + 1).toString(36).substring(7);
		const res = await fetch('http://localhost:7071/api/postName', {
			method: 'POST',
			body: JSON.stringify({
				name: babyName,
				slug
			})
		});
		const game = await res.json();
		result = JSON.stringify(game);
		console.log(game);
	};
</script>

<form class="name-input" on:submit|preventDefault={handleSubmit}>
	<input bind:value={babyName} />
	<button type="submit">Submit</button>
	{result}
</form>

<style>
	.name-input {
		display: flex;
		justify-content: center;
		margin-bottom: 3em;
	}
</style>
