<script lang="ts">
	export let letter: string | any;
</script>

<button>{letter.toUpperCase()}</button>

<style>
	button {
		background-color: rgb(122, 122, 122);
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		border-radius: 7px;
		min-width: 38px;
		height: 48px;
		cursor: pointer;
		border: none;
		font-family: 'Roboto';
		font-size: 14px;
	}
</style>
