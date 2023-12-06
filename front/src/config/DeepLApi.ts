import translate, { DeeplLanguages } from 'deepl'
import { AxiosResponse } from 'axios';


const authKey: string = import.meta.env.VITE_DEEPL_AUTH_KEY;

export async function translator(target: DeeplLanguages, text: string): Promise<AxiosResponse<translate.Response>> {
  try {
    const response = await translate({
      free_api:true,
      text: text,
      target_lang: target,
      auth_key: authKey
    });
    return response as AxiosResponse<translate.Response>;
  } catch(error) {
    throw error;
  }
}