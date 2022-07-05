<script lang="ts">
	import { supabase } from '../../../supabase.js';

	let loading = false;
	let email: string;
	let password: string;

	const handleLogin = async () => {
		loading = true;
		try {
			const { error } = await supabase.auth.signUp({ email, password });
			if (error) throw error;
		} catch (error) {
			console.log(error);
			alert(error.error_description || error.message);
		} finally {
			loading = false;
		}
	};
</script>

<h1>Sign Up</h1>
<p>Enter a username and password to sign up</p>

<form on:submit|preventDefault={handleLogin}>
	<div><label for="email">Email<input name="email" type="email" bind:value={email} /></label></div>
	<div>
		<label for="password"
			>Password<input name="password" type="password" bind:value={password} /></label
		>
	</div>
	{#if loading}
		loading
	{:else}
		<button>Sign up</button>
	{/if}
</form>
