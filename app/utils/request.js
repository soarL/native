import md5 from "react-native-md5";
import { requestConfig } from '../config.js';

class request{
	//请求配置
	requestConfig = {
		encrypt:true
	};

	//header 配置
	headerConfig = {
		cache: 'no-cache', 
		credentials: 'same-origin',
		mode: 'cors',
		redirect: 'follow', 
		referrer: 'no-referrer',
	}

	//request代码
	codeMessage = {
	  200: '服务器成功返回请求的数据。',
	  201: '新建或修改数据成功。',
	  202: '一个请求已经进入后台排队（异步任务）。',
	  204: '删除数据成功。',
	  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
	  401: '用户没有权限（令牌、用户名、密码错误）。',
	  403: '用户得到授权，但是访问是被禁止的。',
	  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
	  406: '请求的格式不可得。',
	  410: '请求的资源被永久删除，且不会再得到的。',
	  422: '当创建一个对象时，发生一个验证错误。',
	  500: '服务器发生错误。',
	  502: '网关错误。',
	  503: '服务不可用，服务器暂时过载或维护。',
	  504: '网关超时。',
	};
	
	constructor(requestConfig){
		this.requestConfig = {
			...this.requestConfig,
			...requestConfig
		}
	}

	url(url){
		return this.requestConfig.url + url;
	}

	checkStatus(response) {
	  if (response >= 200 && response < 300) {
	    return true;
	  }
	  const errortext = this.codeMessage[response];
	  throw errortext;
	}

	utf8(inputStr){
	  let outputStr = "";
	  for (let i = 0; i < inputStr.length; i++) {
	    let temp = inputStr.charCodeAt(i);
	    if (temp < 128) {
	        outputStr += String.fromCharCode(temp);
	      }else if (temp < 2048) {
	      outputStr += String.fromCharCode((temp >> 6) | 192);
	      outputStr += String.fromCharCode((temp & 63) | 128);
	    }
	    else if (temp < 65536) {
	      outputStr += String.fromCharCode((temp >> 12) | 224);
	      outputStr += String.fromCharCode(((temp >> 6) & 63) | 128);
	      outputStr += String.fromCharCode((temp & 63) | 128);
	    }
	    else {
	      outputStr += String.fromCharCode((temp >> 18) | 240);
	      outputStr += String.fromCharCode(((temp >> 12) & 63) | 128);
	      outputStr += String.fromCharCode(((temp >> 6) & 63) | 128);
	      outputStr += String.fromCharCode((temp & 63) | 128);
	    }
	  }
	  return outputStr;
	}

	//加密函数
	encrypt(datas){
		if(!datas){
			datas = {}
		}
	  	let data = Object.keys(datas).sort();
	  	let params = {};
	  	data.map((value,key)=>{
	    	params[value] = datas[value];
	  	})
	  	let str = '',
	    	prestr = '';
	  	for(let i in params) {
	  		let val = params[i]
	  		if(val instanceof Object){
	  			val = JSON.stringify(val);
	  		}
	    	str += i + '=' + val + '&';
	  	}
	  	prestr = str + 'key=' + this.requestConfig.key;
	  	let result = md5.hex_md5(this.utf8(prestr)); 
	  	return result;
	}

	//参数处理
	paramsProcessing(data){
		if(this.requestConfig.encrypt){
			data.key = this.encrypt(data);
		}
		let ret = '';
		for (let it in data) {
			let val = data[it]
			if(val instanceof Object){
				val = JSON.stringify(val);
			}
			ret += encodeURIComponent(it) + '=' + encodeURIComponent(val) + '&';
		}
		return ret;
	}

	//非post参数拼接
	getPramsProcessing(url,data){
		let result  = `${url}&${this.paramsProcessing(data)}`;
		return result;
	}

	//网络请求错误处理
	ErrorHandling(error){
		console.log(error);
		return false
	}

	//网络请求成功处理
	SuccessHandling(response){
		if(this.checkStatus(response.status)){
			return response.json();
		}else{
			//非200 - 300 状态码 抛出错误 进入catch 处理
			throw Error;
		}
	}

	post(url,data={},header={},other={}){
  		return fetch(this.url(url),{
		    body:this.paramsProcessing(data),
		    headers: {
	          'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
	          'X-Requested-With':'XMLHttpRequest',
	          ...header
		    },
		    method: 'POST', 
		    ...this.headerConfig,
		    ...other
	  	})
	  	.then(response =>{
	  		return this.SuccessHandling(response);
	  	})
	  	.catch(error=>{
	  		return this.ErrorHandling(error)
	  	}) 
	}

	get(url,data={},header={},other={}){
  		return fetch(this.getPramsProcessing(this.url(url),data),{
		    headers: {
	          ...header
		    },
		    method: 'GET', 
		    ...this.headerConfig,
		    ...other
	  	})
	  	.then(response =>{
	  		return this.SuccessHandling(response);
	  	})
	  	.catch(error=>{
	  		return this.ErrorHandling(error)
	  	}) 
	}

	delete(url,data={},header={},other={}){
  		return fetch(this.getPramsProcessing(this.url(url),data),{
		    headers: {
	          ...header
		    },
		    method: 'DELETE', 
		    ...this.headerConfig,
		    ...other
	  	})
	  	.then(response =>{
	  		return this.SuccessHandling(response);
	  	})
	  	.catch(error=>{
	  		return this.ErrorHandling(error)
	  	}) 
	}

	put(url,data={},header={},other={}){
  		return fetch(this.getPramsProcessing(this.url(url),data),{
		    headers: {
	          ...header
		    },
		    method: 'PUT', 
		    ...this.headerConfig,
		    ...other
	  	})
	  	.then(response =>{
	  		return this.SuccessHandling(response);
	  	})
	  	.catch(error=>{
	  		return this.ErrorHandling(error)
	  	}) 
	}		
}

export default new request(requestConfig);