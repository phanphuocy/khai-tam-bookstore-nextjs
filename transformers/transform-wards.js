const fs = require("fs");

let data = fs.readFileSync("constants/wards.json", { encoding: "utf8" });
data = JSON.parse(data);

let wardsOf = {};

for (let i = 0; i < data.length; i++) {
  if (!wardsOf[data[i].district_code]) {
    wardsOf[data[i].district_code] = [
      {
        label: data[i].name,
        value: data[i].code,
      },
    ];
  } else {
    wardsOf[data[i].district_code].push({
      label: data[i].name,
      value: data[i].code,
    });
  }
}

fs.writeFileSync(
  "constants/opts-wards.json",
  JSON.stringify(wardsOf, null, 2),
  {
    encoding: "utf8",
  }
);
