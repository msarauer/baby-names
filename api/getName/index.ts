import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import * as pg from 'pg';

const httpTrigger: AzureFunction = async function (
	context: Context,
	req: HttpRequest
): Promise<void> {
	context.log('HTTP trigger function processed a request.');
	const config = {
		host: process.env['PG_SERVER_NAME'],
		user: process.env['PG_USERNAME'],
		password: process.env['PG_PASSWORD'],
		database: 'baby_names',
		port: 5432,
		ssl: true
	};

	// const values = [req.query.game];

	const querySpec = {
		text: 'SELECT * FROM babies'
		// values: values
	};

	try {
		// Create a pool of connections
		const pool = new pg.Pool(config);

		// Get a new client connection from the pool
		const client = await pool.connect();

		// Execute the query against the client
		const result = await client.query(querySpec);

		// Release the connection
		client.release();

		// Return the query results back to the caller as JSON
		context.res = {
			status: 200,
			isRaw: true,
			body: result.rows,
			headers: {
				'Content-Type': 'application/json'
			}
		};
	} catch (err) {
		context.log(err.message);
	}
};

export default httpTrigger;
