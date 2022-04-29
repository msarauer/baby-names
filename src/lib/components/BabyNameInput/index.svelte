<script lang="ts">
	import { createAnswerKey } from '$lib/functions/createAnswerKey';
	import { answerKey } from '../../stores/stores';

	let babyName: string = '';
	const handleSubmit = () => {
		answerKey.set(createAnswerKey(babyName));
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
