import express, { Application, Request, Response } from 'express';
import path from 'path';
import { readFile } from 'fs';
import cors from 'cors';

import login from './api/login/router';

const app: Application = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors({
    origin: ['http://localhost:3000', 'http://192.168.0.100:3000']
}))

app.use('/api/login', login)

app.use((req: Request, res: Response) => {
    readFile(path.join(__dirname, './index.html'), (err, data) => {
        if (err) {
            res.status(500).send('error'); console.log(err);
        }
        res.setHeader('Content-Type', 'text/html')
        res.send(data)
    })
})



export default app
