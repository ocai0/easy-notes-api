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