!function($){
	//头部导航内两个li标签划过显示隐藏盒子(这里要用事件委托因为头部是导入的,取不到header里面的元素)
	//AXON系列
	$('.axon').on('mouseover',function(){
		$('.axonbox').show();
	},function(){
		$('.axonbox').hide();
	});
	//BLADE系列
	$('.blade').on('mouseover',function(){
		$('.bladebox').show();
	},function(){
		$('.bladebox').hide();
	});
}(jQuery);
