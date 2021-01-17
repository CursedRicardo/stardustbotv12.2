const { MessageEmbed } = require('discord.js')
const datab = require('quick.db')
const moment = require("moment");
const { parseZone } = require("moment");

exports.run =  async (client, message, args) => {
  
if(!['782959859297419296'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${message.author} bu komutu kullanmak için yetkin bulunmamakta.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
  
const tag = '🍵'   
const erkekrol = message.guild.roles.cache.find(r => r.id === '774654724989386772') 
const erkekrol2 = message.guild.roles.cache.find(r => r.id === '774654724989386772')
const kayıtsız = message.guild.roles.cache.find(r => r.id === '782181985509965854')
const genelchat = message.guild.channels.cache.find(c => c.id === '786858942583537674')
const savelog = message.guild.channels.cache.find(c => c.id === '797925488185311273')

if(!erkekrol) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`1. Erkek rolü ayarlanmamış/yanlış id girilmiş kayıt işlemine devam edilemiyor.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
if(!erkekrol2) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`2. Erkek rolü ayarlanmamış/yanlış id girilmiş kayıt işlemine devam edilemiyor.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
if(!kayıtsız) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Kayıtsız rolü ayarlanmamış/yanlış id girilmiş kayıt işlemine devam edilemiyor.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${message.author} bir kullanıcı belirt.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
let name = args[1]
let age = Number(args[2])
if(!name) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Bir isim belirtmelisin.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
if(!age) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Bir yaş belirtmelisin.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
if(member.id === message.author.id) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Kendini kayıt edemezsin.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
if(member.id === client.user.id) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Bot kayıt edemezsin.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
if(member.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Sunucu sahibini kayıt edemezsin.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Belirtilen kullanıcı sizden üst/aynı pozisyonda işleme devam edilemiyor.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
  
  
datab.add(`yetkili.${message.author.id}.kadin`, 1)
datab.add(`yetkili.${message.author.id}.toplam`, 1)
let alldata = datab.fetch(`yetkili.${message.author.id}.toplam`)

member.setNickname(`${tag} ${name} | ${age}`)
member.roles.add(erkekrol)
member.roles.add(erkekrol2)
member.roles.remove(kayıtsız)
  
genelchat.send(`<:hellodc:798858625509752865>**${member} Aramıza katıldı, hoşgeldin umarım keyifli vakit geçirirsin.**<:hellodc:798858625509752865> `)
  
savelog.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`• Yetkili: ${message.author} | \`${message.author.id}\`\n• Kullanıcı: ${member} | \`${member.id}\`\n• Güncel İsim: \`${tag} ${name} | ${age}\`\n• Roller: ${erkekrol} \n• Kanal: <#${message.channel.id}> | \`${message.channel.id}\`\n• Kayıtlar: \`${alldata}\` `)
.setColor('#65d8c4'))


datab.push(`isim.${message.guild.id}`, {userID: member.id, isim: name, yas: age, role: erkekrol.id})}
exports.conf = {enabled: true, guildOnly: true, aliases: ['erkek', 'e', 'boy', 'man', 'adam'], permLevel: 0}
exports.help = {name: 'kayıt', description: "Etiketlenen kişiyi erkek rolleriyle kayıt eder.", usage: 'k!kayıt @etiket/id İsim Yaş'}
