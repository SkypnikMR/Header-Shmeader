import { takeEvery, call, select, put } from 'redux-saga/effects';
import { postRequest } from '/src/helpers/requests';
import { routes } from '/src/constants/routes';
import i18next from 'i18next';
import { NotificationManager } from 'react-notifications';
import { actionTypes } from './actionTypes';
import { logValues } from './selectors';
import { validation } from '../../helpers/validation';
import { setLoginValue, clearLoginInputs, reciveErrorRequest, reciveSuccessRequest } from './actions';

export function* workerLogin() {
    try {
        const data = yield select(logValues);
        const { loginValidation } = validation;
        const { message: validateMessage, isValid } = loginValidation(data);
        if (!isValid) {
            return NotificationManager
                .error(`${i18next.t(validateMessage.replace(/ /g, '_').toLowerCase())}`, `${i18next.t('input_error')}`, 2000);
        }
        const { token, message } = yield call(postRequest, routes.account.login, data);
        if (token) {
            yield (put(clearLoginInputs()));
            yield put(setLoginValue({ name: 'success', value: true }));
            yield put(reciveSuccessRequest());
        } else {
            yield put(setLoginValue({ name: 'success', value: false }));
            yield put(reciveErrorRequest());
            return NotificationManager
                .error(`${i18next.t(message.replace(/ /g, '_').toLowerCase())}`, `${i18next.t('login_error')}`, 2000);
        }
    } catch (e) {
        yield put(setLoginValue({ name: 'success', value: false }));
        yield put(reciveErrorRequest());
        return NotificationManager
            .error(`${i18next.t('server_error_text')}`, `${i18next.t('server_error')}`, 2000);
    }
}

export function* watcherLogin() {
    yield takeEvery(actionTypes.SEND_LOGIN_REQUEST, workerLogin);
}