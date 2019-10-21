<template>
  <div id="app">
    <apexchart type=area height=500 :options="options" :series="series" />
    PASTE THE WHOLE PAGE TEXT FROM http://teorija-priprava.gov.si/ IN THIS INPUT
    <textarea v-model="text" name="text" cols="30" rows="3" ref="text" @focus="$event.target.select()"></textarea>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    text: '',
    months: {
      januar: 'january',
      februar: 'february',
      marec: 'march',
      april: 'april',
      maj: 'may',
      junij: 'june',
      julij: 'july',
      avgust: 'august',
      september: 'september',
      oktober: 'october',
      november: 'november',
      december: 'december',
    },
    rxp: /([0-9]{1,2}\. ([a-z]+) [0-9]{1,4}, [0-9:]{1,5})[^0-9]+([0-9]{1,2},[0-9]{1,2}) 	([0-9]{1,2},[0-9]{1,2})/,
  }),
  computed: {
    strings () { return this.text.match(new RegExp(this.rxp, 'g')) || [] },
    times () { return this.strings.map(el => {
      const time = el.match(new RegExp(this.rxp))
      const { months } = this

      const str = time[1].replace(time[2], months[time[2]]).replace('.', '')
      return new Date(str).toISOString()
    }) },
    points () { return this.strings.map(el => el.match(new RegExp(this.rxp))[3]) },
    per100 () { return this.strings.map(el => {
      const str = (el.match(new RegExp(this.rxp))[4]).replace(',', '.')
      return Math.floor(Number(str) * 10)
    })},
    average () {
      let total = 0

      return this.per100.map((el, i) => {
        total = total + el
        return Math.floor(total / (i + 1))
      })
    },
    series () {
      return [
        { name: 'Points', data: this.points },
        { name: 'Percent', data: this.per100 },
        { name: 'Average', data: this.average }
      ]
    },
    options () {
      const { times } = this
      return {
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: times,
        },
        yaxis: {
          max: 100
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        }
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
