import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
// import data from "./test_data/data.json"
import data2 from "./test_data/data2.json"
import arrayData from "./test_data/array.json"
import objectData from "./test_data/object.json"


function jsonPrep(json){
  console.log("jsonPrep Init...",{json})
  // Attempt to parse the JSON string
  let obj;
  try {
    obj = JSON.parse(json);
    return obj
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return;
  }
}

window.loadApp = (json) => {
  let data
  // Check if json is a string
  if (typeof json == 'string') {
    data = jsonPrep(json)
  } else {
    data = json
  }
  console.log("App Init...",{data})

  const container = document.getElementById("root");
  const root = createRoot(container);
  root.render(<App json={data} />);
};

console.log("version 1.0.2", {
  FUNCTIONS: [
    {
      Name: "loadApp",
      props: [
        {
          path: "displayJson",
          json: {
            data: [{ /* theJsonDataToDisplay */ }],
            settings: {
              hide: ['keys to hide'],
              sortOrder: ['keys in desired order'],
              initialSearch: 'search term',
              format: [{key:'keys to format',style:'currency$,decimal2,dateYYYY-MM-DD'}],
            },
            sortAble: ['keys to make sortable']
          }
        },
        {
          path: "readMe"
        }
      ]
    }
  ]
});

//loadApp({path:"[0]fieldData", json:data, settings:{hide:["_","~","f_","E16","OBSI","db"],initialSearch:'',sortOrder:["Name","Email","phone"],format:[{key:"chargeRate",style:"currency"},{key:"fundsAvailable",style:"currency"}]}})
loadApp({path:"[0]customers", json:data2, settings:{sortOrder:["Name","Email"]}})
// loadApp({path:"[0]emails", json:arrayData})
//loadApp({path:"{}Line", json:objectData, settings:{hide:["Allow","value","Custom","Exchange","Linked","MetaData","PrintStatus","SyncToken","domain","sparse"]}})