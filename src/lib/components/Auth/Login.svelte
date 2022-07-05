<script lang="ts">
	import { supabase } from '../../../supabase.js';
	import AuthForm from './AuthForm.svelte';

	let loading = false;
	let email: string;
	let password: string;

	const handleSubmit = async () => {
		loading = true;
		try {
			const { user, session, error } = await supabase.auth.signIn({ email, password });
			if (error) throw error;
			console.log('user', user);
			console.log('session', session);
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

<AuthForm {handleSubmit} bind:loading bind:email bind:password buttonText="Log in" />
