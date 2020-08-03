<template>
  <div>
    <div class='container-fluid'>
      <div class='row'>
        <div class='col'>
          <input type='checkbox' id='juustot' @click='suodata(0)'/>
          <label for='juustot'>Juustot</label>
        </div>
        <div class='col'>
          <input type='checkbox' id='kasvikset' @click='suodata(1)'/>
          <label for='kasvikset'>Kasvikset ja hedelmät</label>
        </div>
        <div class='col'>
          <input type='checkbox' id='lisukkeet' @click='suodata(2)'/>
          <label for='lisukkeet'>Lisukkeet</label>
        </div>
        <div class='col'>
          <input type='checkbox' id='pastat' @click='suodata(3)'/>
          <label for='pastat'>Pastat ja pastasalaatit</label>
        </div>
      </div>
      <div class='row'>
        <div class='col'>
          <input type='checkbox' id='proteiinit' @click='suodata(4)'/>
          <label for='proteiinit'>Proteiinikomponentit</label>
        </div>
        <div class='col'>
          <input type='checkbox' id='ruokaisat' @click='suodata(5)'/>
          <label for='ruokaisat'>Ruokaisat komponentit</label>
        </div>
        <div class='col'>
          <input type='checkbox' id='salaatit' @click='suodata(6)'/>
          <label for='salaatit'>Salaattipohjat</label>
        </div>
        <div class='col'></div>
      </div>
    </div>
    <div class='container-fluid'>
      <div class='row'>
        <RaakaAineSuodatus
          :avain='avain'
          :raakaaineet='raakaaineet'
          :suodatus='suodatus'
          v-on:tietovalintaan="tietoLaatikkoon"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RaakaAineSuodatus from '@/components/RaakaAineSuodatus';
export default {
  components: {
    RaakaAineSuodatus
  },
  props: {
    avain: Number,
    raakaaineet: Array
  },
  data() {
    return {
      childdata: null,
      suodatus: '',
      suodatuslista: [
        { id: 0, checked: false, value: 'Juustot' },
        { id: 1, checked: false, value: 'Kasvikset ja hedelmät' },
        { id: 2, checked: false, value: 'Lisukkeet' },
        { id: 3, checked: false, value: 'Pastat ja pastasalaatit' },
        { id: 4, checked: false, value: 'Proteiinikomponentit' },
        { id: 5, checked: false, value: 'Ruokaisat komponentit' },
        { id: 6, checked: false, value: 'Salaattipohjat' }
      ],
      tayttomalli: [
        { position: 1, value: '' },
        { position: 2, value: '' },
        { position: 3, value: '' },
        { position: 4, value: '' },
        { position: 5, value: '' },
        { position: 6, value: '' },
        { position: 7, value: '' },
        { position: 8, value: '' },
        { position: 9, value: '' },
        { position: 10, value: '' },
        { position: 11, value: '' },
        { position: 12, value: '' },
        { position: 13, value: '' },
        { position: 14, value: '' },
        { position: 15, value: '' },
        { position: 16, value: '' },
        { position: 17, value: '' },
        { position: 18, value: '' },
        { position: 19, value: '' },
      ]
    }
  },
  methods: {
    suodata(i) {
      this.suodatus = '';
      this.suodatuslista[i].checked = !this.suodatuslista[i].checked;
      for (const i in this.suodatuslista) {
        if (this.suodatuslista[i].checked) {
          this.suodatus += this.suodatuslista[i].value;
        }
      }
    },
    tietoLaatikkoon(value) {
      this.childdata = value;
      //console.log(this.childdata);
      this.$emit('tietolaatikkoon', this.childdata);
    },
    ainesTaulukkoon(avain, aines) {
      this.tayttomalli[avain-1].value = aines;
      console.log(this.tayttomalli);
    }
  }
}
</script>

<style>

</style>