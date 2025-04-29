import '@jest/globals'
import { render } from '@testing-library/react'
import Container from '../../../app/[lang]/components/atoms/Container'

describe('Container Component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Container>
        <div>Test Content</div>
      </Container>
    )
    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('applies default classes', () => {
    const { container } = render(<Container />)
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass('container', 'p-4', 'md:p-0', 'mx-auto')
  })

  it('merges custom className with default classes', () => {
    const { container } = render(<Container className="custom-class" />)
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass('container', 'p-4', 'md:p-0', 'mx-auto', 'custom-class')
  })
}) 