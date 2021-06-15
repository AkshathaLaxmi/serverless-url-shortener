'use strict';

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.retreive = async (event, context, callback) => {
    const short_id = event.pathParameters.short_id;
    
    const params = {
        TableName: 'url-db',
        Key: {
            short_id: short_id
        }
    };
    
    var item = await dynamoDB.get(params).promise();
    const long_url = item.Item.long_url;

    const updateParams = {
        TableName: 'url-db',
        Key: {
            short_id: short_id
        },
        UpdateExpression: 'set hits = hits + :val',
        ExpressionAttributeValues: {':val': 1}
    };

    try {
        await dynamoDB.update(updateParams).promise();
    } catch (err) {
        console.log(err);
    }

    const response = {
        statusCode: 301,
        "headers": {
            "location": long_url
        },
        body: JSON.stringify({ "short_id": short_id, "location": long_url })
    }
    callback(null, response);
}