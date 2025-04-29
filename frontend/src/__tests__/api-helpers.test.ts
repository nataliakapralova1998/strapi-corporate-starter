import '@jest/globals'
import { getStrapiURL, getStrapiMedia, formatDate } from '../app/[lang]/utils/api-helpers'

describe('API Helpers', () => {
  describe('getStrapiURL', () => {
    it('should return the default URL when no path is provided', () => {
      const result = getStrapiURL()
      expect(result).toBe('http://localhost:1337')
    })

    it('should append the path to the base URL', () => {
      const path = '/api/articles'
      const result = getStrapiURL(path)
      expect(result).toBe('http://localhost:1337/api/articles')
    })
  })

  describe('getStrapiMedia', () => {
    it('should return null when url is null', () => {
      const result = getStrapiMedia(null)
      expect(result).toBeNull()
    })

    it('should return the URL as is when it starts with http', () => {
      const url = 'http://example.com/image.jpg'
      const result = getStrapiMedia(url)
      expect(result).toBe(url)
    })

    it('should prepend the Strapi URL when the URL is relative', () => {
      const url = '/uploads/image.jpg'
      const result = getStrapiMedia(url)
      expect(result).toBe('http://localhost:1337/uploads/image.jpg')
    })
  })

  describe('formatDate', () => {
    it('should format the date correctly', () => {
      const dateString = '2024-01-01'
      const result = formatDate(dateString)
      expect(result).toBe('January 1, 2024')
    })

    it('should handle invalid date strings', () => {
      const dateString = 'invalid-date'
      const result = formatDate(dateString)
      expect(result).toBe('Invalid Date')
    })
  })
}) 