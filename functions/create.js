'use strict';

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const base_url = process.env.COMMON_URL;

module.exports.create = (event, context, callback) => {
    const uid = (length = 5)=> {
        return Math.random().toString(20).substr(2, length);
    }
    
    const data = JSON.parse(event.body);
    const timestamp = new Date().getTime();
    const shortid = uid(5);
    const short_url = base_url + shortid;
    const long_url = data.long_url;
    console.log("URL: ", long_url);

    const params = {
        TableName: 'url-db',
        Item: {
            short_id: shortid,
            short_url: short_url,
            long_url: long_url,
            timestamp: timestamp,
            hits: parseInt(0)
        }
    };
    
    dynamoDB.put(params, (err, data) => {
        if (err) {
            console.log("Error because: ", JSON.stringify(err, null, 2));
            callback(new Error("Could not shorten the link."));
            return;
        }
        
        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Item)
        };
        callback(null, response);
        return response;
    });
}