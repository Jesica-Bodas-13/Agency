import User from "../model/users";

export async function signIn(req, res) {
	try {
		const userData = req.body();
		// userData.authToken = token;
		const userCreated = await User.signIn(userData);
		if (!userCreated) {
			res.status(400).json({
				error: "User not Created!",
			});
		} else {
			res.status(200).json(userCreated);
		}
	} catch (e) {
		res.status(500).json({
			error: `Internal Server Error : ${e} `,
		});
	}
}

export async function login(req, res) {}

export async function profile(req, res) {
	try {
		const email = req.body.email;
		const user = await User.getUserBYEmailorId(email);
		if (!user) {
			res.status(404).json({
				error: "User Not Found!",
			});
		} else {
			res.status(200).json(user);
		}
	} catch (e) {
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
}
