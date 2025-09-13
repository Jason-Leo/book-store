const Order = require("./order.model")

const createAOrder = async (req,res)=>{
    try{
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(200).send({
            message: "order save successfully",
            order: savedOrder,
            code: 200
        })
    }catch(error){
        res.status(500).send({
            message: `Failed ${error}`,
            code: 500
        })
    }
}

const getOrderByEmail = async (req,res)=>{
    try{
        const { email } = req.params;
        const orders = await Order.find({email}).sort({createAt: -1});
        if(!orders){
            return res.status(404).json({ message: "order not found"});
        }
        res.status(200).send({
            message: "order save successfully",
            order: orders,
            code: 200
        })
    }catch(error){
        res.status(500).send({
            message: `Failed ${error}`,
            code: 500
        })
    }
}


module.exports = {
    createAOrder,
    getOrderByEmail
}