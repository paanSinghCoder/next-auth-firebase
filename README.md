# Next-Auth-Firebase
OAuth (Google) and credentials (email and password) authentication implemented with Next-Auth 4, Firebase, Firestore and NextJS 13.

## Demo
[https://next-auth-firebase-ts.vercel.app](https://next-auth-firebase-ts.vercel.app)

## Features
- Next-Auth 4 with Firebase and Typescript
- Google and Credentials login and signup
- Token refresh rotation mechanism with Auth timeout
- Typescript
- NextJS 13
- Tailwind CSS
- Deployed on Vercel

## Notable Files and folders
- `[...nextauth.ts]/route.ts`
- `app/helpers`
- `login/page.tsx`
- `dashboard.tsx`

## Running on local

- Make sure Node is installed

- Rename `.env.local.example` to `.env.local` and add all the env variables.
- Generate and add `service-account.json` file in the root of the project. [https://www.youtube.com/watch?v=gb0bytUGDnQ&ab_channel=JieJenn](Youtube)

- Run the development server:

```bash
npm i && npm run dev
# or
yarn && yarn dev
# or
pnpm i && pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.



## Deployed on Vercel

[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) 


