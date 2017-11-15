const https = require('https');
const _ = require('lodash');
const nodeload = require('nodeload');
const slugs = require('./slugs.json');

// randomize and copy list of slugs
let shuffled = _.shuffle(slugs);

let host = 'web-dispensary.leafly.com'; 

const makePath = () => {
    let slug = shuffled.shift();
    return `/dispensary/${slug.slug}/menu`;
}


let opts = {
    name: 'Menu load test - 60 per minute',
    numUsers: 10,
    timeLimit: 120,
    targetRps: 2,
    requestGenerator: (client) => {
        return https.get({protocol: 'https:', host: host, path: makePath()})
    }
};

let test = nodeload.run(opts);
test.on('end', () => { process.exit(0); });