import { RequestHandler } from 'express';
import InvalidInputError from '../errors/InvalidInputError';
import catchAsync from '../utils/catchAsync';
import { IUpdatePantryItem } from '../models/pantryItem.model';
import { regexTextHelper } from './regexTextHelper';
import { PANTRY_CONSTANTS as PANTRY } from './constants';

export const validateInputs: RequestHandler = catchAsync((req, res, next) => {
  const pantryItem: IUpdatePantryItem = req.body;

  for (const [propertyName, propertyValue] of Object.entries(pantryItem)) {
    let regex: RegExp;

    switch (propertyName) {
      case 'name': {
        regex = new RegExp(`^(.{${PANTRY.MIN_NAME},${PANTRY.MAX_NAME}})$`);
        const isNameValid = regexTextHelper(regex, propertyValue);
        if (!isNameValid) {
          throw new InvalidInputError(`Invalid input for ${propertyName}`);
        }
        break;
      }
      case 'note': {
        regex = new RegExp(`^(.{${PANTRY.MIN_NOTE},${PANTRY.MAX_NOTE}})$`);
        const isNoteValid = regexTextHelper(regex, propertyValue);
        if (!isNoteValid) {
          throw new InvalidInputError(`Invalid input for ${propertyName}`);
        }
        break;
      }
      case 'price': {
        if (typeof propertyValue !== 'number' || propertyValue < 0) {
          throw new InvalidInputError(`Invalid input for ${propertyName}`);
        }
        break;
      }
      case 'quantity': {
        if (typeof propertyValue !== 'number' || propertyValue < 0) {
          throw new InvalidInputError(`Invalid input for ${propertyName}`);
        }
        break;
      }
      case 'favorite':
      case 'location1':
      case 'location2':
      case 'location3':
      case 'location4':
      case 'location5':
        if (typeof propertyValue !== 'boolean') {
          throw new InvalidInputError(`Invalid input: Boolean values only`);
        }
        break;
      default:
        throw new InvalidInputError(`Cannot update: ${propertyName}`);
    }
  }

  next();
});
