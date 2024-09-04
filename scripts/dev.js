import minimist from "minimist";
import {resolve,dirname} from "path";
import {fileURLToPath} from "url";
import {createRequire} from "module"
import esbuild from "esbuild"
const args = minimist(process.argv.slice(2));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require =createRequire(import.meta.url);
// console.log(args,Array.isArray(args));
const target = args._?.[0];
const format = args.f||"iife";//  打包模块格式
console.log(target,format,__filename,__dirname);
const entry = resolve(__dirname,`../packages/${target}/src/index.ts`)
const pkg =  require(`../packages/${target}/package.json`)

// 打包

esbuild.context({
    entryPoints:[entry], // 入口
    outfile:resolve(__dirname,`../packages/${target}/dist/${target}.js`),  // 出口
    bundle:true,
    platform:"browser", //打包给浏览器用
    sourcemap:true ,//可以调试源代码
    format,   // cjs esm iife
    globalName:pkg.buildOptions?.name
}).then((ctx)=>{
    console.log("start dev 打包成功");
    return ctx.watch() // 监控文件持续打包
})