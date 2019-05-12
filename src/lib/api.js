// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import axios from 'axios';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import { cmnApiEndpointUri } from './constants';

// -------------------------------------------------------------------------------------------------
// * Axios initialize
// -------------------------------------------------------------------------------------------------
const ajax = axios.create({ 
  baseURL: cmnApiEndpointUri,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // クロスドメインの場合必要
  },
  responseType: 'json',
});

// -------------------------------------------------------------------------------------------------
// * Axios related functions
// -------------------------------------------------------------------------------------------------
const withAuthorizationHeader = (token) => {
  if (token) {
    ajax.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${token}`;
      return config
    })
  }
}

// -------------------------------------------------------------------------------------------------
// * API functions
// -------------------------------------------------------------------------------------------------
export const getSiteList = (page, uid) => {
  const option = { params: {page: page, uid: uid} };
  return ajax.get('/sites', option);
}

export const getPeriodUnits = () => {
  return ajax.get('/units');
}

export const getSkills = () => {
  return ajax.get('/skills');
}

export const getReactionsCount = (siteId) => {
  return ajax.get(`/sites/${siteId}/reactions`);
}

export const updateReactionCount = (siteId, reaction, token, uid) => {
  withAuthorizationHeader(token)
  return ajax.post(`/sites/${siteId}/reactions`, { reaction: reaction, uid: uid });
}

export const deleteReactionCount = (siteId, reaction, token, uid) => {
  withAuthorizationHeader(token)
  const option = { params: { reaction: reaction, uid: uid } };
  return ajax.delete(`/sites/${siteId}/reactions`, option);
}


export const getViewCount = (siteId) => {
  return ajax.get(`/sites/${siteId}/views`);
}

export const updateViewCount = (siteId) => {
  return ajax.post(`/sites/${siteId}/views`);
}

export const getSiteInfo = (siteId) => {
  return ajax.get(`/sites/${siteId}/info`);
}

export const judgeUser = (uid, token) => {
  withAuthorizationHeader(token)
  return ajax.post(`/users/${uid}/judge`, { uid: uid });
}

export const judgeSite = (siteId, uid, token) => {
  withAuthorizationHeader(token)
  return ajax.post(`/sites/${siteId}/judge`, { uid: uid });
}

export const getSiteScreenshot = (siteId) => {
  return ajax.get(`/sites/${siteId}/screenshot`);
}

export const updateSiteScreenshot = (siteId, data, token, uid) => {
  withAuthorizationHeader(token)
  return ajax.post(`/sites/${siteId}/screenshot`, { screenshot: data, uid: uid });
}

export const deleteSiteScreenshot = (siteId, token, uid) => {
  withAuthorizationHeader(token)
  const option = { params: {uid: uid} };
  return ajax.delete(`/sites/${siteId}/screenshot`, option);
}

export const updateSiteInfo = (siteId, data, token, uid) => {
  withAuthorizationHeader(token)
  return ajax.post(`/sites/${siteId}/info`, Object.assign(data, {uid: uid}));
}

export const createSiteInfo = (data, token, uid) => {
  withAuthorizationHeader(token)
  return ajax.post(`/sites/info`, Object.assign(data, {uid: uid}));
}

export const deleteSite = (siteId, token, uid) => {
  withAuthorizationHeader(token)
  const option = { params: {uid: uid} };
  return ajax.delete(`/sites/${siteId}`, option);
}

export const getNickname = (uid) => {
  return ajax.get(`/users/${uid}`);
}

export const updateNickname = (uid, token, nickname) => {
  withAuthorizationHeader(token)
  return ajax.post(`/users/${uid}`, {nickname: nickname});
}

export const createAccount = (token, uid) => {
  withAuthorizationHeader(token)
  return ajax.post('/accounts', {uid: uid});
}

export const deleteAccount = (token, uid) => {
  withAuthorizationHeader(token)
  const option = { params: {uid: uid} };
  return ajax.delete('/accounts', option);
}

export const checkSite = (siteId) => {
  return ajax.get(`/sites/${siteId}/check`);
}

export const checkUser = (uid) => {
  return ajax.get(`/users/${uid}/check`);
}

// ユーザがリアクションボタンを既に押しているか
export const checkReaction = (siteId, reactionName, token, uid) => {
  withAuthorizationHeader(token)
  const option = { params: { uid: uid } };
  return ajax.get(`/sites/${siteId}/reactions/${reactionName}/check`, option);
}
