export const getCart = async(req, res) => {
    const user = res.user;
    if(user){
        res.render('carts');
    } else {
        res.redirect('/products')
    }
}