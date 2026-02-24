import axios from 'axios';

// 프로덕션(배포) 시에는 상대 경로 /api 사용 → Vercel rewrite로 백엔드 프록시 (Mixed Content 방지)
// 로컬 개발 시에는 .env의 VITE_API_BASE_URL 또는 아래 기본값 사용
const baseURL = import.meta.env.PROD
  ? '/api'
  : (import.meta.env.VITE_API_BASE_URL || 'http://54.180.25.65:3003/api');

const client = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
