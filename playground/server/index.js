const fetch = require("node-fetch")
fetch("https://5y24cccpg5.execute-api.eu-central-1.amazonaws.com/default/model-inference").then(async result => {
    const json = await result.json();
    console.log(json)
}).catch(err => {
        console.error(err)
    }
);
