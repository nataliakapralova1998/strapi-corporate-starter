import { NextResponse } from 'next/server'
import { middleware, getLocale } from '../middleware'
import { i18n } from '../i18n-config'

// Mock @formatjs/intl-localematcher
jest.mock('@formatjs/intl-localematcher', () => ({
  match: jest.fn()
}))

// Mock negotiator
jest.mock('negotiator', () => {
  return jest.fn().mockImplementation(() => ({
    languages: jest.fn().mockReturnValue(['en'])
  }))
})

// Mock next/server
jest.mock('next/server', () => ({
  NextResponse: {
    redirect: jest.fn((url) => {
      const location = url.toString()
        .replace(/([^:])\/\/+/g, '$1/') // Replace multiple slashes but keep protocol slashes
        .replace(/\/$/, '') // Remove trailing slash
      return {
        status: 307,
        headers: new Map([['location', location]])
      }
    })
  }
}))

describe('middleware', () => {
  const normalizePath = (path: string) => path.replace(/\/+/g, '/').replace(/\/$/, '')

  const mockRequest = (pathname: string, acceptLanguage?: string) => {
    const normalizedPath = normalizePath(pathname)
    const headers = new Map()
    if (acceptLanguage) {
      headers.set('accept-language', acceptLanguage)
    }
    return {
      nextUrl: {
        pathname: normalizedPath
      },
      url: `http://localhost${normalizedPath || '/'}`,
      headers
    }
  }

  describe('getLocale', () => {
    it('returns default locale when no accept-language header', () => {
      const request = mockRequest('/')
      const mockMatch = require('@formatjs/intl-localematcher').match
      mockMatch.mockReturnValue(i18n.defaultLocale)
      
      const locale = getLocale(request as any)
      expect(locale).toBe(i18n.defaultLocale)
    })

    it('returns matched locale from accept-language header', () => {
      const request = mockRequest('/', 'en-US,en;q=0.9')
      const mockMatch = require('@formatjs/intl-localematcher').match
      mockMatch.mockReturnValue('en')
      
      const locale = getLocale(request as any)
      expect(locale).toBe('en')
      expect(mockMatch).toHaveBeenCalled()
    })

    it('returns default locale when accept-language header is invalid', () => {
      const request = mockRequest('/', 'invalid')
      const mockMatch = require('@formatjs/intl-localematcher').match
      mockMatch.mockImplementation(() => {
        throw new Error('Invalid language')
      })
      
      const locale = getLocale(request as any)
      expect(locale).toBe(i18n.defaultLocale)
    })
  })

  describe('middleware', () => {
    it('ignores special paths', () => {
      const paths = ['/manifest.json', '/favicon.ico']
      
      paths.forEach(path => {
        const request = mockRequest(path)
        const response = middleware(request as any)
        expect(response).toBeUndefined()
      })
    })

    it('redirects to locale when pathname is missing locale', () => {
      const request = mockRequest('/about', 'en-US,en;q=0.9')
      const mockMatch = require('@formatjs/intl-localematcher').match
      mockMatch.mockReturnValue('en')
      
      const response = middleware(request as any)
      expect(response).toBeDefined()
      expect(response?.status).toBe(307)
      expect(response?.headers.get('location')).toBe('http://localhost/en/about')
    })

    it('does not redirect when pathname has locale', () => {
      const request = mockRequest('/en/about')
      const response = middleware(request as any)
      expect(response).toBeUndefined()
    })

    it('handles root path correctly', () => {
      const request = mockRequest('/', 'en-US,en;q=0.9')
      const mockMatch = require('@formatjs/intl-localematcher').match
      mockMatch.mockReturnValue('en')
      
      const response = middleware(request as any)
      expect(response).toBeDefined()
      expect(response?.status).toBe(307)
      expect(response?.headers.get('location')).toBe('http://localhost/en')
    })
  })
}) 