const express = require("express");
const fs = require("fs");
const cors = require("cors");
const ytdl = require("ytdl-core");
const { listenerCount } = require("process");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 4000;

//let videoId;

app.get("/download",async (req, res) => {
  try{
    const url = req.query.url;
    const videoId = await ytdl.getURLVideoID(url)
    const metaInfo = await ytdl.getInfo(url)

    let data = {
      url:"https://www.youtube.com/embed/"+videoId,
      info:metaInfo.formats
    }
    return res.send(data)
  }catch(err){
    return res.status(500)
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
