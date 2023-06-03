import { QIITA_API_TOKEN } from 'constants';

const ENDPOINT = 'https://qiita.com/api/v2';
const PER_PAGE = 100;

export default {
  authenticatedUser: {
    items: {
      get: ({page}={}) => {
        const options = {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${QIITA_API_TOKEN}`,
          },
        };
        const params = {
          page: page || 1,
          per_page: PER_PAGE,
        };
        let url = getUrl(ENDPOINT, 'authenticated_user', 'items', `?${toQueryParams(params)}`);
        const res = UrlFetchApp.fetch(url, options);
        return serializer(res);
      },
    },
  },
};

const getUrl = (...args) => args.join('/');

const toQueryParams = (params) => Object.keys(params).map(key => `${key}=${params[key]}`).join("&");

const serializer = (res) => {
  const status = res.getResponseCode();
  const body = JSON.parse(res.getContentText('utf-8'));
  const hasNext = (() => {
    const headers = res.getAllHeaders();
    return headers.Link.includes('rel="next"');
  })();
  return { status, body, hasNext };
};
