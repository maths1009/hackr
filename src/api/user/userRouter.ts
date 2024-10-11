import express, { type Router } from 'express'

import { GetUserSchema, UserSchema } from '@/api/user/userModel'
import { validateRequest } from '@/common/utils/httpHandlers'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { userController } from './userController'

export const userRegistry = new OpenAPIRegistry()
export const userRouter: Router = express.Router()

userRegistry.register('User', UserSchema)

userRouter.get('/', userController.getUsers)

userRouter.get('/:id', validateRequest(GetUserSchema), userController.getUser)
