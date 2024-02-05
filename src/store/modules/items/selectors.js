import { createSelector } from '@reduxjs/toolkit';

export const item = (state) => state.item;

export const itemSelector = createSelector(
  item,
  state => state
);

