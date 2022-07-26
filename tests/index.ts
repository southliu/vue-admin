
import { vi } from 'vitest'

if (typeof window !== 'undefined' && !window.matchMedia) {
  Object.defineProperty(global.window, 'matchMedia', {
    value: vi.fn((query: string) => ({
      matches: query.includes('max-width'),
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }))
  })
}