# Serverless URL shortener


- Leverages the serverless framework to deploy the lambda functions onto AWS

## How to use the URL shortener - 

To generate the short URL - `curl -X POST https://4ti0bow8tf.execute-api.us-east-2.amazonaws.com/dev/functions --data '{ "long_url": <LONG_URL> }'`

List the long URLs and their shortened URLs - `curl -X GET https://4ti0bow8tf.execute-api.us-east-2.amazonaws.com/dev/functions/`

Share and use the shortened URL in the web browser to get redirected to the long URL.
