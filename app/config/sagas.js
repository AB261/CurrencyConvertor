
import { SWAP_CURRENCY, CHANGE_BASE_CURRENCY, GET_INITIAL_CONVERSION,CONVERSION_RESULT,CONVERSION_ERROR} from "../actions/currencies";
import {takeEvery,select,call,put} from 'redux-saga/effects';

const getLatestRate = currency => fetch(`https://fixer.handlebarlabs.com/latest?base=${currency}`);

function* fetchLatestConversionRates(action) {
    

    try {
        let currency = action.currencies;
        console.log("TODO:FETCH CONV RATE",action);
        if(currency === undefined) {
            currency = yield select(state =>state.currencies.baseCurrency);
        }
        
        const response = yield call(getLatestRate,currency);
        const result = yield response.json();
        if(result.error) {
            yield put({type:CONVERSION_ERROR, error:result.error});
        } else {
            yield put({type:CONVERSION_RESULT, result});
        }
        
    } catch (error) {
        yield put({type:CONVERSION_ERROR, error:error.message});
        
    }
}

export default function* rootSaga() {

    yield takeEvery(GET_INITIAL_CONVERSION,fetchLatestConversionRates);
    yield takeEvery(CHANGE_BASE_CURRENCY,fetchLatestConversionRates);
    yield takeEvery(SWAP_CURRENCY,fetchLatestConversionRates);

    
}