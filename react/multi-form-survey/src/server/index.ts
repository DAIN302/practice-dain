import express from "express";
import {createServer as createViteServer} from 'vite';
import surveyRouter from "./api/surveys";

async function startServer() {
    const app = express();
    const port = 5173;

    // 미들웨어 등록
    app.use(express.json());

    // 라우터 등록
    app.use('/api/surveys', surveyRouter);

    // 서버 생성
    const vite = await createViteServer({
        server : {middlewareMode: true},
        appType : 'spa'
    })

    // 서버 미들웨어 형태로 등록
    app.use(vite.middlewares);

    return app.listen(port);
}

const server = await startServer();

// vite dev 서버와 충돌 방지를 위한 설정
if(import.meta.hot){
    import.meta.hot.on('vite:beforeFullReload', () => {
        server.close();
    })

    import.meta.hot.dispose(() => {
        server.close();
    })
}