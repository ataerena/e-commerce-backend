const HelloWorld = async (req, res) => {
    try {
        res.send("Hello World!");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    HelloWorld
}