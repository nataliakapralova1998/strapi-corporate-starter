import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Logo from '@/app/[lang]/components/atoms/Logo'

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height }: any) => (
    <img src={src} alt={alt} width={width} height={height} />
  ),
}))

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => {
    return <a href={href} {...props}>{children}</a>
  }
})

describe('Logo', () => {
  it('renders a link with correct props', () => {
    render(<Logo src="/logo.png" />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/')
    expect(link).toHaveAttribute('aria-label', 'Back to homepage')
    expect(link).toHaveClass('flex items-center')
  })

  it('renders an image when src is provided', () => {
    render(<Logo src="/logo.png" />)
    
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', '/logo.png')
    expect(image).toHaveAttribute('alt', 'logo')
    expect(image).toHaveAttribute('width', '45')
    expect(image).toHaveAttribute('height', '45')
  })

  it('does not render an image when src is null', () => {
    render(<Logo src={null} />)
    
    const image = screen.queryByRole('img')
    expect(image).not.toBeInTheDocument()
  })

  it('renders children with correct styling', () => {
    render(
      <Logo src="/logo.png">
        <span>Company Name</span>
      </Logo>
    )
    
    const childrenContainer = screen.getByText('Company Name').parentElement
    expect(childrenContainer).toHaveClass('ml-2')
  })

  it('renders without children', () => {
    render(<Logo src="/logo.png" />)
    
    const childrenContainer = screen.queryByTestId('logo-children')
    expect(childrenContainer).not.toBeInTheDocument()
  })
}) 