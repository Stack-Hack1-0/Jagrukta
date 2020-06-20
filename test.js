const axios = require('axios');

class CovidData {
  constructor() {}
  async setData() {
    try {
      let data = await axios.get('https://api.covid19india.org/v3/data.json');
      this.data = data.data;
      this.stateCodes = Object.keys(data.data);
      this.stateCodes = this.stateCodes.filter((el) => el != 'TT');
      //   this.stateCodes.pop('TT');
    } catch (er) {
      console.log(er);
    }
  }
  getStateData(stateCode) {
    console.log(this.data[stateCode]);
    return this.data[stateCode];
  }
  getTotal() {
    return this.data['TT']['total'];
  }
}

const main = async () => {
  const obj = new CovidData();
  await obj.setData();
  console.log(obj.getTotal());
  //   obj.getStateData('OR');
  console.log(obj.stateCodes);
};

main();

// const confirmed =
//   this.stateCodes.reduce((acc, cur) => {
//     let d = 0;
//     if (this.data[cur]['total']) {
//       d = this.data[cur]['total']['confirmed']
//         ? this.data[cur]['total']['confirmed']
//         : 0;
//     }
//     return d + acc;
//   }, 0) / 2;
// const recovered =
//   this.stateCodes.reduce((acc, cur) => {
//     let d = 0;
//     if (this.data[cur]['total']) {
//       d = this.data[cur]['total']['recovered']
//         ? this.data[cur]['total']['recovered']
//         : 0;
//     }
//     return d + acc;
//   }, 0) / 2;
// const deceased =
//   this.stateCodes.reduce((acc, cur) => {
//     let d = 0;
//     if (this.data[cur]['total']) {
//       d = this.data[cur]['total']['deceased']
//         ? this.data[cur]['total']['deceased']
//         : 0;
//     }
//     return d + acc;
//   }, 0) / 2;
// const active = confirmed - (recovered + deceased);
// console.log(confirmed);
// console.log(recovered);
// console.log(deceased);
// console.log(active);
// return { confirmed, recovered, deceased, active };
