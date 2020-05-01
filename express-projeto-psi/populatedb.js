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

var servicos = []
var hoteis = []
var quartos = []

var servicosQuartos = ['Telefone', 'Ar condicionado', 'Televisão LED', 'Canais por cabo', 'Mini-bar', 'Cofre', 'Casa de banho privativa com telefone',
                        'Secador de cabelo', 'Espelho de maquilhagem', 'Produtos de higiene pessoal gratuitos', 'Fechadura eletrónica de segurança',
                        'Roupão e chinelos', 'Maquina de café', 'Sala-de-estar', 'Serviço de quarto 24 horas', 'Televisão LCD', 'Chaleira', 'Varanda',
                      'Kitchenette', 'Frigorífico', 'Micro-ondas', 'Sofá-cama'];

var servicosH2 = ['Jardins e espaços exteriores', 'Piscina exterior para adultos e crianças', 'Parque de estacionamento', 'Nep Kids Club', 'Parque infantil', 'Sala de jogos', 'Clube de saúde'];
var servicosH3 = ['Lojas'];

//IMAGENS
var quartosDouroVinhas = ['https://i.imgur.com/FrqF2Vu.jpeg', 'https://i.imgur.com/wQWozsb.jpeg', 'https://i.imgur.com/WABcR6u.jpeg', 'https://i.imgur.com/2HgA6qW.jpeg', 'https://i.imgur.com/ckfj6nh.jpeg', 'https://i.imgur.com/3ToFEBq.jpeg', 'https://i.imgur.com/lDAuqJI.jpeg', 'https://i.imgur.com/gDUisSR.jpeg', 'https://i.imgur.com/SINr0FX.jpeg', 'https://i.imgur.com/glWDH9p.jpeg'];
var quartosAVerOMar = ['https://i.imgur.com/z2NL6oq.jpg', 'https://i.imgur.com/og60pgO.jpg', 'https://i.imgur.com/0JtaTfL.jpg', 'https://i.imgur.com/xE98fqx.jpg', 'https://i.imgur.com/0XkuZr2.jpg', 'https://i.imgur.com/rbR6AJC.jpg', 'https://i.imgur.com/A2LkOKm.jpg', 'https://i.imgur.com/GQMygvV.jpg', 'https://i.imgur.com/V1rbf9Y.jpg', 'https://i.imgur.com/LTolhgK.jpg'];
var quartosMediterraneo = ['https://i.imgur.com/KhnIbqe.jpg', 'https://i.imgur.com/G3lrDZe.jpg', 'https://i.imgur.com/YPcAw24.jpg', 'https://i.imgur.com/d0eUeyg.jpg', 'https://i.imgur.com/k0P0pXf.jpg', 'https://i.imgur.com/GMPyTgy.jpg', 'https://i.imgur.com/RgYe0hj.jpg', 'https://i.imgur.com/SwfZwEf.jpg', 'https://i.imgur.com/1ZeeSVz.jpg', 'https://i.imgur.com/BZSowYa.jpg'];

//SERVICOS QUARTOS HOTEL 1
var nomeServicosH1Q1 = ['Telefone', 'Ar condicionado', 'Televisão LED', 'Canais por cabo', 'Mini-bar', 'Cofre', 'Casa de banho privativa com telefone',
                        'Secador de cabelo', 'Wi-fi', 'Espelho de maquilhagem', 'Produtos de higiene pessoal gratuitos', 'Fechadura eletrónica de segurança',
                        'Roupão e chinelos', 'Maquina de café'];

var nomeServicosH1Q2 = ['Telefone', 'Ar condicionado', 'Televisão LED', 'Canais por cabo', 'Cofre', 'Casa de banho privativa com telefone',
                        'Secador de cabelo', 'Wi-fi', 'Espelho de maquilhagem', 'Produtos de higiene pessoal gratuitos', 'Fechadura eletrónica de segurança',
                        'Roupão e chinelos', 'Maquina de café', 'Sala-de-estar'];

