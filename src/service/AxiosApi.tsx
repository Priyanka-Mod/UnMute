var client_id = 'eeb5a1f0b4d24cc89d669a18f98daa66';
var client_secret = 'c4ac0f4fcb64418abf6d23e185fd90f1';


export var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};


