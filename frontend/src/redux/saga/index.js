import { all } from 'redux-saga/effects'
import { watchHome } from '@data/sagas/homeSaga'
import { watchAuthors } from '@data/sagas/author'

// Here should be added future sagas watchers
export default function * rootSaga () {
  console.log('weszlo do saga/index')
  yield all([
    watchHome(),
    watchAuthors()
  ])
}
