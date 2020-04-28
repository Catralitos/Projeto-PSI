#! /usr/bin/env node

console.log('This script populates some test hoteis, quartos and servicos instances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Hotel = require('./models/hotel')
var Quarto = require('./models/quarto')
var Servico = require('./models/servico')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var hoteis = []
var quartos = []
var servicos = []

function hotelCreate(name, description, address, coordinates, phone_number, mail, image, servico) {
  hoteldetail = {
    name: name,
    description: description,
    address: address,
    coordinates: coordinates,
    phone_number: phone_number,
    mail: mail,
    image: image,
    servico: servico
  }

  var hotel = new Hotel(hoteldetail);

  hotel.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Hotel: ' + hotel);
    hoteis.push(hotel)
    cb(null, hotel)
  }  );
}

var quartosDouroVinhas = ['https://i.imgur.com/FrqF2Vu.jpeg', 'https://i.imgur.com/wQWozsb.jpeg', 'https://i.imgur.com/WABcR6u.jpeg', 'https://i.imgur.com/2HgA6qW.jpeg', 'https://i.imgur.com/ckfj6nh.jpeg', 'https://i.imgur.com/3ToFEBq.jpeg', 'https://i.imgur.com/lDAuqJI.jpeg', 'https://i.imgur.com/gDUisSR.jpeg', 'https://i.imgur.com/SINr0FX.jpeg', 'https://i.imgur.com/glWDH9p.jpeg'];

//GUILHERME TENS QUE PREENCHER ISTO
var servicosDouroVinhas = ['Adega Moreira', 'Wi-fi', 'Lavanderia', 'Acessos para pessoas com mobilidade reduzida', 'Receção 24 horas', 'Biblioteca'];

function createHoteis(cb) {
    async.parallel([
        function(callback) {
          hotelCreate('Douro Vinhas', 'Com uma vista de cortar o fôlego para o Rio Douro e para o Rio Tedo, é no coração do Douro Vinhateiro que surge o Hotel Douro Vinhas. Com uma forte componente de agro e enoturismo, esta unidade estende-se pela centenária Quinta do Moreira.\n Na margem sul do Douro, perto da pitoresca aldeia do Marmelal, a propriedade que acolhe o Hotel Douro Vinhas fica muito próxima de um dos dois marcos mandados construir pelo Marquês de Pombal em 1757. Classificados como imóveis de interesse público, serviam para demarcar a zona dos vinhos generosos do Douro, à época sob jurisdição da Companhia Geral da Agricultura das Vinhas Douro. Nascia assim a primeira região demarcada de vinhos do mundo. Hoje, os vinhedos em socalcos tornam única a paisagem que rodeia esta unidade.\n Numa primeira fase com apenas sete quartos, o Hotel Douro Vinhas distingue-se pela localização, pelo charme e pela exclusividade. Aqui poderá desfrutar da calma e do silêncio, do cenário, mas também a piscina exterior, da gastronomia regional do restaurante Moreira, cujos grandes janelões permitem admirar a envolvente. Mas também das visitas à adega e provas de vinhos do Porto, produzidos no local.\n Poderá ainda aproveitar para passear entre as vinhas, pelo olival ou pelo amendoal (particularmente bonito durante as amendoeiras em flor), sempre com o Tedo e o Douro como companhia. Para completar a estadia, faça um cruzeiro fluvial, visite as quintas vinícolas da região ou faça um passeio de comboio. Ver as amendoeiras em flor ou participar nas vindimas são outras sugestões.', 'Hotel Douro Vinhas\nQuinta do Moreira – Marmelal\n5110-672 Armamar\nPortugal', '41°09´26.0"N 7°38´26.0"W', '(+351) 254 249 000', 'dourovinhas@hoteispsi.com', quartosDouroVinhas, servicosDouroVinhas, callback);
        },
        /*function(callback) {
          bookCreate('Test Book 2', 'Summary of test book 2', 'ISBN222222', authors[4], false, callback)
        }*/
        ],
        // optional callback
        cb);
}

async.series([
    createHoteis
],
var servicosQuartos = ['Telefone', 'Ar condicionado', 'Televisão LED', 'Canais por cabo', 'Mini-bar', 'Cofre', 'Casa de banho privativa com telefone',
                        'Secador de cabelo', 'Espelho de maquilhagem', 'Produtos de higiene pessoal gratuitos', 'Fechadura eletrónica de segurança',
                        'Roupão e chinelos', 'Maquina de café', 'Sala-de-estar', 'Serviço de quarto 24 horas', 'Televisão LCD', 'Chaleira', 'Varanda',
                      'Kitchenette', 'Frigorífico', 'Micro-ondas', 'Sofá-cama'];

var servicosH2 = ['Jardins e espaços exteriores', 'Piscina exterior para adultos e crianças', 'Parque de estacionamento', 'Nep Kids Club', 'Parque infantil', 'Sala de jogos', 'Clube de saúde'];
var servicosH3 = ['Lojas'];
function servicoCreate(nome){
  var servico = new Servico(nome);
  servico.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Servico: ' + servico);
    servicos.push(servico)
    cb(null, servico)
  }  );
}

function createServicos(){
  servicosDouroVinhas.forEach(servicoCreate);
  servicosQuartos.forEach(servicoCreate);
  servicosH2.forEach(servicoCreate);
  servicosH3.forEach(servicoCreate);
}
// Optional callback
function(err, results) {
    // All done, disconnect from database
    mongoose.connection.close();
});
