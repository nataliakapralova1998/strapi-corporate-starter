import '@jest/globals'
import { render } from '@testing-library/react'
import Stack from '../../../app/[lang]/components/atoms/Stack'

describe('Stack Component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Stack>
        <div>Test Content</div>
      </Stack>
    )
    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('applies default classes', () => {
    const { container } = render(
      <Stack>
        <div>Test Content</div>
      </Stack>
    )
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass(
      'flex',
      'flex-col',
      'items-stretch',
      'justify-start',
      'gap-4'
    )
  })

  it('applies custom alignItems', () => {
    const { container } = render(
      <Stack alignItems="items-center">
        <div>Test Content</div>
      </Stack>
    )
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass('items-center')
    expect(div).not.toHaveClass('items-stretch')
  })

  it('applies custom justifyContent', () => {
    const { container } = render(
      <Stack justifyContent="justify-between">
        <div>Test Content</div>
      </Stack>
    )
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass('justify-between')
    expect(div).not.toHaveClass('justify-start')
  })

  it('applies custom gap', () => {
    const { container } = render(
      <Stack gap="gap-8">
        <div>Test Content</div>
      </Stack>
    )
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass('gap-8')
    expect(div).not.toHaveClass('gap-4')
  })

  it('combines all custom props correctly', () => {
    const { container } = render(
      <Stack
        alignItems="items-center"
        justifyContent="justify-between"
        gap="gap-8"
      >
        <div>Test Content</div>
      </Stack>
    )
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'justify-between',
      'gap-8'
    )
  })
}) 