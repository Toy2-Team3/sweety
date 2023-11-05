# 🍋 소켓 기반 채팅앱

주어진 API와 소켓을 분석해 어떤 프로젝트를 진행/완성할 것인지 팀 단위로 자유롭게 결정하고 만들어보세요.  
과제 수행 및 리뷰 기간은 별도 공지를 참고하세요!

## 과제 수행 및 제출 방법

```
Y_FE_Toy2_{팀명}

E.g, Y_FE_Toy2_GYOHEON
```

1. 현재 저장소를 로컬에 클론(Clone)합니다.
1. 자신의 팀명으로 브랜치를 생성합니다.(구분 가능하도록 팀명을 꼭 파스칼케이스로 표시하세요, `git branch Y_FE_Toy2_Team13`)
1. 자신의 팀명 브랜치에서 과제를 수행합니다.
1. 과제 수행이 완료되면, 자신의 팀명 브랜치를 원격 저장소에 푸시(Push)합니다.(`main` 브랜치에 푸시하지 않도록 꼭 주의하세요, `git push origin Y_FE_Toy2_Team13`)
1. 저장소에서 `main` 브랜치를 대상으로 Pull Request 생성하면, 과제 제출이 완료됩니다!(E.g, `main` <== `Y_FE_Toy2_Team13`)
1. Pull Request 링크를 LMS로도 제출해 주셔야 합니다.
1. main 혹은 다른 사람의 브랜치로 절대 병합하지 않도록 주의하세요!
1. Pull Request에서 보이는 설명을 다른 사람들이 이해하기 쉽도록 꼼꼼하게 작성하세요!

- 과제 수행 및 제출 과정에서 문제가 발생한 경우, 바로 담당 멘토나 강사에게 얘기하세요!

## 필수 구현 사항
- [ ] `useState`, `useReducer`를 활용한 상태 관리 구형
- [ ] `Sass`, `styled-component`를 활용한 스타일 구현
- [ ] `react` 상태를 통한 할일 CRUD 구현
- [ ] 상태에 따라 달라지는 스타일 구현
- [ ] `custom hook`을 통한 비동기 처리 구현
- [ ] 유저인증 시스템(로그인, 회원가입) 구현
- [ ] `jwt`등의 유저 인증 시스템 (로그인, 회원가입 기능)
- [ ] 소켓을 이용한 채팅 구현

## 선택 구현 사항
- [ ] `Next.js`를 활용한 서버 사이드 렌더링 구현
- [ ] `typescript`를 활용한 앱 구현
- [ ] `storybook`을 활용한 디자인 시스템 구현
- [ ] `jest`를 활용한 단위 테스트 구현

## 예시 프로젝트

![private-messaging-part-1-chat-ab610e9e03738ad37f7b0fb55c771087](https://github.com/KDT1-FE/Y_FE_Toy2/assets/66263916/c5247dde-2ca6-4285-a60e-8dcf23326d0e)

## API 사용법

- 모든 network 요청(Request) `headers`에 아래 정보가 꼭 포함돼야 합니다!  
- serverId는 팀마다 개별 전달됩니다.
- 확인할 수 없는 사용자나 팀의 DB 정보는 임의로 삭제될 수 있습니다!

```json
{
  "content-type": "application/json",
  "serverId": "nREmPe9B",
}
```

## 기본 데이터 구조
### user
```ts
interface User {
  id: string;
  password: string;
  name: string;
  picture: string;
  chats: string[]; // chat id만 속합니다.
}
```
### chat
```ts
interface Chat {
  id: string;
  name: string;
  isPrivate: boolean;
  users: string[];
  messages: Message[]; // message 객체가 속합니다.
  
  updatedAt: Date;
}
```
### message
```ts
interface Message {
  id: string;
  text: string;
  userId: string;

  createdAt: Date;
}
```
## 회원

### 회원가입

사용자가 `id`에 종속되어 회원가입합니다.

- 사용자 비밀번호는 암호화해 저장합니다.
- 프로필 이미지는 url 형식이어야 합니다.

```curl
curl https://fastcampus-chat.net/signup
  \ -X 'POST'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  id: string // 사용자 아이디 (필수!, 영어만)
  password: string // 사용자 비밀번호, 5자 이상 (필수!)
  name: string // 사용자 이름, 20자 이하 (필수!)
  picture?: string // 사용자 이미지(url)
}
```

```json
{
  "id": "abcd",
  "password": "********",
  "name": "GyoHeon",
  "picture": "https://avatars.githubusercontent.com/u/66263916?v=4"
}
```

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
  message: title
}
```

```json
{
  "message": "User created"
}
```

### 로그인

- 발급된 `accessToken`은 7일 후 만료됩니다.

```curl
curl https://fastcampus-chat.net/login
  \ -X 'POST'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  id: string // 사용자 아이디 (필수!)
  password: string // 사용자 비밀번호 (필수!)
}
```

```json
{
  "id": "abcd",
  "password": "********"
}
```

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
  accessToken: string // 사용자 접근 토큰
  refreshToken: string // access token 발급용 토큰
}
```

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlQS3I...(생략)",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlQS3I...(생략)"
}
```

### 토큰 재발급

```curl
curl https://fastcampus-chat.net/refresh
  \ -X 'POST'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  refreshToken: string // access token 발급용 토큰
}
```

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlQS3I...(생략)"
}
```

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
  accessToken: string // 사용자 접근 토큰
}
```

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlQS3I...(생략)",
}
```

