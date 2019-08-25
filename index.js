var $span = $(".rotate-bg span");
        var $p = $(".rotate p");

        $.each($span, function(index) {
            $span.eq(index).css('transform', 'rotate(' + index * 30 + 'deg) translateX(262PX)')
        })

        $.each($p, function(index) {
            $p.eq(index).css('transform', 'rotate(' + (22.5 + index * 45) + 'deg)')
        })

        $(".btn-p").click(function() {
            $(".rotate-con").addClass("start");
            $(this).hide();
            $(".btn-p1").show();
        })
        $(".btn-p1").click(function() {
            $(this).hide();
            $(".btn-p2").show();
            choujiang();
        })


        function choujiang() {
            //解析transform矩阵  获取点击暂停时转盘旋转的角度
            let deg = eval('get' + $(".rotate-con").css('transform'));
            //1440=4*360
            let deg1 = chou() + 720;
            //速度调整保证速度下降的不会太快 
            let deg2 = deg1 < 1081 ? deg1 + 360 : deg1;
            console.log('deg:' + deg, 'deg1:' + deg1, 'deg2:' + deg2);

            $(".rotate-con").addClass("stop").css('transform', 'rotate(' + deg + 'deg)').removeClass("start stop").animate({}, function() {
                $(".rotate-con").css({
                    transform: 'rotate(' + deg2 + 'deg)',
                    transition: '10s cubic-bezier(0, 0, .24, 1)'
                });

            });
            setTimeout(() => {
                display();
                $(".btn-p2").hide();
                $(".btn-p").show();
            }, 10000);
        }

        //抽奖旋转角度
        function chou() {
            let x = Math.round(Math.random() * 1000);
            console.log('x:' + x);
            if (x === 0) {
                //选项一：iPad Pro
                let k = Math.round(Math.random() * 40 + 318);
                console.log('偏移角度：', k);
                //设置弹窗信息
                $(".txt").text("恭喜您，获得了" + $p.eq(0).text() + "。")
                return k;
            } else if (x < 11) {
                //选项二 一千元现金 
                let k = Math.round(Math.random() * 40 + 48);
                console.log('偏移角度：', k);
                $(".txt").text("恭喜您，获得了" + $p.eq(6).text() + "。")
                return k;
            } else if (x < 61) {
                //选项三 充电宝
                let k = Math.round(Math.random() * 40 + 228);
                console.log('偏移角度：', k);
                $(".txt").text("恭喜您，获得了" + $p.eq(2).text() + "。")
                return k;
            } else if (x < 361) {
                //选项四 肥宅快乐水
                let k = Math.round(Math.random() * 40 + 93);
                console.log('偏移角度：', k);
                $(".txt").text("恭喜您，获得了" + $p.eq(5).text() + "。")
                return k;
            } else if (x < 431) {
                //选项五 蓝牙耳机
                let k = Math.round(Math.random() * 40 + 183);
                console.log('偏移角度：', k);
                $(".txt").text("恭喜您，获得了" + $p.eq(3).text() + "。")
                return k;
            } else if (x < 681) {
                //选项六 CXK
                let k = Math.round(Math.random() * 40 + 273);
                console.log('偏移角度：', k);
                $(".txt").text("恭喜您，获得了" + $p.eq(1).text() + "。")
                return k;
            } else if (x < 881) {
                //选项七 谢谢惠顾 
                let k = Math.round(Math.random() * 40 + 3);
                console.log('偏移角度：', k);
                $(".txt").text("很遗憾，您没有中奖，" + $p.eq(7).text() + "。")
                return k;
            } else {
                //选项八 神奇的绿帽子
                let k = Math.round(Math.random() * 40 + 138);
                console.log('偏移角度：', k);
                $(".txt").text("恭喜您，获得了" + $p.eq(4).text() + "。")
                return k;
            }
        }

        //获取旋转角度值
        function getmatrix(a, b, c, d, e, f) {
            let aa = (180 * Math.asin(a) / Math.PI).toFixed(1);
            let bb = (180 * Math.acos(b) / Math.PI).toFixed(1);
            let cc = (180 * Math.asin(c) / Math.PI).toFixed(1);
            let dd = (180 * Math.acos(d) / Math.PI).toFixed(1);
            let deg = 0;
            if (parseFloat(aa) == parseFloat(bb) || parseFloat(-aa) == parseFloat(bb)) {
                deg = parseFloat(dd);
            } else if (parseFloat(-aa) + parseFloat(bb) == 180.0) {
                deg = 180 + parseFloat(cc);
            } else if (parseFloat(aa) + parseFloat(bb) == 180.0) {
                deg = 360 - parseFloat(cc) || 360 - parseFloat(dd);
            }
            return deg;
        }

        //弹窗动画效果
        function display() {
            $("div.prompt").show().animate({
                top: '50%',
                opacity: 1
            });
            $(".mask-bg").show().css('background-color', 'rgba(34,47,62,0.3)');
        }

        $(".prompt .btn,.prompt i").on('click', function() {
            $("div.prompt").animate({
                top: '45%',
                opacity: 0
            }, function() {
                $("div.prompt").hide();
                $(".mask-bg").hide();
            });
            $(".rotate-con").stop().css({
                transform: 'rotate(0deg)',
                transition: '0s'
            });
        })
