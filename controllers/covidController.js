const News = require('../models/news');

exports.postCheck = async (req,res,next) => {
    const news = req.body.data.data;
    console.log(news);
    if(!news){
        const err = new Error('No news received!');
        err.statusCode = 422;
        throw err;
    }
    const new_news = new News({
        data: news
    });
    try{
        const res = await new_news.save();
        console.log(res);
        res.status(200).json({
            status: "success",
            res
        });
    }catch(er){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getNews = async (req,res,next) => {
    try{
        let all_news = await News.find();
        console.log(all_news);
        res.status(200).json({
            message: 'fetched news',
            all_news: all_news
        });
    }catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};