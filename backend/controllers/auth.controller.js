import User from "../models/user.model.js"

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confrimPassword, gender } = req.body


        if (password !== confrimPassword) {
            return res.status(400).json({ error: "Password dont match" })
        }

        const user = await User.findOne({ username })

        if (user) {
            return res.status(400).json({ error: "username already exists" })
        }

        // HASH PASSWORD HERE 

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`

        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic
        })

    } catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const login = (req, res) => {
    console.log("loginUser")
}

export const logout = (req, res) => {
    console.log("logoutUser")
}

