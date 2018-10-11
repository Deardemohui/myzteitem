define(['jquery','jquery.cookie','jquery.validate'],function($){
	return {
		//引入尾部html
		registorfootercommon:!function(){
			$('.footercontent').load('footer.html');
		}(),
		
		//表单验证
		regbiaodanyanzheng:!function(){
			$('#signup').validate({
				rules:{
					username:{
						required:true,
						rangelength:[11,11],
						remote:{//将前端的name给后端
							url:"http://10.31.162.62/myzte/php/reg.php",
							type:"post"
						}
					},
					password:{
						required:true,
						minlength:6,
						maxlength:20
					},
					repass:{
						required:true,
						equalTo:'#password'
					}
				},
				messages:{
					username:{
						required:'手机号不能为空',
						rangelength:'号码有误',
						remote:'号码已存在'
					},
					password:{
						required:'密码不能为空',
						minlength:'长度不能小于6位',
						maxlength:'长度不能超过20位'
					},
					repass:{
						required:'密码重复不能为空',
						equalTo:'两次输入密码不一致'
					}
				}
			});
			
			$.validator.setDefaults({
				success:function(label){
					label.text('√').css('color','green').addClass('valid');
				}
			});
			
		}()
		
		/*biaodanyanzheng:!function(){
			var $user=$('#username');
			var $pass=$('#password');
			var $repass=$('#repass');
			var $check=$('#check');//是否同意服务条款
			var $signup=$('#signup');//表单
			var $usererror=$('#username-error');
			var $passerror=$('#password-error');
			var $repasserror=$('#repass-error');
			var $bstop=true;
			
			$user.on('blur',function(){
				if($(this).html()!=''){
					$.ajax({
						type:"post",
						url:"http://10.31.162.62/myzte/php/reg.php",
						async:true,
						data:{
							username:$user.value()
						}
					}).done(function(data){
						if(!data){
							$usererror.html('√');
							
						}else{
							
						}
					});
				}else{
					$usererror.html('用户名不能为空');
					$usererror.css('color','red');
					$bstop=false;
				}
			});
			
		}()*/
	}
});