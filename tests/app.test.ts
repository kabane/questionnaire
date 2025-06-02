import { describe, it, expect } from 'vitest'
import { app } from '../src/app'

describe('app', () => {
  it('GET /openapi.json returns 200', async () => {
    const res = await app.request('/openapi.json')
    expect(res.status).toBe(200)
  })
})
