const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
];

const posts = [
  {
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    content: "Request/Response와 Stateless!!",
    userId: 1,
  },
];

// 아래에 코드를 작성해 주세요.

const http = require('http');
const { title } = require('process');

const server = http.createServer()

const httpRequestListener = function (request, response) {
  const { method, url } = request

  let body = ''

  if (method === 'POST') {

    // 회원가입
    if (url === '/users/signup') {

      request.on('data', (data) => {
        body += data
      })

      request.on('end', () => {
        const user = JSON.parse(body)

        users.push({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password
        })

        response.writeHeader(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ 'message': 'userCreated' }))

      })

      // 포스트
    } else if (url === '/posts/post') {

      request.on('data', (data) => {
        body += data
      })

      request.on('end', () => {
        const post = JSON.parse(body)

        posts.push({
          id: post.id,
          title: post.title,
          content: post.content,
          userId: post.userId
        })
      })

      response.writeHeader(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify({ 'posts': posts }))

    }
  }
}

server.on('request', httpRequestListener)

const PORT = 8000
const IP = "127.0.0.1"

server.listen(PORT, IP, function () {
  console.log(`Listening to Request on ${IP} & ${PORT}`)
})