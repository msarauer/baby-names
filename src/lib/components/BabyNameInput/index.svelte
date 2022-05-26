<script lang="ts">
	import { bind } from 'svelte/internal';
	import { supabase } from '../../../supabase';

	let fields = {
		babyName: '',
		parent1: '',
		parent2: '',
		gender: '',
		weight: false,
		lbs: null,
		oz: null,
		message: ''
	};
	let errors = { babyName: '', parent1: '', gender: '', weight: '' };
	let valid = false;
	let submitted: boolean = false;
	let url: string;

	const handleSubmit = async () => {
		valid = true;

		//validate baby name
		if (fields.babyName.trim().length > 9) {
			valid = false;
			errors.babyName = 'Unfortunately, we dont suppport names longer than 9 letters at this time.';
		} else if (fields.babyName.trim().length < 1) {
			valid = false;
			errors.babyName = 'You must enter a name for the baby.';
		} else {
			errors.babyName = '';
		}
		//validate parent name
		if (fields.parent1.trim().length < 1) {
			valid = false;
			errors.parent1 = 'You must enter your name.';
		} else {
			errors.parent1 = '';
		}

		//validate gender
		if (fields.gender === '') {
			valid = false;
			errors.gender = 'You must select a gender.';
		} else {
			errors.gender = '';
		}

		//validate weight
		if (fields.weight) {
			if (fields.lbs === null || fields.oz === null) {
				valid = false;
				errors.weight = 'You must enter both lbs and oz.';
			} else if(fields.lbs > 20 || fields.lbs < 1) {
				valid = false;
				errors.weight = 'You must enter both lbs and oz.';
			}
			
			else {
				errors.weight = '';
			}
		}

		if (valid) {
			let slug = (Math.random() + 1).toString(36).substring(7);
			const { data, error } = await supabase
				.from('babies')
				.insert([{ babyName: fields.babyName.toLowerCase(), slug }]);
			if (error) {
				return console.error(error);
			}
			url = `/${slug}`;
			submitted = true;
		}
	};
</script>

<form class="input-form" on:submit|preventDefault={handleSubmit}>
	{#if submitted}
		<div class="congrats">
			<p>Congrats on the new baby! Please share this link with your friends and family:</p>
			<a href={url}>{window.location.origin}{url}</a>
		</div>
	{:else}
		<div class="input-group">
			<label for="babyName">Please enter the name of your new baby:</label>
			<input name="babyName" bind:value={fields.babyName} />
			<div class="errors">{errors.babyName}</div>
		</div>
		<div class="input-group">
			<label for="gender">Please select the gender of the new baby:</label>
			<select name="gender" bind:value={fields.gender}>
				<option>Boy</option>
				<option>Girl</option>
			</select>
			<div class="errors">{errors.gender}</div>
		</div>
		<div class="input-group">
			<fieldset>
				<legend>Check the box to enter the babies birth weight (optional):</legend>
				<label>Enter weight?<input type="checkbox" bind:checked={fields.weight} /></label>
				<div class="weight">
					<label>
						<input disabled={!fields.weight} name="lbs" type="number" min='1' max='20' bind:value={fields.lbs} />
						lbs
					</label>

					<label>
						<input disabled={!fields.weight} name="oz" type="number" min='0' max='15.99' bind:value={fields.oz} />
						oz
					</label>
				</div>
				<div class="errors">{errors.weight}</div>
			</fieldset>
		</div>
		<div class="input-group">
			<label for="parent1">Please enter your name:</label>
			<input name="parent1" bind:value={fields.parent1} />
			<div class="errors">{errors.parent1}</div>
		</div>
		<div class="input-group">
			<label for="parent2">Please enter your partner's name (optional):</label>
			<input name="parent2" bind:value={fields.parent2} />
		</div>
		<div class="input-group">
			<label for="message">Please enter a message for your friends (optional):</label>
			<textarea rows="3" name="message" bind:value={fields.message} />
		</div>

		<button type="submit">Submit</button>
	{/if}
</form>

<style>
	.input-form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 10px;
		max-width: 400px;
		margin: auto;
		padding: 5px;
		font-size: 16px;
	}
	.input-group {
		display: flex;
		flex-direction: column;
	}
	.weight > label > input {
		width: 50px;
	}
	label {
		font-size: 30px;
	}
	input {
		width: 100%;
		box-sizing: border-box;
		font-size: 20px;
	}
	input[type='checkbox'] {
		width: 25px;
		height: 25px;
	}
	select {
		font-family: 'Nanum Pen Script', cursive;
		font-size: 20px;
	}
	.congrats {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 2em;
	}
	button {
		font-family: 'Nanum Pen Script', cursive;
		border: none;
		font-size: 20px;
		width: 150px;
		background: none;
		border: 1px solid black;
		margin: auto;
		padding: 2px;
		border-radius: 100px;
		transition: 0.2s;
	}
	button:hover {
		color: var(--girl-color);
		background: var(--boy-color);
		border: 1px solid var(--girl-color);
	}
	.errors {
		font-size: 16px;

		color: #d91b42;
	}
</style>
