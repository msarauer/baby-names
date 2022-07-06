<script>
	import { supabase } from '../../../supabase';
	import { user } from '$lib/stores/authStore';

	let loading = true;
	let first_name = null;
	export let showBabyInput;
	let partners_name = null;
	let avatar_url = null;

	async function getProfile() {
		try {
			loading = true;
			const user = supabase.auth.user();

			let { data, error, status } = await supabase
				.from('profiles')
				.select(`first_name, avatar_url, partners_name`)
				.eq('id', user.id)
				.single();

			if (error && status !== 406) throw error;

			if (data) {
				first_name = data.first_name;
				if (data.first_name) showBabyInput = true;
				avatar_url = data.avatar_url;
				partners_name = data.partners_name;
			}
		} catch (error) {
			alert(error.message);
		} finally {
			loading = false;
		}
	}

	async function updateProfile() {
		try {
			loading = true;
			const user = supabase.auth.user();

			const updates = {
				id: user.id,
				first_name,
				partners_name,
				avatar_url,
				updated_at: new Date()
			};

			let { data, error } = await supabase.from('profiles').upsert(updates);

			if (error) throw error;

			if (data[0].first_name) showBabyInput = true;
			else showBabyInput = false;
		} catch (error) {
			alert(error.message);
		} finally {
			loading = false;
		}
	}
</script>

<h2 class="text-center text-5xl">
	Welcome{#if first_name}, {first_name}{/if}
</h2>
<p class=" text-3xl">First, please tell us a bit about yourself.</p>
<form use:getProfile class="form-control text-2xl " on:submit|preventDefault={updateProfile}>
	<div>
		<label class="label" for="email">Email</label>
		<input
			class="w-full bg-white px-2 rounded-none border-2 border-secondary disabled:bg-slate-200 disabled:border-primary"
			id="email"
			type="text"
			value={$user.email}
			disabled
		/>
	</div>
	<div>
		<label class="label" for="first_name">First Name</label>
		<input
			class="w-full bg-white px-2 rounded-none border-2 border-secondary"
			id="first_name"
			type="text"
			bind:value={first_name}
		/>
	</div>
	<div>
		<label class="label" for="partners_name">Your Partner's First Name</label>
		<input
			class="w-full bg-white px-2 rounded-none border-2 border-secondary"
			id="partners_name"
			type="text"
			bind:value={partners_name}
		/>
	</div>

	<div class="mt-2">
		<input
			type="submit"
			class="btn btn-outline bg-white  text-xl"
			value={loading ? 'Loading ...' : 'Update'}
			disabled={loading}
		/>
	</div>
</form>
