import User from "./userSchema";
import UserSchema from "./userSchema";
// import bcrypt from "bcrypt";
// const saltRounds = 10;

// userData passowrd need to hash it before sending it to the database.
// try {
// 	const salt = await bcrypt.genSalt(saltRounds);
// 	userData.password = await bcrypt.hash(userData.password, salt);
// } catch (e) {
// 	console.log(e);
// 	// throw `${e}`
// }

export async function signUp(userData) {
	const userCreated = await UserSchema.create(userData);
	if (!userCreated) {
		throw `User Not Created!`;
	} else {
		return userCreated;
	}
}

// export async function login(email, password)

export async function deleteUser(email) {
	try {
		const deletedUser = await User.findOneAndDelete({ email });
		// console.log("User deleted:", deletedUser);
		return deletedUser;
	} catch (error) {
		// console.error("Error deleting user:", error);
		throw `Error deleting the user`;
	}
}

export async function getallUsers() {
	try {
		const allUser = await User.find();
		return allUser;
	} catch (e) {
		throw `Error fetching all the users ${e}`;
	}
}

export async function getUserBYEmailorId(email = null, id = null) {
	try {
		if (email) {
			const user = await User.findOne({ email });
			return user;
		} else if (id) {
			const user = await User.findById({ id });
			return user;
		}
	} catch (e) {
		throw `404 : Error finding user`;
	}
}
// export async function login

export async function updateUser(email, updateData) {
	try {
		const updatedUser = await User.findOneAndUpdate(email, updateData, {
			new: true, // Return the updated document
			runValidators: true, // Validate the updated fields
		});

		if (!updatedUser) {
			console.log("User not found");
			return null;
		}

		console.log("User updated successfully:", updatedUser);
		return updatedUser;
	} catch (error) {
		console.error("Error updating user:", error);
		throw error;
	}
}
