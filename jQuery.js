window.onload = function ()
{
	
	var music = [{
		name:'张杰-明天过后',
		src:'Music/张杰-明天过后.mp3',
		imgsrc:'img/music_img_2.jpg'
	},
	{
		name:'一人我编程累',
		src:'http://v3.365yg.com/e15aee7d7e167567bad5046958791296/593a0512/video/m/114784d000004070ef69c68/',
		imgsrc:'img/music_img_3.jpg'
	},
	{
		name:'G-DRAGON (权志龙) - BULLSHIT ',
		src:'Music/G-DRAGON_1.mp3',
		imgsrc:'img/music_img_2.jpg'
	},{
		name:'杨千嬅 - 可惜我是水瓶座',
		src:'Music/杨千嬅-可惜我是水瓶座.mp3',
		imgsrc:'img/music_img_1.jpg'
	}]
	
	$(function ()
			{
				//判断是否是移动端 
	
				  if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i)))
			    {    //跳到手机端
			    	console.log('m')
			    	
			    	/*clearInterval(Time)*/
			    	$('.music_').remove()
			    	$('.component_music_logo').remove()
			    	
			 
			    }else{
			        //跳到电脑端
			        Time = setInterval(Times , 500)
			    }
			})
	
	
	
	
	//播放那一条
	var click_i = 0; //记录双击的那一条DOM
	
	
	
	//遍历 li标签出来
	for(v in music)
	{
		var i = music[v].name;
		
		$('.music_ ul:eq(0)').append("<li>"+music[v].name+" <audio src="+music[v].src+" ></audio></li>")
		console.log(music[v].name)
	}
	
	//默认第一条播放
	
	var one = $('.music_ ul:eq('+click_i+')').find('li:eq(0)').addClass('music_ul_one_style').find('audio').get(0).play()
	
	var Time = null; //时间函数 500秒查看一次是否播放完成
	
	
	
	function Times()
	{
		
		var i =  parseInt($('.music_ ul:eq(0)').find('li:eq('+click_i+')').find('audio').get(0).duration) //总共时常
		
		var y = parseInt($('.music_ ul:eq(0)').find('li:eq('+click_i+')').find('audio').get(0).currentTime) //当前播放到哪里的时间
		
		if($('.music_ ul:eq(0)').find('li:eq('+click_i+')').find('audio').get(0).ended)
		{
			//播放结束
			click_i++;
			
			if(click_i > $('.music_ ul:eq(0)').find('li').length)
			{
				click_i = 0;
			}
			
			$('.music_ ul:eq(0)').find('li').eq(click_i).dblclick()
		}
		
		
		$('.music_jjt_find').width(y / i * 185)
		
	}
	

	
	
	
	$('.music_ ul:eq(0)').find('li').dblclick(function ()		
	{
		//记录播放的是那一条
		click_i = $(this).index();
		
		$('.music_ img:eq(0)').attr('src',music[click_i].imgsrc)
		
		
		$('.music_ ul:eq(0)').find('li').each(function ()
			{
				if($(this).index() == click_i)
				{
					
					
					if($('.music_ ul:eq(0)').find('li').eq(click_i).find('audio').get(0).paused)
						{
							
							$(this).find('audio').get([0]).play()
							
						}else
						{
							$(this).find('audio').get([0]).pause()
						}
					
				}else
				{
					
					$(this).find('audio').get([0]).load()
					
					$('.music_ ul:eq(0)').find('li').removeClass('music_ul_one_style');
					$('.music_ ul:eq(0)').find('li').eq(click_i).addClass('music_ul_one_style')
					
				}
				
			})
	})

	// 暂停播放
	
	$('.dd-two').click(function ()
	{
		
		var i = $('.dd-two').hasClass('component_two_bg')
		if(!i)
		{
			
			$('.music_ ul:eq(0)').find('li:eq('+click_i+')').find('audio').get(0).pause()
			
			$('.dd-two').addClass('component_two_bg')
		}else
		{
			$('.music_ ul:eq(0)').find('li:eq('+click_i+')').find('audio').get(0).play()
			$('.dd-two').removeClass('component_two_bg')
		}
		
	})
	
	//控制声音大小
	
	$('.jjt').click(function (ev)
	{
		var i = ev.pageX;
		var y = $(this).offset().left;
		var z = i - y
		
		var oLeft = z + 25;
		
		$('.component_jjt').css('background','url(img/jjt.png) '+oLeft+'px 5px no-repeat')
		
		var s = (z / 185);
		
		if(s.toFixed(2) > 0.8)
		{
			
			s = 1;
		}
		
		
		$('.music_ ul:eq(0)').find('li').eq(click_i).find('audio').get(0).volume = s.toFixed(2)
		
	})
	
	
	// 控制音乐播放的进度
	
	$('.music_jjt_parent').click(function (ev)
	{
		var i = ev.pageX;
		var y = $(this).offset().left;
		var z = i - y
		
		
		var zg = parseInt($('.music_ ul:eq(0)').find('li:eq('+click_i+')').find('audio').get(0).duration) //总共时常
		var dq = parseInt($('.music_ ul:eq(0)').find('li:eq('+click_i+')').find('audio').get(0).currentTime) //当前播放到哪里的时间
		 
		var hc = $('.music_ ul:eq(0)').find('li:eq('+click_i+')').find('audio').get(0).buffered
		
	
		var u = z / 185 * zg;
		
		//赋值U失败。。。。没搞明白
		
		
		
		$('.music_ ul:eq(0)').find('li:eq('+click_i+')').find('audio').get(0).currentTime = u ;
		
	})
	
	
	
	// 播放上一条
	
	$('.dd-one').click(function ()
	{
		click_i--;
		$('.music_ ul:eq(0)').find('li:eq('+click_i+')').dblclick()
	})
	
	
	//播放吓一条
	
	$('.dd-three').click(function ()
	{
		click_i++;
		
		if(click_i >= $('.music_ ul:eq(0)').find('li').length)
			{
				click_i = 0;
			}
		
		
		$('.music_ ul:eq(0)').find('li:eq('+click_i+')').dblclick()
	})
	
	
	//以上就是music播放器做完了，虽然我发现了一个BUG但是我也懒得改了。
	
	
	// 让music 图标在屏幕中间
	
	var windows_height = $(window).height();
	
	$('.component_music_logo').animate({
		top : (windows_height-38)/2
	},'slow')
	
	
	
	$('.music_').css('top',(windows_height-$('.music_').height())/2)
	
	$('.component_music_logo').click(function ()
	{
		
		if($('.music_').css('right') == '0px')
		{
				$('.music_').animate({'right':'-100%'},'slow')
			
				$('.component_music_logo').animate({'right':'10px'},'slow')
			
		}else
		{			
			$('.component_music_logo').animate({'right':$('.music_').width()+20},'slow')
		
			$('.music_').css('right','0');
		}
		
				
	})
	

	$('.m_nav').on('touchstart',function ()
	{
		
		$('.nav-ul').slideToggle()
		
	})

	
	
	/* banner 幻灯片  */
	
	var B_w = parseInt($('.zdy-nav-right').width()+30);
	var Time_ppt = null;
	var B_i = 0;
	
	$('.zdy-nav-right ul:eq(0)').width(B_w * $('.zdy-nav-right ul:eq(0)').find('li').length);
	
	$('.zdy-nav-right ul:eq(0)').find('img').css('width',B_w)
	
	//身材点
	
	
	for(var i =0; i<$('.zdy-nav-right ul:eq(0)').find('li').length; i++)
	{
		
		$('.poit dl').append('<dd></dd>')
	}

	$('.poit dl').width($('.zdy-nav-right ul:eq(0)').find('li').length*30);
	
	
	Time_ppt = setInterval(ppt,5000)
	
	function ppt()
	{
		
		B_i++;
		
		if(B_i>=$('.zdy-nav-right ul:eq(0)').find('li').length)
		{
			B_i=0;
		}
		
		$('.zdy-nav-right ul:eq(0)').css('left',-(B_i*B_w+15));
		
		
		$('.poit dl').find('dd').css({
			border:'1px solid white',
			background:'transparent'
		})
		
		$('.poit dl').find('dd').eq(B_i).css({
			border:'1px solid #f18200',
			background:'#f18200'
		})
		
	}
	

	$('.zdy-nav-right').hover(function ()
	{
		
		var i =  clearInterval(Time_ppt)
		
		
	},function ()
	{
		
		Time_ppt = setInterval(ppt,5000)
		
	})
	
	
	$('.poit dl').find('dd').each(function ()
	{
		
		$(this).click(function ()
		{
			
			B_i = $(this).index();
			B_i--;
			ppt()
			
		})
		
		
	})


	//首页Main 字体颜色

	$('.one_ img').mouseover(function (ev)
	{
		$('.one_').find('h4,h5').css({'color':'#222222'})
		$(this).parent().find('h4,h5').css({
			'color':'#e67633'
			/*'fontFamily':'黑体'*/
		});
	})
	
	
	

}




















