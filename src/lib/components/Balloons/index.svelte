<script lang="ts">
	function random(num) {
		return Math.floor(Math.random() * num);
	}
	let balloonValues = [];

	for (let i = 0; i < 100; i++) {
		balloonValues.push({
			r: random(255),
			g: random(255),
			b: random(255),
			mt: random(200),
			ml: random(50),
			dur: random(5) + 5
		});
	}
</script>

<div id="balloon-container">
	{#each balloonValues as balloon}
		<div
			class="balloon"
			style=" background-color: rgba({balloon.r},{balloon.g},{balloon.b},0.7);
                    color: rgba({balloon.r},{balloon.g},{balloon.b},0.7); 
                    box-shadow: inset -7px -3px 10px rgba({balloon.r - 10},{balloon.g -
				10},{balloon.b - 10},0.7);
                    margin: {balloon.mt}px 0 0 {balloon.ml}px;
                    animation: float {balloon.dur}s ease-in infinite;
    "
		/>
	{/each}
</div>

<style>
	#balloon-container {
		height: 100vh;
		padding: 1em;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		overflow: hidden;
	}

	.balloon {
		height: 90px;
		width: 72px;
		border-radius: 75% 75% 70% 70%;
		position: relative;
	}

	.balloon:before {
		content: '';
		height: 60px;
		width: 1px;
		padding: 1px;
		background-color: #fdfd96;
		display: block;
		position: absolute;
		top: 90px;
		left: 0;
		right: 0;
		margin: auto;
	}

	.balloon:after {
		content: '▲';
		text-align: center;
		display: block;
		position: absolute;
		color: inherit;
		top: 85px;
		left: 0;
		right: 0;
		margin: auto;
	}
</style>
