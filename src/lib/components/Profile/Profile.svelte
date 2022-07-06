<script>
	import { supabase } from '../../../supabase';
	import { user } from '$lib/stores/authStore';

	let loading = true;
	let first_name = null;
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

			let { error } = await supabase.from('profiles').upsert(updates, {
				returning: 'minimal' // Don't return the value after inserting
			});

			if (error) throw error;
		} catch (error) {
			alert(error.message);
		} finally {
			loading = false;
		}
	}

	async function signOut() {
		try {
			loading = true;
			let { error } = await supabase.auth.signOut();
			if (error) throw error;
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
<form
	use:getProfile
	class="form-control text-2xl max-w-xl m-auto"
	on:submit|preventDefault={updateProfile}
>
	<div>
		<label for="email">Email</label>
		<input id="email" type="text" value={$user.email} disabled />
	</div>
	<div>
		<label for="first_name">First Name</label>
		<input id="first_name" type="text" bind:value={first_name} />
	</div>
	<div>
		<label for="partners_name">Your Partner's First Name</label>
		<input id="partners_name" type="text" bind:value={partners_name} />
	</div>

	<div>
		<input
			type="submit"
			class="button block primary"
			value={loading ? 'Loading ...' : 'Update'}
			disabled={loading}
		/>
	</div>

	<div>
		<button class="button block" on:click={signOut} disabled={loading}> Sign Out </button>
	</div>
</form>
