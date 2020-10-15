// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: magic;
//iOS14限免应用实时展示小组件
//作者：kzddck
//微信公众号：kzddck（康庄科技站）
//更新时间2020.10.06
//开放接口：api.kzddck.com/script/free.json（5分钟检测一次，仅展示一条数据）

let data = await getData()
let widget = await createWidget(data)
if (!config.runsInWidget) {
  await widget.presentLarge()
}
Script.setWidget(widget)
Script.complete()
async function createWidget(data) {
  let w = new ListWidget()
  w.url = data["url"]
  w.backgroundColor = new Color("#b00a0fb3")
// 标题
  var dates =  data["name"]
  let date1 = w.addText(dates)
  date1.font = Font.semiboldSystemFont(20)
  date1.centerAlignText()
  date1.textColor = Color.white()
  w.addSpacer(10)
// 价格
  let date2 = w.addText("现价:"+data["price"]+"("+data["class"]+")")
  date2.font = Font.heavySystemFont(10)
  date2.centerAlignText()
  date2.textColor =Color.white()
  w.addSpacer(10)
// 介绍
  let body = w.addText(data["content"])
  body.font = Font.mediumRoundedSystemFont(12)
  body.textColor = Color.white()
  w.addSpacer(20)
  let author = w.addText("——点击下载")
  author.rightAlignText()
  author.font = Font.regularMonospacedSystemFont(12)
  author.textColor =Color.white()
// 图片
  let bg =await getImage(data["img"])
  w.backgroundImage = await shadowImage(bg)
  return w
}
async function getData() {
  var url = "https://api.kzddck.com/script/free.json";
  var req = new Request(url)
  var data = await req.loadJSON()
  return data
}
async function getImage (url) {
  let r =await new Request(url)
  return await r.loadImage()
}
async function shadowImage (img) {
  let ctx = new DrawContext()
  ctx.size = img.size
  ctx.drawImageInRect(img, new Rect(0, 0, img.size['width'], img.size['height']))
  ctx.setFillColor(new Color("#646464", 0.5))
  ctx.fillRect(new Rect(0, 0, img.size['width'], img.size['height']))
  let res = await ctx.getImage()
  return res
}