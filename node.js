
var fs = require('fs')

var probjectdata = {
    name:'miaov',
    file:[{
        name:'img',
        type:'dir'
    },{
        name:'show.txt',
        type:'file'
    },{
        name:'css',
        type:'dir'
    }]
}

if(probjectdata.name)
{
    fs.access('./'+probjectdata.name,function (err)
    {
       if(err)
       {
           //return true no file, create file;

           fs.mkdir('./'+probjectdata.name,function (err)
           {
              if(!err)
              {
                  //create file success

                  probjectdata.file.forEach(function (v) {
                     console.log(v.name)

                      if(v.type == 'dir')
                      {
                          //文件夹
                          fs.mkdir('./'+probjectdata.name+'/'+v.name,function (err)
                          {
                              console.log(err)
                          })
                      }else if(v.type == 'file'){
                         fs.writeFile('./'+probjectdata.name+'/'+v.name,'随便啦',0,function (err)
                         {
                             console.log(err)
                         })
                      }

                  })

              }else{
                  console.log(probjectdata.name+'创建失败');
              }
           })

       }else{
           //已有该文件 让用户判断是否删除重新建造
           process.stdin.resume();
           process.stdout.write('您要创建的文件夹'+probjectdata.name+'已经存在是否删除重新建造:删除（YES）or（NO）');
           process.stdin.on('data',function (data)
           {

                //类型相同为什么 输出永远都是 false; 用户输入 YES 但是还是输出 false;

               /*var i = data.toString();
               console.log(i)
               console.log(typeof (i));
               console.log('YES');
               console.log(i === 'YES');*/  //因为有回车的关系所以retrun false;

               var data = data;
               var v = new Buffer(3);

               data.copy(v,0,0,3);
               if(v.toString() ==='YES')   //终于返回true了 还能说撒小兴奋。
               {

                   fs.rmdir(probjectdata.name,function (err)
                   {
                       if(err){//为真 删除失败 不是空文件

                           //删除文件要用到递归

                           fs.readdir(probjectdata.name,function (err , obj) //还是的用递归写这样虽然可以删除但是效果不好
                           {
                               if(!err)
                               {
                                   console.log(obj)
                                   obj.forEach(function (v)
                                   {

                                      fs.stat(probjectdata.name+'/'+v,function (err,obj)
                                      {
                                          if(!err)
                                          {

                                              if(obj.mode == '16822')
                                              {
                                                   console.log(v)
                                                  fs.rmdir(probjectdata.name+'/'+v,function (err)
                                                  {
                                                      if(!err)
                                                      {
                                                          console.log('删除文件夹success');
                                                      }
                                                  })
                                              }else if(obj.mode == '33206')
                                              {
                                                  fs.unlink(probjectdata.name+'/'+v,function (err)
                                                  {
                                                      if(!err)
                                                      {
                                                          console.log('删除文件成功')
                                                      }
                                                  })
                                              }
                                          }
                                      })

                                   })

                               }
                           })





                       }else{

                           console.log('这里面')

                           if(probjectdata.name)
                           {
                               console.log('456111')

                               fs.mkdir('./'+probjectdata.name,'0777',function (err)
                               {
                                   if(!err)
                                   {

                                       probjectdata.file.forEach(function (v)
                                       {
                                           if(v.type == 'dir'){
                                               fs.mkdir(probjectdata.name+'/'+v.name,function (err)
                                               {
                                                   if(!err)
                                                   {
                                                       console.log('创建文件夹成功')
                                                   }
                                               })
                                           }else if(v.type == 'file')
                                           {
                                               fs.writeFile(probjectdata.name+'/'+v.name,'要插入的数据',0,function (err)
                                               {
                                                   if(!err)
                                                   {
                                                       console.log('创建文件成功')
                                                   }
                                               })
                                           }
                                       })

                                   }
                               })



                           }

                       }


               })

               }else{
                   console.log('推出循环');
                   process.exit()
               }




               //var bf = new Buffer('YES');
               //var bf2 = new Buffer(3)
               //console.log(bf)

              //console.log(data)
              //bf.copy(bf2,0,0,3);

               //console.log(bf)

               //console.log(bf2 === bf)//为什么不想等,为什么呢
           })
       }
    })
}

