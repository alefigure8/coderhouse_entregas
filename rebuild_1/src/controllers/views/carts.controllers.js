export const getCart = async(req, res) => {
    const user = req.user;
    if(user){
        res.render('carts');
    } else {
        res.redirect('/products')
    }
}