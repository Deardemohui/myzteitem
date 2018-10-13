define(['jquery','jquery.cookie'],function($){
	return {
		//导入模块的公用部分(头部和尾部并包含头部的公共js效果)
		cartcommon:!function(){
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
		
		//商品
		shanping:!function(){
			
		}()
	}
});