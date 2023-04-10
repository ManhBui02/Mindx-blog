const Airtable = require('airtable');

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'pat2eFzkkKzJfxiQ1.7d953e5dc55586eaee10a7096814eb8ffb7f3c52931f7f29cd6c7952ce23ffb5'
});

const base = Airtable.base('app9xZtuNpgq7FASj');

export default base;