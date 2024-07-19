<script>

import CompanyCard from '@/components/accueil/company-card.vue'

export default {
  components: {
    CompanyCard,
  },
  data(){
    return {
      companies: [], 
      logos: {}, // Stock les logos des stands
      configs: [],
      date_forum: null,
      date: null,
      heure: null,
      minutes: null,
      countdown: {
        days: 0,
        hours: 0,
        minutes: 0
      },
      stats: {
        companiesNumber: 0,
        intervenantsNumber: 0
      }
    }
  },
  methods: {
    async fetchCompany(){
      try{
        const response = await this.$apiForum.get("/api/company");
        this.companies = response.data;
        // Fetch logos for each company
        for (let company of this.companies) {
          await this.fetchCompanyLogo(company.id_company);
        }
      } catch (error) {
        console.log("Erreur lors de la récupération des entreprises", error);
      }
    },
  
    async fetchCompanyLogo(companyId) {
        try {
          const response = await this.$apiForum.get(`/api/company/${companyId}/logo`, {
            responseType: 'blob' // Ensure the image is retrieved as a blob
          });
          this.logos = { ...this.logos, [companyId]: URL.createObjectURL(response.data) };
        } catch (error) {
          console.log("Erreur lors de la récupération du logo de l'entreprise", error);
        }
      },
      async fetchConfigs(){
        try {
          const response = await this.$apiConfigs.get("/api/configs");
          this.configs = response.data;
          this.date_forum = this.configs.find(config => config.key === "date_forum").value;
        }
        catch (error) {
          console.log("Erreur lors de la récupération des configs", error);
        }

      },
      async fetchCompaniesNumber(){
        try {
          const response = await this.$apiStatistics.get("/api/companiesnb");
          this.stats.companiesNumber = response.data[0].nb_companies;
        }
        catch (error) {
          console.log("Erreur lors de la récupération du nombre d'entreprises", error);
        }
      },
      async fetchIntervenantsNumber(){
        try {
          const response = await this.$apiStatistics.get("/api/intervenantsnb");
          this.stats.intervenantsNumber = response.data[0].nb_intervenants;
        }
        catch (error) {
          console.log("Erreur lors de la récupération du nombre d'intervenants", error);
        }
      },
      startCountdown() {
        this.updateCountdown();
        setInterval(this.updateCountdown, 600); // Update every minute
        //get the date and time of the forum
        const date = new Date(this.date_forum);
        const options = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };
        this.date = date.toLocaleDateString(undefined, options)
        this.heure = date.getHours();
        this.minutes = date.getMinutes().toString().padStart(2, '0');

    },
    updateCountdown() {
      if (!this.date_forum) return;
      const forumDate = new Date(this.date_forum);
      const now = new Date();
      const timeDifference = forumDate - now;

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        this.countdown = { days, hours, minutes};
      } else {
        this.countdown = { days: 0, hours: 0, minutes: 0};
      }
    }
    },
    async mounted(){
      await this.fetchCompany();
      await this.fetchConfigs();
      await this.fetchCompaniesNumber();
      await this.fetchIntervenantsNumber();
      this.startCountdown();
    }
}
</script>

<template>
  <v-container class="maincontainer">
    
    <v-card class="intro-card" outlined>
      <v-row justify="center">
        <v-col cols="21" class="intro-text">
          <h1 class="grostitre">Forum emplois - stages</h1>
          <p>Le {{ date }} à {{ heure }}h{{ minutes }}, venez rencontrer nos partenaires industriels.</p>
        </v-col>
        <v-col cols="auto" class="intro-text">
          <p>Début du forum dans:</p>
          <div class="countdown-container">
            <div class="countdown-item">
              <div class="countdown-number">{{ countdown.days }}</div>
              <div class="countdown-label">Jours</div>
            </div>
            <div class="countdown-item">
              <div class="countdown-number">{{ countdown.hours }}</div>
              <div class="countdown-label">Heures</div>
            </div>
            <div class="countdown-item">
              <div class="countdown-number">{{ countdown.minutes }}</div>
              <div class="countdown-label">Minutes</div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>

  <v-container class="visiteursContainer">
    <v-row>
      <v-col>
        <v-card class="visitors-card">
          <v-card-title class="visitors-title">
            <h2>Pour les visiteurs ... </h2>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-content class="visitors-item">
                  <v-icon left color="rgb(5, 59, 105)" size="36">mdi-check-circle</v-icon>
                  <span> Je renseigne mon profil sur la plateforme</span>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content class="visitors-item">
                  <v-icon left color="rgb(5, 59, 105)" size="36">mdi-check-circle</v-icon>
                  <span> Je consulte les représentations et les offres des entreprises</span>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content class="visitors-item">
                  <v-icon left color="rgb(5, 59, 105)" size="36">mdi-check-circle</v-icon>
                  <span> Je m'entretiens sur place avec les recruteurs</span>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <v-card>
      <v-card-title>
        <h2>Le forum c'est ... </h2>
      </v-card-title>
      <v-card-item>
        <v-list>
          <v-list-item>
            {{ stats.companiesNumber }} entreprises partenaires
          </v-list-item>
          <v-list-item>
            {{  stats.intervenantsNumber }} intervenants
          </v-list-item>
        </v-list>
      </v-card-item>

    </v-card>
  </v-container>

  <v-container class="companiesContainer">
    <h2 class="grostitre">Nos {{ stats.companiesNumber }} entreprises partenaires</h2>
    <v-row justify="center">
      <v-col cols="auto" v-for="company in companies" :key="company.id_company">
        <company-card
          :logo="logos[company.id_company]"
          :name="company.name"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.entreprises {
  height: 150px; /* Taille des carrés pour les entreprises */
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.maincontainer {
  margin-top: 20px;
  margin-bottom: 20px;
}

.grostitre {
  font-size: 60px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: rgb(5, 59, 105);
}

.companiesContainer {
  margin-top: 20px;
  margin-bottom: 200px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centre la section horizontalement */
}

.visiteursContainer {
  margin-top: 40px;
  margin-bottom: 40px;
}

.visitors-card {
  padding: 20px;
}

.visitors-title {
  font-size: 28px;
  color: rgb(5, 59, 105);
  text-align: center;
}

.visitors-item {
  font-size: 18px;
  margin: 10px 0;
}

.intro-card {
  padding: 20px;
  background-color: #e3f2fd;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centre verticalement */
  align-items: center; /* Centre horizontalement */
  text-align: center; /* Centre le texte */
}

.intro-text {
  font-size: 18px;
  color: #555;
}

.images-card {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
}

.v-list-item-content {
  display: flex;
  align-items: center;
}

/* Countdown Styles */
.countdown-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 15px;
}

.countdown-number {
  font-size: 48px;
  font-weight: bold;
  color: rgb(5, 59, 105);
}

.countdown-label {
  font-size: 16px;
  color: #555;
}
</style>