var nomeServicosH1Q3 = ['Telefone', 'Ar condicionado', 'Televisão LED', 'Canais por cabo', 'Cofre', 'Casa de banho privativa com telefone',
                        'Secador de cabelo', 'Wi-fi', 'Espelho de maquilhagem', 'Produtos de higiene pessoal gratuitos', 'Fechadura eletrónica de segurança',
                        'Roupão e chinelos', 'Maquina de café', 'Sala-de-estar', 'Serviço de quarto 24 horas'];

var nomeServicosH1Q4 = ['Telefone', 'Ar condicionado', 'Televisão LED', 'Canais por cabo', 'Cofre', 'Casa de banho privativa com telefone',
                    'Secador de cabelo', 'Wi-fi', 'Espelho de maquilhagem', 'Produtos de higiene pessoal gratuitos', 'Fechadura eletrónica de segurança',
                    'Roupão e chinelos', 'Maquina de café', 'Sala-de-estar', 'Serviço de quarto 24 horas'];

var nomeServicosH1 = ['Adega Moreira', 'Wi-fi', 'Lavanderia', 'Acessos para pessoas com mobilidade reduzida', 'Receção 24 horas', 'Biblioteca'];

//SERVICOS QUARTOS HOTEL 2
var nomeServicosH2Q1 = ['Telefone', 'Ar condicionado', 'Televisão LCD', 'Canais por cabo', 'Mini-bar', 'Cofre', 'Casa de banho privativa com telefone',
                        'Secador de cabelo', 'Wi-fi', 'Produtos de higiene pessoal gratuitos', 'Fechadura eletrónica de segurança',
                        'Serviço de quarto 24 horas', 'Chaleira'];

var nomeServicosH2Q2 = ['Telefone', 'Ar condicionado', 'Televisão LCD', 'Canais por cabo', 'Mini-bar', 'Cofre', 'Casa de banho privativa com telefone',
                        'Secador de cabelo', 'Wi-fi', 'Produtos de higiene pessoal gratuitos', 'Fechadura eletrónica de segurança',
                        'Serviço de quarto 24 horas', 'Sala-de-estar', 'Chaleira'];

var nomeServicosH2Q3 = ['Telefone', 'Ar condicionado', 'Televisão LCD', 'Canais por cabo', 'Cofre', 'Casa de banho privativa com telefone',
                        'Secador de cabelo', 'Wi-fi', 'Produtos de higiene pessoal gratuitos', 'Fechadura eletrónica de segurança',
                        'Serviço de quarto 24 horas', 'Sala-de-estar', 'Varanda', 'Chaleira'];

var nomeServicosH2 = ['Jardins e espaços exteriores', 'Piscina exterior para adultos e crianças','Wi-fi', 'Parque de estacionamento', 'Nep Kids Club', 'Parque infantil', 'Sala de jogos', 'Lavanderia', 'Acessos para pessoas com mobilidade reduzida', 'Receção 24 horas', 'Clube de saúde'];

//SERVICOS QUARTOS HOTEL 3
var nomeServicosH3Q1 = ['Telefone', 'Wi-fi', 'Ar condicionado', 'Televisão LCD', 'Canais por cabo', 'Cofre', 'Casa de banho privativa com telefone',
                        'Secador de cabelo', 'Espelho de maquilhagem', 'Produtos de higiene pessoal gratuitos', 'Kitchenette','Fechadura eletrónica de segurança',
                        'Serviço de quarto 24 horas', 'Frigorífico', 'Micro-ondas','Chaleira'];

var nomeServicosH3Q2 = ['Telefone', 'Wi-fi', 'Ar condicionado', 'Televisão LCD', 'Canais por cabo', 'Cofre', 'Casa de banho privativa com telefone',
                        'Secador de cabelo', 'Espelho de maquilhagem', 'Produtos de higiene pessoal gratuitos', 'Kitchenette', 'Fechadura eletrónica de segurança',
                        'Serviço de quarto 24 horas', 'Varanda', 'Frigorífico', 'Micro-ondas', 'Sala-de-estar', 'Chaleira'];

