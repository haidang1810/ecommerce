// Set new default font family and font color to mimic Bootstrap's default styling
// Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
// Chart.defaults.global.defaultFontColor = '#858796';

let x = ['09/2021','10/2021','11/2021','12/2021','01/2022','02/2022','03/2022', '04/2022'];
let y = [50, 40, 60, 20, 30, 70, 55, 32, 61];
// Area Chart Example
var ctx = document.getElementById("chart-sales");
var myLineChart = new Chart(ctx, {
type: 'line',
data: {
    labels: x,
    datasets: [{
    label: "Doanh số",
    lineTension: 0.3,
    backgroundColor: "rgba(78, 115, 223, 0.05)",
    borderColor: "rgba(78, 115, 223, 1)",
    data: y,
    }],
},
options: {
    maintainAspectRatio: false,
    legend: {
    display: false
    },
    tooltips: {
    backgroundColor: "rgb(255,255,255)",
    bodyFontColor: "#858796",
    titleMarginBottom: 10,
    titleFontColor: '#6e707e',
    titleFontSize: 14,
    borderColor: '#dddfeb',
    borderWidth: 1
    },
    scales: {
        yAxes: [{
            scaleLabel: {
            display: true,
            labelString: 'Triệu'
            }
        }]
    }    
}
});
let x_cart = ['09/2021','10/2021','11/2021','12/2021','01/2022','02/2022','03/2022', '04/2022'];
let y_cart = [520, 440, 605, 204, 305, 720, 556, 332, 611];
var ctx_cart = document.getElementById("chart-carts");
var Chart_cart = new Chart(ctx_cart, {
type: 'line',
data: {
    labels: x_cart,
    datasets: [{
    label: "Đơn hàng",
    lineTension: 0.3,
    backgroundColor: "rgba(78, 115, 223, 0.05)",
    borderColor: "rgba(78, 115, 223, 1)",
    data: y_cart,
    }],
},
options: {
    maintainAspectRatio: false,
    legend: {
    display: false
    },
    tooltips: {
    backgroundColor: "rgb(255,255,255)",
    bodyFontColor: "#858796",
    titleMarginBottom: 10,
    titleFontColor: '#6e707e',
    titleFontSize: 14,
    borderColor: '#dddfeb',
    borderWidth: 1
    }
}
});
let x_amount_product = ['09/2021','10/2021','11/2021','12/2021','01/2022','02/2022','03/2022', '04/2022'];
let y_amount_product = [520, 440, 605, 204, 305, 720, 556, 332, 611];
var ctx_amount_product = document.getElementById("chart-amount-product");
var Chartctx_amount_product = new Chart(ctx_amount_product, {
type: 'line',
data: {
    labels: x_amount_product,
    datasets: [{
    label: "Sản phẩm",
    lineTension: 0.3,
    backgroundColor: "rgba(78, 115, 223, 0.05)",
    borderColor: "rgba(78, 115, 223, 1)",
    data: y_amount_product,
    }],
},
options: {
    maintainAspectRatio: false,
    legend: {
    display: false
    },
    tooltips: {
    backgroundColor: "rgb(255,255,255)",
    bodyFontColor: "#858796",
    titleMarginBottom: 10,
    titleFontColor: '#6e707e',
    titleFontSize: 14,
    borderColor: '#dddfeb',
    borderWidth: 1
    }
}
});
let x_product = ['Sản phẩm 1', 'Sản phẩm 2', 'Sản phẩm 3', 'Sản phẩm 4', 'Sản phẩm 5'];
let y_product = [2000, 1300, 900, 1000, 1500];
var ctx_product = document.getElementById("chart-products");
var Chart_product = new Chart(ctx_product, {
    type: 'pie',
    data: {
        labels: x_product,
        datasets: [{
            data: y_product,
            label: 'Sản phẩm bán chạy',
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(118, 207, 25)',
                'rgb(132, 16, 120)'
            ],
            hoverOffset: 4
        }],
    },
    options: {
        plugins: {
            tooltip: {
                enabled: false
            },
            datalabels: {
                color: '#fff',
                align: 'center',
                formatter: (value, context) => {
                    const dataPoints = context.chart.data.datasets[0].data
                    function totalSum (total, data) {
                        return total + data;
                    }
                    const totalPercent = dataPoints.reduce(totalSum, 0);
                    const percentTargetValue = (value/totalPercent*100).toFixed(1);
                    const display = [`số lượt bán: ${value}`, `${percentTargetValue}%`]
                    return display;
                }
            }
        }
    },
    plugins: [ChartDataLabels],
});
