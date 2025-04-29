import '@jest/globals'
import { fetchAPI } from '../app/[lang]/utils/fetch-api'

// Mock the global fetch
global.fetch = jest.fn()

describe('fetchAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should make a GET request with default options', async () => {
    const mockResponse = { data: 'test' }
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    })

    const result = await fetchAPI('/test')

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:1337/api/test',
      expect.objectContaining({
        next: { revalidate: 60 },
        headers: { 'Content-Type': 'application/json' },
      })
    )
    expect(result).toEqual(mockResponse)
  })

  it('should include query parameters in the URL', async () => {
    const mockResponse = { data: 'test' }
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    })

    const urlParamsObject = { populate: ['test'], locale: 'en' }
    await fetchAPI('/test', urlParamsObject)

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:1337/api/test?populate%5B0%5D=test&locale=en',
      expect.any(Object)
    )
  })

  it('should merge custom options with defaults', async () => {
    const mockResponse = { data: 'test' }
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    })

    const customOptions = {
      headers: { Authorization: 'Bearer token' },
    }
    await fetchAPI('/test', {}, customOptions)

    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: { Authorization: 'Bearer token' },
        next: { revalidate: 60 }
      })
    )
  })

  it('should throw an error when the request fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

    await expect(fetchAPI('/test')).rejects.toThrow(
      'Please check if your server is running and you set all the required tokens.'
    )
    
    consoleErrorSpy.mockRestore()
  })
}) 