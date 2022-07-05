<script lang="ts">
	import { supabase } from '../../../supabase.js';

	let loading = false;
	let email: string;
	let password: string;

	const handleLogin = async () => {
		loading = true;
		try {
			console.log(email, password);
			const { user, session, error } = await supabase.auth.signIn({ email, password });
			if (error) throw error;
			console.log('user', user);
			console.log('session', session);
		} catch (error) {
			console.log(error);
			alert(error.error_description || error.message);
		} finally {
			loading = false;
		}
	};
</script>

<h1>Login</h1>
<p>Enter your username and password to login</p>

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
		<button>Log In</button>
	{/if}
</form>