### 사용자 정보 수정

```curl
curl https://fastcampus-chat.net/user
  \ -X 'PATCH'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  name?: string // 새로운 표시 이름
  picture?: string // 사용자 프로필 이미지(url)
}
```

```json
{
  "name": "abcde",
  "picture": "https://avatars.githubusercontent.com/u/42333366?v=4"
}
```

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
  messgae: string
}
```

```json
{
  "message": "User updated"
}
```

## 채팅
### 모든 유저 조회
- 현재 존재하는 모든 유저를 조회합니다.
```curl
curl https://fastcampus-chat.net/users
  \ -X 'GET'
  \ -H 'Authorization: Bearer <accessToken>'
```
요청 데이터 타입 및 예시:
- 없음

응답 데이터 타입 및 예시:
```ts
type ResponseValue = User[]

interface Chat {
  id: string;
  name: string;
  picture: string;
}
```

```json
[
 {
	"id": "user1",
	"name": "lgh",
	"picture": "https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro"
  },
  {
	"id": "user2",
	"name": "ldj",
	"picture": "https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro"
  }
]
```


### 채팅 생성하기

```curl
curl https://fastcampus-chat.net/chat
  \ -X 'POST'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:
```ts
interface RequestBody{
  name: string, // chat 이름
  users: string[], //참가자들 id(자신 미포함)
  isPrivate?: boolean // 공개 비공개
}
```

```json
{
	"name": "test chat",
	"users": ["user2"],
}
```

응답 데이터 타입 및 예시:
```ts
interface ResponseValue {
	id: string,
	name: string,
	users: string[], // 자신을 포함한 참가자들 id
	isPrivate: boolean,
	updatedAt: Date
}
```

```json
{
	"id": "fasgadsfdsghssdlsdafasd",
	"name": "test chat",
	"users": ["user2", "user1"],
	"isPrivate": false,
	"updatedAt": "2023-11-01T08:23:39.850Z"
}
```

### 모든 채팅 조회
- 현재 존재하는 모든 채팅을 조회합니다.
- isPrivate: true인 채팅방은 보이지 않습니다.

```curl
curl https://fastcampus-chat.net/chat/all
  \ -X 'GET'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:
- 없음

응답 데이터 타입 및 예시:
```ts
type ResponseValue = Chat[]

interface Chat {
  id: string;
  name: string;
  users: string[]; // 속한 유저 id
  isPrivate: boolean;
  
  updatedAt: Date;
}
```

```json
[
  {
	"id": "f189ab25-5644-4d72-bd7c-0170ee9c8ede",
	"name": "chat room 1",
	"users": [
	  "user12",
	  "user11",
	  "user6"
	],
	"isPrivate": false,
	"updatedAt": "2023-10-31T13:18:38.216Z"
  },
  {
	"id": "f189ab25-5644-4d72-bd7c-0170ee9c8edj",
	"name": "chat room 2",
	"users": [
	  "user7",
	  "user1"
	],
	"isPrivate": false,
	"updatedAt": "2023-10-31T15:18:38.216Z"
  }
]
```

### 나의 채팅 조회
```curl
curl https://fastcampus-chat.net/chat
  \ -X 'GET'
  \ -H 'Authorization: Bearer <accessToken>'
```
- 내가 속한 모든 채팅을 조회합니다.
- isPrivate: true인 채팅방도 모두 보이게 됩니다.

```ts
type ResponseValue = Chat[]

interface Chat {
  id: string;
  name: string;
  users: string[]; // 속한 유저 id
  isPrivate: boolean;
  
  updatedAt: Date;
}
```

```json
[
  {
	"id": "f189ab25-5644-4d72-bd7c-0170ee9c8ede",
	"name": "chat room 1",
	"users": [
	  "user12",
	  "user11",
	  "user6"
	],
	"isPrivate": true,
	"updatedAt": "2023-10-31T13:18:38.216Z"
  },
  {
	"id": "f189ab25-5644-4d72-bd7c-0170ee9c8edj",
	"name": "chat room 2",
	"users": [
	  "user7",
	  "user1"
	],
	"isPrivate": false,
	"updatedAt": "2023-10-31T15:18:38.216Z"
  }
]
```

## 채팅 참여하기

```curl
curl https://fastcampus-chat.net/chat/participate
  \ -X 'PATCH'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:
