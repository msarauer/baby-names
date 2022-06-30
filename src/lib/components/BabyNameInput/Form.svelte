<script lang="ts">
	import { supabase } from '../../../supabase';
	import Modal from '../Modal/Modal.svelte';
	import Input from './Input.svelte';
	import validate from './Validation';

	let fields = {
		babyName: '',
		babyMiddle: '',
		babyLast: '',
		parent1: '',
		parent2: '',
		gender: '',
		weight: false,
		lbs: null,
		oz: null,
		message: ''
	};
	let errors = { babyName: '', babyLast: '', parent1: '', gender: '', weight: '' };
	let valid = false;
	let submitted: boolean = false;
	let url: string;

	const handleSubmit = async () => {
		valid = true;

		const validation = validate(fields, errors);

		valid = validation.valid;
		errors = validation.errors;
		fields = validation.fields;

		if (valid) {
			let slug = (Math.random() + 1).toString(36).substring(7);
			const { data, error } = await supabase.from('babies').insert([{ ...fields, slug }]);
			if (error) {
				return console.error(error);
			}
			console.log(data[0].uuid);
			url = `/${slug}`;
			submitted = true;
		}
	};
</script>

<Modal content="ReadyToShare" isOpen={submitted} {url} />
<form class="form-control text-2xl max-w-xl m-auto" on:submit|preventDefault={handleSubmit}>
	<h2 class="text-5xl">Tell us about your new baby.</h2>
	<Input name="babyName" {fields} {errors} label="Baby's First Name*" />
	<Input name="babyMiddle" {fields} {errors} label="Baby's Middle Name" />
	<Input name="babyLast" {fields} {errors} label="Baby's Last Name*" />
	<div>
		<div class="flex mt-2">
			<label class="label" for="gender">Baby's gender*</label>
			<div class="btn-group">
				<input
					type="radio"
					name="gender"
					value="Boy"
					data-title="Boy"
					class="btn"
					bind:group={fields.gender}
					checked
				/>
				<input
					type="radio"
					name="gender"
					value="Girl"
					data-title="Girl"
					class="btn"
					bind:group={fields.gender}
				/>
			</div>
		</div>
		<div class="text-error">{errors.gender}</div>
	</div>
	<div>
		<fieldset class="flex">
			<label class="label flex justify-start"
				>Show birth weight?<input
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
						class="input max-w-[80px] mr-1"
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
						class="input max-w-[80px] mr-1"
						bind:value={fields.oz}
					/>
					oz
				</label>
			</div>
			<div class="errors">{errors.weight}</div>
		</fieldset>
	</div>
	<Input name="parent1" {fields} {errors} label="Your First Name*" />
	<Input name="parent2" {fields} {errors} label="Your Partner's First Name" />
	<!-- <div class="">
			<label class="label" for="message">Please enter a message for your friends (optional):</label>
			<textarea
				class="textarea textarea-secondary"
				rows="3"
				name="message"
				bind:value={fields.message}
			/>
		</div> -->
	<button class="btn btn-secondary my-3" disabled={submitted} type="submit">Submit</button>
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
</style>
