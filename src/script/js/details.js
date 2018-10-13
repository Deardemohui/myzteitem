define(['jquery'],function($){
	return {
		//导入模块的公用部分
		detailscommon:!function(){
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
					}
					$('.adminbox a').on('click',function(){
						delCookie('UserName','',-1);
						$('.adminbox').hide();
						$('.loginbox').show();
						$('.registorbox').show();
					});
				});
				
				//放大镜
				
				
				
			}());
		}(),
		
		//接收数据
		recevedata:!function(){
			$.ajax({
				url:'http://10.31.162.62/myzte/php/details.php',
				data:{
					sid:location.search.substring(1).split('=')[1]
				},
				dataType:'json'
			}).done(function(data){
					//大图
					var $picstr='';
					$picstr+='<img src="'+data[0].url.split(',')[0]+'" alt="">';
					$('.product-img').html($picstr);
					//小图
					var $tenpicstr='';
					$.each(data[0].url.split(',').slice(1), function(index,value) {
						$tenpicstr+='<li><img src="'+value+'" alt=""></li>';
					});
					$('.pic-img-list').html($tenpicstr);
					//价格
					var $pricestr='';
					$pricestr+='<span><small>￥</small><strong>'+data[0].price+'</strong></span>';
					$('.outprice').html($pricestr);
			})
		}(),
		
		//放大镜效果
		fangdajing:!function(){
			$('.main-content').on('mouseover','.m-d-left',function(){
				var $spicbox=$('.product-img');//放大镜盒子
				var $spic=$('.product-img img');//图片
				var $prev=$('.prev');//左箭头
				var $next=$('.next');//右箭头
				var $oUl=$('.pic-img-list');//ul
				var $num=5;//ul中可见的li元素个数
				var $lis=$('.pic-img-list li');//ul中所有的li
				var $lisimg=$('.pic-img-list li img');//ul中所有的img
				var $liwidth=$lis.eq(0).innerWidth();//li的宽度
				var $lisize=$lis.length;//li的个数
				
				//点击左箭头ul向右移
				$next.on('click',function(){
					if($num<$lisize){
						$num++;
						$oUl.css({
							left:-($num-5)*$liwidth
						});
					}
				});
				//点击右箭头ul向左移
				$prev.on('click',function(){
					if($num>5){
						$num--;
						$oUl.css({
							left:-($num-5)*$liwidth
						});
					}
				});
				//鼠标划过li标签时取到li标签中图片对应的路径,图片边框颜色变为橘黄色
				$lis.on('mouseover',function(){
					var $url=$(this).find('img').attr('src');
					$spic.attr('src',$url);
					//$(this).find('img').addClass('borderactive').siblings('.pic-img-list li img').removeClass('borderactive');
				});
				//鼠标移出li标签时边框颜色变为原本的颜色
		//		$lis.on('mouseout',function(){
		//			$(this).find('img').css('border-color','#E0E0E0');
		//		});
				
				//鼠标移动到大盒子里
				$spicbox.on('mouseover',function(){
					//改变图片大小
					$spic.css({"width":"750px","height":"750px"});
					
					//鼠标在大盒子里移动
					$spicbox.on('mousemove',function(ev){
						var $left=ev.pageX-$spicbox.offset().left;
						var $top=ev.pageY-$spicbox.offset().top;
						$spic.css({
							left:-$left,
							top:-$top
						});
					});
				});
				//鼠标移出大盒子
				$spicbox.on('mouseout',function(){
					$spic.css({
						width:400,
						height:400,
						left:0,
						top:0
					});
				});	
			});	
		}()
			
	}
});
