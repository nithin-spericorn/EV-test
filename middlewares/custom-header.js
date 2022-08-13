module.exports = async(req,res,next) =>{
    try{
        req.headers['EV'] = 'Nithin-Machine test'
        return next()

    }catch(e){
        return res.status(500).json({
            success: false,
            message: e.message,
            data: {},
        });
    }
}