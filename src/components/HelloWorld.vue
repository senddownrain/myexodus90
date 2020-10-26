<template>
  <v-card >
    <v-card-title> День {{ today.number }}. {{ today.title }} </v-card-title>
    <v-card-subtitle> {{ date }} / [{{ curWeek }} Неделя] </v-card-subtitle>
    <v-card-text>
      <v-expansion-panels popout multiple v-model="panel">
        <v-expansion-panel>
          <v-expansion-panel-header>
            Исход {{ today.verse }}
          </v-expansion-panel-header>
         
          <v-expansion-panel-content>  {{ today.verseText }}</v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header> Комментарий </v-expansion-panel-header>
          <v-expansion-panel-content>
            {{ today.comment }}
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Задание на неделю
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            {{ week.todos }}
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header> Упражнения </v-expansion-panel-header>
          <v-expansion-panel-content>
            {{ today.exercises }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="update" text>Обновить</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
export default {
  name: "HelloWorld",
  data() {
    return {
      panel: null,
    };
  },
  computed: {
    ...mapGetters(["weeks", "days", "settings"]),
    today() {
      return (
        (this.days && this.days.length > 0
          ? this.days.find((f) => f.number == this.todayNum)
          : {}) || {}
      );
    },
    todayNum() {
      if (this.settings && this.settings.length > 0) {
        return (
          moment().diff(moment(this.settings[0].start, "DD.MM.yyyy"), "days") +
          1
        );
      }
      return 1;
    },
    week() {
      console.log(this.curWeek);
      return this.weeks && this.weeks.length > 0
        ? this.weeks.find((f) => f.number == this.curWeek) || {}
        : {};
    },
    date() {
      return moment().format("DD.MM.yyyy (ddd)");
    },
    curWeek() {
      if (this.settings && this.settings.length > 0) {
        return (
          Math.trunc(
            moment().diff(
              moment(this.settings[0].start, "DD.MM.yyyy"),
              "days"
            ) / 7
          ) + 1
        );
      }
      return 0;
    },
  },
  methods: {
    ...mapActions(["LOAD", "PRELOAD"]),
    update() {
      this.LOAD();
    },
  },
  created() {
    this.PRELOAD();
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>



  // test() {
  //     let url = "https://api.bibleonline.ru/bible";

  //     let d = {
  //       callback: "bible",
  //       trans: "rus",
  //       max: "100",
  //       q: "Ex  3.1-10",
  //     };
  //     fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Header set Access-Control-Allow-Origin": "*",
  //         "Header set Access-Control-Allow-Headers":
  //           "Content-Type, Authorization",
  //         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //         "Content-Type": "application/json;charset=utf-8",
  //       },
  //       body: JSON.stringify(d),
  //     })
  //       .then(async (response) => {
  //         const data = await response.json();

  //         // check for error response
  //         if (!response.ok) {
  //           // get error message from body or default to response statusText
  //           const error = (data && data.message) || response.statusText;

  //           return Promise.reject(error);
  //         }
  //         console.log(data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   },