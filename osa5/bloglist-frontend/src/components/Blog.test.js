import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen} from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  
  const blog = {
    id: '12345',
    title: 'Title',
    url: 'linkki',
    likes: 2,
    author: 'Author',
    user: {
      id:'6789',
    },
  }

  let component
  const likeMockHandler = jest.fn()
  beforeEach(() => {
    
  component = render(<Blog key={blog.id} blog={blog} paivitys={likeMockHandler}/>)

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

  test('alussa enemmistä blogin tiedoista on piilossa', async () => {
    const details = component.container.querySelector(".blog-tiedot");
    expect(details).toEqual(null);
  })

  test('renderöi blogn tiedot, kun niitä piilottavaa nappia on painettu', async () => {
    
    const user = userEvent.setup()
    const showButton = screen.getByText('Katso')
    await user.click(showButton)
    screen.debug()

    expect(component.container).toHaveTextContent('linkki')
    expect(component.container).toHaveTextContent(2)
  })

  test('tykkäys painiketta painetaan 2 kertaa', async () => {
    
    const user = userEvent.setup()
    const showButton = screen.getByText('Katso')
    await user.click(showButton)
    screen.debug()

    const likeButton = screen.getByText('Tykkää')
    await user.click(likeButton)

    expect(likeMockHandler.mock.calls).toHaveLength(1);
  })

})