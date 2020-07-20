const fs = require("fs");

let data = fs.readFileSync("constants/provinces.json", { encoding: "utf8" });
data = JSON.parse(data);

console.log(data.length);

let options = [
  {
    type: "group",
    name: "Thành phố",
    items: [],
  },
  {
    type: "group",
    name: "Tỉnh",
    items: [],
  },
];

for (let i = 0; i < data.length; i++) {
  if (data[i].unit === "Thành phố") {
    options[0].items.push({
      label: data[i].name,
      value: data[i].code,
    });
  } else {
    options[1].items.push({
      label: data[i].name,
      value: data[i].code,
    });
  }
}

fs.writeFileSync(
  "constants/opts-provinces.json",
  JSON.stringify(options, null, 2),
  { encoding: "utf8" }
);

console.log(options);
