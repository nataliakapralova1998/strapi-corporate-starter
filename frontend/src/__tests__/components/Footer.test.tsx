import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '@/app/[lang]/components/Footer'

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => {
    return <a href={href} {...props}>{children}</a>
  }
})

// Mock react-icons
jest.mock('react-icons/cg', () => ({
  CgWebsite: () => <div data-testid="website-icon" />
}))

jest.mock('react-icons/fa', () => ({
  FaDiscord: () => <div data-testid="discord-icon" />
}))

jest.mock('react-icons/ai', () => ({
  AiFillTwitterCircle: () => <div data-testid="twitter-icon" />,
  AiFillYoutube: () => <div data-testid="youtube-icon" />
}))

describe('Footer', () => {
  const mockMenuLinks = [
    { id: 1, url: '/about', text: 'About', newTab: false },
    { id: 2, url: '/contact', text: 'Contact', newTab: false }
  ]

  const mockCategoryLinks = [
    { id: '1', attributes: { name: 'Technology', slug: 'technology' } },
    { id: '2', attributes: { name: 'Business', slug: 'business' } }
  ]

  const mockLegalLinks = [
    { id: 1, url: '/privacy', text: 'Privacy Policy', newTab: false },
    { id: 2, url: '/terms', text: 'Terms of Service', newTab: false }
  ]

  const mockSocialLinks = [
    { id: 1, url: 'https://twitter.com', text: 'Twitter', newTab: true, social: 'TWITTER' },
    { id: 2, url: 'https://youtube.com', text: 'YouTube', newTab: true, social: 'YOUTUBE' }
  ]

  it('renders logo with correct props', () => {
    render(
      <Footer
        logoUrl="/logo.png"
        logoText="Company Name"
        menuLinks={mockMenuLinks}
        categoryLinks={mockCategoryLinks}
        legalLinks={mockLegalLinks}
        socialLinks={mockSocialLinks}
      />
    )

    const logo = screen.getByRole('img')
    expect(logo).toHaveAttribute('src', '/logo.png')
    expect(screen.getByText('Company Name')).toBeInTheDocument()
  })

  it('renders footer columns with correct content', () => {
    render(
      <Footer
        logoUrl="/logo.png"
        logoText="Company Name"
        menuLinks={mockMenuLinks}
        categoryLinks={mockCategoryLinks}
        legalLinks={mockLegalLinks}
        socialLinks={mockSocialLinks}
      />
    )

    // Check Categories column
    expect(screen.getByText('Categories')).toBeInTheDocument()
    expect(screen.getByText('Technology')).toBeInTheDocument()
    expect(screen.getByText('Business')).toBeInTheDocument()

    // Check Menu column
    expect(screen.getByText('Menu')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders legal links', () => {
    render(
      <Footer
        logoUrl="/logo.png"
        logoText="Company Name"
        menuLinks={mockMenuLinks}
        categoryLinks={mockCategoryLinks}
        legalLinks={mockLegalLinks}
        socialLinks={mockSocialLinks}
      />
    )

    const privacyLink = screen.getByText('Privacy Policy')
    const termsLink = screen.getByText('Terms of Service')

    expect(privacyLink).toHaveAttribute('href', '/privacy')
    expect(termsLink).toHaveAttribute('href', '/terms')
  })

  it('renders social links with correct icons', () => {
    render(
      <Footer
        logoUrl="/logo.png"
        logoText="Company Name"
        menuLinks={mockMenuLinks}
        categoryLinks={mockCategoryLinks}
        legalLinks={mockLegalLinks}
        socialLinks={mockSocialLinks}
      />
    )

    expect(screen.getByTestId('twitter-icon')).toBeInTheDocument()
    expect(screen.getByTestId('youtube-icon')).toBeInTheDocument()
  })

  it('renders copyright text with current year', () => {
    const currentYear = new Date().getFullYear()
    render(
      <Footer
        logoUrl="/logo.png"
        logoText="Company Name"
        menuLinks={mockMenuLinks}
        categoryLinks={mockCategoryLinks}
        legalLinks={mockLegalLinks}
        socialLinks={mockSocialLinks}
      />
    )

    expect(screen.getByText(`©${currentYear} All rights reserved`)).toBeInTheDocument()
  })

  it('handles missing logo text and url', () => {
    render(
      <Footer
        logoUrl={null}
        logoText={null}
        menuLinks={mockMenuLinks}
        categoryLinks={mockCategoryLinks}
        legalLinks={mockLegalLinks}
        socialLinks={mockSocialLinks}
      />
    )

    const logo = screen.queryByRole('img')
    expect(logo).not.toBeInTheDocument()
    expect(screen.queryByText('Company Name')).not.toBeInTheDocument()
  })
}) 