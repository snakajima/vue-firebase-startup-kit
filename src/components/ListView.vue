<template>
  <ul class="listview">
    <li v-for="article in articles" :key="article.id">
      <router-link :to="`/${path}/${article.id}`">{{article.title}}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { BaseDocument } from "../scripts/datatypes";

@Component
export default class ListView extends Vue {
  @Prop() readonly refCollection!: firebase.firestore.CollectionReference;
  @Prop() readonly path!: string;
  detacher?: firebase.Unsubscribe;
  articles: Array<BaseDocument> = [];

  created() {
    this.detacher = this.refCollection
      .orderBy("timeCreated", "desc")
      .where("owner", "==", this.$store.state.user.uid)
      .onSnapshot(snapshot => {
        this.articles = snapshot.docs.map(doc => {
          return Object.assign(doc.data(), { id: doc.id }) as BaseDocument;
        });
      });
  }
  destroyed() {
    this.detacher && this.detacher();
  }
}
</script>

<style scoped>
.listview {
  margin-top: 8px;
}
</style>

