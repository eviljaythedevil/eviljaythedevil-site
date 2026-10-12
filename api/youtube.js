export default async function handler(req, res){
  try{
    const page = await fetch('https://www.youtube.com/@eviljayyy', {headers:{'User-Agent':'Mozilla/5.0'}}).then(r=>r.text());
    const m = page.match(/"channelId":"(UC[^"]+)"/) || page.match(/<meta itemprop="channelId" content="(UC[^"]+)"/);
    const channelId = m? m[1] : null;
    if(!channelId) throw new Error('No channelId found for @eviljayyy');
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const rssRes = await fetch(rssUrl).then(r=>r.text());
    const ids = [...rssRes.matchAll(/<yt:videoId>([^<]+)<\/yt:videoId>/g)].map(x=>x[1]);
    const titles = [...rssRes.matchAll(/<title>([^<]+)<\/title>/g)].map(x=>x[1]).slice(1);
    const dates = [...rssRes.matchAll(/<published>([^<]+)<\/published>/g)].map(x=>x[1]);
    const videos = ids.map((id,i)=>({videoId:id, title: titles[i]||'EvilJay Video', pubDate: dates[i]||new Date().toISOString(), link:`https://www.youtube.com/watch?v=${id}`}));
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json(videos);
  }catch(e){
    res.status(500).json({error:e.message});
  }
}
