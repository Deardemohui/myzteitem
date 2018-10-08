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
	//1.滚轮事件显示左侧的楼梯。
	var $louti=$('#loutinav');//左侧楼梯
	var $loutili=$('#loutinav li');
	var $louceng=$('.louti');
	$(window).on('scroll',function(){
		var $scrolltop=$(window).scrollTop();//获取滚动条的top值。
		if($scrolltop>=500){
			$louti.show();
		}else{
			$louti.hide();
		}
		
		//4.拖动滚轮，对应的楼梯添加对应的类名
		$louceng.each(function(index,element){//index:0-8
			//通过遍历的方式获取每一个楼层的top值
			var $top=$louceng.eq(index).offset().top+$(this).innerHeight()/2;
			if($top>$scrolltop){
				$loutili.removeClass('active');//清除所有的类
				$loutili.eq($(this).index()).addClass('active');
				return false;//阻止循环
				//每次只能有一个满足条件添加类，其他的通过循环阻止
			}
		});
	});
	//2.点击左侧楼梯，右边对应的楼层跳转。
	$loutili.not('.last').on('click',function(){
		$(this).addClass('active').siblings('li').removeClass('active');
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

