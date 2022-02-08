import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Form from './Form';


const setup = () => {
  const utils = render(<Form />)
  const nameInput = utils.getByLabelText('name');
  const urlInput = utils.getByLabelText('url');
  const submitInput = utils.getByLabelText('submit');
  return {
    nameInput,
    urlInput,
    submitInput,
    ...utils,
  }
}


test('renders form', () => {
  const {nameInput,urlInput,submitInput} = setup()

  expect(nameInput).toBeInTheDocument();
  expect(urlInput).toBeInTheDocument();
  expect(submitInput).toBeInTheDocument();
});

test('It should not allow save link', async () => {
  const {submitInput} = setup()
  await fireEvent.click(submitInput);
  const errorToast = screen.getByText('Lütfen zorunlu alanları doldurun.');
  expect(errorToast).toBeInTheDocument();
});


test('It should save link', async () => {
  localStorage.setItem('LIST_STORE', JSON.stringify([]));
  const {submitInput, nameInput, urlInput} = setup()
  fireEvent.change(nameInput, {target: {value: 'Google amca'}})
  fireEvent.change(urlInput, {target: {value: 'www.google.com'}})
  await fireEvent.click(submitInput)
  const successToast = screen.getByText('Google amca added.')
  expect(successToast).toBeInTheDocument()
  expect(JSON.parse(localStorage.getItem('LIST_STORE')).length).toBe(1)
});

/* test('It should added list', async () => {
  const {returnLink} = setup()
  await fireEvent.click(returnLink)
  const newItem = screen.getByText('Google amca')
  expect(newItem).toBeInTheDocument()
}) */

/* test('click submit link', async () => {
  render(<AddItem />);
  const element = screen.getByTestId('add_item');
  //fireEvent.click(element);
  userEvent.click(element);
  //const title = await screen.findByText('Add New Link');
  //const title = screen.getByText('Add New Link');
  expect(await screen.findByText('Add New Link')).toBeInTheDocument();
  
});  */
