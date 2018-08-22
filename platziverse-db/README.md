# platziverse-db

## Usage

``` js
const setupDatabase = required('platziverse-db')

setupDatabase(config)
	.then( db => {
		const { Agent, Metric} = db
	})
	.catch( err => {
		console.error(err)
	})
```