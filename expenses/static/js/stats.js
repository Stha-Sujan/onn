const renderChart = (data, labels) => {
  var ctx = document.getElementById("myChart").getContext("2d");

  var myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Last 6 months expenses",
          data: data,

          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Expenses per Category",
      },
    },
  });
};


const getChartData = () => {
  fetch("expense_category_summary")
    .then((res) => res.json())
    .then((results) => {
      console.log("results", results);
      const category_data = results.expense_category_data;
      const [labels, data] = [
        Object.keys(category_data),
        Object.values(category_data),
      ];
      renderChart(data, labels);
    });
};
window.addEventListener("load", getChartData);


const renderCumChart = (data, labels) => {
  var ctx = document.getElementById("myCumChart").getContext("2d");

  var myCumChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Cumulative Expenses",
          data: data,
          backgroundColor: "rgba(255, 255, 255, 1)",
          borderColor: "#f07b02",
          borderWidth: 1,
          fill: true
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Cumulative Expenses per Month",
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    },
  });
};

const getCumChartData = () => {
  fetch("expense_category_summary")
    .then((res) => res.json())
    .then((results) => {
      console.log("results", results);
      const category_data = results.expense_category_data;
      const labels = Object.keys(category_data);
      const data = Object.values(category_data).reduce((acc, val) => {
        acc.push((acc.length === 0 ? 0 : acc[acc.length - 1]) + val);
        return acc;
      }, []);
      renderCumChart(data, labels);
    });
};
window.addEventListener("load", getCumChartData);


// const renderincomeChart = (data, labels) => {
//   var ctx = document.getElementById("myincomeChart").getContext("2d");

//   var myincomeChart = new Chart(ctx, {
//     type: "doughnut",
//     data: {
//       labels: labels,
//       datasets: [
//         {
//           label: "Last 6 months incomes",
//           data: data,

//           backgroundColor: [
//             "rgba(255, 99, 132, 0.2)",
//             "rgba(255, 159, 64, 0.2)",
//             "rgba(255, 205, 86, 0.2)",
//             "rgba(75, 192, 192, 0.2)",
//             "rgba(54, 162, 235, 0.2)",
//             "rgba(153, 102, 255, 0.2)",
//             "rgba(201, 203, 207, 0.2)",
//           ],
//           borderColor: [
//             "rgb(255, 99, 132)",
//             "rgb(255, 159, 64)",
//             "rgb(255, 205, 86)",
//             "rgb(75, 192, 192)",
//             "rgb(54, 162, 235)",
//             "rgb(153, 102, 255)",
//             "rgb(201, 203, 207)",
//           ],
//           borderWidth: 1,
//         },
//       ],
//     },
//     options: {
//       title: {
//         display: true,
//         text: "Expenses per Category",
//       },
//     },
//   });
// };


// const getIncomeSourceData = () => {
//   fetch("income_source_summary")
//     .then((res) => res.json())
//     .then((results) => {
//       console.log("results", results);
//       const source_data = results.income_source_data;
//       const [labels, data] = [
//         Object.keys(source_data),
//         Object.values(source_data),
//       ];
//       renderChart(data, labels);
//     });
// };

// window.addEventListener("load", getIncomeSourceData);
const renderincomeChart = (data, labels) => {
  var ctx = document.getElementById("myincomeChart").getContext("2d");

  var myincomeChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Last 6 months incomes",
          data: data,

          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Incomes per Category",
      },
    },
  });
};
const getIncomeSourceData = () => {
  fetch("income_category_summary")
    .then((res) => res.json())
    .then((results) => {
      console.log("results", results);
      const source_data = results.income_source_data;
      const [labels, data] = [
        Object.keys(source_data),
        Object.values(source_data),
      ];
      renderincomeChart(data, labels);
    });
};

window.addEventListener("load", getIncomeSourceData);
