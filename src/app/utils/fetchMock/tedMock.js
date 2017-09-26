import { serverUrl } from '../serverData/server';
import { method as loginMethod } from '../../components/auth/login/loginDuck';
const fetchMock = require('fetch-mock');

fetchMock.post(serverUrl+loginMethod,
  {"code":0,"content":"成功","data":{"cityId":77,"name":"sssa","phone":"19200000002","token":"9A0E8A4DCDB0DF6F8A306133A96D27ECE0F6C80DA4FD3CFB"}}
)
