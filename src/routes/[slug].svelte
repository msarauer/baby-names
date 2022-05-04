<script lang="ts" context="module">
	import { createAnswerKey } from '$lib/functions/createAnswerKey';
	import { answerKey } from '$lib/stores/stores';
	import { supabase } from '../supabase';
	export async function load({ params }) {
		const slug = params.slug;
		const { data, error } = await supabase.from('babies').select();
		if (error) {
			return {
				error: new Error('Could not find the game')
			};
		}
		answerKey.set(createAnswerKey(data[0].name));
		return {
			props: {
				game: data[0].name
			}
		};
	}
</script>

<script lang="ts">
	import GuessGrid from '$lib/components/GuessGrid/index.svelte';
	import Keyboard from '$lib/components/Keyboard/index.svelte';
</script>

<div>
	<GuessGrid />
	<Keyboard />
</div>
