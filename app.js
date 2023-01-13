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
  {
    id: 3,
    name: "new user 1",
    email: "test3@gmail.com",
    password: "password3",
  },
  {
    id: 4,
    name: "new user 1",
    email: "test4@gmail.com",
    password: "password4",
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
  {
    id: 3,
    content: "sample content 3",
    userId: 3,
    postingImageUrl: "내용 1",
  },
  {
    id: 4,
    content: "sample content 4",
    userId: 4,
    postingImageUrl: "내용 2",
  },

];

let data = []

// 아래에 코드를 작성해 주세요.
const http = require('http');
const server = http.createServer()

const httpRequestListener = function (request, response) {
  const { method, url } = request

  // 게시글 목록 조회
  if (method === 'GET') {
    if (url === '/posts') {
      const postsArr = []
      const postObj = {}

      let body = ""

      request.on('data', (data) => {
        body += data
      })

      request.on('end', () => {

        for (let i = 0; i < users.length; i++) {
          for (let j = 0; j < posts.length; j++) {
            if (posts[j].userId === users[i].id) {
              const postObj = {}
              postObj.userId = users[i].id
              postObj.userName = users[i].name
              postObj.postingId = posts[j].id
              postObj.postingTitle = posts[j].title
              postObj.postingImageUrl = posts[j].postingImageUrl
              postObj.postingContent = posts[j].content

              postsArr.push(postObj)

              // console.log(postObj)

              // postsArr.push({
              //   userId: users[i].id,
              //   userName: users[i].name,
              //   postingId: posts[j].id,
              //   postingTitle: posts[j].title,
              //   postingContent: posts[j].content
              // })
            }
          }
        }

        // console.log(`postObj: ${JSON.stringify(postsArr)}`)
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ 'message': postsArr }))

      })
    }
  }

  if (method === 'POST') {
    // 회원가입
    if (url === '/users/signup') {
      let body = ""

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

        response.writeHead(200, { 'Content-Type': 'application/json' })
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
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ 'message': 'postCreated' }))
      })
    }
  }
}

server.on('request', httpRequestListener)

const PORT = 8000
const IP = "127.0.0.1"

server.listen(PORT, IP, function () {
  console.log(`Listening to Request on ${IP} & ${PORT}`)
})
