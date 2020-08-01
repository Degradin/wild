const { VK, Keyboard } = require('vk-io');
const vk = new VK({
 	appId: 7473811,
 	appSecret: "VXsfCCEtcR0wQL3w2Y92",
 	token: "3a8bcc92f3f741592310d92ab5ed7e3d365f128733ef90c289525be20ad4da918d4e675043eb0e4fc92e2",
 	apiMode: "parallel",
 	pollingGroupId: 184999488
 });
const {updates, api, snippets, upload} = vk;
const fs = require("fs");
const request = require('prequest');
const users = require("./base/users.json")

setInterval(function(){
	fs.writeFileSync("./base/users.json", JSON.stringify(users, null, "\t"))
}, 5000);

vk.updates.use(async (context, next) => {
    context.user = context.senderId;
		if(context.isGroup == true) return;
		if(context.isOutbox) return;
		if(!context.text) return;
    if(context.is("context") && context.isOutbox) return;

      if(!users[context.user]){
      users[context.user] = {
        Nick: `Пользователь`,
        Prefix: `Игрок`,
        Class: `Душа`,
        Dostup: 0,
        HP: 10,
        DMG: 1,
        Level: 0,
        Exp: 0,
        Points: 10,
        Rang: 0,
        Gold: 100,
        Wilds: 0,
        ResKey: 10,
        ItemKey: 10,
        registered: data()
      };
			vk.api.call('users.get', {
				user_ids: context.user,
				fields: "first_name, screen_name"
			}).then(res => {
				let user = res[0];
        users[context.user].Nick = user.first_name
			}).catch((error) => {console.log('err[prefix]'); });

				api.messages.send({
					user_id: 270911031,
					message: `🔔 ➾ [MSGLOG]\n🆕 ➾ @id${context.user} (${context.text})`
				}).then((res) => {}).catch((error) => {console.log('ошибка передачи данных о новом пользователе'); });
      }
	if(context.text){}

    try {
        await next();
    } catch (err) { console.error(err) }
});

//////////////////////////////////////////////////////////////////////
vk.updates.hear(/^(?:!профиль|!проф|👥 Профиль)\s?([0-9]+)?/i, (context) => {
  let user = users[context.user]
  let target = context.$match[1];
  if(!target){
    return context.send(`
    &#128100; [${user.Prefix}] ${user.Nick}, ${user.Class}
    &#127380; ID: ${context.user}
    🌟 Статус: ${user.Dostup.toString().replace(/0/gi, "Обычный").replace(/1/gi, "VIP ").replace(/2/gi, "Администратор ")}

    📶 Уровень: ${user.Level} | ${user.Exp} / ${user.Level * user.Level + 5}
          ⚜ Ранг: ${user.Rang.toString().replace(/0/gi, "Не установлен").replace(/1/gi, "Фарфоровый").replace(/2/gi, "Обсидиановый ").replace(/3/gi, "Стальной ").replace(/4/gi, "Сапфировый ").replace(/5/gi, "Изумрудный ").replace(/6/gi, "Рубиновый  ").replace(/7/gi, "Бронзовый  ").replace(/8/gi, "Серебряный  ").replace(/9/gi, "Золотой  ").replace(/10/gi, "Платиновый  ")}

    🃏 Очки вознесения: ${user.Points}
    &#128176; Золота: ${spaces(user.Gold)}
    🔑 Ключей от ящиков:
                ⚪ с ресурсами: ${user.ResKey}
                ⚫ с оружием: ${user.ItemKey}

    🔯 Характеристики
    ❤ Здоровье: ${user.HP}
    ⚔ Атака: ${user.DMG}
    `)
  }else{
    user = users[target]
    if(user){
      return context.send(`
      &#128100; [${user.Prefix}] ${user.Nick}, ${user.Class}
      &#127380; ID: ${target}
      🌟 Статус: ${user.Dostup.toString().replace(/0/gi, "Обычный").replace(/1/gi, "VIP ").replace(/2/gi, "Администратор ")}

      📶 Уровень: ${user.Level} | ${user.Exp} / ${user.Level * user.Level + 5}
            ⚜ Ранг: ${user.Rang.toString().replace(/0/gi, "Не установлен").replace(/1/gi, "Фарфоровый").replace(/2/gi, "Обсидиановый ").replace(/3/gi, "Стальной ").replace(/4/gi, "Сапфировый ").replace(/5/gi, "Изумрудный ").replace(/6/gi, "Рубиновый  ").replace(/7/gi, "Бронзовый  ").replace(/8/gi, "Серебряный  ").replace(/9/gi, "Золотой  ").replace(/10/gi, "Платиновый  ")}

      🃏 Очки вознесения: ${user.Points}
      &#128176; Золота: ${spaces(user.Gold)}
      🔑 Ключей от ящиков:
                  ⚪ с ресурсами: ${user.ResKey}
                  ⚫ с оружием: ${user.ItemKey}

      🔯 Характеристики
      ❤ Здоровье: ${user.HP}
      ⚔ Атака: ${user.DMG}
      `)
    }
    return context.send(`🔔 ➾ Игрок "${target}" не найден`)
  }
});
//////////////////////////////////////////////////////////////////////

function data() {
		var date = new Date();
		let days = date.getDate();
		let month = date.getMonth() + 1;
		if (month < 10) month = "0" + month;
		if (days < 10) days = "0" + days;
		var datas = '2020-' + month + '-' + days;
		return datas;
	}

function rand(min, max) {return Math.round(Math.random() * (max - min)) + min}
var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000"));
function spaces(string) {
if (typeof string !== "string") string = string.toString();
	return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(".").split("").reverse().join("");
};
Array.prototype.random = function() {
	return this[Math.floor(this.length * Math.random())];
}

console.log("Working...");
api.messages.send({
  user_id: 270911031,
  message: `🔔 ➾ [MSGLOG]\n🆕 ➾ Успешное включение!`,
  keyboard: Keyboard.keyboard([[]])
}).then((res) => {}).catch((error) => {console.log('ошибка передачи данных о включении'); });
vk.updates.start().catch(console.error);
