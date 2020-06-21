const axios = require("axios");

class CovidData {
  constructor() {}
  async setData() {
    try {
      let data = await axios.get("https://api.covid19india.org/v3/data.json");
      this.data = data.data;
      this.stateCodes = Object.keys(data.data);
      this.stateCodes = this.stateCodes.filter((el) => el != "TT");
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
    return this.data["TT"]["total"];
  }
}

const main = async () => {
  const states = {
    AR: "Arunachal Pradesh",
    AS: "Assam",
    BR: "Bihar",
    CT: "Chhattisgarh",
    GA: "Goa",
    GJ: "Gujarat",
    HR: "Haryana",
    HP: "Himachal Pradesh",
    JK: "Jammu and Kashmir",
    JH: "Jharkhand",
    KA: "Karnataka",
    KL: "Kerala",
    MP: "Madhya Pradesh",
    MH: "Maharashtra",
    MN: "Manipur",
    ML: "Meghalaya",
    MZ: "Mizoram",
    NL: "Nagaland",
    OR: "Odisha",
    PB: "Punjab",
    RJ: "Rajasthan",
    SK: "Sikkim",
    TN: "Tamil Nadu",
    TG: "Telangana",
    TR: "Tripura",
    UP: "Uttar Pradesh",
    UT: "Uttarakhand",
    WB: "West Bengal",
    AN: "Andaman and Nicobar Islands",
    CH: "Chandigarh",
    DN: "Dadra and Nagar Haveli",
    DD: "Daman and Diu",
    LD: "Lakshadweep",
    DL: "National Capital Territory of Delhi",
    PY: "Puducherry",
  };
  const obj = new CovidData();
  await obj.setData();
  console.log(obj.getTotal());
  //   obj.getStateData('OR');
  console.log(obj.stateCodes);
};

main();
