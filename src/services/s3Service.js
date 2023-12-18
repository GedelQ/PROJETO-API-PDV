const aws = require('aws-sdk')
const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3)

const s3 = new aws.S3({
	endpoint,
	credentials: {
		accessKeyId: process.env.PDV_KEY_ID,
		secretAccessKey: process.env.APP_PDV_KEY,
	}

})

const uploadFile = async (path, buffer, mimetype) => {
	const arquivo = await s3
		.upload({
			Bucket: process.env.BACKBLAZE_BUCKET,
			Key: path,
			Body: buffer,
			ContentType: mimetype
		})
		.promise()

	return {
		url: arquivo.Location,
		path: arquivo.Key
	}
}

const deleteFile = async (file) => {
	try {
		new URL(file)
		const path = new URL(file).pathname.substring(1)

		await s3.deleteObject({
			Bucket: process.env.BACKBLAZE_BUCKET,
			Key: path,
		}).promise()
	} catch (error) {
		throw new Error('A URL é inválida.')
	}
}



module.exports = { uploadFile, deleteFile }