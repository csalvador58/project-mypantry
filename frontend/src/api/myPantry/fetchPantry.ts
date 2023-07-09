import { ApiError } from 'src/error/error-classes';
import { ErrorLogger } from 'src/error/error-logger';
import { Pantry, PantryAdd, PantryCount } from 'src/types/pantry';
import { MY_PANTRY } from 'src/utils/constants';

interface IItem extends Omit<Pantry, 'id'> {
  _id: string;
}

const STORAGE_KEY = MY_PANTRY.STORAGE_KEY;
const DOMAIN = MY_PANTRY.DOMAIN;

export const fetchPantry = async (): Promise<Pantry[]> => {
  let pantryData: Pantry[] = [];

  try {
    const token = window.sessionStorage.getItem(STORAGE_KEY);
    const url = `${DOMAIN}/pantry`;
    const method = 'GET';
    const response = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const data = await response.json();
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
    throw new ApiError('Error occurred during fetchPantry API call.');
  }
};

export const fetchPantryItem = async (itemId: string): Promise<Pantry> => {
  let pantryData: Pantry = { id: 'null', name: 'null', note: 'null' };

  try {
    const token = window.sessionStorage.getItem(STORAGE_KEY);
    const url = `${DOMAIN}/pantry/${itemId}`;
    const method = 'GET';
    const response = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
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
    throw new ApiError('Error occurred during fetchPantryItem API call.');
  }
};

export const fetchPantryItemAdd = async (
  request: PantryAdd
): Promise<boolean> => {
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
    const token = window.sessionStorage.getItem(STORAGE_KEY);
    const url = `${DOMAIN}/pantry/add`;
    const method = 'POST';
    const response = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const data = await response.json();
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
    throw new ApiError('Error occurred during fetchPantryItemAdd API call.');
  }
};

export const fetchPantryItemDelete = async (
  itemId: string
): Promise<boolean> => {
  try {
    const token = window.sessionStorage.getItem(STORAGE_KEY);
    const url = `${DOMAIN}/pantry/${itemId}`;
    const method = 'DELETE';
    const response = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const data = await response.json();
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
    throw new ApiError('Error occurred during fetchPantryItemDelete API call.');
  }
};

export const fetchPantryItemUpdate = async (
  request: Pantry
): Promise<boolean> => {
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
    const token = window.sessionStorage.getItem(STORAGE_KEY);
    const url = `${DOMAIN}/pantry/${request.id}`;
    const method = 'PUT';
    const response = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const data = await response.json();
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
    throw new ApiError('Error occurred during fetchPantryItemUpdate API call.');
  }
};

export const fetchPantryCount = async (): Promise<PantryCount> => {
  let pantryNull: PantryCount = { count: 0 };
  try {
    const token = window.sessionStorage.getItem(STORAGE_KEY);
    const url = `${DOMAIN}/pantry/count`;
    const method = 'GET';
    const response = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(
        `${response.status}: ${response.statusText}, ${data.error}`
      );
    }

    const data = await response.json();

    return data ? { count: data.pantryCount } : pantryNull;
  } catch (error) {
    // console.error(error);
    throw new ApiError('Error occurred during fetchPantryCount API call.');
  }
};
