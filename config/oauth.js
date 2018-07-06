// expose our config directly to our application using module.exports
module.exports = {
    'facebookAuth': {
        'clientID': '2096025054002859', // your App ID
        'clientSecret': '33c7190d107ed04c35c755262044c9e4', // your App Secret
        'callbackURL': 'https://localhost:3000/users/auth/facebook/callback',
        'profileFields': ['id', 'email', 'name'] // For requesting permissions from Facebook API
    },

    'googleAuth': {
        'clientID': '395422291708-am47h7k8jkpm8o3bqde8s1mred63gvh3.apps.googleusercontent.com',
        'clientSecret': 'RIjoaqoVjQQxic0RAJoDvYkg',
        'callbackURL': 'https://localhost:4200/users/auth/google/callback'
    }

};
