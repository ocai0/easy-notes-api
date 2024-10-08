import { DOMAIN_URI } from './constants'
import type { NoteType } from '$lib/Interfaces';

export const getNotesByPage = async ({page, pageSize}: any): Promise<{notes: NoteType[], count: number, page: number}> => {
  const queryParams = new URLSearchParams();
  if(page) queryParams.set('page', page)
  if(pageSize) queryParams.set('pageSize', pageSize)
  try {
    const raw = await fetch(`${DOMAIN_URI}/notes?${queryParams}`, {method: 'GET'})
    const {data, count} = await raw.json() as any
    return {
      notes: data,
      count,
      page
    }
  }
  catch(error) {
    throw new Error(`Something went wrong`);
  }

}

export const getNoteById = async (uuid: string): Promise<NoteType> => {
  try {
    const raw = await fetch(`${DOMAIN_URI}/notes/${uuid}`, {method: 'GET'})
    return await raw.json()
  }
  catch(error) {
    throw new Error(`Something went wrong`);
  }

}

export const updateNote = async (data: NoteType, uuid: string) => {
  try {
    const raw = await fetch(`${DOMAIN_URI}/notes/${uuid}`, {method: 'PUT', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}})
    return;
  }
  catch(error) {
    throw new Error(`Could not update note`);
  }

}

export const deleteNote = async (uuid: string) => {
  try {
    const raw = await fetch(`${DOMAIN_URI}/notes/${uuid}`, {method: 'DELETE'})
    return history.back();
  }
  catch(error) {
    throw new Error(`Could not delete note`);
  }

}

export const createNote = async (data: NoteType): Promise<NoteType> => {
  try {
    const raw = await fetch(`${DOMAIN_URI}/notes`, {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}})
    return await raw.json()
  }
  catch(error) {
    throw new Error(`Could not update note`);
  } 
}