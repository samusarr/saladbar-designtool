<template>
  <div>
    <b-container>
      <b-row class="etusivu">
        <b-col cols='3'></b-col>
        <b-col>
          <b-card
            title="Vaunusuunnittelu"
            img-src="http://salaattibaari.tk/kuvat/salaattimestari.png"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2 text-center"
          >
            <b-card-text>
              Työkalu pöytien suunnittelua varten helposti.
            </b-card-text>
            <b-button href="/vaunusuunnittelu" variant="outline-success">Vaunusuunnittelu</b-button>
          </b-card>
        </b-col>
        <b-col>
          <b-card
            title="Raaka-aineet"
            img-src="http://salaattibaari.tk/kuvat/fresh.png"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2 text-center"
          >
            <b-card-text>
              Käytössäsi olevat raaka-aineet löydät täältä.
            </b-card-text>
            <b-button href="/raaka-aineet" variant="outline-success">Raaka-aineet</b-button>
          </b-card>
        </b-col>
        <b-col cols='3'></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  computed: mapGetters(['raakaaine']),
  created() {
    this.haeRaakaaine();
  },
  methods:{
    ...mapActions(['haeRaakaaine'])
  }
}

</script>

<style>
.etusivu {
  margin-top: 10em;
}
</style>