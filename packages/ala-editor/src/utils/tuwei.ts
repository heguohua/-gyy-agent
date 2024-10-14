import req from './req';

const url = '/tuwei';

let msgObj = reactive({
  code: '',
  content: '',
});

export async function queryLoveMessage() {
  let resp = await req.get(url);
  Object.assign(msgObj, resp);
  let { content } = msgObj;
  return content;
}
