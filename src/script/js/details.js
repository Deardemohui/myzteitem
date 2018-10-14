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
					$picstr+='<img src="'+data[0].url.split(',')[0]+'" alt="" sid="'+data[0].sid+'">';
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
						var $left=ev.pageX-$spicbox.offset().left-20;
						var $top=ev.pageY-$spicbox.offset().top-20;
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
		}(),
		
		//商品加入购物车
		goodsincart:!function(){
				function addcookie(key, value, day) {
			        var date = new Date(); //创建日期对象
			        date.setDate(date.getDate() + day); //过期时间：获取当前的日期+天数，设置给date
			        document.cookie = key + '=' + encodeURI(value) + ';expires=' + date; //添加cookie，设置过期时间
			    }
			    //得到cookie
			    function getcookie(key) {
			        var str = decodeURI(document.cookie);
			        var arr = str.split('; ');
			        for (var i = 0; i < arr.length; i++) {
			            var arr1 = arr[i].split('=');
			            if (arr1[0] == key) {
			                return arr1[1];
			            }
			        }
			    }
			    //删除cookie
			    function delcookie(key) {
			        addcookie(key, '', -1); //添加的函数,将时间设置为过去时间
			    }
			
			    var sidarr = []; //将取得cookie的编号存放到此数组
			    var numarr = []; //将取得cookie的数量存放到此数组
			    //获取cookie,值变成数组
			    function getcookievalue() {
			        if (getcookie('cartsid') && getcookie('cartnum')) {
			            sidarr = getcookie('cartsid').split(','); //[1,2,3,4]
			            numarr = getcookie('cartnum').split(','); //[50,60,70,80]
			        }
			    }
				//到此位置,cookie必须先获取,确定商品是否存在购物车里面
			    //3.判断是否是第一次添加
				
				$('.join-cart').on('click', function() {
		        var sid = $(this).parents('.main-content').find('.product-img img').attr('sid'); //获取当前页面a对应的图片的sid。  5
		        getcookievalue();//获取cookie,值变成数组
		        if ($.inArray(sid, sidarr) != -1) { //sid存在,数量累加
		           if(getcookie('cartnum')==''){
		                var num=parseInt($('#count').val());
		                numarr[$.inArray(sid,sidarr)]=num;//根据$.inArray通过sid确定位置.
		                addcookie('cartnum', numarr.toString(), 7);//修改后的结果
		                sidarr[$.inArray(sid,sidarr)]=sid;//将当前id添加到对应的位置。
		                addcookie('cartsid', sidarr.toString(), 7);//将整个数组添加到cookie
		            }else{
		                var num=parseInt(numarr[$.inArray(sid,sidarr)])+1;//当前的值和cookie里面的值(和sid对应的值)进行累加
		                numarr[$.inArray(sid,sidarr)]=num;//将新的数量，覆盖原先的值。
		                addcookie('cartnum', numarr, 10);
		            }
		        } else { //不存在,存入cookie
		            sidarr.push(sid); //将sid追加到数组
		            addcookie('cartsid', sidarr, 10); //存cookie
		            numarr.push(1); //将表单的值追加到数组
		            addcookie('cartnum', numarr, 10); //存cookie
		        }
		        alert('成功加入购物车');
		    });
		}()	
	}
});
