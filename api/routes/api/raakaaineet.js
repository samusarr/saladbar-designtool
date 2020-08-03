const express = require('express');
const router = express.Router();
const RaakaAine = require('../../model/RaakaAine');

router.post('/add', (req, res) => {
  let {
    tuotenro,
    tuotenimi,
    tuoteryhma,
    hinta,
    pakkauskoko,
    yksikko,
    kuvaurl,
    valittu 
  } = req.body
  // Tarkistus olemassa oleviin
  RaakaAine.findOne({
      tuotenro: tuotenro
  }).then(user => {
      if (user) {
          return res.status(400).json({
              msg: "Raaka-aine on jo lisätty"
          });
      }
  });
  // Lisätään uusi raaka-aine
  let uusiRaakaAine =  new RaakaAine({
    tuotenro,
    tuotenimi,
    tuoteryhma,
    hinta,
    pakkauskoko,
    yksikko,
    kuvaurl,
    valittu 
  });
  
  uusiRaakaAine.save().then( raakaaine => {
    return res.status(201).json({
      success: true,
      msg:"Raaka-aine on lisätty onnistuneesti."
    });
  });
});

router.get('/get', (req, res) => {
  RaakaAine.find({}, '-_id tuotenro tuotenimi tuoteryhma hinta pakkauskoko yksikko valittu kuvaurl', (error, raakaaine) => {
    if(error) {console.log(error);}
    res.send({
      raakaaine: raakaaine
    });
  });
});

router.post('/delete', (req, res) => {
  let check = req.body.tuotenro
  RaakaAine.deleteOne({tuotenro: check},
    function (err) {
      if (err)
        res.send(err)
     res.send({
       success: true
     });   
    });
});

router.post('/update', (req, res) => {
  let tuotenro = req.body.tuotenro
  let suosio = req.body.suosio
  RaakaAine.findOneAndUpdate({tuotenro: tuotenro}, { $set: { valittu: suosio } },
      function (err) {
        if (err)
          res.send(err)
      res.send({
        success: true
      });
      }
    )
})

module.exports = router;