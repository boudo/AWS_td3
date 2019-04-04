/********** Objet ****************/
let jours = {
              'mon' : 'Lundi',
              'tue' : 'Mardi',
              'wed' : 'Mercredi',
              'thu' : 'Jeudi',
              'fri' : 'Vendredi',
              'sat' : 'Samedi',
              'sun' : 'Dimanche'
            };

/*********** configuration ************/

// On charge le Framework Express.....
var express = require('express');

// On crée l'aplication web
var app = express();

// on configure la methode POST
const bodyP = require('body-parser');
app.use(bodyP.urlencoded({ extended: false }));

// on active les cookies
const cookieP = require('cookie-parser');
app.use(cookieP());

/*// On configure Express pour servir les fichers contenus dans public/
// à l'url /s
app.use('/s', express.static('public'));*/

/************** Routes *****************/


// On définit une route pour l'url /
app.get('/', function(req, res)
              {
                let resultat = "";
                for(let i in jours)
                {
                  resultat += jours[i] + '</br>';
                }
                res.send(resultat);
              }
);

// On définit une route qui répond à toute url de la forme /blabla
// en répondant Hello blabla
/*app.get('/:n', function(req, res)
                {
                  res.send('Hello <b>' + req.params.n + '</b>');
                }const bodyP = require('body-parser');
app.use(bodyP.urlencoded({ extended: false }));
);*/


/*// On configure Express pour servir les fichers contenus dans public/
// à l'url /s
app.get('/query_string', function(req, res)
                          {
                            let resultat = req._parsedUrl.query + '</br>';
                            for(let i in req.query)
                            {
                              resultat += i + ': ' + req.query[i] + '</br>';
                            }
                            res.send(resultat);
                          }



);*/

// On configure Express pour servir les fichers contenus dans public/
// à l'url /s
app.use('/s', express.static('static'));


// On définit une route pour l'url /query_string
app.post('/query_string', function(req, res)
                          {
                            let resultat = req._parsedUrl.query + '</br>';
                            for(let i in req.body)
                            {
                              resultat += i + ': ' + req.body[i] + '</br>';
                            }
                            res.send(resultat);
                          }



);

// On définit une route pour l'url /headers
app.all('/headers', function(req, res)
                      {
                        let resultat = '';
                        resultat += 'headers: ' + '<br>';
                        for(let i in req.headers)
                        {
                          resultat += i + ': ' + req.headers[i] + '</br>';
                        }
                        resultat += 'cookies: ' + '<br>';
                        for(let i in req.cookies)
                        {
                          resultat += i + ': ' + req.cookies[i] + '</br>';
                        }
                        res.send(resultat);
                      }
);

// On lance l'application
// (process.env.PORT est un paramètre fourni par Glitch)
app.listen(process.env.PORT);