import dotenv from 'dotenv';
dotenv.config();
import AWS from 'aws-sdk';
AWS.config.update({
accessKeyId: process.env.ACCESS_KEY,
secretAccessKey: process.env.SECRET_KEY,
region: process.env.REGION,
});

const s3 = new AWS.S3();

export default  s3 ;