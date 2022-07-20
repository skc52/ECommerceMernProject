
// this is an alternative to try catch block
//wrap this function around every controller and
//you do not need try catch

module.exports = theFunc => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
}