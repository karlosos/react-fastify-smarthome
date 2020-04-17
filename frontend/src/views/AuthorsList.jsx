import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAuthorsRequest, fetchAuthorsCancel } from '@data/actions/author'
import CustomList from '../components/Authors/List'
import Spinner from '../components/UI/Spinner'
import Page404 from '../components/UI/Page404'
import { useTranslation } from 'react-i18next'

export default function AuthorsList () {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAuthorsRequest())
    return () => {
      dispatch(fetchAuthorsCancel())
    }
  }, [dispatch])

  const { fetchError, fetching, authors } = useSelector((state) => state.author)

  if (fetching) {
    return <><Spinner /></>
  }

  if (fetchError) {
    return <><Page404 /></>
  }
  return (
    <>
      {
        authors ? <CustomList authors={authors} />
          : <div>{t('authors:no-authors-available')}</div>
      }
    </>
  )
}
