import request from '../utils/request.js';

export function test(payload){
	return request.get('/index.php?r=basic/user/ce',payload);
}
