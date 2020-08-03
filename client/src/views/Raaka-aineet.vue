<template>
  <div>
    <div v-if='showList === false'>
      <h2>Raaka-aineet</h2>
        <b-button variant="outline-success" @click='addIngredient'>Lisää uusi</b-button>
        
        <b-table
          id="raaka-lista"
          :items="raakaaine" 
          :fields="fields"
          :per-page="perPage"
          :current-page="currentPage"
          small
        > <!-- :items= raaka-aineet pitäis saada siihen arrayna, tällä hetkellä objektina -->
        <template v-slot:cell(poisto)="item">
          <b-button variant="danger" @click="deleteIngredient(item)">Poista</b-button>
        </template>
        </b-table>
        <b-pagination
            v-model="currentPage"
            :total-rows="getLength(raakaaine)"
            :per-page="perPage"
            align="center"
            aria-controls="raaka-lista"
          >
        </b-pagination>
        <!-- <b-table-simple
          
        >
          <b-thead>
            <b-tr>
              <b-th>T:nro</b-th>
              <b-th>Tuote</b-th>
              <b-th>Tuoteryhmä</b-th>
              <b-th>€/kg</b-th>
              <b-th>Sisältö</b-th>
              <b-th>Yksikkö</b-th>
            </b-tr>
          </b-thead>
          <b-tbody 
            id="raaka-lista"
            :per-page="perPage"
            :current-page="currentPage"
          >
            <b-tr v-for='item in raakaaine' v-bind:key="item.tuotenimi">
              <b-td>{{ item.tuotenro }}</b-td>
              <b-td>{{ item.tuotenimi }}</b-td>
              <b-td>{{ item.tuoteryhma }}</b-td>
              <b-td>{{ item.hinta }}</b-td>
              <b-td>{{ item.pakkauskoko }}</b-td>
              <b-td>{{ item.yksikko }}</b-td>
              <b-td><b-button variant="danger" @click="deleteIngredient(item)">Poista</b-button></b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple> -->
        
        
        
        
        <!-- <b-container class="raaka-ainelista">
          <b-row>
            <b-col cols='1'><h5>T:nro</h5></b-col>
            <b-col><h5>Tuote</h5></b-col>
            <b-col><h5>Tuoteryhmä</h5></b-col>
            <b-col cols='1'><h5>€/kg</h5></b-col>
            <b-col cols='1'><h5>Sisältö</h5></b-col>
            <b-col cols='1'><h5>Yksikkö</h5></b-col>
            <b-col cols='2'></b-col>
          </b-row>
          <div 
            
          >
            <b-row id="raaka-lista"
            :per-page="perPage"
            :current-page="currentPage" class="tuoterivi" v-for='item in raakaaine' v-bind:key="item.tuotenimi">
            <b-col cols='1' class="tuote"><p class="topmargin">{{ item.tuotenro }}</p></b-col>
            <b-col class="tuote"><p class="topmargin">{{ item.tuotenimi }}</p></b-col>
            <b-col class="tuote"><p class="topmargin">{{ item.tuoteryhma }}</p></b-col>
            <b-col cols='1' class="tuote"><p class="topmargin">{{ item.hinta }}€</p></b-col>
            <b-col cols='1' class="tuote"><p class="topmargin">{{ item.pakkauskoko }}kg</p></b-col>
            <b-col cols='1' class="tuote"><p class="topmargin">{{ item.yksikko }}</p></b-col>
            <b-col cols='2'>
              <b-button-group class="topmargin">
                <b-button variant="info" @click="rows(index)">Päivitä</b-button>
                <b-button variant="danger" @click="deleteIngredient(item)">Poista</b-button>
              </b-button-group>
            </b-col>
          </b-row>
          </div>
          <b-pagination
            v-model="currentPage"
            :total-rows=29
            :per-page="perPage"
            aria-controls="raaka-lista"
          ></b-pagination>
        </b-container> -->
    </div>
    <div v-if='showList === true'>
      <RaakaAine/>
      <b-button class='peruuta' type="submit" variant="outline-success" @click='addIngredient'>Peruuta</b-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import RaakaAine from '@/components/RaakaAine';
export default {
  computed: mapGetters(['raakaaine']),
  data() {
    return {
      showList: false,
      perPage: 10,  
      currentPage: 1,
      fields : [
        {key: 'tuotenro', label: 'Tuotenro'},
        {key: 'tuotenimi', label: 'Tuote'},
        {key: 'tuoteryhma', label: 'Ryhmä'},
        {key: 'hinta', label: '€/kg'},
        {key: 'pakkauskoko', label: 'KG'},
        {key: 'yksikko', label: 'Yksikkö'},
        {key: 'valittu', label: 'Suosio'},
        {key: 'poisto', label: ''}
      ],
      ainekset: [],
    }
  },
  methods:{
    ...mapActions(['haeRaakaaine', 'poistaRaakaaine']),
    addIngredient() {
      this.showList = !this.showList;
    },
    deleteIngredient(aine) {
      this.poistaRaakaaine(aine.item).then(res => {
        if(res.data.success){
          alert('Raaka-aine poistettu onnistuneesti')
          location.reload();
        }
      });
    },
    rows(pituus) {
      console.log(pituus);
    },
    getLength(item) {
      return Object.keys(item).length;
    }
  },
  created() {
    this.haeRaakaaine();
  },
  components: {
    RaakaAine
  }
}

</script>

<style>
  .peruuta {
    margin-top: 1rem;
    width: 10rem;
  }
  .tuotekuva {
    width: 1em;
  }
  .tuoterivi {
    border: 1px solid black;
    margin-top: 0.1em;
  }
  .tuote {
    border-right: 1px solid black;
  }
  .topmargin {
    margin-top:0.8em;
    font-weight: 500; 
  }
  .raaka-ainelista {
    background-color: rgba(76, 134, 74, 0.219);
    border: solid black 2px;
    padding: 2em;
    margin-top: 1em;
    border-radius: 1em;
  }
</style>