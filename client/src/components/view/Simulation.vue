<template>
  <v-flex md10 offset-md1>
    <v-card>
      <v-stepper v-model="etape" class="my-2" light>
        <v-stepper-header>
          <v-stepper-step class="red--text" step="1" :complete="estValideEtape1" >Enfant</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" :complete="estValideEtape2" >Parents</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3" :complete="estValideEtape3">Tuteur légal</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4" :complete="estValideEtape4" >Informations générales</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="5" :complete="estValideEtape5" >Carnet de présences</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="6" :complete="estValideEtape6" >Tarifs</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <InfosEnfant @submit="submitEnfant"></InfosEnfant>
          </v-stepper-content>
          <v-stepper-content step="2">
            <TuteursLegaux @back="back" @submit="submitTuteurs"></TuteursLegaux>
          </v-stepper-content>
          <v-stepper-content step="3">
            <EmployeurOptionnel @back="back" @submit="submitEmp"></EmployeurOptionnel>
          </v-stepper-content>
          <v-stepper-content step="4">
            <InformationGenerale nom="" @back="back" @submit="submitInfoG"></InformationGenerale>
          </v-stepper-content>
          <v-stepper-content step="5">
            <PlaningPresenceContrat @back="back" @submit="submitPresences"></PlaningPresenceContrat>
          </v-stepper-content>
          <v-stepper-content step="6">
            <Tarifs @back="back" @submit="submitTarifs"></Tarifs>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-flex>
</template>

<script>
import InfosEnfant from '../part/contratPart/InfosEnfant'
import PlaningPresenceContrat from '../part/contratPart/PlaningPresenceContrat'
import DateContrat from '../part/contratPart/DateDebutContrat'
import InformationGenerale from '../part/contratPart/InformationGenerale'
import EmployeurOptionnel from '../part/contratPart/EmployeurOptionnel'
import Tarifs from '../part/contratPart/Tarifs'
import TuteursLegaux from '../part/contratPart/TuteursLegaux'
export default {
  name: 'Simulation',
  components: {TuteursLegaux, InformationGenerale, DateContrat, PlaningPresenceContrat, InfosEnfant, EmployeurOptionnel, Tarifs},
  data () {
    return {
      etape: 1,
      estValideEtape1: false,
      estValideEtape2: false,
      estValideEtape3: false,
      estValideEtape4: false,
      estValideEtape5: false,
      estValideEtape6: false,
      Fin: false

    }
  },
  methods: {
    submitEnfant (data) {
      console.log(data)
      // store data in DB
      this.estValideEtape1 = true
      this.etape++
    },
    submitTuteurs (data) {
      this.estValideEtape2 = true
      if (data.asEmployeur) {
        this.etape = 4
      } else {
        this.etape = 3
      }
    },
    submitEmp (data) {
      console.log(data)
      // store data in DB
      this.estValideEtape3 = true
      this.etape++
    },
    submitInfoG (data) {
      console.log(this.etape)
      console.log(data)
      this.etape++
      this.estValideEtape4 = true
    },
    submitPresences (data) {
      console.log(this.etape)
      console.log(data)
      this.etape++
      this.estValideEtape5 = true
    },
    submitTarifs (data) {
      console.log(this.etape)
      console.log(data)
      this.etape++
      this.fin = true
      this.estValideEtape6 = true
    },
    back () {
      this.etape--
    }
  }
}
</script>

<style scoped>

</style>
