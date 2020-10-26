<template>
  <div>
    <v-tabs v-model="tab">
      <v-tab>День</v-tab>
      <v-tab>JSON</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="2">
                <v-text-field
                  v-model="day.number"
                  label="Number"
                ></v-text-field>
              </v-col>
              <v-col
                ><v-text-field v-model="day.title" label="Title"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="day.verse"
                  label="Bible Verse"
                ></v-text-field>
                <br />
                <v-textarea v-model="day.verseText" label="Text"></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea v-model="day.comment" label="Comment"></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea
                  v-model="day.exercises"
                  label="Exercises"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="update">Update</v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card>
          <v-card-text>
            <v-row>
              <v-col>
                <v-textarea v-model="jsonText" label="JSON"></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="saveJson">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      day: {},
      tab: [],
      jsonText: " ",
    };
  },
  computed: {
    ...mapGetters(["days"]),
    num() {
      return this.$route.params.num;
    },
  },
  methods: {
    ...mapActions(["LOAD", "PRELOAD", "ADD"]),
    update() {
      this.ADD(this.day);
    },
    saveJson() {
      if (this.json) {
        let items = JSON.parse(this.json);
        if (items && items.length > 0) {
          items.forEach((item) => {
            this.ADD(item);
          });
        }
      }
    },
    watch: {
      days: {
        handler: (val) => {
          if (val && val.length > 0) {
            this.day = this.days.find((f) => f.number == this.num) || {};
          }
        },
        immediate: true,
        deep: true,
      },
      num: {
        deep: true,
        immediate: true,
        handler: function (val) {
          this.day = this.days.find((f) => f.number == val) || {};
        },
      },
    },
    created() {
      this.LOAD();
      if (this.days && this.days.length > 0) {
        this.day = this.days.find((f) => f.number == this.num) || {};
      }
    },
  },
};
</script>