var nomeServicosH3Q3 = ['Telefone', 'Wi-fi', 'Ar condicionado', 'Televisão LCD', 'Canais por cabo', 'Cofre', 'Casa de banho privativa com telefone',
                        'Secador de cabelo', 'Espelho de maquilhagem', 'Produtos de higiene pessoal gratuitos', 'Kitchenette', 'Fechadura eletrónica de segurança',
                        'Sala-de-estar', 'Sofá-cama', 'Varanda', 'Frigorífico', 'Micro-ondas', 'Chaleira'];

var nomeServicosH3 = ['Jardins e espaços exteriores', 'Piscina exterior para adultos e crianças', 'Wi-fi', 'Parque de estacionamento', 'Nep Kids Club', 'Parque infantil', 'Sala de jogos', 'Lavanderia', 'Acessos para pessoas com mobilidade reduzida', 'Receção 24 horas', 'Clube de saúde', 'Lojas'];

var servicosDouroVinhas = [];
var servicosDouroStandard = [];
var servicosDouroSuiteDuplex = [];

var servicosAVerOMar = [];
var servicosMarStandard = [];
var servicosMarSuiteJunior = [];
var servicosMarSuiteJuniorSup = [];

var servicosMediterraneo = [];
var servicosMediterraneoStandard = [];
var servicosMediterraneoSuiteJunior = [];
var servicosMediterraneoSuiteSenior = [];

function servicoCreate(nome, cb){
  var servico = new Servico({nome: nome});
  servico.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Servico: ' + servico);
    servicos.push(servico)
    cb(null, servico)
  } );
  }

function hotelCreate(name, description, address, coordinates, phone_number, mail, image, servico, cb) {
  hoteldetail = {
    nome: name,
    descricao: description,
    morada: address,
    coordenadas: coordinates,
    numero_telefone: phone_number,
    email: mail,
    imagens: image,
    servicos: servico
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

function quartoCreate(hotel, tipoQuarto, precoBaixo, precoAlto, servico, cb){
  quartodetail = {
    hotel: hotel
  }

  if(tipoQuarto != false) quartodetail.tipoQuarto = tipoQuarto
  if(precoBaixo > 0) quartodetail.precoBaixo = precoBaixo
  if(precoAlto >= precoBaixo) quartodetail.precoAlto = precoAlto
  if(servico.length > 0) quartodetail.servico = servico

  var quarto = new Quarto(quartodetail);

  quarto.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Quarto: ' + quarto);
    quartos.push(hotel)
    cb(null, hotel)
  }  );
}

function createServicos(cb){
  async.series([
    function(callback) {
  servicosDouroVinhas.forEach(servicoCreate, callback);
    },
    function(callback){
  servicosQuartos.forEach(servicoCreate, callback);
    },
    function(callback){
  servicosH2.forEach(servicoCreate, callback);
    },
    function(callback){
        servicosH3.forEach(servicoCreate, callback);
    }
  ],
  // optional callback
  cb);
  createServicesHotelQuartos();
}

function createServicesHotelQuartos(){
  servicos.forEach(colocarServicoEmSeuArray);
}

function colocarServicoEmSeuArray(nome){
  if(nomeServicosH1.includes(nome.nome)){
    servicosDouroVinhas.push(nome);
  }
  if(nomeServicosH1Q1.includes(nome.nome)){
    servicosDouroStandard.push(nome);
  }
  if(nomeServicosH1Q2.includes(nome.nome)){
    servicosDouroSuiteDuplex.push(nome);
  }
  if(nomeServicosH2.includes(nome.nome)){
    servicosAVerOMar.push(nome);
  }
  if(nomeServicosH2Q1.includes(nome.nome)){
    servicosMarStandard.push(nome);
  }
  if(nomeServicosH2Q2.includes(nome.nome)){
    servicosMarSuiteJunior.push(nome);
  }
  if(nomeServicosH2Q3.includes(nome.nome)){
    servicosMarSuiteJuniorSup.push(nome);
  }
  if(nomeServicosH3.includes(nome.nome)){
    servicosMediterraneo.push(nome);
  }
  if(nomeServicosH3Q1.includes(nome.nome)){
    servicosMediterraneoStandard.push(nome);
  }
  if(nomeServicosH3Q2.includes(nome.nome)){
    servicosMediterraneoSuiteJunior.push(nome);
  }
  if(nomeServicosH3Q3.includes(nome.nome)){
    servicosMediterraneoSuiteSenior.push(nome);
  }
}

