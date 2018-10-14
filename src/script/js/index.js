define(['jquery'],function($){
	return {
		//导入模块的公用部分(头部和尾部并包含头部的公共js效果)
		common:!function(){
			
			$(document).ready(!function(){
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
				
				//点击回到顶部箭头回到顶部
				$('.listnav-3').on('click',function(){
					$('html,body').animate({//赋值时考虑兼容。
						scrollTop: 0
					});
				});	
				
				//添加cookie
				function addCookie(key,value,day){
					var date=new Date();//创建日期对象
					date.setDate(date.getDate()+day);//过期时间：获取当前的日期+天数，设置给date
					document.cookie=key+'='+encodeURI(value)+';expires='+date;//添加cookie，设置过期时间
				}
				function getCookie(key){
					var str=decodeURI(document.cookie);
					var arr=str.split('; ');
					for(var i=0;i<arr.length;i++){
						var arr1=arr[i].split('=');
		 				if(arr1[0]==key){
							return arr1[1];
						}
					}
				}
				function delCookie(key,value){
					addCookie(key,value,-1);//添加的函数,将时间设置为过去时间
				}
				
				//显示隐藏
				$(function(){
					if(getCookie('UserName')){
						$('.loginbox').hide();
						$('.registorbox').hide();
						$('.adminbox').show().find('span').html('你好,'+getCookie('UserName')+'用户');
						$('.adminbox').show().find('span').css('font-size','12px');
					}
					$('.adminbox a').on('click',function(){
						delCookie('UserName','',-1);
						$('.adminbox').hide();
						$('.loginbox').show();
						$('.registorbox').show();
					});
				});
			}());
			
		}(),
		
		//楼梯效果
		louti:!function(){
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
		}(),
		
		//轮播图
		lunbotu:!function(){
			var $banner=$('.banner');
		   	var $btns=$('.btn span');
			var $btnlis=$('.pic li');
			var $timer=null;
			var $index=0;//当前的索引.
			var $qindex=0;//前一个索引.
			
			//点击小圆圈切换图片
			$btns.on('click',function(ev){
				$index=$(this).index();//当前的索引
				imgchange();
				$qindex=$index;//当前的索引变成上一个索引.
			});
			
			//封装图片切换
			function imgchange(){
				$btns.eq($index).addClass('btnhover').siblings('span').removeClass('btnhover');
				if($index==0&&$qindex==4){
						$btnlis.eq($qindex).animate({
							left:-2120
						});
						$btnlis.eq($index).css('left','1720px').animate({
							left:-200
						});
				}else if($index==4&&$qindex==0){
						$btnlis.eq($qindex).animate({
							left:1720
						});
						$btnlis.eq($index).css('left','-2120px').animate({
							left:-200
						});
				}else if($index>$qindex){
					$btnlis.eq($qindex).animate({
						left:-2120
					});
					$btnlis.eq($index).css('left','1720px').animate({
						left:-200
					});
				}else if($qindex>$index){
					$btnlis.eq($qindex).animate({
						left:1720
					});
					$btnlis.eq($index).css('left','-2120px').animate({
						left:-200
					});
				}
			}
			//鼠标经过banner时停止自动轮播
			$banner.mouseover(function(){
				clearInterval($timer);
			});
			//鼠标移出banner时自动轮播重新开启
			$banner.mouseout(function(){
				$timer=setInterval(function(){
				$index++;
				if($index>4){
					$qindex=4;
					$index=0;
				}
				imgchange();
				$qindex=$index;//当前的索引变成上一个索引.
			},4000);
			});
			//利用定时器自动轮播
			$timer=setInterval(function(){
				$index++;
				if($index>4){
					$qindex=4;
					$index=0;
				}
				imgchange();
				$qindex=$index;//当前的索引变成上一个索引.
			},4000);
		}(),
		
		//手机专区数据
		mobilephonedata:!function(){
			$(window).on('scroll',function(){
				var $scrolltop=$(window).scrollTop();//获取滚动条的top值
				//var $top=$('.mobilephone').offset().top-400;//手机专区的top值
				//if($scrolltop>=$top){
					$.ajax({
						type:"get",
						url:"http://10.31.162.62/myzte/php/mobilephone.php",
						async:true,
						dataType:"json"
					}).done(function(data){
						var $htmlstr='';
						
						$.each(data, function(index,value) {
							$htmlstr+='<li class="m-goods-'+value.sid+'">'+
								'<div class="scalegoods">'+
									'<a href="http://10.31.162.62/myzte/src/details.html?sid='+value.sid+'">'+
										'<div class="scalegoods-img">'+
											'<img src="'+value.url.split(',')[0]+'" alt="" sid="'+value.sid+'">'+
										'</div>'+
										'<div class="scalegoods-description">'+
											'<p class="goods-title">'+value.title+'</p>'+
											'<div class="goods-description">'+value.description+'</div>'+
											'<span class="goods-price">￥<strong>'+value.price+'</strong>'+
											'</span>'+
										'</div>'+
									'</a>'+
								'</div>'+
							'</li>';
						});
						
						$('.mobilephone-goods-right').html($htmlstr);
					});
				//}
			});
		}(),
		
		//tab切换第一块数据
		tabdata1:!function(){
			$.ajax({
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
		}(),
		
		//tab切换第二块数据
		tabdata2:!function(){
			$.ajax({
				type:"get",
				url:"http://10.31.162.62/myzte/php/parts2.php",
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
				$('#content2').html($htmlstr);
			});
		}(),
		
		//tab切换第三块数据
		tabdata3:!function(){
			$.ajax({
				type:"get",
				url:"http://10.31.162.62/myzte/php/parts3.php",
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
				$('#content3').html($htmlstr);
			});
		}(),
		
		//tab切换效果
		tabxiaoguo:!function(){
			//找到3个li标签加上对应事件
			$('.pictab li').mouseover(function(){
				$(this).addClass('partsactive').siblings('.pictab li').removeClass('partsactive');
				$('.parts-goods ul').eq($(this).index()).show().siblings('.parts-goods ul').hide();
			});
		}()
		
	};
});
