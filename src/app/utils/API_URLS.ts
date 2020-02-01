// export const API_URL = 'http://localhost:3000/';
export const API_URL = 'http://192.168.1.57:3000/';
// export const API_URL = 'https://talkontask.herokuapp.com/';

// USERS
export const SAVE_USER = API_URL + 'user/add';
export const GET_ALL_USERS = API_URL + 'user/all';
export const LOGIN_USER = API_URL + 'user/login';
export const GET_ALL_USER_BY_TYPE = API_URL + 'user/type/';
export const GET_USER_BY_ID = API_URL + 'user/id/';




// PROJECTS
export const GET_MANAGER_PROJECTS = API_URL + 'project/pm/';
export const ADD_PROJECT = API_URL + 'project/save/';
export const GET_ALL_PROJECTS = API_URL + 'project/all';
export const SEE_PROJECT = API_URL + 'project/p/';
export const GET_ALL_DEV_BY_PROJECT_ID = API_URL + 'project/dev/';
export const GET_ALL_PROJECTS_BY_DEV_ID = API_URL + 'project/devp/';


// MSG
export const GET_MESSAGES = API_URL + 'message/get/';
export const GET_LAST_MESSAGES = API_URL + 'message/lastMessages/';


// TASK
export const ADD_TASK = API_URL + 'task/addT';
export const GET_ALL_TASK_BY_PROJECT_ID = API_URL + 'task/t/';
export const GET_ALL_TASK_BY_ID = API_URL + 'task/id/';
export const UPDATE_TASK_STATE = API_URL + 'task/update/state/';
export const DELETE_TASK = API_URL + 'task/delete/';
export const UPDATE_TASK = API_URL + 'task/update/';
export const SAVE_TASK_REQUEST = API_URL + 'task/req/';
export const GET_TASK_REQ_BY_DEV_ID = API_URL + 'task/req/dev/';
export const GET_TASK_REQ_BY_PM_ID = API_URL + 'task/req/pm/';
export const DELETE_TASK_REQ = API_URL + 'task/req/';
export const ACCPET_TASK_REQ = API_URL + 'task/req/ok/';


// MEETINGS
export const ADD_MEETING = API_URL + 'meeting/addM';
export const GET_ALL_MEETINGS_BY_DEV_ID = API_URL + 'meeting/devmet/';
export const GET_ALL_MEETINGS = API_URL + 'meeting/allM';
export const SEE_MEETING = API_URL + 'meeting/m/';
export const GET_MEETINGS_MANAGER = API_URL + 'meeting/chef/';
export const UPDATE_FCM_TOKEN = API_URL + 'user/token/';
export const ADD_PROJECT_PROPOSITION = API_URL + 'project/proposition' ;
export const GET_PROJECT_PROPOSITION_BY_CLIENT_ID = API_URL + 'project/proposition/client/' ;
export const GET_PROJECT_PROPOSITION_ID = API_URL + 'project/proposition/' ;
export const PROJECT_STATS = API_URL + 'project/stats/' ;
