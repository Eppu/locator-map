import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LocationList, { LocationListProps } from './LocationList';
import { mockLocations } from '@/utils/testUtils';

describe('LocationList', () => {
  test('renders the correct number of LocationList items', () => {
    const props: LocationListProps = {
      decodedData: mockLocations, // Add the 'locations' prop
      userLocation: { lat: 0, long: 0 }, // Add the 'userLocation' prop
    };
    render(<LocationList {...props} />);
    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings).toHaveLength(2);
  });
});
