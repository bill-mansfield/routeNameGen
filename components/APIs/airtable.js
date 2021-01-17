import Airtable from 'airtable';

const base = new Airtable({apiKey: 'keywocKFwPXxgQPOe'}).base('appKdkAWeTiUMtTOI');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keywocKFwPXxgQPOe'
});

export default base