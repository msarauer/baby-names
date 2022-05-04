<script lang="ts" context="module">
	import { createAnswerKey } from '$lib/functions/createAnswerKey';
	import { answerKey } from '$lib/stores/stores';
	export async function load({ fetch, params }) {
		const slug = params.slug;
		const res = await fetch(`/api/getName?game=${slug}`);
		const game = await res.json();

		if (res.ok) {
			const name = game[0].name;
			answerKey.set(createAnswerKey(name));

			return {
				props: {
					name
				}
			};
		}

		return {
			status: res.status,
			error: new Error('Could not find the game')
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
