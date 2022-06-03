var contentful = require('contentful');

var client = contentful.createClient({
    space: 'rwgie9mbh5yo',
    accessToken: 'v7TRI_Ex99jhwO38ird5AYjeFFDECrPw0PvI3aIdTEk',
});

type Response = {
    items: []
}

export const getProducts = () => client.getEntries().then((response: Response) => response.items)
