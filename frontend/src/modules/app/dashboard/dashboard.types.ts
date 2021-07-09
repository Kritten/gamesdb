import { Component } from 'vue';

export type TypeCardData = {
  id?: string,
  header: string,
  component: Component,
  cols?: number,
  colsXl?: number,
  props?: Record<string, unknown>,
  padding?: boolean,
}
