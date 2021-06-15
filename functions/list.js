'use strict';

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.list = (event, context, callback) => {
    const params = {
        TableName: 'url-db'
    };

    dynamoDB.scan(params, (err, data) => {
        if (err) {
            console.log(err);
            callback(new Error("Could not fetch data."));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Items)
        };
        callback(null, response);
    })
}