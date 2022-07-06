<script lang="ts">
	import { supabase } from '../../../supabase.js';
	import AuthForm from './AuthForm.svelte';
	import { newUser } from '$lib/stores/authStore';

	let loading = false;
	let email: string;
	let password: string;

	const handleSubmit = async () => {
		loading = true;

		try {
			const { error } = await supabase.auth.signUp({ email, password });
			if (error) throw error;
			else alert('Please check your email to confirm your account.');
		} catch (error) {
			console.log(error);
			alert(error.error_description || error.message);
		} finally {
			loading = false;
			password = '';
			email = '';
		}
	};
</script>

<AuthForm
	{handleSubmit}
	switchMessage="Already have an account?"
	switchButton="Login"
	bind:loading
	bind:email
	bind:password
	buttonText="Create a free account"
/>
