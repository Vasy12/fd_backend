const express = require( 'express' );
const router = require( './router' );
const PORT = process.env.NODE_ENV || 3000;

const app = express();
app.use( express.json() );
app.use( router );
app.listen( PORT, () => {
  console.log( `Example app listening on port ${PORT}!` );
} );



