import '@jest/globals'
import { render } from '@testing-library/react'
import LangRedirect from '../../app/[lang]/components/molecules/LangRedirect'

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}))

describe('LangRedirect', () => {
  it('renders the no content message', () => {
    const { getByText } = render(<LangRedirect />)
    expect(getByText('There is no content available in your language.')).toBeInTheDocument()
  })

  it('renders the back to English link', () => {
    const { getByText } = render(<LangRedirect />)
    const link = getByText('Back To English')
    expect(link).toBeInTheDocument()
    expect(link.getAttribute('href')).toBe('/en')
  })

  it('renders the city view image', () => {
    const { getByAltText } = render(<LangRedirect />)
    const image = getByAltText('city view')
    expect(image).toBeInTheDocument()
    expect(image.getAttribute('src')).toBe('https://images.pexels.com/photos/409701/pexels-photo-409701.jpeg')
  })
}) 