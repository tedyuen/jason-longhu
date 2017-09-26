/**
 * Created by zhangyanqing on 2017/7/24.
 */
import { serverUrl } from '../serverData/server';
import { method as ticketListMethod } from '../../components/business/ticket/ticketList/api/TicketListWidgets';
const fetchMock = require('fetch-mock');

fetchMock.mock(serverUrl+ticketListMethod,
  {"code":0,"content":"成功","data":{"count":1000,"countPage":70020,"ticketList":[{"id":1,"test1":"test1","test2":1,"test3":"test3","test4":"test4"},{"id":2,"test1":"test1","test2":2,"test3":"test3","test4":"test4"}],"pages":33,"tab":61828}}
)
