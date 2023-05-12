/*
This .js was meant as the controller for the homeView
 */
const homeView = (req, res) => {
    res.render('HomeView', {});
} // Here the homeView method sends the rendered view back as a response

module.exports = {
    homeView
}; // Here we export the homeView method