import '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { usePathname } from 'next/navigation'

// Mock declarations must come before jest.mock calls
jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}))

jest.mock('next/link', () => {
  return ({ children, ...props }: any) => {
    return <a {...props}>{children}</a>
  }
})

jest.mock('@headlessui/react', () => {
  const DialogMock = ({ children, open, onClose }: any) => (
    <div data-testid="dialog" onClick={onClose}>
      {open && children}
    </div>
  )
  DialogMock.Panel = ({ children }: any) => <div data-testid="dialog-panel">{children}</div>
  
  return {
    Dialog: DialogMock,
    Bars3Icon: () => <div data-testid="bars-icon" />,
    XMarkIcon: () => <div data-testid="x-icon" />
  }
})

// Regular imports
import Navbar from '@/app/[lang]/components/Navbar'

// Mock data
const mockLinks = [
  { id: 1, url: '/about', text: 'About', newTab: false },
  { id: 2, url: '/blog', text: 'Blog', newTab: false },
  { id: 3, url: '/contact', text: 'Contact', newTab: false }
]

describe('Navbar', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/about')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders navigation links', () => {
    render(<Navbar links={mockLinks} logoUrl="/logo.png" logoText="Logo" />)
    
    mockLinks.forEach(link => {
      expect(screen.getByText(link.text)).toBeInTheDocument()
    })
  })

  it('highlights active link', () => {
    render(<Navbar links={mockLinks} logoUrl="/logo.png" logoText="Logo" />)
    
    const activeLink = screen.getByText('About')
    expect(activeLink).toHaveClass('relative z-10 text-primary')
  })

  it('renders with missing logo text and url', () => {
    render(<Navbar links={mockLinks} logoUrl={null} logoText={null} />)
    const nav = screen.getByTestId('navbar')
    expect(nav).toBeInTheDocument()
  })

  it('toggles mobile menu', () => {
    render(<Navbar links={mockLinks} logoUrl="/logo.png" logoText="Logo" />)
    
    const menuButton = screen.getByRole('button')
    expect(menuButton).toBeInTheDocument()
    
    fireEvent.click(menuButton)
    expect(screen.getByTestId('dialog')).toBeInTheDocument()
    expect(screen.getByTestId('dialog-panel')).toBeInTheDocument()
  })
}) 