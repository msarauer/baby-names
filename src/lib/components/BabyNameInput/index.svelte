<script lang="ts">
	import { createAnswerKey } from '$lib/functions/createAnswerKey';
	import { answerKey } from '../../stores/stores';
	import { supabase } from '../../../supabase';

	let babyName: string = '';

	const handleSubmit = async () => {
		let slug = (Math.random() + 1).toString(36).substring(7);
		let name = babyName;
		const { data, error } = await supabase.from('babies').insert([{ name, slug }]);
		if (error) {
			return console.error(error);
		}
		console.log(data);
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