function createHoteis(cb) {
    async.parallel([
        function(callback) {
          hotelCreate('Douro Vinhas', 'Com uma vista de cortar o fôlego para o Rio Douro e para o Rio Tedo, é no coração do Douro Vinhateiro que surge o Hotel Douro Vinhas. Com uma forte componente de agro e enoturismo, esta unidade estende-se pela centenária Quinta do Moreira.\n Na margem sul do Douro, perto da pitoresca aldeia do Marmelal, a propriedade que acolhe o Hotel Douro Vinhas fica muito próxima de um dos dois marcos mandados construir pelo Marquês de Pombal em 1757. Classificados como imóveis de interesse público, serviam para demarcar a zona dos vinhos generosos do Douro, à época sob jurisdição da Companhia Geral da Agricultura das Vinhas Douro. Nascia assim a primeira região demarcada de vinhos do mundo. Hoje, os vinhedos em socalcos tornam única a paisagem que rodeia esta unidade.\n Numa primeira fase com apenas sete quartos, o Hotel Douro Vinhas distingue-se pela localização, pelo charme e pela exclusividade. Aqui poderá desfrutar da calma e do silêncio, do cenário, mas também a piscina exterior, da gastronomia regional do restaurante Moreira, cujos grandes janelões permitem admirar a envolvente. Mas também das visitas à adega e provas de vinhos do Porto, produzidos no local.\n Poderá ainda aproveitar para passear entre as vinhas, pelo olival ou pelo amendoal (particularmente bonito durante as amendoeiras em flor), sempre com o Tedo e o Douro como companhia. Para completar a estadia, faça um cruzeiro fluvial, visite as quintas vinícolas da região ou faça um passeio de comboio. Ver as amendoeiras em flor ou participar nas vindimas são outras sugestões.', 'Hotel Douro Vinhas\nQuinta do Moreira – Marmelal\n5110-672 Armamar\nPortugal', '41°09´26.0"N 7°38´26.0"W', '(+351) 254 249 000', 'dourovinhas@hoteispsi.com', quartosDouroVinhas, servicosDouroVinhas, callback);
        },
        function(callback) {
          hotelCreate('A Ver o Mar', 'Situado na pitoresca vila da Ericeira, mesmo em cima da praia, este hotel com história e tradição, que resulta da reabilitação do marcante Hotel de Turismo da Ericeira, tem como cenário o Oceano Atlântico.\nA 30 minutos de Lisboa, com acesso direto por autoestrada, o hotel A Ver o Mar dispõe de quatro tipologias de quarto, destacando-se os que têm varanda e vista para o mar. Este hotel na Ericeira inclui um restaurante, dois bares, salas para eventos e reuniões empresariais, clube de crianças e parque infantil e um moderno clube de saúde com salas de massagens, jacuzzi, sauna, banho turco e ginásio.\nDurante a sua estadia no hotel A Ver o Mar, não deixe de dar um mergulho nas duas piscinas para adultos, uma das quais de água salgada. Já as crianças vão adorar os escorregas aquáticos.\nPartindo deste hotel na Ericeira, aventure-se a conhecer as praias da região. E saiba que se apreciar desportos de ondas, está em plena reserva mundial de surf, e palco de uma das etapas do circuito WSL World Tour que junta os melhores surfistas do mundo. Pode ainda visitar o Palácio Nacional de Mafra ou Sintra, a 20 minutos de distância do hotel A Ver o Mar, de carro.\nNo verão, a animação da vila aumenta graças a vários festivais, entre os quais um dedicado exclusivamente à música reggae.', 'Hotel A Ver o Mar\nLargo dos Navegantes\n2655-320 Ericeira\nPORTUGAL', '38°57´56.0"N 9°25´09.0"W', '(+351) 261 869 700', 'averomar@hoteispsi.com', quartosAVerOMar, servicosAVerOMar, callback);
        },
        function(callback) {
          hotelCreate('Mediterrâneo', 'Encontrará o Hotel Mediterrâneo mesmo junto à praia e apenas a cinco minutos do centro de Albufeira, no Algarve.\nEste hotel em Albufeira oferece quartos modernos e amplos, dos quais se destacam os com vista para o mar ou as suítes. Todos têm kitchenette, sendo ideais para famílias com crianças.\nConta ainda com um bar, um restaurante com buffet internacional e piscinas exteriores para adultos e crianças, prometendo dias de muito sol e animação. Tem ainda uma sala de jogos, parque infantil, clube de crianças com atividades para os mais novos e animadores próprios, spa com piscina interior, banho turco e jacuzzi, salas de massagem, ginásio e wi-fi gratuito em todas as zonas.\nDurante a sua estadia aproveite para conhecer as irresistíveis praias de Albufeira, aventurar-se em desportos náuticos ou desfrutar das animadas ruas da cidade, repletas de bares, restaurantes e comércio, ou passear na marina.\nPode também visitar diferentes parques temáticos como o Zoomarine, Aqualand e Aquashow.', 'Hotel Mediterrâneo\nPraia da Galé\n8200-995 Albufeira\nPORTUGAL', '37°04´55.0"N 8°1903.0"W', '(+351) 261 869 700', 'averomar@hoteispsi.com', quartosMediterraneo, servicosMediterraneo, callback);
        }
        ],
        // optional callback
        cb);
}

