// Set new default font family and font color to mimic Bootstrap's default styling
// Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
// Chart.defaults.global.defaultFontColor = '#858796';

fetch(BASE_URL+API_REPORT+REPORT_BASEINFO,{
	method: 'GET', 
	credentials: 'include',
	headers:{
		'Content-Type': 'application/json',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
	}
})
	.then(statusRes)
	.then(json)
	.then(res => {
		if(res.status == 1){
			let data = res.data;
			$("#total-customer").html(data.TongKH);
			$("#total-order").html(data.TongDH);
			$("#total-rating").html(roundingRating(data.DanhGia));
			$("#total-product").html(data.TongSP);
		}
	})
	.catch(handlerError);

var today = new Date();
for(let i=today.getFullYear(); i>=2000; i--){
	$("#select-year-filter-month").append(`
		<option value="${i}">${i}</option>
	`);
	$("#select-year-filter-session").append(`
		<option value="${i}">${i}</option>
	`);
	$("#select-year-filter-year").append(`
		<option value="${i}">${i}</option>
	`);
}
$("#btn-filter-month").click(function(){
	let month = $("#select-month-filter-month").val();
	let year = $("#select-year-filter-month").val();
	let data = {
		type: 'month',
		time: {
			month,
			year
		}
	};
	getSales(data);
	getOrder(data);
	getProduct(data);
	getBestSales(data);
});
$("#btn-filter-session").click(function(){
	let session = $("#select-session-filter-session").val();
	let year = $("#select-year-filter-session").val();
	let data = {
		type: 'session',
		time: {
			session,
			year
		}
	};
	getSales(data);
	getOrder(data);
	getProduct(data);
	getBestSales(data);
});
$("#btn-filter-year").click(function(){
	let year = $("#select-year-filter-year").val();
	let data = {
		type: 'year',
		time: year
	};
	getSales(data);
	getOrder(data);
	getProduct(data);
	getBestSales(data);
});
var ctxSales = document.getElementById("chart-sales");
var ctxOrder = document.getElementById("chart-order");
var ctxProduct = document.getElementById("chart-amount-product");
let ctxBestSales = document.getElementById("chart-products");
var chartBestSales;
var chartAmountProduct;
var chartOrder;
var chartSales;
function getSales(data){
	fetch(BASE_URL+API_REPORT+REPORT_SALES,{
		method: 'POST', 
		credentials: 'include',
		body: JSON.stringify(data), 
		headers:{
			'Content-Type': 'application/json',
			'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
		}	
	})
		.then(statusRes)
		.then(json)
		.then(res => {
			if(res.status == 1){
				let x = res.data.x;
				let y = res.data.y;
				let total = 0;
				for(let item of y){
					total += Number(item);
				}
				if (chartSales) {
					chartSales.destroy();
				}
				chartSales = new Chart(ctxSales, {
					type: 'line',
					data: {
						labels: x,
						datasets: [{
						label: "Doanh số",
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
						title: {
							display: true,
							text: `Tổng danh số ${total.toFixed(2)} Triệu`				
						},
						scales: {
							yAxes: [{
								scaleLabel: {
								display: true,
								labelString: 'Triệu'
								}
							}]
						},
					}
				});
			}else console.log(res.msg);
		})
		.catch(handlerError);
}
function getOrder(data){
	fetch(BASE_URL+API_REPORT+REPORT_ORDER,{
		method: 'POST', 
		credentials: 'include',
		body: JSON.stringify(data), 
		headers:{
			'Content-Type': 'application/json',
			'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
		}	
	})
		.then(statusRes)
		.then(json)
		.then(res => {
			if(res.status == 1){
				let x = res.data.x;
				let y = res.data.y;
				let total = 0;
				for(let item of y){
					total += Number(item);
				}
				if (chartOrder) {
					chartOrder.destroy();
				}
				chartOrder = new Chart(ctxOrder, {
					type: 'line',
					data: {
						labels: x,
						datasets: [{
						label: "Đơn hàng",
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
						title: {
							display: true,
							text: `Số lượng đơn hàng ${total}`
						}
					}
				});
			}else console.log(res.msg);
		})
		.catch(handlerError);
}
function getProduct(data){
	fetch(BASE_URL+API_REPORT+REPORT_PRODUCT,{
		method: 'POST', 
		credentials: 'include',
		body: JSON.stringify(data), 
		headers:{
			'Content-Type': 'application/json',
			'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
		}	
	})
		.then(statusRes)
		.then(json)
		.then(res => {
			if(res.status == 1){
				let x = res.data.x;
				let y = res.data.y;
				let total = 0;
				for(let item of y){
					total += Number(item);
				}
				if (chartAmountProduct) {
					chartAmountProduct.destroy();
				}
				chartAmountProduct = new Chart(ctxProduct, {
					type: 'line',
					data: {
						labels: x,
						datasets: [{
						label: "Sản phẩm",
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
						title: {
							display: true,
							text: `Số lượng sản phẩm bán ra ${total}`
						}
					}
				});
			}else console.log(res.msg);
		})
		.catch(handlerError);
}
function getBestSales(data){
	fetch(BASE_URL+API_REPORT+REPORT_BESTSALES,{
		method: 'POST', 
		credentials: 'include',
		body: JSON.stringify(data), 
		headers:{
			'Content-Type': 'application/json',
			'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
		}	
	})
		.then(statusRes)
		.then(json)
		.then(res => {
			if(res.status == 1){
				let x = res.data.x;
				let y = res.data.y;
				if (chartBestSales) {
					chartBestSales.destroy();
				}
				chartBestSales = new Chart(ctxBestSales, {
					type: 'pie',
					data: {
						labels: x,
						datasets: [{
							data: y,
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
			}else console.log(res.msg);
		})
		.catch(handlerError);
}


