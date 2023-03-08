<style lang="scss">
.myDividerInsert {
  .v-divider--vertical.v-divider--inset {
    margin-top: 20px;
    min-height: 0;
    max-height: calc(100% - 40px);
  }
}
.v-list__tile__title {
  color: rgba(0, 0, 0, 0.87) !important;
}
.v-list__group__header--active {
  background: #3f51b52f;
}
.v-list__tile--active {
  background: #3f51b515;
  color: black;
  font-weight: bold !important;
}
.v-list__group__items--no-action .v-list__tile {
  padding-left: 40px;
}

.v-list__group__items--no-action .v-list__tile--active {
  padding-left: 50px;
}
.tile {
  border-radius: 2px;
}
.loading-dialog {
  background-color: #ffffff00;
}
.router-anim-enter-active {
  animation: coming 1s;
  animation-delay: 0.5s;
  opacity: 0;
}
.router-anim-leave-active {
  animation: going 0.5s;
}
.myCustfab {
  margin-left: 50px;
}
.theme--light.v-select .v-chip--disabled,
.theme--light.v-select .v-select__selection--disabled {
  color: rgba(0, 0, 0, 0.8);
}

@keyframes going {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50px);
    opacity: 0;
  }
}
@keyframes coming {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
