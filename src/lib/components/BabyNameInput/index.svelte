<script lang="ts">
	import { createAnswerKey } from '$lib/functions/createAnswerKey';
	import { answerKey } from '../../stores/stores';

	let babyName: string = '';

	const handleSubmit = async () => {
		let slug = (Math.random() + 1).toString(36).substring(7);
		const res = await fetch('https://black-coast-06bf6a410.1.azurestaticapps.net//api/postName', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: babyName,
				slug
			})
		});
		const game = await res.json();
	};
</script>

<form class="name-input" on:submit|preventDefault={handleSubmit}>
	<input bind:value={babyName} />
	<button type="submit">Submit</button>
</form>

<style>
	.name-input {
		display: flex;
		justify-content: center;
		margin-bottom: 3em;
	}
</style>
