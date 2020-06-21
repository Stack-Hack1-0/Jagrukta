const News = require("../models/news");
const detect = require("../detector/detect");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.postCheck = catchAsync(async (req, res, next) => {
  console.log(req.body.data);
  const news = req.body.data;
  console.log(news);
  if (!news) {
    return next(new AppError("No news received!"), 422);
  }
  const isFake = await detect(news);
  if (isFake) {
    let found_news = await News.findOne({ data: news });
    if (!found_news) {
      const new_news = new News({
        data: news,
        count: 1,
      });
      const result = await new_news.save();
      console.log(result);
    } else {
      found_news.count += 1;
      await found_news.save();
    }
    return res.status(200).json({
      status: "success",
      message: "Fake",
    });
  }
  res.status(200).json({
    status: "success",
    message: "Genuine",
  });
});

exports.getNews = catchAsync(async (req, res, next) => {
  let all_news = await News.find();
  console.log(all_news);
  res.status(200).json({
    message: "fetched news",
    all_news: all_news,
  });
});
