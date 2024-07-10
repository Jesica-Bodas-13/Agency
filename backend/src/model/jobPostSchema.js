import mongoose from "mongoose";
const { Schema, model } = mongoose;

const jobPostSchema = new Schema({
	company_logo: String,
	company_name: {
		type: String,
		required: true,
	},
	job_location: {
		type: String,
		required: true,
	},
	job_type: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	requirments: {
		type: String,
		required: true,
	},
	qualifications: {
		type: String,
		required: true,
	},
});

const jobPost = model("User", jobPostSchema);
export default jobPost;
