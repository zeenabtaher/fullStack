import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const handleNewBlog = jest.fn()
  
  const user = userEvent.setup();

  const { container } = render(<BlogForm handleNewBlog={handleNewBlog} />);

  const titleInput = container.querySelector("input[name='title']");
  const authorInput = container.querySelector("input[name='author']");
  const urlInput = container.querySelector("input[name='url']");
  const sendButton = screen.getByText("Luo uusi");

  await user.type(titleInput, "title");
  await user.type(authorInput, "author");
  await user.type(urlInput, "https://www.test.com");
  await user.click(sendButton);

  expect(handleNewBlog.mock.calls).toHaveLength(1)
})