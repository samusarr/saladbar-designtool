<template>
  <div class="laatikko">
    <div>
      <div v-if="haettu === false">
        <b-button class="lisaysnappi" @click="showModal()" variant='outline-success'><b-icon-plus></b-icon-plus></b-button>
      </div>
      <div v-if="haettu === true">
        <b-container>
          <b-row>
            <b-img class="tuotekuva" :src='tuote.kuvaurl'></b-img>
          </b-row>
          <b-row>
            <b-button class='poistaTuote' variant='danger' v-on:click='poistaTuote'>Poista</b-button>
          </b-row>
        </b-container>
      </div>
      <b-modal 
        :ref="$id('my-modal')" 
        title="Tuotteet" 
        size="xl"
        :busy=true
      >
        <RaakaAineValinta
          :avain='avain'
          :raakaaineet='raakaaine'
          v-on:tietolaatikkoon="hideModalAndStuff"
        />
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import RaakaAineValinta from '@/components/RaakaAineValinta';
export default {
  components: {
    RaakaAineValinta
  },
  props: {
    avain: Number
  },
  computed: mapGetters(['raakaaine']),
  data() {
    return {
      id: this.uid,
      tuote: null,
      haettu: false,
      kilomaara: 0,
      hinta: 0,
      kokhinta: 0,
      suosio: null,
      tuotenumero: null
    }
  },
  created() {
    this.haeRaakaaine();
    console.log("This component's unique id is: " + this.uid);
  },
  methods: {
    ...mapActions(['haeRaakaaine', 'paivitaSuosio']),
    showModal() {
      this.$refs[this.uid + '-my-modal'].show()
    },
    hideModalAndStuff(arvo) {
      this.$refs[this.uid + '-my-modal'].hide()
      this.tuote = arvo
      this.kilomaara = arvo.pakkauskoko
      this.hinta = arvo.hinta
      this.haettu = true
      this.kokhinta = this.kilomaara * this.hinta
      this.suosio = arvo.valittu + 1
      this.tuotenumero = arvo.tuotenro
      this.$emit('kilot', this.kilomaara)
      this.$emit('hinta', this.kokhinta)
      this.lisaaSuosio()
    },
    poistaTuote(){
      this.haettu = false
      this.$emit('poistokilot', this.kilomaara)
      this.$emit('poistohinta', this.kokhinta)
      this.suosio = this.suosio - 1
      this.lisaaSuosio()
    },
    lisaaSuosio(){
      let suosilisa = {
        tuotenro: this.tuotenumero,
        suosio: this.suosio
      };
      console.log(suosilisa)
      this.paivitaSuosio(suosilisa)
    }
  }
}
</script>

<style>
.laatikko {
  text-align: center;
}
.tuotekuva {
  height: 8em;
  width: 100%;
}
.lisaysnappi {
  margin-top: 4rem;
}
.poistaTuote {
  margin-top: .5rem;
  width: 6rem;
}
</style>