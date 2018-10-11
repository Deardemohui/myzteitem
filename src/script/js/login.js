define(['jquery','jquery.validate'],function($){
	return {
		//引入尾部html
		loginfootercommon:!function(){
			$('.footercontent').load('footer.html');
		}(),
		
		//验证用户名是否存在
		haveusername:!function(){
			function addCookie(key,value,day){
				var date=new Date();//创建日期对象
				date.setDate(date.getDate()+day);//过期时间：获取当前的日期+天数，设置给date
				document.cookie=key+'='+encodeURI(value)+';expires='+date;//添加cookie，设置过期时间
			}
			
			$('#btnsub').on('click',function(){
				var $loginusername=$('#loginusername').val();
				var $loginpassword=$('#loginpassword').val();
				$.ajax({
					type:'post',
					url:'http://10.31.162.62/myzte/php/login.php',
					data:{//将用户名和密码传输给后端
						name:$loginusername,
						pass:$loginpassword
					},
					success:function(data){//请求成功，接收后端返回的值
						if(data==1){//如果数据匹配成功,存cookie,跳转到首页
							addCookie('UserName',$loginusername,7);
							location.href='http://10.31.162.62/myzte/src/index.html';
						}else{//失败,不跳转,提示错误
							$('#errordata').html('用户名或者密码错误');
							$('#errordata').css('color','red');
							$('#password').val('');
						}
					}
				})
			});
			
			$('#signin').validate({
				rules:{
					username:{
						required:true,
						rangelength:[11,11]
					},
					password:{
						required:true,
						minlength:6,
						maxlength:20
					},
					submit:{
						
					}
				},
				messages:{
					username:{
						required:'手机号不能为空',
						rangelength:'号码有误'
					},
					password:{
						required:'密码不能为空',
						minlength:'长度不能小于6位',
						maxlength:'长度不能超过20位'
					}
				}
			});
			
		}()
		
	}
	
});