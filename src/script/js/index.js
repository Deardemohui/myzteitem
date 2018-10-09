//导入模块的公用部分(头部和尾部并包含头部的公共js效果)
!function($){
	//引入头部html
	$('.topcontent').load('header.html');
	//引入尾部html
	$('.footercontent').load('footer.html');
	
	//头部导航内两个li标签划过显示隐藏盒子(这里要用事件委托因为头部是导入的,取不到header里面的元素)
	//AXON系列
	//鼠标移入时
	$('.topcontent').on('mouseover','.axon',function(){
		$('.axonbox').show();
	});
	//鼠标移出时
	$('.topcontent').on('mouseout','.axon',function(){
		$('.axonbox').hide();
	});
	//BLADE系列
	//鼠标移入时
	$('.topcontent').on('mouseover','.blade',function(){
		$('.bladebox').show();
	});
	//鼠标移出时
	$('.topcontent').on('mouseout','.blade',function(){
		$('.bladebox').hide();
	});
	
	
}(jQuery);

//楼梯效果
!function($){
	//1.滚轮事件显示左侧楼梯
	var $louti=$('#loutinav');//左侧楼梯
	var $loutili=$('#loutinav li');
	var $louceng=$('.louti');//楼层
	
	$(window).on('scroll',function(){
		var $scrolltop=$(window).scrollTop();//获取滚动条的top值。
		if($scrolltop>500){
			$louti.show();
		}else{
			$louti.hide();
		}
		
		//4.拖动滚轮，对应的楼梯添加对应的类名
		$louceng.each(function(index,element){
			//通过遍历的方式获取每一个楼层的top值
			var $top=$louceng.eq(index).offset().top+$(this).innerHeight()/2;
			if($top>$scrolltop){
				$loutili.removeClass('loutiactive');//清除所有的类
				$loutili.eq(index).addClass('loutiactive');//对应的加上类
				return false;//阻止循环,每次只能有一个满足条件添加类，其他的通过循环阻止
			}
		});
	});
	//2.点击左侧楼梯，右边对应的楼层跳转。
	$loutili.not('.last').on('click',function(){
		$(this).addClass('loutiactive').siblings('li').removeClass('loutiactive');
		var $top=$louceng.eq($(this).index()).offset().top;
		$('html,body').animate({//赋值时考虑兼容。
			scrollTop: $top
		});
	});
	//3.点击top回到顶部
	$('.last').on('click',function(){
		$('html,body').animate({//赋值时考虑兼容。
			scrollTop: 0
		});
	});
	
}(jQuery);


//tab切换数据
!function($){
	/*$.ajax({
			type:"get",
			url:"http://10.31.162.62/myzte/php/parts1.php",
			async:true,
			dataType:"json"
			}).done(function(data){
			var $datalist=data;
			var $htmlstr='';
			for(var $obj of $datalist){
				$htmlstr+=`<li>
						<div class="scalegoods">
							<a href="##">
								<div class="scalegoods-img">
									<img src="${$obj.url}" alt="">
								</div>
								<div class="scalegoods-content">
									<div class="goods-title">
										${$obj.title}
									</div>
									<div class="goods-price">
										<span>￥<strong>${$obj.price}</strong></span>
									</div>
								</div>
							</a>
						</div>
					</li>`;
				}
				$('#content1').html($htmlstr);
			});
		}
	});*/
}(jQuery);


//tab切换效果
!function($){
	//找到3个li标签加上对应事件
	$('.pictab li').mouseover(function(){
		$(this).addClass('partsactive').siblings('.pictab li').removeClass('partsactive');
		$('.parts-goods ul').eq($(this).index()).show().siblings('.parts-goods ul').hide();
	});
}(jQuery);

//http://10.31.162.62/myzte/php/mobilephone.php
//手机专区数据
!function($){
	$(window).on('scroll',function(){
		var $scrolltop=$(window).scrollTop();//获取滚动条的top值
		var $top=$('.mobilephone').offset().top-400;//手机专区的top值
		if($scrolltop>=$top){
			$.ajax({
				type:"get",
				url:"http://10.31.162.62/myzte/php/mobilephone.php",
				async:true,
				dataType:"json"
			}).done(function(data){
				var $datalist=data;
				var $htmlstr='';
				for(var $obj of $datalist){
					$htmlstr+=`<li class="m-goods-${$obj.sid}">
						<div class="scalegoods">
							<a href="##">
								<div class="scalegoods-img">
									<img src="${$obj.url}" alt="">
								</div>
								<div class="scalegoods-description">
									<p class="goods-title">${$obj.title}</p>
									<div class="goods-description">${$obj.description}</div>
									<span class="goods-price">￥<strong>${$obj.price}</strong></span>
								</div>
							</a>
						</div>
					</li>`;
				}

//				for(var $obj of $datalist){
//					$htmlstr+='<li class="m-goods-'+$obj.sid+'">
//						<div class="scalegoods">
//							<a href="##">
//								<div class="scalegoods-img">
//									<img src="'+$obj.url+'" alt="">
//								</div>
//								<div class="scalegoods-description">
//									<p class="goods-title">'+$obj.title+'</p>
//									<div class="goods-description">'+$obj.description+'</div>
//									<span class="goods-price">￥<strong>'+$obj.price+'</strong></span>
//								</div>
//							</a>
//						</div>
//					</li>';
//				}
				
				$('.mobilephone-goods-right').html($htmlstr);
			});
		}
	});
}(jQuery);

//轮播图
!function($){
	
}(jQuery);
