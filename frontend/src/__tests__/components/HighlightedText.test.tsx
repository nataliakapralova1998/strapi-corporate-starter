import '@jest/globals'
import { render } from '@testing-library/react'
import HighlightedText from '../../app/[lang]/components/HighlightedText'

describe('HighlightedText Component', () => {
  it('renders text with default tag', () => {
    const { container } = render(
      <HighlightedText text="Sample text" tag="p" />
    )
    const div = container.firstChild as HTMLElement
    expect(div.innerHTML).toBe('<p class="">Sample text </p>')
  })

  it('renders text with specified tag', () => {
    const { container } = render(
      <HighlightedText text="Sample text" tag="h1" />
    )
    const div = container.firstChild as HTMLElement
    expect(div.innerHTML).toBe('<h1 class="">Sample text </h1>')
  })

  it('applies custom className', () => {
    const { container } = render(
      <HighlightedText text="Sample text" tag="p" className="custom-class" />
    )
    const div = container.firstChild as HTMLElement
    expect(div.innerHTML).toBe('<p class="custom-class">Sample text </p>')
  })

  it('applies custom color to highlighted text', () => {
    const { container } = render(
      <HighlightedText text="This is [highlighted] text" tag="p" color="text-red-500" />
    )
    const div = container.firstChild as HTMLElement
    expect(div.innerHTML).toBe('<p class="">This is <span key="2" class="text-red-500">highlighted</span> text </p>')
  })

  it('handles text with highlight markers', () => {
    const { container } = render(
      <HighlightedText text="This is [highlighted] text" tag="p" />
    )
    const div = container.firstChild as HTMLElement
    expect(div.innerHTML).toBe('<p class="">This is <span key="2" class="">highlighted</span> text </p>')
  })

  it('handles text without highlight markers', () => {
    const { container } = render(
      <HighlightedText text="This is a normal text" tag="p" />
    )
    const div = container.firstChild as HTMLElement
    expect(div.innerHTML).toBe('<p class="">This is a normal text </p>')
  })
}) 