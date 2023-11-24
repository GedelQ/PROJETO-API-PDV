const cRoute1 = async (req, res) => {
    let showUser = "Page route 1";
    let showStatus = 200;
    try {

    } catch (error) {
        showStatus = error.response.status;
        showUser = { message: error.message };
    } finally {
        res.status(showStatus).json(showUser);
    }
};


export default {
    cRoute1
};
