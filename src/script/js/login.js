define(['jquery'],function($){
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
				var $username=$('#username').val();
				var $password=$('#password').val();
				$.ajax({
					type:'post',
					url:'http://10.31.162.62/myzte/php/login.php',
					data:{//将用户名和密码传输给后端
						name:$username,
						pass:$password
					},
					success:function(data){//请求成功，接收后端返回的值
						if(!data){//用户名或者密码错误
							$('#errordata').html('用户名或者密码错误');
							$('#errordata').css('color','red');
							$('#password').val('');
						}else{//成功,存cookie,跳转到首页
							addCookie('UserName',$username,7);
							location.href='http://10.31.162.62/myzte/src/index.html';
						}
					}
				})
			});
		}()
		
	}
	
});