<template>
  <div class="main">
    <div class="list">
      <div class="row--list">
        <td colspan="5" class="table__info">
          <div class="table__container--info">
            <div class="table__title">Terminarz</div>
            <div class="table__search">
              <div>Gabinet</div>
              <select>
                <option selected>Wszystkie</option>
                <option>x</option>
                <option>y</option>
              </select>
            </div>
          </div>
        </td>
      </div>
      <div class="row--list">
        <div class="cell--list">Imię i nazwisko</div>
        <div class="cell--list">Data</div>
        <div class="cell--list">Gabinet</div>
        <div class="cell--list">Opis</div>
        <div class="cell--list">Kartoteka</div>
      </div>
      <div class="row--list">
        <div class="cell--list">Jarosław Kaczyński</div>
        <div class="cell--list">7.05.2018</div>
        <div class="cell--list">Woronicza 17</div>
        <div class="cell--list">Ból nogi</div>
        <div class="cell--list">
          <span>Kartoteka</span>
        </div>
      </div>
      <div class="row--list">
        <div class="cell--list">Anna Kowalska</div>
        <div class="cell--list">10.05.2018</div>
        <div class="cell--list">Niska 21</div>
        <div class="cell--list">Problemy z plecami</div>
        <div class="cell--list">
          <span>Kartoteka</span>
        </div>
      </div>
      <div class="row--list">
        <div class="cell--list">Tomasz Nowak</div>
        <div class="cell--list">20.05.2018</div>
        <div class="cell--list">Długa 37</div>
        <div class="cell--list">Lorem ipsum dolor sit amet</div>
        <div class="cell--list">
          <span>Kartoteka</span>
        </div>
      </div>
      <div class="row--list">
        <div class="cell--list">Jan Kowalski</div>
        <div class="cell--list">30.05.2018</div>
        <div class="cell--list">Krótka 14</div>
        <div class="cell--list">Consectetur adipiscing elit</div>
        <div class="cell--list">
          <span>Kartoteka</span>
        </div>
      </div>
      <div class="row--list">
        <td colspan="5" class="table__actions">
          <div class="actions__range">
            <i class="fas fa-angle-left"></i>
            <i class="fas fa-angle-right"></i>
          </div>
          <div class="actions__container--select">
            <p>Pozycji na stronę:</p>
            <select>
              <option selected>5</option>
              <option>10</option>
              <option>15</option>
            </select>
          </div>
        </td>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo: function() {
      fetch(`http://localhost/api/me/`, {
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.$store.getters.getToken
        },
        method: "GET"
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          if (response.isDeleted) {
            this.$router.push("/Auth");
            this.$toasted.error("Konto usunięte", {
              icon: "times"
            });
          } else if (response.isPaid) {
            const name = response.name;
            const surname = response.surname;
            const isPaid = response.isPaid == 1;
            this.$store.commit("updateName", { name, surname });
            this.$store.commit("updateIsPaid", isPaid);
            this.$router.push("/Timetable");
          } else {
            this.$router.push("/Auth");
            this.$toasted.error("Token wygasł", {
              icon: "times"
            });
          }
        })
        .catch(err => console.error(err));

      if (!this.$store.getters.getToken || !this.$store.getters.isPaid) {
        this.$router.push("/Auth");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$table-header: #6c7ae0;
$table-header-darker: #5864b7;
$primrary-light: #fafafa;

%text--center {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
}

%block--rounded {
  border-radius: 0.5em;
  overflow: hidden;
  box-shadow: 0 5px 20px -1px #44444440;
}

%btn--small {
  @extend %text--center;
  @extend %block--rounded;
}

.main {
  width: 100%;
  height: auto;
  position: relative;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 5em;
}

.timetable--btns {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
  margin-bottom: 1.5em;
  font-weight: 600;
  div {
    div {
      padding: 0 1em;
      cursor: pointer;
    }
  }
}

.btn--add {
  @extend %btn--small;
  float: left;
  height: 3em;
  background: #f03434;
  color: $primrary-light;
  i {
    margin-right: 0.8em;
  }
}

.btn--edit {
  @extend %btn--small;
  margin-left: 1em;
  float: left;
  height: 3em;
  color: $primrary-light;
  background: #16a085;
  i {
    margin-right: 0.8em;
  }
}

.btn--cabinet {
  @extend %btn--small;
  float: right;
  height: 3em;
  background: #34495e;
  color: $primrary-light;
  i {
    margin-right: 0.8em;
  }
}

.list {
  @extend %block--rounded;
  width: 100%;
  height: auto;
  display: table;
  .row--list {
    display: table-row;
    background: #fff;
    height: 3.5em;
    transition: 0.2s ease-in-out;
    &:not(:first-child):not(:nth-child(2)) {
      &:hover {
        background: #f4f4f4;
      }
    }
    &:first-child {
      font-weight: 600;
      font-size: 1.2em;
      background: $table-header-darker;
      color: $primrary-light;
      height: auto;
      .table__info {
        display: table-cell;
        padding: 1em 1.8em;
        .table__container--info {
          display: flex;
          justify-content: space-between;
          .table__title {
            align-items: center;
            display: flex;
          }
          .table__search {
            @extend %btn--small;
            color: $primrary-light;
            * {
              padding: 0.5em 1em;
            }
            div {
              &:first-child {
                background: #34495e;
              }
            }
            select {
              color: $primrary-light;
              background: #3c546b;
              font-weight: 500;
              cursor: pointer;
              font-size: 0.9em;
              border: none;
              display: flex;
              height: 100%;
            }
          }
        }
      }
    }
    &:nth-child(2) {
      background: $table-header;
      color: $primrary-light;
      height: auto;
      position: sticky;
      top: 0;
      .cell--list {
        color: $primrary-light;
        border: none;
        font-weight: 550;
        font-size: 1.1em;
      }
    }
    &:last-child {
      display: table-row;
      background: #f3f3f3;
      height: unset;
      .table__actions {
        display: table-cell;
        padding: 0.2em 1.75em;
        * {
          display: inline-flex;
          float: right;
          text-align: right;
        }
        .actions__container--select {
          margin-right: 2.5em;
          margin: 0.5em 0;
          transition: 0.2s ease-in-out;
          p {
            margin: 0;
            align-items: center;
            opacity: 0.7;
          }
          select {
            width: auto;
            border: none;
            padding: 0.5em;
            background: #e4e4e4;
            font-weight: 600;
            margin-left: 1em;
            border-radius: 0.5em;
          }
        }
        .actions__range {
          margin-left: 1em;
          i {
            color: #696969;
            font-size: 2em;
            border-radius: 100%;
            align-items: center;
            padding: 0 0.25em;
            transition: 0.2s ease-in-out;
            &::before {
              padding: 0.2em;
              transition: 0.2s ease-in-out;
            }
            &:first-child {
              margin: 0 0.5em 0 0.25em;
            }
            &:last-child {
              margin: 0 0.25em 0 0;
            }
            &:hover {
              background: #eaeaea;
            }
          }
        }
      }
    }
    .cell--list {
      display: table-cell;
      font-size: 1em;
      color: #666666;
      border-bottom: 1px solid #f2f2f2;
      text-align: center;
      &:first-child {
        padding-left: 2em;
        text-align: left;
        width: 30%;
      }
      &:nth-child(2) {
        width: 10%;
      }
      &:nth-child(3) {
        width: 15%;
      }
      &:nth-child(4) {
        padding: 1em;
      }
      &:nth-child(5) {
        width: 12.5%;
        padding-right: 2em;
        vertical-align: middle;
        span {
          @extend %block--rounded;
          padding: 0.7em;
          background: #333;
          font-weight: 600;
          color: $primrary-light;
          transition: 0.2s ease-in-out;
          cursor: pointer;
          &:hover {
            background: #444;
          }
        }
      }
    }
  }
}
</style>
