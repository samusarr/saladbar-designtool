<template>
  <div class="flexbox">
  <b-container> 
    <b-row>   
      <Vaunu>
          <b-row>
            <Laatikko
            class="pienilaatikko" 
            v-for="n in 10" 
            :key="n"
            :avain='n'
            v-on:kilot="montakoKiloa"
            v-on:poistokilot="poistetaanKilot"
            v-on:hinta="lisaaHinta"
            v-on:poistohinta="poistaHinta"
            />
          </b-row>
          <b-row>
            <Laatikko class="isolaatikko"
            :key='11'
            :avain='11'
            v-on:kilot="montakoKiloa"
            v-on:poistokilot="poistetaanKilot"
            v-on:hinta="lisaaHinta"
            v-on:poistohinta="poistaHinta"
            />
            <Laatikko
            class="pienilaatikko" 
            v-for="n in 8" 
            :key='n + 11'
            :avain='n + 11'
            v-on:kilot="montakoKiloa"
            v-on:poistokilot="poistetaanKilot"
            v-on:hinta="lisaaHinta"
            v-on:poistohinta="poistaHinta"
            />
          </b-row>
      </Vaunu>
      </b-row>
      <div class="luvut">
        <b-row>
          <b-col cols='4'>
            <b-row >
              <b-col class="datarow" cols='7'>Täyttöjä/pv (kpl)</b-col>
              <b-col cols='5'><input class='kentta' v-model.number='taytot' @change='laskuToimitus'></b-col>
            </b-row>
            <b-row >
              <b-col class="datarow" cols='7'>Annoskoko (kg)</b-col>
              <b-col cols='5'><input class='kentta' v-model.number='annoskoko' @change='laskuToimitus'></b-col>
            </b-row>
            <b-row >
              <b-col class="datarow" cols='7'>Kuluttajahinta (€/kg)</b-col>
              <b-col cols='5'><input class='kentta' v-model.number='kuluttajahinta' @change='laskuToimitus'></b-col>
            </b-row>
            <b-row >
              <b-col class="datarow" cols='7'>Myyntipäivät (kpl/kk)</b-col>
              <b-col cols='5'><input class='kentta' v-model.number='myyntipv' @change='laskuToimitus'></b-col>
            </b-row>
            <b-row >
              <b-col class="datarow" cols='7'>Salaattivaunun vuokra (€)</b-col>
              <b-col cols='5'><input class='kentta' v-model.number='vaunuvuokra' @change='laskuToimitus'></b-col>
            </b-row>
            <b-row >
              <b-col class="datarow" cols='7'>Työaika (h/pv)</b-col>
              <b-col cols='5'><input class='kentta' v-model.number='tyoaika' @change='laskuToimitus'></b-col>
            </b-row>
            <b-row >
              <b-col class="datarow" cols='7'>Henkilöstökulu (€/h)</b-col>
              <b-col cols='5'><input class='kentta' v-model.number='henkilokulu' @change='laskuToimitus'></b-col>
            </b-row>
            <b-row >
              <b-col class="datarow" cols='7'>Hävikki (%)</b-col>
              <b-col cols='5'><input class='kentta' v-model.number='havikki' @change='laskuToimitus'></b-col>
            </b-row>
          </b-col>
          <b-col cols='4'>
            <b-row >
              <b-col class="datarow" cols='7'>Täyttöaste</b-col>
              <b-col cols='5'>{{tayttoaste}} kg</b-col>
            </b-row>
            <b-row >
              <b-col class="datarow" cols='7'>Myynti kg/pv</b-col>
              <b-col cols='5'>{{ myyntipvkg }} kg</b-col>
            </b-row>
            <b-row >
              <b-col class="datarow" cols='7'>Annoksia yhteensä</b-col>
              <b-col cols='5'>{{ annosmaara }} kpl</b-col>
            </b-row>
            <b-row >
              <b-col class="datarow" cols='7'>Myynti yhteensä €/pv</b-col>
              <b-col cols='5'>{{ kokmyyntipv }}€</b-col>
            </b-row>
            <b-row >
              <b-col class="datarow" cols='7'>Raaka-aineet €/kk</b-col>
              <b-col cols='5'>{{ raakaaineetkke }}€</b-col>
            </b-row>
            <b-row >
              <b-col class="datarow" cols='7'>Raaka-aineet kg/kk</b-col>
              <b-col cols='5'>{{ raakaaineetkkkg }} kg</b-col>
            </b-row>
            <b-row >
              <b-col class="datarow" cols='7'>Henkilöstökulut yhteensä</b-col>
              <b-col cols='5'>{{ henkilokuluyht }}€</b-col>
            </b-row>
            <b-row >
              <b-col class="datarow" cols='7'>Hävikki (€)</b-col>
              <b-col cols='5'>{{ havikkie }}€</b-col>
            </b-row>
            <b-row >
              <b-col class="datarow" cols='7'>Kustannukset yhteensä</b-col>
              <b-col cols='5'>{{ kustannukset }}€</b-col>
            </b-row>
          </b-col>
          <b-col cols='4'>
            <b-row>
              <b-col class="datarow" cols='7'>Myynti yhteensä €/kk</b-col>
              <b-col>{{ myyntiyht }}€</b-col>
            </b-row>
            <b-row>
              <b-col class="datarow" cols='7'>Keskiostohinta €/kg</b-col>
              <b-col cols='5'>{{ keskiostohinta }}€</b-col>
            </b-row>
            <b-row>
              <b-col class="datarow" cols='7'>Tulos / kk</b-col>
              <b-col cols='5'>{{ tulos }}€</b-col>
            </b-row>
            <b-row>
              <b-col class="datarow" cols='7'>alv 0%</b-col>
              <b-col cols='5'>{{ tulosalv0 }}€</b-col>
            </b-row>
            <b-row>
              <b-col class="datarow" cols='7'>Kate</b-col>
              <b-col cols='5'>{{ kate }}%</b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import Vaunu from '../components/Vaunu';
