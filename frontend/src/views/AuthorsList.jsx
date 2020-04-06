import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAuthorsRequest, fetchAuthorsCancel } from '@data/actions/author'
import CustomList from '../components/Authors/List'
import Spinner from '../components/UI/Spinner'
import Page404 from '../components/UI/Page404'

export default function AuthorsList () {
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
        authors
          ? <CustomList
            array={authors}
            renderItem={(author) => (
              <CustomList.Tile key={author.id}>
                {author}
              </CustomList.Tile>
            )}
          >
            <CustomList.Header title='Autorzy' />
          </CustomList>
          : <div>No authors available</div>
      }
    </>
  )
}
