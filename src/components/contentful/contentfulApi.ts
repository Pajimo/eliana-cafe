var contentful = require('contentful');

var client = contentful.createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_CONTENT_DELIVERY_API,
});

type Response = {
    items: []
}

export const getProducts = () => client.getEntries().then((response: Response) => response.items)
