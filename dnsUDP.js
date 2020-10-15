var PORT = 53;
var HOST = '8.8.8.8';
var dgram = require('dgram');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let tt;
let a1=new Buffer.from([0xaa,0xaa,0x01,0x00,0x00,0x01,0x00,0x00,0x00,0x00,0x00,0x00]); //Заголовок
let a3 = new Buffer.from([0x00,0x00,0x01,0x00,0x01]); // Конец
rl.question('Введите доменное имя:  ', (answer) => {
tt=answer;
answer = answer.split('.');
let arr =[];
answer.forEach(element => {
 arr.push(element.length);
 for (var i = 0; i < element.length; i++){
   arr.push(element[i].charCodeAt(0));
 }
});
let a2= new Buffer.from(arr);
let allpart = [a1,a2,a3];
let message = new Buffer.concat(allpart);

//let message = new Buffer.from([0xaa,0xaa,0x01,0x00,0x00,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x02,0x79,0x61,0x02,0x72,0x75,0x00,0x00,0x01,0x00,0x01]);
var client = dgram.createSocket('udp4');
client.on('message', function(message, remote) {
  console.log("IP адрес для " + tt + " " + message[message.length-4].toString()+ "."+message[message.length-3].toString()+ "."+ message[message.length-2].toString()+"."+message[message.length-1].toString());
  client.close();
});

client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
  if (err) throw err;
  console.log('Запрос отправлен на ' + HOST +':'+ PORT);
 
});
rl.close();
}); 
