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
                  v-model="week.number"
                  label="Number"
                ></v-text-field>
              </v-col>
            </v-row>
           
            <v-row>
              <v-col>
                <v-textarea
                  v-model="week.todos"
                  label="todos"
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
      week: {},
      tab: [],
      jsonText: "",
    };
  },
  computed: {
    ...mapGetters(["weeks"]),
    num() {
      return this.$route.params.num;
    },
  },
  methods: {
    ...mapActions(["LOAD", "PRELOAD", "ADD_WEEK"]),
    update() {
      this.ADD_WEEK(this.week);
    },
    saveJson() {
      if (this.json) {
        let items = JSON.parse(this.json);
        if (items && items.length > 0) {
          items.forEach((item) => {
            this.ADD_WEEK(item);
          });
        }
      }
    },
    watch: {
      'weeks': {
        handler: (val) => {
          if (val && val.length > 0) {
            this.week = this.weeks.find((f) => f.number == this.num) || {};
          }
        },
        immediate: true,
        deep: true,
      },
      'num': {
        deep: true,
        immediate: true,
        handler: function (val) {
          this.week = this.weeks.find((f) => f.number == val) || {};
        },
      },
    },
    created() {
      this.LOAD();
      if (this.weeks && this.weeks.length > 0) {
        this.weeks = this.weeks.find((f) => f.number == this.num) || {};
      }
    },
  },
};
</script>