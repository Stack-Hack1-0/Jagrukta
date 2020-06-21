import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card/Card";
import Button from "../Button/Button";

class CovidData {
  constructor() {}
  async setData() {
    try {
      let data = await axios.get("https://api.covid19india.org/v3/data.json");
      this.data = data.data;
      this.stateCodes = Object.keys(data.data);
      this.stateCodes = this.stateCodes.filter((el) => el != "TT");
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

const obj = new CovidData();

const Covid = (props) => {
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState(false);
  const [state, setState] = useState(undefined);

  useEffect(() => {
    let sub = true;
    const set = async () => {
      await obj.setData();
      if (sub) {
        setLoading(false);
      }
    };
    set();
    return () => {
      sub = false;
    };
  }, []);
  if (loading) return <div>loading</div>;
  let key =
    props.stateName === ""
      ? ""
      : Object.keys(states).find((key) => states[key] === props.stateName);
  let total;
  if (state) key = state;
  if (country) key = "";
  console.log(key);
  if (key !== "") {
    total = obj.getStateData(key)["total"];
  } else {
    total = obj.getTotal();
  }
  return (
    <div>
      <div style={{ color: "white", textAlign: "center" }}>
        Corona status at{" "}
        <span style={{ fontSize: "large", fontWeight: "bold" }}>
          {key === "" ? "India" : states[key]}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "70%",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <select
          style={{ height: "30px", margin: "0 10px" }}
          value={state}
          id="reg"
          onChange={(e) => {
            setState(e.target.value);
            setCountry(false);
          }}
        >
          <option value="">
            {props.stateName === "" || country
              ? "Select State"
              : props.stateName}
          </option>
          {obj.stateCodes.map((el) => (
            <option key={el} value={el}>
              {states[el]}
            </option>
          ))}
        </select>

        <Button clicked={() => setCountry((pre) => !pre)}>country data</Button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "auto",
          justifyContent: "center",
        }}
      >
        <Card
          title="Total Cases"
          number={total["confirmed"] ? total["confirmed"] : 0}
        />
        <Card
          title="Active Cases"
          number={
            (total["confirmed"] ? total["confirmed"] : 0) -
            (total["recovered"] ? total["recovered"] : 0) +
            (total["deceased"] ? total["deceased"] : 0)
          }
        />
        <Card
          title="Cured/Discharged"
          number={total["recovered"] ? total["recovered"] : 0}
        />
        <Card
          title="Deaths"
          number={total["deceased"] ? total["deceased"] : 0}
        />
      </div>
      <div
        style={{
          display: "flex",
          width: "45%",
          //   backgroundColor: "white",
          color: "white",
          margin: "10px auto",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "100px",
            backgroundColor: "grey",
            padding: "5px 10px",
            textAlign: "start",
          }}
        >
          {key === "" ? "state/UT" : "District"}
        </div>
        <div style={styles}>C</div>
        <div style={styles}>A</div>
        <div style={styles}>R</div>
        <div style={styles}>D</div>
      </div>
      {key === ""
        ? obj.stateCodes.map((el) => {
            if (obj.data[el]["total"])
              return (
                <div
                  key={el}
                  style={{
                    display: "flex",
                    width: "45%",
                    color: "white",
                    margin: "10px auto",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    border: "white solid 1px",
                    padding: "2px",
                  }}
                  onClick={() => {
                    setState(el);
                    setCountry(false);
                  }}
                >
                  <div
                    style={{
                      width: "100px",
                      backgroundColor: "grey",
                      padding: "5px 10px",
                      textAlign: "start",
                    }}
                  >
                    {states[el]}
                  </div>
                  <div style={styles}>{obj.data[el]["total"]["confirmed"]}</div>
                  <div style={styles}>
                    {obj.data[el]["total"]["confirmed"] -
                      (obj.data[el]["total"]["recovered"]
                        ? obj.data[el]["total"]["recovered"]
                        : 0 + obj.data[el]["total"]["deceased"]
                        ? obj.data[el]["total"]["deceased"]
                        : 0)}
                  </div>
                  <div style={styles}>
                    {obj.data[el]["total"]["recovered"]
                      ? obj.data[el]["total"]["recovered"]
                      : 0}
                  </div>
                  <div style={styles}>
                    {obj.data[el]["total"]["deceased"]
                      ? obj.data[el]["total"]["deceased"]
                      : 0}
                  </div>
                </div>
              );
          })
        : Object.keys(obj.getStateData(key)["districts"]).map((el) => {
            console.log(obj.getStateData(key)["districts"][el]["total"]);
            const value = obj.getStateData(key)["districts"][el]["total"];
            if (value)
              return (
                <div
                  key={el}
                  style={{
                    display: "flex",
                    width: "45%",
                    //   backgroundColor: "white",
                    color: "white",
                    margin: "10px auto",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    border: "white solid 1px",
                    padding: "2px",
                  }}
                >
                  <div
                    style={{
                      width: "100px",
                      backgroundColor: "grey",
                      padding: "5px 10px",
                      textAlign: "start",
                    }}
                  >
                    {el}
                  </div>
                  <div style={styles}>{value["confirmed"]}</div>
                  <div style={styles}>
                    {value["confirmed"] -
                      (value["recovered"]
                        ? value["recovered"]
                        : 0 + value["deceased"]
                        ? value["deceased"]
                        : 0)}
                  </div>
                  <div style={styles}>
                    {value["recovered"] ? value["recovered"] : 0}
                  </div>
                  <div style={styles}>
                    {obj.getStateData(key)["districts"][el]["total"]["deceased"]
                      ? obj.getStateData(key)["districts"][el]["total"][
                          "deceased"
                        ]
                      : 0}
                  </div>
                </div>
              );
          })}
    </div>
  );
};

export default Covid;
const styles = {
  width: "70px",
  backgroundColor: "grey",
  padding: "5px 10px",
  textAlign: "end",
};
const states = {
  AR: "Arunachal Pradesh",
  AP: "Andhra Pradesh",
  LA: "Ladakh",
  UN: "Unassigned",
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
