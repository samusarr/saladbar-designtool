<template>
  <div>
    <b-form @submit.prevent="lisaaAine">

      <!--TUOTENUMERO-->
      <b-form-group
      id="input-group-1"
      label="Tuotenumero:"
      label-for="tuotenro"
      >
      <b-form-input
          id="tuotenro"
          v-model="tuotenro"
          type="text"
          required
          placeholder="Syötä tuotenumero"
      ></b-form-input>
      </b-form-group>

      <!--TUOTTEEN NIMI-->
      <b-form-group
      id="input-group-2"
      label="Tuote:"
      label-for="tuotenimi"
      >
      <b-form-input
          id="tuotenimi"
          v-model="tuotenimi"
          type="text"
          required
          placeholder="Syötä tuote"
      ></b-form-input>
      </b-form-group>

      <!--TUOTERYHMÄ-->
      <b-form-group id="input-group-3" 
      label="Tuoteryhmä:" 
      label-for="tuoteryhma"
      >
      <b-form-select
          id="tuoteryhma"
          v-model="tuoteryhma"
          :options="tuoteryhmat"
          required
      ></b-form-select>
      </b-form-group>

      <!--TUOTTEEN HINTA-->
      <b-form-group
      id="input-group-4"
      label="Hinta:"
      label-for="hinta"
      >
      <b-form-input
          id="hinta"
          v-model="hinta"
          type="text"
          required
          placeholder="Syötä tuotteen hinta"
      ></b-form-input>
      </b-form-group>

      <!--PAKKAUSKOKO-->
      <b-form-group
      id="input-group-5"
      label="Pakkauskoko:"
      label-for="pakkauskoko"
      >
      <b-form-input
          id="pakkauskoko"
          v-model="pakkauskoko"
          type="text"
          required
          placeholder="Syötä pakkauksen koko (kg)"
      ></b-form-input>
      </b-form-group>

      <!--YKSIKKÖ-->
      <b-form-group
      id="input-group-6"
      label="Yksikkö:"
      label-for="yksikko"
      >
      <b-form-select
          id="yksikko"
          v-model="yksikko"
          :options="yksikot"
          required
      ></b-form-select>
      </b-form-group>

      <!--KUVA-->
      <b-form-group
      id="input-group-7"
      label="Kuva (url):"
      label-for="kuvaurl"
      >
      <b-form-input
          id="kuvaurl"
          v-model="kuvaurl"
          type="text"
          required
          placeholder="Syötä kuvan URL"
          ></b-form-input>
      </b-form-group>
      <b-button class='lisaa' type="submit" variant="outline-success">Lisää raaka-aine</b-button>
    
    </b-form>
  </div>
</template>
<script>
import { mapActions} from 'vuex';
export default {
  data() {
    return {
      tuotenro: '',
      tuotenimi: '',
      tuoteryhma: '',
      hinta: '',
      pakkauskoko: '',
      yksikko: '',
      kuvaurl: '',
      valittu: 0,
      tuoteryhmat: [{ text: 'Valitse tuoteryhmä', value: null }, 
      'Salaattipohjat',
      'Kasvikset ja hedelmät',
      'Proteiinikomponentit',
      'Juustot',
      'Pastat ja pastasalaatit',
      'Ruokaisat komponentit',
      'Tuoresalaatit GN1/2',
      'Ruoanlaittokasvikset',
      'Ateriakomponentit',
      'Jälkiruoat ja välipalat',
      'Lisukkeet',
      'Kastikkeet ja muut lisukkeet'
      ],
      yksikot: [{ text: 'Valitse yksikkö', value: null }, 'PSS', 'GN1/4', 'GN1/2', 'GN1/6', 'Kannu', 'Dyno', 'PLL'],
      show: true
    }
  },
  methods: {
    ...mapActions(['lisaaRaakaaine']),
    lisaaAine(){
      let raakaaine = {
        tuotenro: this.tuotenro,
        tuotenimi: this.tuotenimi,
        tuoteryhma: this.tuoteryhma,
        hinta: this.hinta,
        pakkauskoko: this.pakkauskoko,
        yksikko: this.yksikko,
        kuvaurl: this.kuvaurl,
        valittu: this.valittu
      };
      this.lisaaRaakaaine(raakaaine).then(res => {
        if(res.data.success){
          alert('Raaka-aine lisätty onnistuneesti')
          location.reload();
        }
      });
    }
  }
}
</script>

<style>
.lisaa {
  width: 10rem;
}
</style>