This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

## Integrate with Clerk Authentication
- Go to https://clerk.com and create an account
- Give the project a name and select the React framework
- Copy the exact public and secret key into .env.local

## Integreate with FireBase
- Go to https://console.firebase.google.com
- Create a new project
- Add an app to your project by clicking con code icon
- run `npm install firebase` to install client side sdk
- Add firebase SDK to firebase.ts
- Go to Build > Firebase Database > Create DB in test mode
- Go to Build > Storage > Create DB in test mode
- Click on settings icons > Project Settings > Service Accounts > Generate new private key
- Save downloaded key to repository renaming to serviceAcccount - make sure to gitignore it
- run `npm install firebase-admin` to install the serve side sdk
- Copy the node.js config snippet to firebaseAdmin.ts

## Integrate Pinecone
- Go to pinecone.io and create an account
- install pinecone with `npm install @pinecone-database/pinecone`
- Create new index by going to Dashboard > Database > Create index
- Give it a name and choose 1,536 dimensions and "cosine" method (best for AI)
- Go down to serverless section and choose "AWS", choose region and Create Index

## Integrate Langchain
- go js.langchain.com/docs/how_to/installation
- install langchain with 
    - `npm install langchain @langchain/core`, 
    - `npm install @langchain/community @langchain/core`, 
    - `npm install @langchain/openai @langchain/core`, 
    - `npm install @langchain/pinecone @langchain/core`
- 


Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
