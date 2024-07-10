import mongoose from "mongoose";
const { Schema, model } = mongoose;
import profile_default from ".../public/profile_default.png";

const userSchema = new Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		required: true,
	},
	profile_image: {
		type: String,
		default: profile_default,
	},
	pronouns: String,
	user_location: String,
	phone_number: String,
	about_me: String,
	education: [
		{
			school_name: String,
			degree: String,
			graduation_Date: Date,
			current: {
				type: Boolean,
				default: false,
			},
		},
	],

	websites: [
		{
			website_name: String,
			webiste_url: String,
		},
	],

	skills: [String],
	experience: [
		{
			company: String,
			start_date: Date,
			end_Date: Date,
			present: {
				type: Boolean,
				default: false,
			},
			job_title: String,
			employment_type: String,
			description: String,
			skills: [String],
		},
	],

	projects: [
		{
			project_img: String,
			name: String,
			description: String,
			end_date: Date,
			skills: [String],
		},
	],
});

const User = model("User", userSchema);
export default User;
