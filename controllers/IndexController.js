/*
This .js was meant as the controller for the indexView
 */
const indexView = (req, res) => {
    res.render('IndexView', {});
} // Here the indexView method sends the rendered view back as a response

module.exports = {
    indexView
}; // Here we export the indexView method