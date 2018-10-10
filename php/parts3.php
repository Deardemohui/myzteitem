<?php
	header('content-type:text/html;charset=utf-8');
	
	include "conn.php";
	
	//3.执行sql语句  mysql_query()
	//$result:结果集，记录集。
	$result=mysql_query("select * from parts3");
	
	//4.操作数据库
	//获取记录集的内容--mysql_fetch_array(数组的形式获取记录集)
	//MYSQLI_ASSOC:获取数组时显示字符串下标。
	$piclist=array();
	for($i=0;$i<mysql_num_rows($result);$i++){
		$piclist[$i]=mysql_fetch_array($result,MYSQLI_ASSOC);
	}

	echo json_encode($piclist);


	mysql_close($conn);//关闭数据库连接
?>