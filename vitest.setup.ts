// Taken from https://vitest.fr/frameworks/ - React

import '@testing-library/jest-dom'

import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})
