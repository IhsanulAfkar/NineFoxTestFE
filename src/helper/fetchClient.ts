import toast from "react-hot-toast"

interface FetchClientParams {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    body?: string | FormData | null,
    url: string
}
export const fetchClient = async ({ method, url, body }: FetchClientParams) => {
    try {
        const result = await fetch(`http://localhost:3001${url}`, {
            method,
            body
        })
        return result
    } catch (error) {
        toast.error('Server Error')
        return null
    }
}   