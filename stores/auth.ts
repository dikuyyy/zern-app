import {defineStore} from "pinia";
import type {Ref} from "vue";
import CryptoJS from "crypto-js";
import Cookies from 'js-cookie';

const SECRET_KEY = 'key-app'

export const useAuthStore = defineStore('auth', () => {
        interface State {
            username: string | null;
            token: string | null;
            name: string | null;
        }

        const auth: Ref<State> = ref<State>({
            username: null,
            token: null,
            name: null
        });

        const username = computed(() => {
            return auth.value.username
        })

        const name = computed(() => {
            return auth.value.name;
        })

        const token = computed(() => {
            return auth.value.token
        })

        const login = ({
                           username = '',
                           token = "",
                           name = ""
                       }: any) => {
            auth.value.name = name;
            auth.value.token = token;
            auth.value.username = username;
        }

        const logout = (): void => {
            auth.value.username = null
            auth.value.token = null
            Cookies.remove('auth')
        }

        return {
            auth,
            username,
            name,
            token,
            login,
            logout
        }
    },
    {
        persist: {
            key: 'auth',
            serializer: {
                // Serialize: Encrypts the state before saving it to storage
                serialize: (state: any) => {
                    const stateString = JSON.stringify(state);
                    return CryptoJS.AES.encrypt(stateString, SECRET_KEY).toString();
                },
                // Deserialize: Decrypts the state when loading it from storage
                deserialize: (encryptedState: any) => {
                    const bytes = CryptoJS.AES.decrypt(encryptedState, SECRET_KEY);
                    const decryptedState = bytes.toString(CryptoJS.enc.Utf8);
                    return JSON.parse(decryptedState);
                },
            },
        }
    })