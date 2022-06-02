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
			} else if (fields.lbs > 20 || fields.lbs < 1) {
				valid = false;
				errors.weight = 'You must enter both lbs and oz.';
			} else {
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

<form class="form-control" on:submit|preventDefault={handleSubmit}>
	{#if submitted}
		<div class="congrats">
			<p>Congrats on the new baby! Please share this link with your friends and family:</p>
			<a href={url}>{window.location.origin}{url}</a>
		</div>
	{:else}
		<div class="">
			<label class="label" for="babyName">Please enter the name of your new baby:</label>
			<input class="input" name="babyName" bind:value={fields.babyName} />
			<div class="errors">{errors.babyName}</div>
		</div>
		<div class="">
			<label class="label" for="gender">Please select the gender of the new baby:</label>
			<select name="gender" class="select" bind:value={fields.gender}>
				<option>Boy</option>
				<option>Girl</option>
			</select>
			<div class="errors">{errors.gender}</div>
		</div>
		<div class="">
			<fieldset>
				<legend>Check the box to enter the babies birth weight (optional):</legend>
				<label class="label flex justify-start"
					>Enter weight?<input
						class="checkbox checkbox-secondary ml-1"
						type="checkbox"
						bind:checked={fields.weight}
					/></label
				>
				<div class="weight flex">
					<label class="label gap-1">
						<input
							disabled={!fields.weight}
							name="lbs"
							type="number"
							min="1"
							max="20"
							class="input max-w-[80px]"
							bind:value={fields.lbs}
						/>
						lbs
					</label>
					<label class="label">
						<input
							disabled={!fields.weight}
							name="oz"
							type="number"
							min="0"
							max="15.99"
							class="input max-w-[80px]"
							bind:value={fields.oz}
						/>
						oz
					</label>
				</div>
				<div class="errors">{errors.weight}</div>
			</fieldset>
		</div>
		<div class="">
			<label class="label" for="parent1">Please enter your name:</label>
			<input name="parent1" class="input" bind:value={fields.parent1} />
			<div class="errors">{errors.parent1}</div>
		</div>
		<div class="">
			<label class="label" for="parent2">Please enter your partner's name (optional):</label>
			<input name="parent2" class="input" bind:value={fields.parent2} />
		</div>
		<div class="">
			<label class="label" for="message">Please enter a message for your friends (optional):</label>
			<textarea rows="3" name="message" bind:value={fields.message} />
		</div>

		<button class="btn btn-secondary" type="submit">Submit</button>
	{/if}
</form>

<style>
	.congrats {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 2em;
	}
	button {
		font-size: 20px;
		font-family: 'Nanum Pen Script', cursive;
	}

	.errors {
		font-size: 16px;

		color: #d91b42;
	}
</style>