```ts
interface RequestBody {
  chatId: string;
}
```

```json
{
  "chatId": "f189ab25-5644-4d72-bd7c-0170ee9c8ede"
}
```

응답 데이터 타입 및 예시:
```ts
interface ResponseValue{
  id: string;
  name: string;
  users: string[]; // 속한 유저 id
  isPrivate: boolean;
  
  updatedAt: Date;
}
```

```json
{
	"id": "f189ab25-5644-4d72-bd7c-0170ee9c8ede",
	"name": "chat room 1",
	"users": [
	  "user12",
	  "user11",
	  "user6"
	],
	"isPrivate": true,
	"updatedAt": "2023-10-31T13:18:38.216Z"
}
```

## 채팅 나가기

```curl
curl https://fastcampus-chat.net/chat/leave
  \ -X 'PATCH'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:
```ts
interface RequestBody {
  chatId: string;
}
```

```json
{
  "chatId": "f189ab25-5644-4d72-bd7c-0170ee9c8ede"
}
```

응답 데이터 타입 및 예시:
```ts
interface ResponseValue{
	message: string;
}
```

```json
{
	"message": "Leave success"
}
```

## 채팅 초대하기

```curl
curl https://fastcampus-chat.net/chat/invite
  \ -X 'PATCH'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:
```ts
interface RequestBody {
  chatId: string;
  users: string[]; // 초대할 유저 id
}
```

```json
{
  "chatId": "f189ab25-5644-4d72-bd7c-0170ee9c8ede",
  "users": ["user1", "user2"]
}
```

응답 데이터 타입 및 예시:
```ts
interface ResponseValue{
  id: string;
  name: string;
  users: string[]; // 속한 유저 id
  isPrivate: boolean;
  
  updatedAt: Date;
}
```

```json
{
	"id": "f189ab25-5644-4d72-bd7c-0170ee9c8ede",
	"name": "chat room 1",
	"users": [
	  "user12",
	  "user11",
	  "user6",
	  "user1",
	  "user2"
	],
	"isPrivate": true,
	"updatedAt": "2023-10-31T13:18:38.216Z"
}
```

# Socket
- socket.io 의 사용을 추천드립니다.
- Socket 연결시에도 headers는 유지해야 합니다.
## 기본 연결
```ts
socket.on(`http://localhost:4000/chat?chatId=${chatId}`)
```

## emit Event(client -> server)
### example
```ts
socket.emit('message-to-server', text)
```
### message-to-server
- 같은 방에 있는 사람들에게 메세지를 전달합니다.

요청 데이터
```ts
type RequestData: string;
```
### fetch-messages
- 이전 대화 목록을 불러옵니다.
- `messages-to-client`로 데이터를 받을 수 있습니다.

요청 데이터
- 없음
### users
- 접속 상태인 유저 목록을 불러옵니다.
- `usert-to-client`로 데이터를 받을 수 있습니다.

요청 데이터
- 없음 

## on Event(server -> client)
### example
```ts
socket.on('message-to-client', (messageObject) => {
	console.log(messageObject);
})
```
### message-to-client
- 같은 방에 있는 사람들에게 메세지를 전달합니다.

응답 데이터
```ts
interface ResponseData {
	id: string;
	text: string;
	userId: string; // 메세지를 보낸 사람의 id
	createdAt: Date;
}
```
### messages-to-client
- 이전 대화 목록을 불러옵니다.

응답 데이터
```ts
interface Message {
	id: string;
	text: string;
	userId: string; // 메세지를 보낸 사람의 id
	createdAt: Date;
}

interface ResponseData {
  messages: Message[];
}
```
### join
- 같은 방에 새로운 사람이 들어오면 모든 유저의 정보를 다시 받습니다.

응답 데이터
```ts
interface ResponseData {
	users: string[]; // 참여자들 id
	joiners: string[]; // 새로운 참여자 id
}
```
### leave
- 같은 방에 사람이 나가면 모든 유저의 정보를 다시 받습니다.

응답 데이터
```ts
interface ResponseData {
	users: string[]; // 참여자들 id
	leaver: string; // 나간 사용자 id
}
```
### new-chat
- 새로운 대화방이 생긴 경우 (not private) 서버(팀에서 사용하는 serverId)의 참여자들에게 이를 전달합니다.

응답 데이터
```ts
interface ResponseData {
	id: string;
	name: string;
	users: string[]; // 참여자들 id
	isPrivate: boolean;
	updatedAt: Date;
}
```

### users-to-client
- 접속 상태인 유저 목록을 불러옵니다.

응답 데이터
```ts
interface ResponseData {
	user: string[]; // 참가자들 id
}
```
