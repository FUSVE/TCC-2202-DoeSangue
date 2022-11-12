import { Router } from 'express'

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { CreateInstitutionController } from './controllers/institution/CreateInstitutionController';
import { DetailInstitutionController } from './controllers/institution/DetailInstitutionController';
import { ListUserController } from './controllers/user/ListUserController';
import { CreateDonationController } from './controllers/donation/CreateDonationController';
import { ListByUserDonationController } from './controllers/donation/ListByUserDonationController';
import { ListDonationController } from './controllers/donation/ListDonationController';
import { ListAchivementsController } from './controllers/achivements/ListAchivementsController';
import { ListAchivementsByUserController } from './controllers/achivements/ListAchivementsByUserController';
import { ListInstitutionController } from './controllers/institution/ListInstitutionController';
import { CreateNotificationController } from './controllers/notifications/CreateNotificationController';
import { ListNotificationController } from './controllers/notifications/ListNotificationController';

import { isAuthenticated } from './middlewares/isAuthenticated'

const router = Router();

// USERS

router.post('/users', new CreateUserController().handle)

router.post('/login', new AuthUserController().handle)

router.get('/user-detail', isAuthenticated, new DetailUserController().handle)

router.get('/users', isAuthenticated, new ListUserController().handle)

// INSTITUTIONS

router.post('/institutions', new CreateInstitutionController().handle)

router.get('/institution-detail', new DetailInstitutionController().handle)

router.get('/list-institutions', new ListInstitutionController().handle)

// DONATIONS

router.post('/donations', isAuthenticated, new CreateDonationController().handle)

router.get('/donation/user', isAuthenticated, new ListByUserDonationController().handle)

router.get('/donations', isAuthenticated, new ListDonationController().handle)

export { router };

// ACHIVEMENTS

router.get('/achivements', isAuthenticated, new ListAchivementsController().handle)

router.get('/user-achivements', isAuthenticated, new ListAchivementsByUserController().handle)

// NOTIFICATIONS

router.post('/notifications', isAuthenticated, new CreateNotificationController().handle)

router.get('/notifications', isAuthenticated, new ListNotificationController().handle)