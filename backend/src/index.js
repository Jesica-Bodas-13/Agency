import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv";

import admin from "./config/firebase_config";

dotenv.config();
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "./.env") });
// import env from "node:process";
const uri = process.env.MONGO_URL;
// console.log(uri);
const clientOptions = {
	serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function run() {
	try {
		// Create a Mongoose client with a MongoClientOptions object to set the Stable API version
		await mongoose.connect(uri, clientOptions);
		await mongoose.connection.db.admin().command({ ping: 1 });
		console.log(
			"Pinged your deployment. You successfully connected to MongoDB!"
		);
	} finally {
		// Ensures that the client will close when you finish/error
		await mongoose.disconnect();
	}
}
run().catch(console.dir);

const app = express();
const PORT = 4000;

// Middleware to verify ID token
async function verifyToken(req, res, next) {
	const excludedPaths = ["/signup", "/login"];
	if (excludedPaths.includes(req.path)) {
		return next(); // Skip verification for signup and login paths
	}
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).send("Unauthorized: No token provided");
	}

	const idToken = authHeader.split("Bearer ")[1];

	try {
		const decodedToken = await admin.auth().verifyIdToken(idToken);
		req.user = decodedToken; // Attach the decoded token to the request object
		next();
	} catch (error) {
		if (error.code === "auth/id-token-expired") {
			return res.status(401).send("Unauthorized: Token expired");
		} else {
			return res.status(401).send("Unauthorized: Invalid token");
		}
	}
}

app.use("/login", (req, res, next) => {
	return next();
});

app.use("/signup", (req, res, next) => {
	return next();
});

app.use(verifyToken);

app.get("/", (req, res) => {
	res.send("Authenticated User!!!!");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
