import {
  Pantry,
  PantryCount,
  PantryUpdate,
  PantryUpdateStatus,
} from 'src/types/pantry';

interface IItem extends Omit<Pantry, 'id'> {
  _id: string;
}

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDlmNmI0MzFlNjg5ZWE4YzMyZjhkNGIiLCJpYXQiOjE2ODg2NjQxOTQuMTk3LCJleHAiOjE2ODg3NTA1OTQuMTk3fQ.uGRdlHLw_s7isvmgPGOyZZfkpmRF56HjUR1EDwNz0hM';

const DOMAIN = 'http://localhost:3001';
const HEADERS = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
};

export const fetchPantry = async (): Promise<Pantry[]> => {
  let pantryData: Pantry[] = [];

  try {
    const url = `${DOMAIN}/pantry`;
    const method = 'GET';
    const response = await fetch(url, {
      method: method,
      headers: HEADERS,
    });

    if (!response.ok) {
      const data = await response.json();
      console.error(data.error);
      throw new Error(
        `${response.status}: ${response.statusText}, ${data.error}`
      );
    }

    const data = await response.json();

    if (data.pantry && data.pantry.length) {
      data.pantry.forEach((item: IItem) => {
        pantryData.push({
          id: item._id,
          currency: item.currency,
          note: item.note,
          location1: item.location1,
          location2: item.location2,
          location3: item.location3,
          location4: item.location4,
          location5: item.location5,
          name: item.name,
          updatedAt: item.updatedAt,
          price: item.price,
          favorite: item.favorite,
          quantity: item.quantity,
        });
      });
    }

    return pantryData;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred during the API call.');
  }
};

export const fetchPantryItem = async (itemId: string): Promise<Pantry> => {
  let pantryData: Pantry = { id: 'null', name: 'null', note: 'null' };

  try {
    const url = `${DOMAIN}/pantry/${itemId}`;
    const method = 'GET';
    const response = await fetch(url, {
      method: method,
      headers: HEADERS,
    });

    if (!response.ok) {
      const data = await response.json();
      console.error(data.error);
      throw new Error(
        `${response.status}: ${response.statusText}, ${data.error}`
      );
    }

    const data = await response.json();

    if (data.pantry) {
      data.pantry.forEach((item: IItem) => {
        pantryData = {
          id: item._id,
          currency: item.currency,
          note: item.note,
          location1: item.location1,
          location2: item.location2,
          location3: item.location3,
          location4: item.location4,
          location5: item.location5,
          name: item.name,
          updatedAt: item.updatedAt,
          price: item.price,
          favorite: item.favorite,
          quantity: item.quantity,
        };
      });
    }

    return pantryData;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred during the API call.');
  }
};

export const fetchPantryItemUpdate = async (
  request: Pantry
): Promise<boolean> => {
  let pantryData: Pantry = { id: 'null', name: 'null', note: 'null' };
  const body = {
    name: request.name,
    favorite: request.favorite,
    location1: request.location1,
    location2: request.location2,
    location3: request.location3,
    location4: request.location4,
    location5: request.location5,
    note: request.note,
    price: request.price,
    quantity: request.quantity,
  };

  try {
    const url = `${DOMAIN}/pantry/${request.id}`;
    const method = 'PUT';
    const response = await fetch(url, {
      method: method,
      headers: HEADERS,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const data = await response.json();
      console.error(data.error);
      throw new Error(
        `${response.status}: ${response.statusText}, ${data.error}`
      );
    }

    const data = await response.json();

    if (data.item) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred during the API call.', error);
  }
};

export const fetchPantryCount = async (): Promise<PantryCount> => {
  let pantryNull: PantryCount = { count: 0 };
  try {
    const url = `${DOMAIN}/pantry/count`;
    const method = 'GET';
    const response = await fetch(url, {
      method: method,
      headers: HEADERS,
    });

    if (!response.ok) {
      const data = await response.json();
      console.error(data.error);
      throw new Error(
        `${response.status}: ${response.statusText}, ${data.error}`
      );
    }

    const data = await response.json();

    return data ? { count: data.pantryCount } : pantryNull;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred during the API call.');
  }
};
