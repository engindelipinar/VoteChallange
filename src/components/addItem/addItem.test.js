import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddItem from './AddItem';

test('renders submit link', () => {
  render(<AddItem />);
  const linkElement = screen.getByText("SUBMIT A LINK");
  expect(linkElement).toBeInTheDocument();
});

/* test('click submit link', async () => {
  render(<AddItem />);
  const element = screen.getByTestId('add_item');
  //fireEvent.click(element);
  userEvent.click(element);
  //const title = await screen.findByText('Add New Link');
  //const title = screen.getByText('Add New Link');
  expect(await screen.findByText('Add New Link')).toBeInTheDocument();
  
});  */
