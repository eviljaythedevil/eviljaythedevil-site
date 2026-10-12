module.exports = async (req, res) => {
  try {
    const r = await fetch('https://www.youtube.com/feeds/videos.xml?channel_id=UCb93fPn7yL9V68jntdSG_ZQ');
    const xml = await r.text();
    const ids = [...xml.matchAll(/<yt:videoId>([^<]+)<\/yt:videoId>/g)].map(m => m[1]);
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json({ ids });
  } catch (e) {
    res.status(500).json({ ids: [] });
  }
};