import Laatikko from '../components/Laatikko';
export default {
  data() {
    return {
      taytot: 1,      
      annoskoko: 0.3,         
      kuluttajahinta: 14.90,    
      myyntipv: 20,          
      vaunuvuokra: 0,       
      tyoaika: 0,         
      henkilokulu: 0,       
      havikki: 5,         
      henkilokuluyht: 0,
      tayttoaste: 0,
      myyntipvkg: 0,
      annosmaara: 0,
      kokmyyntipv: 0,
      raakaaineetkke: 0,
      raakaaineetkkkg: 0,
      havikkie: 0,
      kustannukset: 0,
      myyntiyht: 0,
      keskiostohinta: 0,
      tulos: 0,
      tulosalv0: 0,
      kate: 0,
      yhdentaytonhinta: 0


    }
  },
  methods: {
    laskuToimitus() {
      this.henkilokuluyht = (this.tyoaika * this.henkilokulu * this.myyntipv).toFixed(2)
      this.myyntipvkg = (this.taytot * this.tayttoaste).toFixed(1)
      this.annosmaara = (this.myyntipvkg / this.annoskoko).toFixed(1)
      this.kokmyyntipv = (this.myyntipvkg * this.kuluttajahinta).toFixed(2)
      this.raakaaineetkke = (this.yhdentaytonhinta * this.taytot * this.myyntipv).toFixed(2)
      this.raakaaineetkkkg = (this.myyntipvkg * this.myyntipv).toFixed(2)
      this.havikkie = (this.raakaaineetkke * (this.havikki/100)).toFixed(2)
      this.kustannukset = (parseFloat(this.raakaaineetkke) + parseFloat(this.vaunuvuokra) + parseFloat(this.henkilokuluyht) + parseFloat(this.havikkie)).toFixed(2)
      this.myyntiyht = (this.kokmyyntipv * this.myyntipv).toFixed(2)
      this.keskiostohinta = (this.raakaaineetkke / this.raakaaineetkkkg).toFixed(2)
      this.tulos = (parseFloat(this.myyntiyht) - parseFloat(this.kustannukset)).toFixed(2)
      this.tulosalv0 = (parseFloat(this.tulos / 1.14)).toFixed(2)
      this.kate = ((parseFloat(this.tulos) / parseFloat(this.myyntiyht)) * 100).toFixed(1)



    },
    montakoKiloa(kilomaara){
      this.tayttoaste = (parseFloat(this.tayttoaste) + parseFloat(kilomaara)).toFixed(1)
      this.laskuToimitus()
    },
    poistetaanKilot(poistokilot){
      this.tayttoaste = (this.tayttoaste - poistokilot)
      this.laskuToimitus()
    },
    lisaaHinta(hinta){
      this.yhdentaytonhinta = this.yhdentaytonhinta + hinta
      this.laskuToimitus()
    },
    poistaHinta(poistohinta){
      this.yhdentaytonhinta = this.yhdentaytonhinta - poistohinta
      this.laskuToimitus()
    }
  },
  components:{
    Vaunu,
    Laatikko
  }
}

</script>

<style>
.flexbox {
  display: flex;
  justify-content: center;
}

.vaunu {
  margin: auto;
}

.laatikko {
  background-color: honeydew;
  border: solid black .125rem;
  box-sizing: border-box;
  height: 12rem;
  margin: 0 .125rem .125rem 0;
  padding: .5rem;
}

.isolaatikko {
  width: 14.125rem;
}

.pienilaatikko {
  width: 7rem;
}

.luvut {
  margin-top: 2rem;
}
.datarow {
  border-bottom: solid black .0625rem;
  box-sizing: border-box;
  height: 1.75rem;
}
.kentta {
  height: 1.75rem;
  width: 6rem;
}
</style>