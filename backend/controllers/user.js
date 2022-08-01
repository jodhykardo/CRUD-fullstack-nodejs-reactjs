const bcrypt = require('bcrypt');
const User = require('../models/User');

const read = async (req, res) => {
    let findUser = await User.find();
    
    return res.json(findUser);
}

const detail = async (req, res) => {
    const id = req.params.id;

    const detailUser = await User.findById({ _id: id });

    if (!detailUser) {
        return res.json({ Message: "User not found!" });
    }

    return res.json(detailUser);
}

const create = async (req, res) => {
    try {
        await User.find({
            userName: req.body.username
        });
    } catch (error) {
        console.log(error);
        return res.status(409).json({ Message: "The username is already exist!" });
    }

    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ Message: "Password and confirm password not match!" })
    } else {
        try {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            await new User({
                userName:req.body.username,
                userPassword:hashPassword,
                userStatus:"y"
            }).save();
            res.json({ Message: "New admin has been added!" });
        } catch (error) {
            console.log(error);
        }
    }
}

const update = async (req, res) => {
    const id = req.params.id;
    try {
        const findUser = await User.findOne({_id:id});
        if(!findUser){
            return res.status(404).json({Message: "User not found!"});
        }

        await User.updateOne({id:id},{userName:req.body.username, userStatus:req.body.status});

        res.json({ Message: "Admin data has been updated!" });
    } catch (error) {
        console.log(error);
    }

}

const del = async (req, res) => {
    const id = req.params.id;

    try {
        const deleteUser = await User.deleteOne({_id:id});
    } catch (error) {
        console.log(error);
    }

    res.json({ Message: "Admin deleted" });
}

const changepass = async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    // const id = req.params.id;

    const apiKey = await agen.findOne({
        where: {
            agenApiKey: req.headers.apikey
        }
    });

    if (!req.headers.apikey) {
        await logAdmin.create({
            laUser: req.username,
            laIp: ip,
            laEndPoint: "/admin/changepass",
            laMethod: "PUT",
            laCode: "401",
            laInfo: "Unauthorize: API key not provided"
        });
        return res.status(401).json({ Message: "Api Key must be provided!" });
    }

    if (!apiKey) {
        await logAdmin.create({
            laUser: req.username,
            laIp: ip,
            laEndPoint: "/admin/changepass",
            laMethod: "PUT",
            laCode: "401",
            laInfo: "Unauthorize: API key is wrong"
        });
        return res.status(401).json({ Message: "Api Key is wrong!" });
    }

    const findPass = await admin.findOne({
        where: {
            adminUsername: req.body.username,
            agenId: apiKey.agenId
        }
    });

    if (!findPass) {
        await logAdmin.create({
            agenId: apiKey.agenId,
            laUser: req.username,
            laIp: ip,
            laEndPoint: "/admin/changepass",
            laMethod: "PUT",
            laCode: "404",
            laInfo: "Admin not found"
        });
        return res.status(404).json({ Message: "Admin not found!" });
    }

    const comparePassword = await bcrypt.compare(req.body.oldPassword, findPass.adminPassword);
    if (!comparePassword) {
        await logAdmin.create({
            agenId: apiKey.agenId,
            laUser: req.username,
            laIp: ip,
            laEndPoint: "/admin/changepass",
            laMethod: "PUT",
            laCode: "400",
            laInfo: "Wrong old password"
        });
        return res.status(400).json({ Message: "Wrong password!" });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        await logAdmin.create({
            agenId: apiKey.agenId,
            laUser: req.username,
            laIp: ip,
            laEndPoint: "/admin/changepass",
            laMethod: "PUT",
            laCode: "400",
            laInfo: "Password and confirm password not match"
        });
        res.status(400).json({ Message: "Password and confirm password not match!" });
    } else {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(req.body.newPassword, salt);
        await admin.update({
            adminRefreshToken: null,
            adminPassword: hashPassword
        }, {
            where: {
                adminId: findPass.adminId
            }
        });

        await logAdmin.create({
            agenId: apiKey.agenId,
            laUser: req.username,
            laIp: ip,
            laEndPoint: "/admin/changepass",
            laMethod: "PUT",
            laCode: "200",
            laInfo: "Changed password admin: " + findPass.adminUsername
        });

        res.clearCookie('refreshToken');
        return res.sendStatus(200);
    }
}

module.exports = { read, detail, create, update, del, changepass };