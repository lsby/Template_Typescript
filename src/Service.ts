import cookieParser from 'cookie-parser'
import express from 'express'
import session from 'express-session'
import path from 'path'
import sessionFileStore from 'session-file-store'
// import { knex_defConf } from './Middleware/Knex'
import { runEffect } from '@lsby/ts_pattern'
import cors from 'cors'

declare module 'express-session' {
  interface SessionData {
    // 在这里扩展 session 对象
  }
}
