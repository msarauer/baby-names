// import adapter from '@sveltejs/adapter-auto';
import azure from 'svelte-adapter-azure-swa';
import preprocess from 'svelte-preprocess';
//test

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],
	kit: {
		adapter: azure({
			customStaticWebAppConfig: {
				globalHeaders: {
					'X-Content-Type-Options': 'nosniff',
					'X-Frame-Options': 'DENY',
					'Content-Security-Policy':
						"default-src https: 'unsafe-eval' 'unsafe-inline'; object-src 'none'"
				}
			}
		})
	}
};

export default config;
