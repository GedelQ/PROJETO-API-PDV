const cHome = async (req, res) => {
    let showUser = "Home Page";
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
    cHome
};
