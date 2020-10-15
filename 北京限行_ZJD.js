// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: car-alt;
/**
 * Author: evilbutcher
 * Github: https://github.com/evilbutcher
 * 本脚本使用了@Gideon_Senku的Env.scriptable，感谢！
 * ⚠️免责声明：本脚本数据从官网获取，不保证准确性，仅供学习交流，若由此脚本引发的任何责任，本人概不承担！详见仓库内免责声明！
 */

const $ = importModule("Env");
const preview = "medium";
const spacing = 5;
try {
  var { lastnumberofcar } = importModule("Config");
  lastnumberofcar = lastnumberofcar();
  console.log("将使用配置文件内尾号: " + lastnumberofcar);
} catch (e) {
  console.log("未获取汽车尾号，需正确配置");
}

const res = await getinfo();

let widget = await createWidget(res);
Script.setWidget(widget);
Script.complete();

async function createWidget(res) {
  if (res.state == "success") {
    var group = res.result;
    items = [];
    for (var i = 0; i < 6; i++) {
      var week = group[i].limitedWeek;
      var number = group[i].limitedNumber;
      var time = group[i].limitedTime;
      items.push(
        `${JSON.stringify(time).slice(6, -1)} ${JSON.stringify(week).slice(
          1,
          -1
        )} ${JSON.stringify(number).slice(1, -1)}`
      );
    }
    var title = ``
    if (lastnumberofcar == undefined || lastnumberofcar == "") {
      title = "🚙 北京尾号限行";
    } else {
      if (group[0].limitedNumber.indexOf(lastnumberofcar) != -1) {
       title = "🚙 今日限行‼️ 注意遵守交规哦";
      } else {
        title = "🚙 今日不限行🎉 放心出门吧";
      }
    }
    const opts = {
    title,
    texts: {
      text1: `• ${items[0]}`,
      text2: `• ${items[1]}`,
      text3: `• ${items[2]}`,
      text4: `• ${items[3]}`,
      text5: `• ${items[4]}`,
      text6: `• ${items[5]}`,
    },
    preview,
    spacing,
  };
      let widget = await $.createWidget(opts);
  return widget;
  }
  return null
}

async function getinfo() {
  const url = {
    url: `http://yw.jtgl.beijing.gov.cn/jgjxx/services/getRuleWithWeek`,
  };
  const res = await $.get(url);
  log(res);
  return res;
}
