async function setToken(req, res) {
    try{
        res.header('auth-token',req.body.token)
        return { success: true, data: { "token":req.body.token } }
    } catch (err) {
        return { success: false, data: { err } }
    }
}

module.exports = {setToken}