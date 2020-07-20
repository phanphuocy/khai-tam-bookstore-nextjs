const fs = require("fs");

let data = fs.readFileSync("constants/districts.json", { encoding: "utf8" });
data = JSON.parse(data);

let districtsOf = {};

for (let i = 0; i < data.length; i++) {
  if (!districtsOf[data[i].province_code]) {
    districtsOf[data[i].province_code] = [
      {
        label: data[i].name,
        value: data[i].code,
      },
    ];
  } else {
    districtsOf[data[i].province_code].push({
      label: data[i].name,
      value: data[i].code,
    });
  }
}

console.log(districtsOf);

fs.writeFileSync(
  "constants/opts-districts.json",
  JSON.stringify(districtsOf, null, 2),
  { encoding: "utf8" }
);
