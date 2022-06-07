var contentful = require('contentful');

var client = contentful.createClient({
    space: 'xxxxxxxxxxxxxxx',
    accessToken: 'xxxxxxxxxxxxxxx',
});

type Response = {
    items: []
}

export const getProducts = () => client.getEntries().then((response: Response) => response.items)
