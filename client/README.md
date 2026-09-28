# Mini MES Frontend
React 19.3 + Vite 8 + Tailwind CSS 4 + React Router 8.

Run:
```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and set:
`VITE_API_URL=http://localhost:5000/api`

The UI currently uses mock data. The Axios client in `src/lib/api.ts` is ready for the NestJS API. Replace the mock arrays with API calls feature-by-feature.

Suggested backend endpoints:
`/auth/login`, `/products`, `/materials`, `/work-centers`, `/machines`, `/bom`, `/routing`, `/production-orders`, `/work-orders`, `/production`, `/quality`, `/downtime`, `/traceability`, `/oee`, `/reports`, `/users`.
