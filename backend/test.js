fetch("http://localhost:3000/todo", {
  method: "GET",
}).then((d) => {
  d.json().then((r) => {
    console.log(r);
  });
});
