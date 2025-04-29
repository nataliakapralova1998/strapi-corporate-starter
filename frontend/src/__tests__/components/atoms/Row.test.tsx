import '@jest/globals'
import { render } from '@testing-library/react'
import Row from '../../../app/[lang]/components/atoms/Row'

describe('Row Component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Row>
        <div>Test Content</div>
      </Row>
    )
    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('applies default classes', () => {
    const { container } = render(<Row />)
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass(
      'grid',
      'auto-rows-auto',
      'grid-cols-4',
      'gap-x-4',
      'md:grid-cols-12'
    )
  })

  it('merges custom className with default classes', () => {
    const { container } = render(<Row className="custom-class" />)
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass(
      'grid',
      'auto-rows-auto',
      'grid-cols-4',
      'gap-x-4',
      'md:grid-cols-12',
      'custom-class'
    )
  })
}) 