import { CHANGE_LANGUAGE } from "./types"

export const CONFIG_LOADING = "config_loading"
export const CONFIG_FAILED = "config_failed"


export const changeLanguage = (theme) => ({
  type: CHANGE_LANGUAGE,
  payload: theme,
});
