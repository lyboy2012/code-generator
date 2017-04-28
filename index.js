const fs = require('fs-extra');
const package = require('./package');
const path = require('path');
const replaceStream = require('replacestream');
const _ = require('lodash');
let program = require('commander');
//const inquirer = require('inquirer');
const cwd = process.cwd();

const dest = path.resolve(cwd,'src');


/*inquirer.prompt([
  {
    type: 'list',
    name: 'template',
    message: '请选择模板',
    choices: [
      'PC模板',
      'Weex模板'
    ]
  }
]).then(function (answers) {
  switch(answers.template){
    case 'PC云栖模板':
     pc();
    break;
    case 'Weex云栖模板':
    console.log(2)
    break;
  }
});*/



 program
.version(package.version)
.option('-N, --name [type]', '生成模块名称')
.option('-T, --tpl [type]', '模板文件夹名称')
.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ code-gen -N user -T template');
  console.log('');
}).parse(process.argv);

let src = path.resolve(cwd, program.tpl);

if(program.name && program.tpl){
  traversalDir(src);
}


function replaceFile(uri){
  let target = _.replace(uri,'${name}',program.name);
  target =  _.replace(target,src,dest);
  //console.log(target);
  fs.ensureFile(target, err => {
    if(!err){
        fs.createReadStream(uri).pipe(replaceStream('${name}',program.name)).pipe(fs.createWriteStream(target));
    }
  })
}

function traversalDir(uri){
  fs.readdirSync(uri).forEach(file => {//读取文件并遍历
    ((fileName,root)=>{
      let uri = path.resolve(root,fileName);    
      if(fs.lstatSync(uri).isDirectory()){
        traversalDir(uri);//递归遍历文件
      }else{
        replaceFile(uri);//如果是文件做替换
      }
    })(file,uri);
    
  });
}


console.log('从模板 '+program.tpl+' 创建的模块 '+program.name+' 创建完成!');

