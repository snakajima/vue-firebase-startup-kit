<template>
  <ul>
    <li v-for="article in articles" :key="article.id">
      <router-link :to="`/${path}/${article.id}`">{{article.title}}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class ListView extends Vue {
  @Prop() readonly refCollection!: firebase.firestore.CollectionReference;
  @Prop() readonly path!: string;
  detacher?: firebase.Unsubscribe;
  articles: Array<any> = [];

  created() {
    this.detacher = this.refCollection
      .orderBy("timeCreated", "desc")
      .onSnapshot(snapshot => {
        this.articles = snapshot.docs.map(doc => {
          return Object.assign(doc.data(), { id: doc.id });
        });
      });
  }
  destroyed() {
    this.detacher && this.detacher();
  }
}
</script>