function createQuartos(cb) {
  async.parallel([
    function(callback) {
      for (var i = 0; i < 3; i++){
        quartoCreate(hoteis[0], 'Standard', 180, 270, servicosDouroStandard, callback);
      }
    },
    function(callback) {
        quartoCreate(hoteis[0], 'Suite', 250, 330, servicosDouroStandard, callback);
    },
    function(callback) {
      quartoCreate(hoteis[0], 'SuiteDuplex', 270, 350, servicosDouroSuiteDuplex, callback);
    },
    function(callback){
      quartoCreate(hoteis[0], 'SuiteDeluxe', 270, 350, servicosDouroSuiteDuplex, callback);
    },
    function(callback){
      for (var i = 0; i < 182; i++){
        quartoCreate(hoteis[1], 'Standard', 90, 160, servicosMarStandard, callback);
      }
    },
    function(callback){
      for(var i = 0; i < 5; i++){
        quartoCreate(hoteis[1], 'SuiteJunior', 120, 180, servicosMarSuiteJunior, callback);
      }
    },
    function(callback){
      for(var i = 0; i < 15; i++){
        quartoCreate(hoteis[1], 'SuiteJuniorSuperior', 130, 210, servicosMarSuiteJunioSup, callback);
      }
    },
    function(callback){
      for(var i = 0; i < 114; i++){
        quartoCreate(hoteis[2], 'Standard', 70, 210, servicosMediterraneoStandard, callback);
      }
    },
    function(callback){
      for(var i = 0; i < 98; i++){
        quartoCreate(hoteis[2], 'SuiteJunior', 90, 250, servicosMediterraneoSuiteJunior, callback);
      }
    },
    function(callback){
      for(var i = 0; i < 8; i++){
        quartoCreate(hoteis[2], 'SuiteSenior', 120, 240, servicosMediterraneoSuiteSenior, callback);
      }
    }
    ],
    // optional callback
    cb);
}

async.series([
  createServicos,
  createHoteis,
  createQuartos
],
// Optional callback
function(err, results) {
  if (err) {
      console.log('FINAL ERR: ' + err);
  }
  else {
      //console.log('BOOKInstances: '+bookinstances);
  }
  // All done, disconnect from database
  mongoose.connection.close();
});