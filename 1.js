var http = require('http');
var fs = require('fs');

var server = http.createServer();

server.on('error',function ()
{
    console.log('error')
})

server.on('listening',function ()
{
    console.log('监听成功')
})



server.on('request',function (red,res){

    res.writeHead(200,{
        'content-type':'text/html'
    })

    var i = red.url;
    i = i.substr(1);

    dir(i,red,res)

})


server.listen(8080,'localhost');

function dir(Namedir,red,res)
{

    var buf = new Buffer(100);
    buf.write("<div style='width:100px; height:100px; background:red;' ></div>")
    console.log(buf.toString())


    fs.mkdir('./dir',function (err)
    {
        if(!err)
        {
            //创建文件

            fs.writeFile('./dir/'+Namedir+'.html',buf.toString(),0,function (err)
            {
                if(!err)
                {
                    fs.readFile('./dir/'+Namedir+'.html','utf-8',function (err,wordobg)
                    {
                        if(!err)
                        {
                            res.write(wordobg.toString());
                            res.end();

                        }
                    })
                }
            })

        }else{
            //文件已经存在

        }
    })
}


