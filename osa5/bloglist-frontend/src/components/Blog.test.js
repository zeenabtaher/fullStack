import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const updateBlog = jest.fn()
  const deleteBlog = jest.fn()

  const blog = {
    id: '12345',
    title: 'Title',
    url: 'linkki',
    likes: 0,
    author: 'Author',
  }

  beforeEach(() => {
    component = render(
      <Blog
        key={blog.id}
        blog={blog}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
      />
    )
  })

  test('renderöi aiheen ja kirjoittajan, mutta ei urlia tai tykkäyksiä', () => {
    expect(component.container.querySelector('.title')).toHaveTextContent(
      blog.title
    )
    expect(component.container.querySelector('.author')).toHaveTextContent(
      blog.author
    )
    expect(component.queryByText('.url')).not.toBeInTheDocument()
    expect(component.queryByText('.likes')).not.toBeInTheDocument()
  })

  test('renderöi url ja tykkäykset, kun blogin tiedot näyttävää nappia painetaan', async () => {
    const details = component.container.querySelector(".blog-tiedot");
    expect(details).toEqual(null);
  })
})