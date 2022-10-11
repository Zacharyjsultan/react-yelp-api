const fetch = require('node-fetch');
require('dotenv').config({ path: `.env.development.local` });

const handler = async (event) => {
  const search = event.queryStringParameters.search;
  const zip = event.queryStringParameters.zip;
  try {
    const response = await fetch(
      // need to add ${search} to url
      `https://api.yelp.com/v3/businesses/search?categories=restaurants&location=${zip}&term=${search}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data.businesses),
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch la data?!' }),
    };
  }
  // add code here to fetch data from yelp API
  // be sure to include the parameters from event.queryStringParameters
};

module.exports = { handler };
