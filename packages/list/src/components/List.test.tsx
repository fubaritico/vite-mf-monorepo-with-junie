import { cleanup, screen, waitFor, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import moviesData from '../mocks/data/popular'
import { renderReactQueryWithRouter } from '../mocks/react-router'
import * as mod from '../services/api'

import List from './List'

// Spying to assert calls to the API
const fetchPopularMovies = vi.spyOn(mod, 'fetchPopularMovies')
const getImageUrl = vi.spyOn(mod, 'getImageUrl')

// fetchPopularMovies locale mock
vi.mock('../services/api', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../services/api')>()),
  fetchPopularMovies: vi.fn(async () => Promise.resolve(moviesData)),
}))

/**
 * Helper function to flush promises, so that any pending promises are resolved
 * and the component is properly rendered before the next assertion.
 */
function flushPromises() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}

describe('List', () => {
  beforeEach(() => {
    fetchPopularMovies.mockClear()
    getImageUrl.mockClear()
  })

  // cleanup after each test, vitest doesn't perform any automatic DOM cleanup
  afterEach(() => {
    cleanup()
  })

  /**
   * Because the init is async, some extra assertion is to be performed to ensure
   * there are no memory leaks between tests regarding spy clearing.
   */
  it('should render the list of movies', async () => {
    const { container } = renderReactQueryWithRouter(List)
    // testing API call on init
    expect(fetchPopularMovies).toHaveBeenCalledTimes(1)
    // testing any rendered element to be sure that the component is mounted and rendered
    const element = await waitFor(() => screen.getByText('Havoc'))

    expect(element).toBeTruthy()
    expect(container).toMatchSnapshot()

    await flushPromises()
  })

  it('should call "fetchPopularMovies" one time on init', async () => {
    renderReactQueryWithRouter(List)

    expect(fetchPopularMovies).toHaveBeenCalledTimes(1)

    await flushPromises()
  })

  // Testing the same to verify that each test is properly isolated
  it('should call "fetchPopularMovies" one time on init a second time', async () => {
    renderReactQueryWithRouter(List)

    expect(fetchPopularMovies).toHaveBeenCalledTimes(1)

    await flushPromises()
  })

  it('should display the right amount of cards in the movie grid', async () => {
    renderReactQueryWithRouter(List)

    expect(fetchPopularMovies).toHaveBeenCalledTimes(1)

    await waitFor(() => {
      expect(screen.getAllByTestId('movie-grid-card').length).toEqual(
        moviesData.results.length
      )
    })

    await flushPromises()
  })

  it.each([
    ...moviesData.results.map(({ title, poster_path }, i) => [
      title,
      'https://image.tmdb.org/t/p/w500' + poster_path,
      i,
    ]),
  ])(
    'should display a card with a title "%s" and a poster with src equals to "%s"',
    async (title, poster_path, index) => {
      renderReactQueryWithRouter(List)

      expect(fetchPopularMovies).toHaveBeenCalledTimes(1)

      await waitFor(() => {
        expect(
          screen.getAllByTestId('movie-grid-card')[index as number]
        ).toBeTruthy()
      })

      expect(getImageUrl).toHaveBeenCalledTimes(moviesData.results.length)
      expect(getImageUrl).toHaveBeenCalledWith(
        moviesData.results[index as number].poster_path
      )

      const card = screen.getAllByTestId('movie-grid-card')[index as number]

      expect(within(card).getByText(title)).toBeTruthy()
      expect(within(card).getByRole('img').getAttribute('src')).toBe(
        poster_path
      )

      await flushPromises()
    }
  )
})
