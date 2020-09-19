import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import ContactForm from '../components/ContactForm';
import { act } from "react-dom/test-utils";


afterEach(cleanup);

test('renders without crashing', () => {

  const container = render(<ContactForm />)
  console.log('ContactFormTest: render test: container: ', container)

})

test('onSubmit: with valid inputs', async () => {

  const mockSubmit = jest.fn();
  const { getByTestId } = render(<ContactForm onSubmit={mockSubmit} />)

  await act(async () => {
    //in this project this will fail bc firstName input is set to maxLength rather than min
    fireEvent.change(getByTestId('firstName'), {target: {value: 'Jared'}})
    fireEvent.change(getByTestId('lastName'), {target: {value: 'Strohschein'}})
    fireEvent.change(getByTestId('email'), {target: {value: 'test@email.com'}})
    fireEvent.change(getByTestId('message'), {target: {value: 'Long elaborate message'}})
  })

  await act (async () => {
    fireEvent.click(getByTestId('submit'))
  })

  expect(mockSubmit).toHaveBeenCalled()

})


test('onSubmit: with invalid inputs', async () => {

  const mockSubmit = jest.fn();
  const { getByTestId } = render(<ContactForm onSubmit={mockSubmit} />)

  await act(async () => {
    fireEvent.change(getByTestId('firstName'), {target: {value: ''}})
    fireEvent.change(getByTestId('lastName'), {target: {value: ''}})
    fireEvent.change(getByTestId('email'), {target: {value: 'invalid.emailShape'}})
    fireEvent.change(getByTestId('message'), {target: {value: 'long elaborate message'}})
  })

  await act (async () => {
    fireEvent.click(getByTestId('submit'))
  })

  expect(mockSubmit).toHaveBeenCalled()

})

test('with invalid email shape', async () => {
  
  const { getByTestId, container } = render(<ContactForm />)

  await act(async () => {

    const emailInput = getByTestId('email');
    fireEvent.change(emailInput, {target: {value: 'invalid Shape'}});
    fireEvent.blur(emailInput);
  })

  expect(container.innerHTML).toMatch('Looks like there was an error: invalid email address')
})







