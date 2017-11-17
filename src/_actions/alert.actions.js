import { alertConstants } from '../_constants';

export const alertActions = {
    success: function (message) {
        return { type: alertConstants.SUCCESS, message }
    },
    error: function (message) {
        return { type: alertConstants.ERROR, message }
    },
    clear: function () {
        return { type: alertConstants.CLEAR }
    }
}
