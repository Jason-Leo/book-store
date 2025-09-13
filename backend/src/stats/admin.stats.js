const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const Order = require("../orders/order.model")
const Book = require("../books/book.model")

router.get("/",async(req,res)=>{
    try{
        const totalOrders = await Order.countDocuments(); // 订单总数
        const totalSales = await Order.aggregate([
            {
                $group:{
                    _id: null,
                    totalSales: { $sum: "$totalPrice"},
                }
            }
        ])

        const trendingBookCount = await Book.aggregate([
            { $match:{ trending: true}},
            { $count: "trendingBookCount"}
        ]);

        const trendingBooks = trendingBookCount[0]?.trendingBookCount || 0;

        const totalBooks = await Book.countDocuments();

        const monthlySales = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt"}},
                    totalSales: { $sum: "$totalPrice"},
                    totalOrders: { $sum: 1},
                }
            },
            { $sort: { _id: -1}}
        ])

        res.status(200).send({
            message: "Admin stats get successfully",
            stats: {
                totalOrders,
                totalSales: totalSales[0]?.totalSales || 0,
                trendingBooks,
                totalBooks,
                monthlySales,
            }
        })
    }
    catch(error){
        res.status(500).json({
            message: `Failed ${error}`,
        })
    }
})

// 畅销书按种类聚合
router.get("/bestsellers/category", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 0; // 0 表示不限制

        // 先获取所有分类的统计数据
        const categoryStats = await Order.aggregate([
            { $unwind: "$productIds" },
            {
                $lookup: {
                    from: "books",
                    localField: "productIds",
                    foreignField: "_id",
                    as: "book"
                }
            },
            { $unwind: "$book" },
            {
                $group: {
                    _id: "$book.category",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            ...(limit > 0 ? [{ $limit: limit }] : [])
        ]);

        // 计算总数
        const total = categoryStats.reduce((sum, item) => sum + item.count, 0);

        // 计算比例并格式化数据
        const data = categoryStats.map(item => ({
            category: item._id,
            count: item.count,
            ratio: total > 0 ? item.count / total : 0
        }));

        res.status(200).send({
            message: "Bestsellers by category fetched successfully",
            total: total,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: `Failed ${error}`
        });
    }
});

// 获取最近订单
router.get("/recent-orders", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        
        const recentOrders = await Order.aggregate([
            {
                $lookup: {
                    from: "books",
                    localField: "productIds",
                    foreignField: "_id",
                    as: "books"
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    totalPrice: 1,
                    createdAt: 1,
                    bookTitles: { $map: { input: "$books", as: "book", in: "$$book.title" } },
                    bookCount: { $size: "$productIds" }
                }
            },
            { $sort: { createdAt: -1 } },
            { $limit: limit }
        ]);

        res.status(200).send({
            message: "Recent orders fetched successfully",
            data: recentOrders
        });
    } catch (error) {
        res.status(500).json({
            message: `Failed ${error}`
        });
    }
});

module.exports = router;