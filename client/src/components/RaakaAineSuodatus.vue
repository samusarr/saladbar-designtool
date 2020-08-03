<template>
  <div class='col suodatus'>
    <b-row>
      <b-col cols='1'><h6>T:nro</h6></b-col>
      <b-col><h6>Tuote</h6></b-col>
      <b-col><h6>Tuoteryhmä</h6></b-col>
      <b-col cols='1'><h6>€/kg</h6></b-col>
      <b-col cols='1'><h6>Sisältö</h6></b-col>
      <b-col cols='1'><h6>Yksikkö</h6></b-col>
      <b-col cols='2'></b-col>
    </b-row>
    <template v-for='raakaaine in raakaaineet'>
      <b-row class="tuoterivi" v-if='suodata(raakaaine)' :key='raakaaine.tuotenimi'>
        <b-col cols='1' class="tuote"><p class="topmargin">{{ raakaaine.tuotenro }}</p></b-col>
        <b-col class="tuote"><p class="topmargin">{{ raakaaine.tuotenimi }}</p></b-col>
        <b-col class="tuote"><p class="topmargin">{{ raakaaine.tuoteryhma }}</p></b-col>
        <b-col cols='1' class="tuote"><p class="topmargin">{{ raakaaine.hinta }}€</p></b-col>
        <b-col cols='1' class="tuote"><p class="topmargin">{{ raakaaine.pakkauskoko }}kg</p></b-col>
        <b-col cols='1' class="tuote"><p class="topmargin">{{ raakaaine.yksikko }}</p></b-col>
        <b-col cols='2'>
        <b-button variant="success" v-on:click="ainesTalteen(avain, raakaaine)">Lisää vaunuun</b-button>
        </b-col>
      </b-row>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aines: null,
      asia: 'asia'
    }
  },
  methods: {
    suodata(raakaaine) {
      return this.suodatus.includes(raakaaine.tuoteryhma) || this.suodatus === '' ? true : false;
    },
    ainesTalteen(avain, aines){
      this.aines = aines;
      this.$emit('tietovalintaan', this.aines);
      this.$parent.ainesTaulukkoon(avain, aines);
    }
  },
  props: {
    avain: Number,
    raakaaineet: Array,
    suodatus: String
  }
}
</script>

<style>
.suodatus {
  margin: 1rem 0;
}
select {
  width: 10rem;
}
.tuote {
    border-right: 1px solid black;
}
.topmargin {
  margin-top:0.8em;
  font-weight: 500; 
}
.tuoterivi {
  border: 1px solid black;
  margin-top: 0.1em;
}
</style>