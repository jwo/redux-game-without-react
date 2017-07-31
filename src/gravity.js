import { delay } from 'redux-saga'
import { fork, call, put } from 'redux-saga/effects'


export function* gravity(){
  while(true){
    yield delay(500)
    yield put({ type: 'GRAVITY' })
  }
}
