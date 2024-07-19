<template>
  <div>
    <div class="container">
      <v-text-field
        v-model="keyword"
        label="Search by keyword"
        @input="fetchUsersDatas"
        class="keyword-input"
      ></v-text-field>

      <v-row class="card-row">
        <v-col
          v-for="(user, index) in filteredUsers"
          :key="user.id_user"
          class="card-col"
        >
          <div @click="navigateToUser(user.id_user)">
            <UserInfo :avatar="user.avatar">
              <template v-slot:avatar>
                <div class="avatar-container">
                  <img :src="user.avatar" alt="User Avatar" class="user-avatar" />
                </div>
              </template>
              <template v-slot:name>
                {{ user.name }} {{ user.firstname }}
              </template>
              <template v-slot:email>
                {{ user.mail }}
              </template>
              <template v-if="user.phone" v-slot:phone>
                {{ user.phone }}
              </template>
            </UserInfo>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import UserInfo from "@/components/profil/User-info.vue";

export default {
  components: {
    UserInfo,
  },
  data() {
    return {
      keyword: "",
      users: [],
    };
  },
  computed: {
    filteredUsers() {
      if (!this.keyword) {
        return this.users;
      }
      return this.users.filter((user) =>
        `${user.name} ${user.firstname} ${user.mail} ${user.phone}`
          .toLowerCase()
          .includes(this.keyword.toLowerCase())
      );
    },
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await this.$apiUsers.get("/api/users");
        this.users = response.data;
      } catch (error) {
        console.log("Erreur lors de la récupération des utilisateurs", error);
      }
    },
    fetchUsersDatas() {
      this.fetchUsers();
    },
    navigateToUser(userId) {
      this.$router.push(`/annuaire/${userId}`);
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}

.keyword-input {
  margin-bottom: 20px;
}

.card-row {
  display: flex;
  flex-wrap: wrap;
}

.card-col {
  flex: 1 1 300px;
  margin: 10px;
}

.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-avatar {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}

.card-col div {
  cursor: pointer;
}
</style>
