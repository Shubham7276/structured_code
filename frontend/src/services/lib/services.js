import request from './request';

/**
 * Get request handler
 */
function get(url, params = {}, options = {}) {
  return request({
    method: 'GET',
    url,
    params,
    headers: options.headers,
  });
}

/**
 * Post request handler
 */
function post(url, body, options = {}) {
  return request({
    method: 'POST',
    url,
    data: body,
    headers: options.headers,
  });
}

/**
 * Put request handler
 */
function put(url, body, options = {}) {
  return request({
    method: 'PUT',
    url,
    data: body,
    headers: options.headers,
  });
}

/**
 * Delete request handler
 */
function remove(url, body, options = {}) {
  return request({
    method: 'DELETE',
    url,
    data: body,
    headers: options.headers,
  });
}

/**
 * Patch request handler
 */
function patch(url, body, options = {}) {
  return request({
    method: 'PATCH',
    url,
    data: body,
    headers: options.headers,
  });
}

/**
 * Special Post request handler for some cases
 */
function wlpost(url, body, options = {}) {
  return request({
    method: 'POST',
    url,
    data: body,
    headers: options.headers,
  });
}

const Service = {
  get,
  post,
  put,
  remove,
  patch,
  wlpost,
};

export default Service;
