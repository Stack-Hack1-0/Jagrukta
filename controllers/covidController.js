const News = require("../models/news");
const detect = require("../detector/detect");

exports.postCheck = async (req, res, next) => {
  console.log(req.body.data);
  const news = req.body.data;
  console.log(news);
  if (!news) {
    const err = new Error("No news received!");
    err.statusCode = 422;
    throw err;
  }

  try {
    const isFake = await detect(news);
    console.log(isFake);
    if (isFake) {
      const new_news = new News({
        data: news,
      });
      const res = await new_news.save();
      console.log(res);
      return res.status(200).json({
        status: "success",
        message: "Fake",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Genuine",
    });
  } catch (er) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getNews = async (req, res, next) => {
  try {
    let all_news = await News.find();
    console.log(all_news);
    res.status(200).json({
      message: "fetched news",
      all_news: all_news,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
