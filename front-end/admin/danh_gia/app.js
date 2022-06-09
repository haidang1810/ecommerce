let ratings = [];

function getAllRating(handle){
	fetch(BASE_URL+API_RATING+RATING_GETALL,{
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
				ratings = res.data;
				handle();
			}
		})
		.catch(handlerError);
}
getAllRating(()=>{
	genderRating(ratings);
})
function genderRating(listRating){
	$(".product-rating__list").html("");
	for(let rating of listRating){
		let html = ``;
		html += `
			<div class="product-rating__item">
				<p>Sản phẩm</p>
				<div class="product-rating__heading">
					<img src="${rating.AnhSP}" alt="" 
						class="product-rating__product-img">
					<p class="product-rating__product-name">
						${rating.TenSP}
					</p>
				</div>
				<div class="product-rating__content">
					<div class="item__avatar">
						<img src="${rating.AnhDaiDien}" 
						class="item__avatar-img" alt="loading">
					</div>
					<div class="item__main">
						<div class="item__name">
							${rating.HoTen}
						</div>
						<div class="item__rating">
		`;
		html += renderStarRating(rating.SoSao);
		html += `
				</div>
			<div class="item__time">${rating.ThoiGian}</div>
			<div class="item__massage">
				${rating.NoiDung}
			</div>
		`;
		if(rating.PhanHoi){
			html +=  `
						<div class="item__reply">
							<p class="item__reply-title">Phản Hồi Của Người Bán</p>
							<p class="item__reply-massage">
								${rating.PhanHoi}
							</p>
						</div>
					</div>
				</div>
			</div>
			`
		}else{
			html += `
						</div>
					</div>
				<div class="product-rating__footer text-right mt-2">
					<button class="btn text-primary shadow-none btn-show-input-reply" 
					id="${rating.Id}">
					Trả lời
					</button>
				</div>
			</div>
			`;
		}
		$(".product-rating__list").append(html);
	}
}

$(".product-rating__list").on('click', '.btn-show-input-reply', function(){
	let id = $(this).attr("id");
	$(this).parent(".product-rating__footer").html(`
		<textarea id="input-reply" class="form-control"
		rows="5"></textarea>
		<button class="btn btn-secondary shadow-none mt-2 btn-cancel-reply" 
		id='${id}'>
			Huỷ
		</button>
		<button class="btn btn-primary shadow-none mt-2 btn-add-reply" id='${id}'>Gửi</button>
	`);
})
$(".product-rating__list").on('click', '.btn-cancel-reply', function(){
	let id = $(this).attr("id");
	$(this).parent(".product-rating__footer").html(`
		<button class="btn text-primary shadow-none btn-show-input-reply" 
		id="${id}">
			Trả lời
		</button>
	`);
})
$(".product-rating__list").on('click', '.btn-add-reply', function(){
	let id = $(this).attr("id");
	let content = $(this).parent(".product-rating__footer").children("#input-reply").val().trim();
	if(!content){
		Toast.fire({
			icon: 'error',
			title: 'Chưa nhập nội dung phản hồi',
			background: 'rgba(220, 52, 73, 0.9)',
			color: '#ffffff',
			timer: 2500
		});
		return;
	}
	let data = {
		id,
		PhanHoi: content
	};
	fetch(BASE_URL+API_RATING+RATING_REPLY,{
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
				getAllRating(()=>{
					genderRating(ratings);
				})
			}else{
				Toast.fire({
					icon: 'error',
					title: res.msg,
					background: 'rgba(220, 52, 73, 0.9)',
					color: '#ffffff',
					timer: 2500
				});
			}
		})
		.catch(handlerError);
})
$("#soft-desc").click(function(){
	genderRating(ratings);
})
$("#soft-asc").click(function(){
	let newList = [...ratings].reverse();
	genderRating(newList);
})
$("#soft-comment").click(function(){
	let newList = ratings.map(item => {
		if(!item.PhanHoi){
			return item;
		}
	});
	genderRating(newList);
})