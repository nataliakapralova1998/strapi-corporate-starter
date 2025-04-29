import '@jest/globals'
import { render, fireEvent } from '@testing-library/react'
import Button, { renderButtonStyle } from '../../../app/[lang]/components/atoms/Button'

describe('Button Component', () => {
  describe('renderButtonStyle', () => {
    it('renders primary button style', () => {
      const style = renderButtonStyle('primary')
      expect(style).toContain('bg-primary/80')
      expect(style).toContain('hover:bg-primary')
      expect(style).toContain('text-white')
    })

    it('renders secondary button style', () => {
      const style = renderButtonStyle('secondary')
      expect(style).toContain('border-2')
      expect(style).toContain('border-primary')
      expect(style).toContain('text-primary')
    })

    it('renders bordered-light button style', () => {
      const style = renderButtonStyle('bordered-light')
      expect(style).toContain('border-2')
      expect(style).toContain('border-white')
      expect(style).toContain('text-white')
    })

    it('renders default style for unknown type', () => {
      const style = renderButtonStyle('unknown')
      expect(style).toContain('bg-primary/80')
      expect(style).toContain('hover:bg-primary')
      expect(style).toContain('text-white')
    })
  })

  describe('Button Component', () => {
    it('renders with correct text', () => {
      const { getByText } = render(
        <Button type="primary" text="Click me" />
      )
      expect(getByText('Click me')).toBeInTheDocument()
    })

    it('handles click events', () => {
      const handleClick = jest.fn()
      const { getByText } = render(
        <Button type="primary" text="Click me" onClick={handleClick} />
      )
      
      fireEvent.click(getByText('Click me'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('applies custom className', () => {
      const { container } = render(
        <Button type="primary" text="Click me" className="custom-class" />
      )
      expect(container.firstChild).toHaveClass('custom-class')
    })

    it('renders with default styles', () => {
      const { container } = render(
        <Button type="primary" text="Click me" />
      )
      const button = container.firstChild as HTMLElement
      expect(button).toHaveClass('px-8', 'py-3', 'text-lg', 'font-semibold', 'rounded', 'w-full')
    })
  })
}) 